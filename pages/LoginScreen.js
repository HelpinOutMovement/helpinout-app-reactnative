import React ,{useState, useContext} from 'react';
import { TextInput, View, Image, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Switch, ScrollView, Dimensions, Keyboard, AsyncStorage } from 'react-native';
import AppStorage from '../storage/AppStorage';
import AppConstant from '../misc/AppConstant';
import AppStringContext from '../misc/AppStringContext';
import commonStyling from '../styling/commonStyle';
import RNPickerSelect from 'react-native-picker-select';
import countries from "../storage/Countries.json";
import commonStyles from "../styling/commonStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import translate from 'react-native-i18n';
import geolocation from '@react-native-community/geolocation';
import API from "../APIClient/API";
import LogoComponent from './components/LogoComponent';
import firebase from 'react-native-firebase'
import { verticalScale, scale, moderateScale } from 'react-native-size-matters';



export default class LoginScreen extends React.Component {
    constructor({ navigation, props }){
        super({ navigation });
        this.navigate = navigation.navigate;
        this.props = props;        
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);


        AppStorage.getAppInfo(AppConstant.FIREBASE_CLOUD_MESSAGING_TOKEN).then((response) => {
          });
        
    }
   dimensions = Dimensions.get('window');
            
    state = {
        languages: [],
        selectedCountryCode: "IN",
        selectedCountryDialCode: "+91" , 
        selectedCountry: {},
        phoneNumber: "",
        loginstatus: "",
        representOrg: false,
        contactVisible: false,
        firstName: "",
        lastName: "",
        userType: 1,
        organisationName:  null,
        organisationType:  null,
        organisationUnit:  null,
        confirmResult: null,
        verificationCode: '',
        userId: '', 
        loggedIn: false,

    }
  
    forceUpdateHandler(){
        this.forceUpdate();
    };
    

    componentDidMount() {

    }
  
    
    isEmpty = (value) => {
        return (typeof value === "undefined" || value === null || value.length === 0);        
    }

    validatePhoneNumber = () => {
        if(this.isEmpty(this.state.phoneNumber)){
            return false;
        }else{
            //var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
            //return regexp.test(this.state.phoneNumber)
            return  true;
        }       
    }

    verifyPhone = () =>{
        AppStorage.getAppInfo(AppConstant.FIREBASE_CLOUD_MESSAGING_TOKEN).then((response) => {
            this.navigate(AppConstant.APP_PAGE.VERIFY, {loginState: this.state, phoneNumber:this.state.selectedCountryDialCode+""+this.state.phoneNumber});   
          });
       
    }


    onCountryValueChange = (value, index) =>{         
        this.setState({selectedCountry: countries[index-1], selectedCountryCode: countries[index-1].key, selectedCountryDialCode: value});    
    }
        
    render() {                   
       return  this.renderLoginScreen();        
    }


    renderLoginScreen = () =>{
        
        return (
            <View style={{ flexDirection: "column" }}  onPress={ () => {Keyboard.dismiss() } }>
                
                <LogoComponent />
                <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
                <View style={{alignItems: "center",  width:"100%"}} >                                        
                    <View style={{ alignItems: "center" ,  marginVertical: 0, width:"98%"}} >
                        <Text adjustsFontSizeToFit={true}  minimumFontScale={1} style={commonStyling.appLabelInout}>{translate.t('label_enter_your_mobile_no')}</Text>
                        <View style={commonStyling.appPhoneNumberInputView}>
                            <View style={{flex: 1,  flexDirection: "row",alignItems: 'center', justifyContent:'center', width: "92%",}}>
                                <TextInput style={commonStyles.phoneCountryCode}> {this.state.selectedCountryCode} </TextInput>
                                <RNPickerSelect                            
                                        onValueChange ={(value, key) => {this.onCountryValueChange(value, key)}}
                                        items={countries}  
                                        style={pickerCcountryStyles}  
                                        Icon={() => {
                                        return <Ionicons  style={{paddingVertical: verticalScale(15), marginRight:6}} family={"Ionicons"}  name={"md-arrow-dropdown"}  color={"#OOOOOO"} size={30} />;
                                        }}             
                                        value={this.state.selectedCountryDialCode}
                                />
                                <TextInput style={commonStyles.phoneLoginInput} 
                                    keyboardType={'numeric'}
                                    placeholderTextColor="grey"
                                    placeholder={translate.t('label_enter_your_mobile_no')}                
                                    onChangeText={text => this.setState({phoneNumber: text})} 
                                    onTouchCancel={ () => {Keyboard.dismiss() } }          
                                    keyboardShouldPersistTaps={'handled'}
   
                                >  
                                </TextInput>
                            </View>
                        </View>                                
                    </View>
                </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
                <View style={{alignItems: "center",  width:"100%"}} >                                        
                    <View style={{ alignItems: "center" , justifyContent:"center", marginVertical: 50, width:"98%"}} >
                        <TouchableOpacity
                             style={{
                                    borderRadius: 9, 
                                    alignItems: "center", 
                                    justifyContent:"center",
                                     backgroundColor: "#4F5065",
                                     height: 56,
                                     width: "92%",
                                     shadowOpacity: 0.9,
                                     shadowOffset: { height: 3 },
                                     shadowColor: '#2328321F'
                                     }} onPress={() =>{this.verifyPhone()}}>
                            <Text  adjustsFontSizeToFit={true}  minimumFontScale={1.2}
                                style={{
                                    textAlign: "center",
                                    fontFamily: "Roboto-Medium",
                                    //fontSize: 20,
                                    color: "#FFFFFF"
                                    }}>{translate.t("label_login")}</Text>
                        </TouchableOpacity>                    
                    </View>                
                    <Text adjustsFontSizeToFit={true}  minimumFontScale={.5} style={{
                        textAlign: "center",
                        fontFamily: "Roboto-Medium",
                        //fontSize: 18,
                        //lineHeight: 36,
                        color: "Grey"

                    }}> {translate.t("by_signing_you_are_agree")} {"\n"} {translate.t("terms_Of_service")} | {translate.t("privacy_policy")} </Text>
                </View>
                </TouchableWithoutFeedback >

            </View>
        );           
    }

}


const pickerCcountryStyles = StyleSheet.create({
    inputIOS: {
      marginTop: 0,
      fontSize: 20,
      paddingVertical: 10,
      paddingHorizontal: 1,      
      borderRadius: 0,  
      width: scale(90),
      height: verticalScale(60),      
      borderRightWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth:1,
      borderColor: '#E8E8E8',  
      borderWidth: 4,
      color: 'black',
      paddingRight: 8, // to ensure the text is never behind the icon
      paddingLeft: 1,
      textAlign:'center'
    }

});
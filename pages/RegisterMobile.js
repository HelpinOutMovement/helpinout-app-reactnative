import React ,{useState, useContext} from 'react';
import { TextInput, View, Image, Text, TouchableOpacity, StyleSheet, Switch, ScrollView, Dimensions, AsyncStorage } from 'react-native';
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

import Toast from 'react-native-tiny-toast'


export default class RegisterMobile extends React.Component {
    
   constructor(props) {
        super(props);
        ///const { navigate } = this.props.navigation;
        this.navigate = this.props.navigation.navigate;
        console.log(JSON.stringify("Register Constructor")); 
        console.log(JSON.stringify(this.props.route.params.loginState));
        this.state = this.props.route.params.loginState;

        //this.state = {}//this.props.route.params.loginState;
        console.log(JSON.stringify(this.state));
    }
   
    dimensions = Dimensions.get('window');
  
    forceUpdateHandler(){
        this.forceUpdate();
    };
   
    componentDidMount() {

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

    isEmpty = (value) => {
        console.log("value.size  :  " +  value.length )
        return (typeof value === "undefined" || value === null || value.length === 0);        
    }

    validateRegistrationInput = () => {
        if(this.isEmpty(this.state.selectedCountryDialCode) || this.isEmpty(this.state.phoneNumber) || this.isEmpty(this.state.firstName) || this.isEmpty(this.state.lastName) || this.isEmpty(this.state.contactVisible) || this.isEmpty(this.state.userType)){
            return false;
        }else{
            if(this.isEmpty(this.state.userType === 2)){
                if(this.isEmpty(this.state.organisationName) || this.isEmpty(this.state.organisationType)){
                    return  false;
                }                
            }
        }
        return true;
    }

    register =() =>{        
        let restApi = new API();
        let contactVisible = "0";
        let userType = "1";
        if(this.state.contactVisible){
            contactVisible = "1";
        }

        if(this.state.userType){
            userType = "2";
        }

        AppStorage.getAppInfo(AppConstant.FIREBASE_CLOUD_MESSAGING_TOKEN).then((fcmToken) => {

            reqObj =  restApi.register(this.state.selectedCountryDialCode, this.state.phoneNumber, this.state.firstName, this.state.lastName, contactVisible, userType, this.state.organisationName, this.state.organisationType, this.state.organisationUnit);

            reqObj.then(
                result => {
                    console.log("result  data : "+ JSON.stringify(result));
                    if(result.status === "0"){
                        if(result.message === "Already registered"){
                            this.navigate(AppConstant.APP_PAGE.DASHBOARD, {loginState: this.state});
                        }else{
                            console.log("RegMobile  === 0");
                            console.log("RegMobile  " + result.status);                    
                            this.setState({loginstatus: result.status});
                            AppStorage.removeAppInfo(AppConstant.APP_STORE_KEY.USER_REG_DETAILS);
                            AppStorage.removeAppInfo(AppConstant.APP_STORE_KEY.IS_VEFIRIED);
                            Toast.show('Registration Error ' + JSON.stringify(result.message) , {duration:1000, position:0, animation:true, shadow:true, animationDuration:2000})
                            this.forceUpdateHandler();   
                        }                        
                    }else{
                        console.log("RegMobile  <> 0");
                        console.log("RegMobile  " + result.status);
                        let thisclass = this;
                        AppStorage.storeAppInfo(AppConstant.APP_STORE_KEY.USER_REG_DETAILS, JSON.stringify(result.data)).then(function(value) {
                            console.log("userRegistrationDetails    " + value);
                            // expected output: "Success!"
                            thisclass.navigate(AppConstant.APP_PAGE.DASHBOARD, {loginState: thisclass.state});
                          });                                        
                    }
                }, 
                error => {
                    Toast.show('Registration Error ' + JSON.stringify(error) , {duration:1000, position:0, animation:true, shadow:true, animationDuration:2000})
    
                } 
            );   

        });

        
    }



    onCountryValueChange = (value, index) =>{         
        this.setState({selectedCountry: countries[index-1], selectedCountryCode: countries[index-1].key, selectedCountryDialCode: value});    
    }
        
    render() { 
        return this.renderRegistrationScreen();               
    }


    orgTypes = [{"label":"Individual","key":"Individual" ,"displayValue": false ,"value":"1"},{"label":"Organisation","key":"Organisation" ,"displayValue": false ,"value":"2"}]

    renderRegistrationScreen = () =>{                
        return (            
            <View style={{ flexDirection: "column", padding: 10, flex: 1}}>
                <LogoComponent />
                <Text style={commonStyling.appLabelInout}>{translate.t('label_register')}</Text>
                <ScrollView style={{flex: 1,borderWidth: StyleSheet.hairlineWidth, borderWidth:0, borderColor: 'red'}}>
                    <View style={{ alignItems: "center" , marginBottom:50}} >            
                
                        <TextInput onChangeText={text => this.setState({firstName: text})} style={commonStyles.RegistrationInput} placeholderTextColor="grey" placeholder={translate.t('label_first_name')}/>
                        <TextInput onChangeText={text => this.setState({lastName: text})} style={commonStyles.RegistrationInput} placeholderTextColor="grey"  placeholder={translate.t('label_last_name')}/> 
                        <View style={{marginTop:20}}></View>
                        <View></View>
                        <View style={commonStyles.registerSwitchRow}>
                            <Switch 
                                        disabled={false}
                                        activeText={'On'}
                                        inActiveText={'Off'}
                                        backgroundActive={'green'}
                                        backgroundInactive={'gray'}
                                        circleActiveColor={'#30a566'}
                                        circleInActiveColor={'#000000'}
                                            
                                value={this.state.contactVisible ? true : false}                            
                                style={commonStyles.registerSwitch} 
                                onValueChange ={(switchValue)=>{this.setState({contactVisible: switchValue})}}
                            ></Switch>
                            <Text style={commonStyles.registerSwitchText}>{translate.t("label_visible_text")}</Text>
                        </View> 
                        <View style={commonStyles.registerSwitchRow}>
                            <Switch
                                        disabled={false}
                                        activeText={'On'}
                                        inActiveText={'Off'}
                                        backgroundActive={'green'}
                                        backgroundInactive={'gray'}
                                        circleActiveColor={'#30a566'}
                                        circleInActiveColor={'#000000'}
                                            
                                value={this.state.representOrg ? true : false}                            
                                style={commonStyles.registerSwitch} 
                                onValueChange ={(switchValue)=>{this.setState({representOrg: switchValue})}}                                
                            ></Switch>
                            <Text style={commonStyles.registerSwitchText}>{translate.t("label_representing_as_org")} </Text>
                        </View>    
                        {this.state.representOrg ?  
                        <View style={{width:'100%' }}>                                
                        <TextInput onChangeText={text => this.setState({organisationName: text})} style={commonStyles.RegistrationInput} placeholderTextColor="grey"  placeholder={translate.t('label_org_name')}/>                                                                           
                        
                        <RNPickerSelect                            
                                onValueChange ={(value) => {this.setState({organisationType: value})}}
                                items={this.orgTypes}  
                                style={pickerSelectStyles}  
                                Icon={() => {
                                return <Ionicons  style={{marginVertical: 30, marginRight:6}} family={"Ionicons"}  name={"md-arrow-dropdown"}  color={"#OOOOOO"} size={30} />}}             
                                value={this.state.organisationType}
                        />
                        <TextInput onChangeText={text => this.setState({organisationUnit: text})} style={commonStyles.RegistrationInput} placeholderTextColor="grey"  placeholder={translate.t('label_unit_division')}/> 
                        <View style={{width:'100%', marginTop:20}}>  
                            <TouchableOpacity style={{backgroundColor: "#4F5065",height: 56,
                                        marginTop: 10,                                     
                                        paddingHorizontal: 1,   
                                        justifyContent:"center" ,           
                                        width:'100%',
                                        borderWidth: 1,
                                        shadowOpacity: 0.9,
                                        borderRadius: 9,
                                        shadowOffset: { height: 3 },
                                        shadowColor: '#2328321F',}} 
                                        onPress={() =>{this.register()}}>
                                            <Text style={{borderRadius: 9, textAlign: "center",fontFamily: "Roboto-Medium",fontSize: 20,color: "#FFFFFF"}}>{translate.t("label_start")}</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                        :  
                        <View style={{width:'100%', marginTop:20}}>  
                            <TouchableOpacity style={{backgroundColor: "#4F5065",height: 56,
                                        marginTop: 10,                                     
                                        paddingHorizontal: 1,  
                                        justifyContent:"center" ,            
                                        width:'100%',
                                        borderWidth: 1,
                                        shadowOpacity: 0.9,
                                        borderRadius: 9,
                                        shadowOffset: { height: 3 },
                                        shadowColor: '#2328321F',}} 
                                        onPress={() =>{this.register()}}>
                                            <Text style={{borderRadius: 9, textAlign: "center",fontFamily: "Roboto-Medium",fontSize: 20,color: "#FFFFFF"}}>{translate.t("label_start")}</Text>
                            </TouchableOpacity>
                        </View>
                            }
                    </View>
                </ScrollView>
            </View>
        );   
    }        
}



const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      marginTop: 20,
    fontSize: 20,
    paddingVertical: 12,
    paddingHorizontal: 1,
    borderRadius: 9,  
    width: "100%",
    height: 50,
    borderTopWidth:1,
    borderLeftWidth:1,
    borderWidth: 4,
    borderColor: '#E8E8E8',
    borderRadius: 9,
    color: '#000000',
    paddingRight: 5, // to ensure the text is never behind the icon
    textAlign:'center'
  },

});
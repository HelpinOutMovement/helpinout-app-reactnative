import React ,{useState, useContext} from 'react';
import { TextInput, View, Image,  TouchableOpacity, StyleSheet, Switch, ScrollView, Dimensions, Keyboard,  TouchableWithoutFeedback } from 'react-native';
import { Container,  Content, Text, Header, Left, Right, Body, Title, Button, Icon } from "native-base";
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
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'
import { verticalScale, scale, moderateScale } from 'react-native-size-matters';

import HeaderComponent from './components/HeaderComponent'

export default class RegisterMobile extends React.Component {
    
   constructor(props) {
        super(props);
        console.log("Reg props : "+ JSON.stringify(props))
        ///const { navigate } = this.props.navigation;
        this.navigate = this.props.navigation.navigate;
        this.state = {

            firstName:"",
            lastName: "",
            contactVisible: false,
            userType:1,
            organisationName: "",
            organisationType: "",
            organisationUnit: "",

        }//this.props.route.params.loginState;

        AppStorage.storeAppInfo(AppConstant.IS_LOGGED_IN, "false");
        //this.state = {}//this.props.route.params.loginState;



 
    }
   
    dimensions = Dimensions.get('window');
  
    forceUpdateHandler(){
        this.forceUpdate();
    };
   
    componentDidMount() {
        if(this.props.route.params.action === "update"){
            console.log("Update");
            AppStorage.getAppInfo(AppConstant.APP_STORE_KEY.USER_REG_DETAILS).then((userDetails) => {
                console.log("Reg props : "+userDetails);            
                userDetails = JSON.parse(userDetails)
                this.setState({
                    firstName: userDetails.user_detail.first_name,
                lastName: userDetails.user_detail.last_name,
                contactVisible: userDetails.user_detail.mobile_no_visibility,
                userType:  userDetails.user_detail.user_type,
                organisationName: userDetails.user_detail.org_name,
                organisationType: userDetails.user_detail.org_type,
                organisationUnit: userDetails.user_detail.org_division,
                })
            })
        }        
    }
    
    validatePhoneNumber = () => {
        if(this.isEmpty(this.props.route.params.phoneNumber)){
            return false;
        }else{
            //var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
            //return regexp.test(this.state.phoneNumber)
            return  true;
        }       
    }

    isEmpty = (value) => {
        return (typeof value === "undefined" || value === null || value.length === 0);        
    }

    validateRegistrationInput = () => {
        if(this.isEmpty(this.props.route.params.countryCode) || this.isEmpty(this.props.route.params.phoneNumber) || this.isEmpty(this.state.firstName) || this.isEmpty(this.state.lastName) || this.isEmpty(this.state.contactVisible) || this.isEmpty(this.state.userType)){
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


    submit = () => {

        if(this.props.route.params.action === "register"){
            this.register();
        }else if(this.props.route.params.action === "update"){
            this.updateProfile();
        }

    }


    updateProfile = () => {

        let restApi = new API();
        let contactVisible = "0";
        let userType = "1";
        if(this.state.contactVisible){
            contactVisible = "1";
        }

        if(this.state.userType){
            userType = "2";
        }
        
        AppStorage.getAppInfo(AppConstant.APP_STORE_KEY.USER_REG_DETAILS).then((userDetails) => {
            
            let userProfileDetails = JSON.parse(userDetails);            
            let reqObj = restApi.updateUser(userProfileDetails.user_detail.country_code, userProfileDetails.user_detail.mobile_no, this.state.firstName, this.state.lastName, contactVisible, userType, this.state.organisationName, this.state.organisationType, this.state.organisationUnit);
            reqObj.then((response) => {
                if(response.status === "1"){
                    let thisclass = this;
                    userProfileDetails.user_detail.firstName = this.state.firstName
                    userProfileDetails.user_detail.last_name = this.state.lastName
                    userProfileDetails.user_detail.mobile_no_visibility = contactVisible
                    userProfileDetails.user_detail.user_type = userType
                    userProfileDetails.user_detail.org_name = this.state.organisationName
                    userProfileDetails.user_detail.org_type = this.state.organisationType
                    userProfileDetails.user_detail.org_division =  this.state.organisationUnit
    
                    AppStorage.storeAppInfo(AppConstant.APP_STORE_KEY.USER_REG_DETAILS, JSON.stringify(userProfileDetails)).then(() => {
                        thisclass.navigate(AppConstant.APP_PAGE.SIDE_DRAWER, {tik:new Date()})
                    })
                }else{
                    Toast.show('Update Error ' + JSON.stringify(error) , {duration:1000, position:0, animation:true, shadow:true, animationDuration:2000})

                }
                
            });
        })
            
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

            reqObj =  restApi.register(this.props.route.params.countryCode, this.props.route.params.phoneNumber, fcmToken, this.state.firstName, this.state.lastName, contactVisible, userType, this.state.organisationName, this.state.organisationType, this.state.organisationUnit);
            if(fcmToken === null ) { 
                fcmToken = "defaulttoken"
            }else{
                if(fcmToken.length === 0 ) { 
                    fcmToken = "defaulttoken"
                };
            }
            
            reqObj.then(
                result => {
                    if(result.status === "0"){
                        let thisclass = this;
                        if(result.message === "Already registered"){
                            AppStorage.storeAppInfo(AppConstant.IS_LOGGED_IN, "false");
                            Toast.show('Phone number already registered' , {duration:1000, position:0, animation:true, shadow:true, animationDuration:2000})
                            //this.navigate(AppConstant.APP_PAGE.DASHBOARD, {loginState: this.state});
                            thisclass.navigate(AppConstant.APP_PAGE.LOGIN, {loginState: thisclass.state});    
                        }else{
                            this.setState({loginstatus: result.status});
                            AppStorage.removeAppInfo(AppConstant.USER_REGISTRATION_DETAILS);
                            AppStorage.removeAppInfo(AppConstant.APP_STORE_KEY.IS_VEFIRIED);
                            AppStorage.storeAppInfo(AppConstant.IS_LOGGED_IN, "false");
                            Toast.show('Registration Error ' + JSON.stringify(result.message) , {duration:1000, position:0, animation:true, shadow:true, animationDuration:2000})
                            this.forceUpdateHandler();   
                        }                        
                    }else if(result.status === "1"){
                        let thisclass = this;
                        AppStorage.storeAppInfo(AppConstant.USER_REGISTRATION_DETAILS, JSON.stringify(result.data)).then(function(value) {
                            // expected output: "Success!"
                            AppStorage.storeAppInfo(AppConstant.IS_LOGGED_IN, "true");
                            AppStorage.storeAppInfo(AppConstant.APP_STORE_KEY.USER_REG_DETAILS, JSON.stringify(result.data)).then(() => {
                                AppStorage.getAppInfo(AppConstant.APP_STORE_KEY.USER_REG_DETAILS).then((responseObj) => {
                                    thisclass.navigate(AppConstant.APP_PAGE.SIDE_DRAWER, {loginState: thisclass.state});                                    
                                })
                            });
                          });                                        
                    }
                }, 
                error => {
                    AppStorage.storeAppInfo(AppConstant.IS_LOGGED_IN, "false");
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
            <View style={{ flexDirection: "column", padding: 0, flex: 1}}>
                <Header style={{ backgroundColor: "#4F5065", height: 60, paddingBottom: 15 }}>
                    <Left>
                        <Button
                        transparent
                        onPress={() => { this.props.navigation.goBack()}}>
                        <Icon name="ios-arrow-back" style={{ color: "#ffffff" }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{
                        color: "#ffffff",
                        fontFamily: "Roboto-Medium",
                        width: 200,
                        borderWidth: 0,
                        fontSize: 18
                        }}> {translate.t("update_profile")} </Title>
                    </Body>
                    <Right >                                
                    </Right>
                </Header>                          
                <LogoComponent />
                <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
                    <Text style={commonStyling.appLabelInout}>{translate.t('label_register')}</Text>
                </TouchableWithoutFeedback>
                <KeyboardAwareView animated={false} useNativeDriver={true}>
                <ScrollView style={{flex: 1,borderWidth: StyleSheet.hairlineWidth, borderWidth:0, borderColor: 'red'}}>
                    <View style={{ alignItems: "center" , marginBottom:50}} >            
                
                        <TextInput value={this.state.firstName} onChangeText={text => this.setState({firstName: text})} style={commonStyles.RegistrationInput} placeholderTextColor="grey" placeholder={translate.t('label_first_name')}/>
                        <TextInput value={this.state.lastName} onChangeText={text => this.setState({lastName: text})} style={commonStyles.RegistrationInput} placeholderTextColor="grey"  placeholder={translate.t('label_last_name')}/> 
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
                            <Text adjustsFontSizeToFit={true}  minimumFontScale={.5}  style={commonStyles.registerSwitchText}>{translate.t("label_visible_text")}</Text>
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
                            <Text adjustsFontSizeToFit={true}  minimumFontScale={1} style={commonStyles.registerSwitchText}>{translate.t("label_representing_as_org")} </Text>
                        </View>    
                        {this.state.representOrg ?  
                        <View style={{width:scale(310) }}>                                
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
                        <View style={{width:scale(310), marginTop:20}}>  
                            <TouchableOpacity style={{backgroundColor: "#4F5065",height: 56,
                                        marginTop: 10,                                     
                                        paddingHorizontal: 1,   
                                        justifyContent:"center" ,           
                                        width:scale(310),
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
                        <View style={{width:scale(310), marginTop:20}}>  
                            <TouchableOpacity style={{backgroundColor: "#4F5065",height: 56,
                                        marginTop: 10,                                     
                                        paddingHorizontal: 1,  
                                        justifyContent:"center" ,            
                                        width:scale(310),
                                        borderWidth: 1,
                                        shadowOpacity: 0.9,
                                        borderRadius: 9,
                                        shadowOffset: { height: 3 },
                                        shadowColor: '#2328321F',}} 
                                        onPress={() =>{this.submit()}}>
                                            <Text style={{borderRadius: 9, textAlign: "center",fontFamily: "Roboto-Medium",fontSize: 20,color: "#FFFFFF"}}>{(this.props.route.params.action === "update") ? translate.t("update_profile") : translate.t("label_start")}</Text>
                            </TouchableOpacity>
                        </View>
                            }
                    </View>
                </ScrollView>
                </KeyboardAwareView>
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
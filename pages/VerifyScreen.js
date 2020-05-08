import React, { useState, useContext } from 'react';
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


export default class VerifyScreen extends React.Component {
    constructor(props) {
        super(props);
        const { navigate } = this.props.navigation;
        this.state = this.props.route.params.loginState;
        this.navigate = this.props.navigation.navigate;
        this.phoneNumber = this.props.phoneNumber;
        
        console.log("VerifyScreen Constructor  " +JSON.stringify(props))
        //console.log(JSON.stringify(this.state));


        this.state = {           
            contdownValue:60, 
            verificationCodeEditable:false,
            resendVerificationCodeEnabled:false,
            ...this.props.route.params.loginState
        }


        this.resendVerificationCode(false)
/*
        var config = {
            apiKey: "AIzaSyAfct3wQWfE5r914mqbw8bLTrtovql6XtU",
            authDomain: "helpinout-app-raga111.firebaseio.com",
            databaseURL: "https://helpinout-app-raga.firebaseio.com",
            projectId: "helpinout-app-raga111",
            storageBucket: "helpinout-app-raga111.firebaseio.com",
            messagingSenderId: "12121212"
          };
          firebase.initializeApp(config);
*/          
        
    }

    dimensions = Dimensions.get('window');

    forceUpdateHandler() {
        this.forceUpdate();
    };

    resendVerificationCode = (forceResend) => {
        this.setState({contdownValue:60, verificationCodeEditable:false, resendVerificationCodeEnabled:false})
        setTimeout(() =>{
            this.updateTimer();
            this.handleSendCode(forceResend);
        }, 1000)
    }

    updateTimer = async () => {
        let interval = setInterval(() =>{
            this.setState({contdownValue:--this.state.contdownValue})
            if(this.state.contdownValue <= 0){
                this.setState({verificationCodeEditable:true, resendVerificationCodeEnabled:true})
                clearInterval(interval);
                this.setState({contdownValue:0})            
                this.forceUpdate()
            }
        }, 1000);
    }

    isEmpty = (value) => {
        return (typeof value === "undefined" || value === null || value.length === 0);
    }


    validatePhoneNumber = () => {
        if (this.isEmpty(this.state.phoneNumber)) {
            return false;
        } else {
            //var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
            //return regexp.test(this.state.phoneNumber)
            return true;
        }
    }



    handleSendCode = (forceResend) => {
        // Request to send OTP
        console.log("handleSendCode  : " + this.state.selectedCountryDialCode+""+this.state.phoneNumber);
        if (this.validatePhoneNumber(this.state.selectedCountryDialCode+""+this.state.phoneNumber)) {
          firebase
            .auth()
            .signInWithPhoneNumber(this.state.selectedCountryDialCode+""+this.state.phoneNumber, forceResend)
            .then(confirmResult => {
                this.setState({verificationCodeEditable:true})
                Toast.show(translate.t('otp_send_success') , {duration:1000, position:0, animation:true, shadow:true, animationDuration:1000})
              console.log(confirmResult)
              this.setState({ confirmResult: confirmResult });       
            })
            .catch(error => {
                Toast.show('Error : ' + JSON.stringify(error) , {duration:1000, position:0, animation:true, shadow:true, animationDuration:1000})
            })
        } else {
            Toast.show('Invalid Phone Number' , {duration:1000, position:0, animation:true, shadow:true, animationDuration:1000})
        }
    }
    

    login = () => {
        console.log(this.validatePhoneNumber());
        this.setState({ loggedIn: true });
        if (this.validatePhoneNumber()) {
            let restApi = new API();
            AppStorage.getAppInfo(AppConstant.FIREBASE_CLOUD_MESSAGING_TOKEN).then((fcmToken) => {
                reqObj = restApi.login(this.state.selectedCountryDialCode, this.state.phoneNumber, fcmToken);
                reqObj.then(
                    result => {
                        if (result.status === "0") {
                            AppStorage.storeAppInfo(AppConstant.IS_LOGGED_IN, "false");
                            this.navigate(AppConstant.APP_PAGE.REGISTER_MOBILE, { loginState: this.state });
                        } else {
                            AppStorage.storeAppInfo(AppConstant.APP_STORE_KEY.USER_REG_DETAILS, JSON.stringify(result.data));
                            AppStorage.storeAppInfo(AppConstant.IS_LOGGED_IN, "true");

                            AppStorage.getAppInfo(AppConstant.APP_STORE_KEY.IS_VEFIRIED).then((value) => {
                                if (value === "true") {
                                    this.navigate(AppConstant.APP_PAGE.DASHBOARD, JSON.stringify(result.data));
                                } else {
                                    this.navigate(AppConstant.APP_PAGE.LOGIN);
                                }
                            });
                        }
                    },
                    error => {
                        this.setState({resendVerificationCodeEnabled:true, verificationCodeEditable:true, contdownValue:0})
                        AppStorage.storeAppInfo(AppConstant.APP_STORE_KEY.IS_VEFIRIED, "false");
                        AppStorage.storeAppInfo(AppConstant.APP_STORE_KEY.USER_REG_DETAILS, "");
                        Toast.show('Login Error ' + JSON.stringify(error) , {duration:1000, position:0, animation:true, shadow:true, animationDuration:2000})
                    }
                );
            })
        } else {
            Toast.show(translate.t('toast_error_invalid_phone_number') , {duration:1000, position:0, animation:true, shadow:true, animationDuration:2000})
            // Add Error Toasts
        }
    }

    handleVerifyCode = () => {
        // Request for OTP verification
        const { confirmResult, verificationCode } = this.state;
        if (verificationCode.length == 6) {
            this.setState({verificationCodeEditable:false})
            confirmResult.confirm(verificationCode)
                .then(user => {
                    AppStorage.storeAppInfo(AppConstant.APP_STORE_KEY.IS_VEFIRIED, "true").then((data) => {
                        AppStorage.storeAppInfo(AppConstant.FIREBASE_USER_DETAILS, JSON.stringify(user)).then((data) => {
                            this.login();
                        });
                    });
                })
                .catch(error => {
                    AppStorage.storeAppInfo(AppConstant.APP_STORE_KEY.IS_VEFIRIED, "false")
                    Toast.show('Verification Error ' + JSON.stringify(error) , {duration:1000, position:0, animation:true, shadow:true, animationDuration:1000})
                })
        } else {
            Toast.show(translate.t('toast_error_please_enter_otp') , {duration:1000, position:0, animation:true, shadow:true, animationDuration:1000})
        }
    }


    render() {
        return (
            <View>
                {this.renderConfirmationCodeView()}
            </View>

        );
    }


    renderConfirmationCodeView = () => {
        return (
            <View style={{ flexDirection: "column", alignItems: "center", }}>
                <LogoComponent />
                <View style={{ alignItems: "center", width: "96%" }} >
                    <View style={{ alignItems: "center", marginVertical: 0, width: "94%" }} >
                        <Text style={commonStyling.appLabelInout}>{translate.t("label_enter_otp")}</Text>
                        <View style={commonStyling.appPhoneNumberInputView}>
                            <View style={{ flex: 1, flexDirection: "row", alignItems: 'center', justifyContent: 'center', }}>
                                <TextInput
                                    style={commonStyles.RegistrationInput}
                                    placeholder={translate.t('label_enter_otp')}
                                    placeholderTextColor='grey'
                                    value={this.state.verificationCode}
                                    keyboardType='numeric'
                                    onChangeText={verificationCode => {
                                        this.setState({ verificationCode: verificationCode })
                                    }}
                                    maxLength={6}
                                    editable={this.state.verificationCodeEditable}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ alignItems: "center", width: "96%" }} >
                    <View style={{ alignItems: "center", marginVertical: 0, width: "94%" }} > 
                        <Text style={{ borderRadius: 9, textAlign: "center", fontFamily: "Roboto", fontSize: 16, lineHeight: 56, color: "blue" }}>00:{this.state.contdownValue}</Text>
                    </View>
                </View>
                <View style={{ alignItems: "center", width: "96%" }} >
                    <View style={{ alignItems: "center", marginVertical: 0, width: "94%" }} >
                    <TouchableOpacity
                            style={{
                                backgroundColor: "#4F5065", height: 56,
                                marginTop: 10,
                                paddingHorizontal: 1,
                                justifyContent:"center",
                                width: '100%',
                                borderWidth: 1,
                                shadowOpacity: 0.9,
                                borderRadius: 9,
                                shadowOffset: { height: 3 },
                                shadowColor: '#2328321F',
                            }}
                            onPress={this.handleVerifyCode}
                            disabled={!this.state.verificationCodeEditable}
                            >
                            <Text 
                                style={{ 
                                        borderRadius: 9, 
                                        textAlign: "center", 
                                        fontFamily: "Roboto-Medium", 
                                        fontSize: 20, 
                                        
                                        color: "#FFFFFF" }}>{translate.t('button_verify')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                <View style={{ alignItems: "center", width: "96%" }} >
                    <View style={{ alignItems: "center", marginVertical: 0, width: "94%" }} > 
                        {this.state.resendVerificationCodeEnabled ? 
                        <TouchableOpacity onPress={() => {this.resendVerificationCode(true)}}>
                            <Text  style={{ borderRadius: 9, textAlign: "center", fontFamily: "Roboto", fontSize: 16, lineHeight: 56, color: "blue" }}>{translate.t("retry_msg")}</Text>
                        </TouchableOpacity>                        
                        :
                         <></>
                        }                        
                    </View>
                </View>
                

                <View style={{ alignItems: "center", width: "96%" }} >
                    <View style={{ alignItems: "center", marginVertical: 0, width: "94%" }} > 
                        <TouchableOpacity onPress={() => this.navigate(AppConstant.APP_PAGE.LOGIN)}>
                            <Text style={{ borderRadius: 9, textAlign: "center", fontFamily: "Roboto", fontSize: 16, lineHeight: 56, color: "blue" }}>{translate.t("change_phone_number")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        )
    }

}

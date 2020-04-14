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



export default class VerifyScreen extends React.Component {
    constructor(props){
        super(props);
        const { navigate } = this.props.navigation;        
        //console.log(JSON.stringify("Verfy Constructor")); 
        //console.log(JSON.stringify(this.props.route.params.loginState));
        this.state = this.props.route.params.loginState;
        this.navigate = this.props.navigation.navigate;
        console.log("VerifyScreen Constructor")
        console.log(JSON.stringify(this.state));
        
        if(this.isEmpty(this.state.confirmResult)){
            this.handleSendCode();
        }

        
        
    }
    
   dimensions = Dimensions.get('window');
  /*          
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
  */
 forceUpdateHandler(){
    this.forceUpdate();
  };
   
  
  isEmpty = (value) => {
    //console.log("value.size  :  " +  value.length )
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


handleSendCode = () => {
    // Request to send OTP
    if (this.validatePhoneNumber(this.state.phoneNumber)) {
      firebase
        .auth()
        .signInWithPhoneNumber(this.state.selectedCountryDialCode+""+this.state.phoneNumber)
        .then(confirmResult => {
          console.log("confirmResult")
          console.log(confirmResult)
          this.setState({ confirmResult: confirmResult });
          //this.handleVerifyCode();
          //this.navigate(AppConstant.APP_PAGE.VERIFY, {loginState: this.state});             
        })
        .catch(error => {
          //alert(error.message)    
          console.log(error)
        })
    } else {
      alert('Invalid Phone Number')
    }
}

    handleVerifyCode = () => {
        // Request for OTP verification
        const { confirmResult, verificationCode } = this.state;
        //this.setState({verificationCode: verificationCode});
        if (verificationCode.length == 6) {
            console.log(verificationCode);
          confirmResult.confirm(verificationCode)
            .then(user => {
                console.log(user);
                    AppStorage.storeAppInfo(AppConstant.IS_VEFIRIED, "true").then((data) => {
                    AppStorage.storeAppInfo(AppConstant.FIREBASE_USER_DETAILS, JSON.stringify(user)).then((data) => {
                        //console.log(data);
                        this.navigate(AppConstant.APP_PAGE.DASHBOARD, {loginState: this.state});             
                    });
                //this.setState({ userId: user.uid })
                //console.log(JSON.stringify(user));
              })              
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          alert('Please enter a 6 digit OTP code.')
        }
      }

        
    render() { 
        return (
            <View>
                {this.renderConfirmationCodeView()}
                 {/*this.state.confirmResult ? this.renderConfirmationCodeView() : null*/}                     
            </View>
           
        );      
       
    }




    renderConfirmationCodeView = () => {
        return (
            <View style={{ flexDirection: "column" , alignItems: "center",}}>
                <LogoComponent />
                <View style={{alignItems: "center",  width:"96%"}} >                                        
                    <View style={{ alignItems: "center" ,  marginVertical: 0, width:"94%"}} >
                        <Text style={commonStyling.appLabelInout}>{"Enter verification code"}</Text>
                        <View style={commonStyling.appPhoneNumberInputView}>
                            <View style={{flex: 1,  flexDirection: "row",alignItems: 'center', justifyContent:'center',}}>
                                <TextInput
                                    style={commonStyles.RegistrationInput}
                                    placeholder='Verification code'
                                    placeholderTextColor='grey'
                                    value={this.state.verificationCode}
                                    keyboardType='numeric'                                    
                                    onChangeText={verificationCode => {
                                        this.setState({ verificationCode: verificationCode })
                                    }}
                                    maxLength={6}
                                />
                            </View>
                        </View>                                
                    </View>
                </View>
                    <View style={{alignItems: "center",  width:"96%"}} >                                        
                        <View style={{ alignItems: "center" ,  marginVertical: 0, width:"94%"}} >
                            <TouchableOpacity
                            style={{
                                    backgroundColor: "#4F5065",height: 56,
                                    marginTop: 10,                                     
                                    paddingHorizontal: 1,        
                                    width:'100%',
                                    borderWidth: 1,
                                    shadowOpacity: 0.9,
                                    borderRadius: 9,
                                    shadowOffset: { height: 3 },
                                    shadowColor: '#2328321F',
                                }} 
                            onPress={this.handleVerifyCode}>
                            <Text style={{borderRadius: 9, textAlign: "center",fontFamily: "Roboto-Medium",fontSize: 20,lineHeight: 56,color: "#FFFFFF"}}>Verify Code</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            </View>

        )
    }
    
}


const styles = StyleSheet.create({
    phoneInput: {
        width: 311,
        height: 60,
        borderRadius: 5,
        borderColor: "rgba(226,214,214,1)",
        borderWidth: 1,
        shadowOffset: {
          height: 1,
          width: 1
        },     
        shadowColor: "rgba(0,0,0,10)",
        shadowOpacity: 0.39,
        marginTop: 37,
        alignSelf: "center",
        fontSize:50,
        fontFamily:"roboto-regular"
    },
    textData: {
        color: "#121212",
        fontFamily: "roboto-regular",
        marginLeft: 16,
        marginTop: 5
      },

    

});

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
const pickerCcountryStyles = StyleSheet.create({
    inputIOS: {
      marginTop: 0,
      fontSize: 20,
      paddingVertical: 12,
      paddingHorizontal: 1,      
      borderRadius: 0,  
      width: 90,
      height: 53,      
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
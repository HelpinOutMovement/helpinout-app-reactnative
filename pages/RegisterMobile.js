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



export default class RegisterMobile extends React.Component {
    

   constructor(props) {
        super(props);
        const { navigate } = this.props.navigation;
        console.log(JSON.stringify("Register Constructor")); 
        console.log(JSON.stringify(this.props.route.params.loginState));
        this.state = this.props.route.params.loginState;
        console.log(JSON.stringify(this.state));
    }
   dimensions = Dimensions.get('window');
  
  forceUpdateHandler(){
    this.forceUpdate();
  };
   

  componentDidMount() {

  }
  
    findCoordinates = () => {
      console.log("before getCurrentPosition");
      console.log(this.state.phoneNumber);
        geolocation.getCurrentPosition(
            position => {
                const location = JSON.stringify(position);
                this.setState({ location });
            },
            error => Alert.alert(error.message),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };

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
            .signInWithPhoneNumber("")
            .then(confirmResult => {
              console.log(confirmResult)
              this.setState({ confirmResult }).then(function(value) {
                    console.log("setState  : confirmResult "  + value);
                    this.navigate(AppConstant.APP_PAGE.VERIFY);
              });              
            })
            .catch(error => {
              //alert(error.message)    
              console.log(error)
            })
        } else {
          alert('Invalid Phone Number')
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


    handleSendCode = () => {
        // Request to send OTP
        if (this.validatePhoneNumber()) {
          firebase
            .auth()
            .signInWithPhoneNumber(this.state.selectedCountryDialCode+""+this.state.phoneNumber)
            .then(confirmResult => {
              console.log(confirmResult)
              this.setState({ confirmResult }).then(function(value) {
                    console.log("setState  : confirmResult "  + value);
                    this.forceUpdateHandler();                    //this.render((renderRegistrationScreen})s
              });
              
            })
            .catch(error => {
              //alert(error.message)    
              console.log(error)
            })
        } else {
          alert('Invalid Phone Number')
        }
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

        reqObj =  restApi.register(this.state.selectedCountryDialCode, this.state.phoneNumber, this.state.firstName, this.state.lastName, contactVisible, userType, this.state.organisationName, this.state.organisationType, this.state.organisationUnit);

        reqObj.then(
            result => {
                console.log("result  data : "+ JSON.stringify(result));
                if(result.status === "0"){
                    console.log("RegMobile  === 0");
                    console.log("RegMobile  " + result.status);                    
                    this.setState({loginstatus: result.status});
                    this.forceUpdateHandler();                    //this.render((renderRegistrationScreen})
                }else{
                    console.log("RegMobile  <> 0");
                    console.log("RegMobile  " + result.status);                                        
                    AsyncStorage.setItem('userRegistrationDetails', result.data).then(function(value) {
                        console.log("userRegistrationDetails    " + value);
                        // expected output: "Success!"
                        handleSendCode();
                      });
                    
                }
            }, 
            error => {
                console.log(error);
            } 
          );   
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
                <Text style={commonStyling.appLabelInout}>{translate.t('Register')}</Text>
                <ScrollView style={{flex: 1,borderWidth: StyleSheet.hairlineWidth, borderWidth:0, borderColor: 'red'}}>
                    <View style={{ alignItems: "center" , marginBottom:50}} >            
                
                        <TextInput onChangeText={text => this.setState({firstName: text})} style={commonStyles.RegistrationInput} placeholderTextColor="grey" placeholder={translate.t('First_name')}/>
                        <TextInput onChangeText={text => this.setState({lastName: text})} style={commonStyles.RegistrationInput} placeholderTextColor="grey"  placeholder={translate.t('Last_name')}/> 
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
                            <Text style={commonStyles.registerSwitchText}> Let my contact number be visible to {"\n"} those who need help </Text>
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
                            <Text style={commonStyles.registerSwitchText}>  Representing an Organisation </Text>
                        </View>    
                        {this.state.representOrg ?  
                        <View style={{width:'100%' }}>                                
                        <TextInput onChangeText={text => this.setState({organisationName: text})} style={commonStyles.RegistrationInput} placeholderTextColor="grey"  placeholder={translate.t('Organization_Name')}/>                                                                           
                        
                        <RNPickerSelect                            
                                onValueChange ={(value) => {this.setState({organisationType: value})}}
                                items={this.orgTypes}  
                                style={pickerSelectStyles}  
                                Icon={() => {
                                return <Ionicons  style={{marginVertical: 30, marginRight:6}} family={"Ionicons"}  name={"md-arrow-dropdown"}  color={"#OOOOOO"} size={30} />}}             
                                value={this.state.organisationType}
                        />
                        <TextInput onChangeText={text => this.setState({organisationUnit: text})} style={commonStyles.RegistrationInput} placeholderTextColor="grey"  placeholder={translate.t('Unit_Div_Function_Location')}/> 
                        <View style={{width:'100%', marginTop:20}}>  
                            <TouchableOpacity style={{backgroundColor: "#4F5065",height: 56,
                                        marginTop: 10,                                     
                                        paddingHorizontal: 1,        
                                        width:'100%',
                                        borderWidth: 1,
                                        shadowOpacity: 0.9,
                                        borderRadius: 9,
                                        shadowOffset: { height: 3 },
                                        shadowColor: '#2328321F',}} 
                                        onPress={() =>{this.register()}}>
                                            <Text style={{borderRadius: 9, textAlign: "center",fontFamily: "Roboto-Medium",fontSize: 20,lineHeight: 56,color: "#FFFFFF"}}>{translate.t("Start")}</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                        :  
                        <View style={{width:'100%', marginTop:20}}>  
                            <TouchableOpacity style={{backgroundColor: "#4F5065",height: 56,
                                        marginTop: 10,                                     
                                        paddingHorizontal: 1,        
                                        width:'100%',
                                        borderWidth: 1,
                                        shadowOpacity: 0.9,
                                        borderRadius: 9,
                                        shadowOffset: { height: 3 },
                                        shadowColor: '#2328321F',}} 
                                        onPress={() =>{this.register()}}>
                                            <Text style={{borderRadius: 9, textAlign: "center",fontFamily: "Roboto-Medium",fontSize: 20,lineHeight: 56,color: "#FFFFFF"}}>{translate.t("Start")}</Text>
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
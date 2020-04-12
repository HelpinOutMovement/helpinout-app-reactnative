import React ,{useState, useContext} from 'react';
import { TextInput, View, Image, Text, TouchableOpacity, StyleSheet, Switch, ScrollView } from 'react-native';
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
import RequestObjects from '../APIClient/RequestResponseObjects/RequestObjects';
import LogoComponent from './components/LogoComponent';
import DeviceInfo from 'react-native-device-info';




import{appLabelKey} from '../misc/AppStrings';
//const {navigation} = this.props;

export default class RegisterMobile extends React.Component {
    constructor({ navigation, props }){
        super({ navigation });
        this.navigate = navigation.navigate;
        this.props = props;
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    }
            
  state = {
    languages: [],
    selectedCountryCode: "IN",
    selectedCountryDialCode: "+91" , 
    phoneNumber: "",
    loginstatus: "",
    representOrg: false,
    contactVisible: false,
    firstName: "",
    lastName: "",
    userType: "",
    organisationName:  null,
    organisationType:  null,
    organisationUnit:  null,

  }
  
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
                //console.log("after getCurrentPosition");
                //console.log(location);
                this.setState({ location });
            },
            error => Alert.alert(error.message),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };


    login =() =>{                
        let restApi = new API();
        reqObj =  restApi.login(this.state.selectedCountryDialCode, this.state.phoneNumber);
        reqObj.then(
            result => {
                if(result.status === "0"){
                    console.log("RegMobile  === 0");        
                    console.log("RegMobile  " + JSON.stringify(result));
                    this.setState({loginstatus: result.status});
                    this.forceUpdateHandler();                    //this.render((renderRegistrationScreen})
                }else{
                    console.log("RegMobile  === 1");
                    console.log("RegMobile  " + JSON.stringify(result));
                    this.navigate(AppConstant.APP_PAGE.DASHBOARD)
                }
            }, 
            error => {
                console.log(error);
            } 
          );
    }

    register =() =>{
        
        let restApi = new API();
        reqObj =  restApi.login(this.state.selectedCountryDialCode, this.state.phoneNumber, this.state.firstName, this.state.lastName, this.state.contactVisible, this.state.userType, this.state.organisationName, this.state.organisationType, this.state.organisationUnit);
        reqObj.then(
            result => {
                if(result.status === "0"){
                    console.log("RegMobile  === 0");
                    console.log("RegMobile  " + result.status);
                    this.setState({loginstatus: result.status});
                    this.forceUpdateHandler();                    //this.render((renderRegistrationScreen})
                }else{
                    this.navigate(AppConstant.APP_PAGE.DASHBOARD)
                }
            }, 
            error => {
                console.log(error);
            } 
          );
        /*
        let  requestObjects = new RequestObjects();
        reqObj = requestObjects.registerObject(this.state.selectedCountryDialCode, this.state.phoneNumber,"VSRV", "Raghavan", "0", "1");
        
        var myAPI = new APIClient()
        let apicall = 'user/register';
        apicall = myAPI.createEntity(apicall)
        let data = myAPI.endpoints[apicall].post(reqObj);        
        data.then(({data})=> {
            if(data.status.localeCompare("1")){
                console.log(data);
                AppStorage.storeAppInfo("userRegistrationDetails", data.data);
                this.navigate(AppConstant.APP_PAGE.REGISTER_MOBILE)   
            }else{
                console.log(data);                
            }
        })
        .catch(err => console.log(err))
        

        console.log(JSON.stringify(this.state))
        */
    }



  onCountryValueChange = (value, index) =>{         
    //console.log(value  + " - "+ key +"  "+ label)    
    this.setState({selectedCountryCode: countries[index-1].key, selectedCountryDialCode: value});
    
    
  }
    
    render() {                       
        //const { navigate } = this.props.navigation;
        if(typeof this.state.loginstatus != 'undefined' && this.state.loginstatus  === "0"){            
            return (
                this.renderRegistrationScreen()
            );
        }else{
            return (
                    this.renderLoginScreen()
                //this.renderRegistrationScreen()
            );
        }
        
    }





    renderLoginScreen = () =>{
        
        return (
            <View style={{ flexDirection: "column" }}>
                <LogoComponent />
                <View style={{ alignItems: "center" , marginVertical: 30, marginHorizontal:30}}>
                    <Text style={commonStyling.appLabelInout}>{translate.t('Enter_your_mobile_number')}</Text>
                    <View style={commonStyling.appPhoneNumberInputView}>
                    <View style={{flex: 1,  flexDirection: "row",alignItems: 'center', justifyContent:'center',}}>
                    <TextInput style={commonStyles.phoneCountryCode}> {this.state.selectedCountryCode} </TextInput>
                    <RNPickerSelect                            
                            onValueChange ={(value, key) => {this.onCountryValueChange(value, key)}}
                            items={countries}  
                            style={pickerCcountryStyles}  
                            Icon={() => {
                            return <Ionicons  style={{marginVertical: 10, marginRight:6}} family={"Ionicons"}  name={"md-arrow-dropdown"}  color={"#OOOOOO"} size={30} />;
                            }}             
                            value={this.state.selectedCountryDialCode}
                    />
                    <TextInput style={commonStyles.phoneLoginInput} 
                        keyboardType={'numeric'}
                        placeholderTextColor="grey"
                        placeholder={translate.t('Enter_your_mobile_number')}                
                        onChangeText={text => this.setState({phoneNumber: text})}                 
                    >  
                    </TextInput>
                    </View>
                    </View>                                
                </View>
                <View style={{ alignItems: "center" }} >                        
                </View>
                <View style={{ alignItems: "center" ,  marginVertical: 0}} >
                    <TouchableOpacity style={{borderRadius: 9, marginVertical: 30,alignItems: "center",backgroundColor: "#4F5065",height: 56,width: "90%",shadowOpacity: 0.9,shadowOffset: { height: 3 },shadowColor: '#2328321F',}} onPress={() =>{this.login()}}>
                        <Text style={{textAlign: "center",fontFamily: "Roboto-Medium",fontSize: 20,lineHeight: 56,color: "#FFFFFF"}}>{translate.t("Login_Sign_Up")}}</Text>
                    </TouchableOpacity>                    
                </View>                
                <Text style={{
                    textAlign: "center",
                    fontFamily: "Roboto-Medium",
                    fontSize: 20,
                    lineHeight: 36,
                    color: "Grey"

                }}> By Signing up you  agree to {"\n"} Terms of service | Privacy  Policy </Text>

            </View>
        );   
        
    }

    orgTypes = [{"label":"Individual","key":"Individual" ,"displayValue": false ,"value":"1"},{"label":"Organisation","key":"Organisation" ,"displayValue": false ,"value":"2"}]

    renderRegistrationScreen = () =>{                
        return (            
            <View style={{ flexDirection: "column", padding: 10, flex: 1}}>
                <LogoComponent />
                <Text style={commonStyling.appLabelInout}>{translate.t('Register')}</Text>
                <ScrollView style={{flex: 1,borderWidth: StyleSheet.hairlineWidth, borderColor: 'red'}}>
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
                            <Text style={commonStyles.registerSwitchText}> Test Data </Text>
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
                            <Text style={commonStyles.registerSwitchText}> Test Data </Text>
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
                                            <Text style={{borderRadius: 9, textAlign: "center",fontFamily: "Roboto-Medium",fontSize: 20,lineHeight: 56,color: "#FFFFFF"}}>{translate.t("Start")}}</Text>
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
    borderWidth: 1,
    borderColor: 'gray',  
    borderWidth: 1,
    color: 'black',
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
      height: 50,
      borderWidth: 1,
      borderRightWidth: 0,
      borderLeftWidth: 0,
      borderColor: 'gray',  
      borderWidth: 1,
      color: 'black',
      paddingRight: 8, // to ensure the text is never behind the icon
      paddingLeft: 1,
      textAlign:'center'
    }

});
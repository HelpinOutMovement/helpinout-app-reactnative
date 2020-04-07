
import React ,{useState, useContext} from 'react';
import { TextInput, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AppStorage from '../storage/AppStorage';
import AppConstant from '../misc/AppConstant';
import AppStringContext from '../misc/AppStringContext';
import commonStyling from '../styling/commonStyle';
import RNPickerSelect from 'react-native-picker-select';
import countries from "../storage/Countries.json";
import commonStyles from "../styling/commonStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import translate from 'react-native-i18n';


export default class RegisterMobile extends React.Component {
    constructor(){
        super();
    }
            
  state = {
    languages: [],
    selectedCountryCode: "IN",
    selectedCountryDialCode: "+91"    
  }


  onCountryValueChange = (value, index) =>{         
    //console.log(value  + " - "+ key +"  "+ label)    
    this.setState({selectedCountryCode: countries[index-1].key, selectedCountryDialCode: value});
    
    
  }
    
    render() {   
        

        return (
            <View style={{ flexDirection: "column" }}>
                <View style={{ alignItems: "center", marginVertical: 60 }}>
                    <Image
                        style={commonStyling.splashSmallImage}
                        source={require('../images/logo.png')}
                    />
                    <View style={commonStyling.appLabelView}>
                        <Text style={commonStyling.appLabelHelp}>Helpin</Text>
                        <Text style={commonStyling.appLabelInout}>Out</Text>
                    </View>
                </View>
                <View style={{ alignItems: "center" , marginVertical: 30, marginHorizontal:30}}>
                    <Text style={commonStyling.appLabelInout}>{translate.t('Enter_your_mobile_number')}</Text>
        
                    <View style={commonStyling.appPhoneNumberInputView}>
                    <TextInput style={commonStyles.phoneCountryCode}> {this.state.selectedCountryCode} </TextInput>
                    <RNPickerSelect                            
                           onValueChange ={(value, key) => {this.onCountryValueChange(value, key)}}
                            items={countries}  
                            style={pickerSelectStyles}  
                            Icon={() => {
                              return <Ionicons  style={{marginVertical: 10, marginRight:6}} family={"Ionicons"}  name={"md-arrow-dropdown"}  color={"#OOOOOO"} size={30} />;
                            }}             
                            value={this.state.selectedCountryDialCode}
                    />
                    <TextInput style={commonStyles.phoneLoginInput}  placeholder={translate.t('Enter_your_mobile_number')}>  </TextInput>
                    </View>
                                        
                </View>
                <View style={{ alignItems: "center" }} >
                
                </View>
                <View style={{ alignItems: "center" ,  marginVertical: 30}} >
                    <TouchableOpacity
                        style={{
                            marginVertical: 30,
                            alignItems: "center",
                            backgroundColor: "#4F5065",
                            height: 56,
                            width: "92%",
                            shadowOpacity: 0.9,
                            shadowOffset: { height: 3 },
                            shadowColor: '#2328321F',
    
                        }}
                        onPress={() =>
                            console.log('AAA')
                        }>
                        <Text
                            style={{
    
                                textAlign: "center",
                                fontFamily: "Roboto-Medium",
                                fontSize: 20,
                                lineHeight: 56,
                                color: "#FFFFFF"
    
                            }}
                        >{translate.t("Login_Sign_Up")}}</Text>
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




    
    
}


const styles = StyleSheet.create({
    phoneInput: {
        width: 311,
        height: 59,
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
    }   

    

});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 20,
    paddingVertical: 12,
    paddingHorizontal: 1,
    borderTopLeftRadius:0,
    borderBottomLeftRadius:0,    
    width:90,
    //borderWidth: 1,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor: 'gray',    
    color: 'black',
    paddingRight: 5, // to ensure the text is never behind the icon
    textAlign:'center'
  }

});
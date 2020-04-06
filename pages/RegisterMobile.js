
import React ,{useState} from 'react';
import { TextInput,Picker, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AppStorage from '../storage/AppStorage';
import AppConstant from '../misc/AppConstant';
import commonStyling from '../styling/commonStyle';
import PhoneInput from "react-native-phone-input";


export default class RegisterMobile extends React.Component {

    PhoneNumberPickerChanged(country, callingCode, phoneNumber) {
        this.setState({countryName: country.name, callingCode: callingCode, phoneNo:phoneNumber});
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
                    <Text style={commonStyling.appLabelInout}>Enter your mobile number</Text>
                    <PhoneInput style={styles.phoneInput} 
                        ref={ref => {
                            this.phone = ref;
                        }}
                        
                    />
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
                        >Login / Signup</Text>
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



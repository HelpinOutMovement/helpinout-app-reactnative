import React, { useState, useContext } from 'react';
import { TextInput, View, Image, Text, TouchableOpacity, StyleSheet, Switch, ScrollView, Dimensions } from 'react-native';
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




export default class RegisterMobile extends React.Component {
    constructor({ navigation, props }) {
        super({ navigation });
        this.navigate = navigation.navigate;
        this.props = props;
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);

    }
    dimensions = Dimensions.get('window');

    state = {
        languages: [],
        selectedCountryCode: "IN",
        selectedCountryDialCode: "+91",
        phoneNumber: "",
        loginstatus: "",
        representOrg: false,
        contactVisible: false,
        firstName: "",
        lastName: "",
        userType: "",
        organisationName: null,
        organisationType: null,
        organisationUnit: null,

    }

    forceUpdateHandler() {
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

    validatePhoneNumber = () => {
        if (this.isEmpty(this.state.phoneNumber)) {
            return false;
        } else {
            //var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
            //return regexp.test(this.state.phoneNumber)
            return true;
        }


    }

    login = () => {
        console.log(this.validatePhoneNumber());
        if (this.validatePhoneNumber()) {
            let restApi = new API();
            reqObj = restApi.login(this.state.selectedCountryDialCode, this.state.phoneNumber);
            reqObj.then(
                result => {
                    if (result.status === "0") {
                        console.log("RegMobile  === 0");
                        console.log("RegMobile  " + JSON.stringify(result));
                        this.setState({ loginstatus: result.status });
                        this.forceUpdateHandler();                    //this.render((renderRegistrationScreen})
                    } else {
                        console.log("RegMobile  === 1");
                        console.log("RegMobile  " + JSON.stringify(result));
                        this.navigate(AppConstant.APP_PAGE.DASHBOARD)
                    }
                },
                error => {
                    console.log(error);
                }
            );
        } else {
            console.log("invalid Phone  Number")
            // Add Error Toasts
        }

    }



    isEmpty = (value) => {
        console.log("value.size  :  " + value.length)
        return (typeof value === "undefined" || value === null || value.length === 0);
    }

    validateRegistrationInput = () => {
        if (this.isEmpty(this.state.selectedCountryDialCode) || this.isEmpty(this.state.phoneNumber) || this.isEmpty(this.state.firstName) || this.isEmpty(this.state.lastName) || this.isEmpty(this.state.contactVisible) || this.isEmpty(this.state.userType)) {
            return false;
        } else {
            if (this.isEmpty(this.state.userType === "2")) {
                if (this.isEmpty(this.state.organisationName) || this.isEmpty(this.state.organisationType)) {
                    return false;
                }
            }
        }
        return true;
    }


    register = () => {
        let restApi = new API();
        reqObj = restApi.login(this.state.selectedCountryDialCode, this.state.phoneNumber, this.state.firstName, this.state.lastName, this.state.contactVisible, this.state.userType, this.state.organisationName, this.state.organisationType, this.state.organisationUnit);
        reqObj.then(
            result => {
                if (result.status === "0") {
                    console.log("RegMobile  === 0");
                    console.log("RegMobile  " + result.status);
                    this.setState({ loginstatus: result.status });
                    this.forceUpdateHandler();                    //this.render((renderRegistrationScreen})
                } else {
                    this.navigate(AppConstant.APP_PAGE.DASHBOARD)
                }
            },
            error => {
                console.log(error);
            }
        ); s
    }



    onCountryValueChange = (value, index) => {
        this.setState({ selectedCountryCode: countries[index - 1].key, selectedCountryDialCode: value });
    }

    render() {
        if (typeof this.state.loginstatus != 'undefined' && this.state.loginstatus === "0") {
            return (
                this.renderRegistrationScreen()
            );
        } else {
            return (
                this.renderLoginScreen()
            );
        }
    }





    renderLoginScreen = () => {

        return (
            <View style={{ flexDirection: "column" }}>
                <LogoComponent />
                <View style={{ alignItems: "center", width: "100%" }} >
                    <View style={{ alignItems: "center", marginVertical: 0, width: "98%" }} >
                        <Text style={{
                             textAlign: "center",
                             fontFamily: "Roboto-Bold",
                             fontSize: 16,
                             color:"#4F5065"
                        }}>{translate.t('Enter_your_mobile_number')}</Text>
                        <View style={commonStyling.appPhoneNumberInputView}>
                            <View style={{ flex: 1, flexDirection: "row", alignItems: 'center', justifyContent: 'center', }}>
                                <TextInput style={commonStyles.phoneCountryCode}> {this.state.selectedCountryCode} </TextInput>
                                <RNPickerSelect
                                    style={commonStyles.phoneLoginInput}
                                    onValueChange={(value, key) => { this.onCountryValueChange(value, key) }}
                                    items={countries}
                                    style={pickerCcountryStyles}
                                    Icon={() => {
                                        return <Ionicons style={{ marginVertical: 10, marginRight: 6 }} family={"Ionicons"} name={"md-arrow-dropdown"} color={"#OOOOOO"} size={30} />;
                                    }}
                                    value={this.state.selectedCountryDialCode}
                                />
                                <TextInput style={commonStyles.phoneLoginInput}
                                    keyboardType={'numeric'}
                                    placeholderTextColor="grey"
                                    placeholder={translate.t('Enter_your_mobile_number')}
                                    onChangeText={text => this.setState({ phoneNumber: text })}
                                >
                                </TextInput>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ alignItems: "center", width: "100%" }} >
                    <View style={{ alignItems: "center", marginVertical: 0, width: "98%" }} >
                        <TouchableOpacity style={{ borderRadius: 9, marginVertical: 30, alignItems: "center", backgroundColor: "#4F5065", height: 56, width: "92%", shadowOpacity: 0.9, shadowOffset: { height: 3 }, shadowColor: '#2328321F', }} onPress={() => { this.login() }}>
                            <Text style={{ textAlign: "center", fontFamily: "Roboto-Medium", fontSize: 20, lineHeight: 56, color: "#FFFFFF" }}>{translate.t("Login_Sign_Up")}</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{
                        textAlign: "center",
                        fontFamily: "Roboto-Regular",
                        fontSize: 14,
                        lineHeight: 36,
                        color: "#4F5065B8"

                    }}> By Signing up you  agree to {"\n"} Terms of service | Privacy  Policy </Text>
                </View>
            </View>
        );
    }

    orgTypes = [{ "label": "Individual", "key": "Individual", "displayValue": false, "value": "1" }, { "label": "Organisation", "key": "Organisation", "displayValue": false, "value": "2" }]

    renderRegistrationScreen = () => {
        return (
            <View style={{ flexDirection: "column", padding: 10, flex: 1 }}>
                <LogoComponent />
                <Text style={commonStyling.appLabelInout}>{translate.t('Register')}</Text>
                <ScrollView style={{ flex: 1, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red' }}>
                    <View style={{ alignItems: "center", marginBottom: 50 }} >

                        <TextInput onChangeText={text => this.setState({ firstName: text })} style={commonStyles.RegistrationInput} placeholderTextColor="grey" placeholder={translate.t('First_name')} />
                        <TextInput onChangeText={text => this.setState({ lastName: text })} style={commonStyles.RegistrationInput} placeholderTextColor="grey" placeholder={translate.t('Last_name')} />
                        <View style={{ marginTop: 20 }}></View>
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
                                onValueChange={(switchValue) => { this.setState({ contactVisible: switchValue }) }}
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
                                onValueChange={(switchValue) => { this.setState({ representOrg: switchValue }) }}
                            ></Switch>
                            <Text style={commonStyles.registerSwitchText}> Test Data </Text>
                        </View>
                        {this.state.representOrg ?
                            <View style={{ width: '100%' }}>
                                <TextInput onChangeText={text => this.setState({ organisationName: text })} style={commonStyles.RegistrationInput} placeholderTextColor="grey" placeholder={translate.t('Organization_Name')} />

                                <RNPickerSelect
                                    onValueChange={(value) => { this.setState({ organisationType: value }) }}
                                    items={this.orgTypes}
                                    style={pickerSelectStyles}
                                    Icon={() => {
                                        return <Ionicons style={{ marginVertical: 30, marginRight: 6 }} family={"Ionicons"} name={"md-arrow-dropdown"} color={"#OOOOOO"} size={30} />
                                    }}
                                    value={this.state.organisationType}
                                />
                                <TextInput 
                                    onChangeText={text => this.setState({ organisationUnit: text })} 
                                    style={commonStyles.RegistrationInput} 
                                    placeholderTextColor="#4F5065A3" 
                                    placeholder={translate.t('Unit_Div_Function_Location')} />
                                <View style={{ width: '100%', marginTop: 20 }}>
                                    <TouchableOpacity style={{
                                        backgroundColor: "#4F5065", height: 56,
                                        marginTop: 10,
                                        paddingHorizontal: 1,
                                        width: '100%',
                                        borderWidth: 1,
                                        shadowOpacity: 0.9,
                                        borderRadius: 9,
                                        shadowOffset: { height: 3 },
                                        shadowColor: '#2328321F',
                                    }}
                                        onPress={() => { this.register() }}>
                                        <Text style={{ borderRadius: 9, textAlign: "center", fontFamily: "Roboto-Medium", fontSize: 20, lineHeight: 56, color: "#FFFFFF" }}>{translate.t("Start")}}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            :
                            <View style={{ width: '100%', marginTop: 20 }}>
                                <TouchableOpacity style={{
                                    backgroundColor: "#4F5065", height: 56,
                                    marginTop: 10,
                                    paddingHorizontal: 1,
                                    width: '100%',
                                    borderWidth: 1,
                                    shadowOpacity: 0.9,
                                    borderRadius: 9,
                                    shadowOffset: { height: 3 },
                                    shadowColor: '#2328321F',
                                }}
                                    onPress={() => { this.register() }}>
                                    <Text style={{ borderRadius: 9, textAlign: "center", fontFamily: "Roboto-Medium", fontSize: 20, lineHeight: 56, color: "#FFFFFF" }}>{translate.t("Start")}}</Text>
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
        fontSize: 50,
        fontFamily: "roboto-regular"
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
        textAlign: 'center'
    },

});
const pickerCcountryStyles = StyleSheet.create({
    inputIOS: {
        marginTop: 0,
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 1,
        borderRadius: 0,
        width: 90,
        height: 45,
        borderWidth: 1,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderColor: '#2328323D',
        fontFamily: "Roboto-Regular",
        color: '#4F5065A3',
        borderWidth: 1,
        paddingRight: 8, // to ensure the text is never behind the icon
        paddingLeft: 1,
        textAlign: 'center'
    }

});
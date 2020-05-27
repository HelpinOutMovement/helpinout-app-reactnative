
import React, { useContext } from 'react';
import { View, Image, Text, TouchableOpacity, Linking, Dimensions, SafeAreaView } from 'react-native';
import AppStorage from '../storage/AppStorage';
import AppConstant from '../misc/AppConstant';
import commonStyling from '../styling/commonStyle';
import { appLabelKey } from '../misc/AppStrings';
import translate from 'react-native-i18n';
import LogoComponent from './components/LogoComponent';
import HTML from 'react-native-render-html';
import HTMLView from 'react-native-htmlview';

function OnBoardingInfoScreen({ navigation }) {

    const dimensions = Dimensions.get('window');
    const getLocalAsync = () => {
        let data = AppStorage.getAppInfo("locale");
        /////console.log(data)
        return data;
    };

    const onContinueClicked = () => {
        //navigation.navigate(AppConstant.APP_PAGE.REGISTER_MOBILE,{ loginState: {} });
        navigation.navigate(AppConstant.APP_PAGE.LOGIN);
    }

    const onAppLinkClicked = (lang) => {

        Linking.openURL(AppConstant.APP_SITE);
    }


    return (
        <SafeAreaView style={{}} >
            <View style={{ height: "100%", flexDirection: "column", justifyContent: "space-between" }}>
                <View >
                    <LogoComponent marginVertical={15} marginTop={100} />
                    <View style={{ alignItems: "center" }}>
                        <TouchableOpacity
                            style={{
                                alignItems: "center",
                                height: 56,
                                width: "92%",
                            }}
                            onPress={() =>
                                onAppLinkClicked(AppConstant.APP_LANGUAGE.ENGLISH)
                            }>
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontFamily: "Roboto-Regular",
                                    fontSize: 16,
                                    marginLeft: 0,
                                    color: "#4F5065"
                                }}
                            >{"www.helpinout.org"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View >
                    <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center" }}>
                        <Text
                            style={{
                                textAlign: "center",
                                fontFamily: "Roboto-Regular",
                                fontSize: 16,
                                marginLeft: 0,
                                color: "#EE6B6B"
                            }}
                        >{translate.t("instruction_text_1")}</Text>
                        <Text
                            style={{
                                textAlign: "center",
                                fontFamily: "Roboto-Regular",
                                fontSize: 16,
                                color: "#4F5065"
                            }}
                        >{translate.t("instruction_text_2")}</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text
                            style={{
                                textAlign: "center",
                                fontFamily: "Roboto-Regular",
                                fontSize: 16,
                                marginTop: 10,
                                color: "#4F5065CC"
                            }}
                        >{translate.t("instruction_text_3")}</Text>
                    </View>
                    <View style={{ alignItems: "center", marginTop: 50 }}>
                        <Text
                            style={{
                                textAlign: "center",
                                fontFamily: "Roboto-Regular",
                                fontSize: 16,
                                marginTop: 10,
                                color: "#4F5065CC",
                                width: 275,
                            }}
                        >{translate.t("instruction_text_4")}</Text>
                    </View>
                    <View style={{ alignItems: "center", marginTop: 0 }} >
                        <TouchableOpacity
                            style={{
                                marginVertical: 30,
                                justifyContent:"center",
                                alignItems: "center",
                                backgroundColor: "#4F5065",
                                height: 56,
                                width: "92%",
                                shadowOpacity: 0.9,
                                shadowOffset: { height: 3 },
                                shadowColor: '#2328321F',
                                borderRadius: 9,

                            }}
                            onPress={() =>
                                onContinueClicked()
                            }>
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontFamily: "Roboto-Medium",
                                    fontSize: 20,
                                    color: "#FFFFFF"

                                }}
                            >{translate.t("btn_continue")}</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </View>
        </SafeAreaView>
    );
}

export default OnBoardingInfoScreen;


import React, { useContext } from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import AppStorage from '../storage/AppStorage';
import AppConstant from '../misc/AppConstant';
import commonStyling from '../styling/commonStyle';
import AppStringContext from '../misc/AppStringContext';
import { appLabelKey } from '../misc/AppStrings';



function OnBoardingInfoScreen({ navigation }) {
    const { translate } = useContext(AppStringContext);

    const onContinueClicked = () => {
        navigation.navigate(AppConstant.APP_PAGE.REGISTER_MOBILE);
    }

    const onAppLinkClicked = (lang) => {
        console.log(' Language Selected', lang);
        Linking.openURL(AppConstant.APP_SITE);
    }


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
                            fontFamily: "Roboto-Medium",
                            fontSize: 20,
                            lineHeight: 56,
                            marginLeft: 35,
                            color: "#4F5065CC"
                        }}
                    >{translate(appLabelKey.app_website)}</Text>
                </TouchableOpacity>

            </View>

            <View style={{
                alignItems: "center", flexDirection: 'row',
                flexWrap: 'wrap',
            }}>
                <Text
                    style={{
                        textAlign: "center",
                        fontFamily: "Roboto-Medium",
                        fontSize: 16,

                        marginLeft: 35,
                        color: "#EE6B6B"
                    }}
                >{translate(appLabelKey.app_onboarding_text_red)}</Text>
                <Text
                    style={{
                        textAlign: "center",
                        fontFamily: "Roboto-Medium",
                        fontSize: 16,

                        marginLeft: 35,
                        color: "#4F5065CC"
                    }}
                >{translate(appLabelKey.app_onboarding_text_normal)}</Text>



            </View>

            <View style={{
                alignItems: "center", flexDirection: 'row',
                marginVertical: 30,
                flexWrap: 'wrap',
            }}>
                <Text
                    style={{
                        fontFamily: "Roboto-Medium",
                        fontSize: 16,
                        marginLeft: 35,
                        color: "#4F5065CC"
                    }}
                >{translate(appLabelKey.app_onboarding_text)}</Text>
            </View>

            <View style={{ alignItems: "center" }} >
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
                        onContinueClicked()
                    }>
                    <Text
                        style={{

                            textAlign: "center",
                            fontFamily: "Roboto-Medium",
                            fontSize: 20,
                            lineHeight: 56,
                            color: "#FFFFFF"

                        }}
                    >{translate(appLabelKey.continue_btn_label)}</Text>
                </TouchableOpacity>

            </View>

        </View>
    );
}

export default OnBoardingInfoScreen;

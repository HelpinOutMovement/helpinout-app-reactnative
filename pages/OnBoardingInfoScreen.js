
import React, { useContext } from 'react';
import { View, Image, Text, TouchableOpacity, Linking, Dimensions } from 'react-native';
import AppStorage from '../storage/AppStorage';
import AppConstant from '../misc/AppConstant';
import commonStyling from '../styling/commonStyle';
import { appLabelKey } from '../misc/AppStrings';
import translate from 'react-native-i18n';
import LogoComponent from './components/LogoComponent';

function OnBoardingInfoScreen({ navigation }) {

    const dimensions = Dimensions.get('window');
    const getLocalAsync =  () => {  
        let data =   AppStorage.getAppInfo("locale");   
        console.log(data)
        return data;
      };  
    
    const onContinueClicked = () => {
        navigation.navigate(AppConstant.APP_PAGE.REGISTER_MOBILE);
    }

    const onAppLinkClicked = (lang) => {        
        
        Linking.openURL(AppConstant.APP_SITE);
    }


    return (
        <View style={{ flexDirection: "column" }}>
            <LogoComponent />
            <View style={{ alignItems:"center"}}>
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
                            marginLeft: 0,
                            color: "#4F5065CC"
                        }}
                    >{translate.t(appLabelKey.app_website)}</Text>                    
                </TouchableOpacity>
            </View>
            <View style={{top:(dimensions.height*.25)}}>
                <View style={{ alignItems: "center"}}>
                    <Text
                        style={{
                            textAlign: "center",
                            fontFamily: "Roboto-Medium",
                            fontSize: 20,
                            marginLeft: 0,
                            color: "#EE6B6B"
                        }}
                    >{translate.t("Ask_for_Help_Offer_Help")}</Text>    
                    <Text
                        style={{
                            textAlign: "center",
                            fontFamily: "Roboto-Medium",
                            fontSize: 20,
                            marginTop: 10,
                            color: "#4F5065CC"
                        }}
                    >{translate.t("wherever_you_are")}</Text>         
                </View>
            
                <View style={{alignItems: "center" ,marginTop:50}}>
                    <Text
                        style={{
                            fontFamily: "Roboto-Medium",
                            fontSize: 20,
                            marginLeft: 0,
                            color: "#4F5065CC",
                            textAlign: "center",
                            width:275,
                        }}
                    >{translate.t("Search_for_help-providers_and_help-requesters_around_you")}</Text>
                </View>

                <View style={{ alignItems: "center" , marginTop:50}} >
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
                                lineHeight: 56,
                                color: "#FFFFFF"

                            }}
                        >{translate.t("Continue")}</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </View>
    );
}

export default OnBoardingInfoScreen;

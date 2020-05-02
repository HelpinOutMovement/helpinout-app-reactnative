
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
    const getLocalAsync =  () => {  
        let data =   AppStorage.getAppInfo("locale");   
        console.log(data)
        return data;
      };  
    
    const onContinueClicked = () => {
        //navigation.navigate(AppConstant.APP_PAGE.REGISTER_MOBILE);
        navigation.navigate(AppConstant.APP_PAGE.LOGIN);
    }

    const onAppLinkClicked = (lang) => {        
        
        Linking.openURL(AppConstant.APP_SITE);
    }


    return (
        <SafeAreaView style={{ flexDirection: "column" }}>
            <LogoComponent marginVertical={15} />
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
                            fontFamily: "Roboto-Regular",
                            fontSize: 16,
                            marginLeft: 0,
                            color: "#4F5065CC"
                        }}
                    >{translate.t("website_name")}</Text>                    
                </TouchableOpacity>
            </View>
            <View style={{top:(dimensions.height*.05)}}>
                
                <View style={{alignItems: "center" ,marginTop:50}}>
                <HTMLView value={translate.t("instruction_text")}  />
                </View>

                <View style={{ alignItems: "center"}} >
                    <TouchableOpacity
                        style={{
                            marginVertical: 30,
                            alignItems: "center",
                            backgroundColor: "#4F5065",
                            height: 56,
                            width: "92%",
                            shadowOpacity: 0.9,
                            //shadowOffset: { height: 3 },
                            shadowColor: '#2328321F',
                            borderRadius: 9,

                        }}
                        onPress={() =>
                            onContinueClicked()
                        }>
                        <Text
                            style={{

                                textAlign: "center",
                                 fontFamily: "Roboto-Regular",
                                fontSize: 16,
                                lineHeight: 56,
                                color: "#FFFFFF"

                            }}
                        >{translate.t("btn_continue")}</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </SafeAreaView>
    );
}

export default OnBoardingInfoScreen;

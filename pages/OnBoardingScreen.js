
import React,{useContext} from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import AppStorage from '../storage/AppStorage';
import AppConstant from '../misc/AppConstant';
import commonStyling from '../styling/commonStyle';
import AppStringContext from '../misc/AppStringContext';
import{appLabelKey} from '../misc/AppStrings';
import LogoComponent from './components/LogoComponent';

function  OnBoardingScreen({ navigation }) {
    const {translate} = useContext(AppStringContext);
    const {setLanguage} = useContext(AppStringContext);
    
    const onLanguageClicked =  (lang) => {        
        AppStorage.storeAppInfo("locale", lang).then(function(value) {
            setLanguage(lang);
            navigation.navigate(AppConstant.APP_PAGE.ON_BOARDING_INFO);
          });
        
    }


    return (
        <View style={{ flexDirection: "column" }}>
            <LogoComponent />
            <View style={{ alignItems: "center" }} >

                <TouchableOpacity
                    style={{
                        marginVertical:30,
                        alignItems: "flex-start",
                        backgroundColor: "#FFFFFF",
                        height: 56,
                        width:"92%",
                        shadowOpacity: 0.9,
                        shadowOffset:{height:3},
                        shadowColor: '#2328321F'
                    }}
                    onPress={() =>
                        onLanguageClicked(AppConstant.APP_LANGUAGE.ENGLISH)
                    }>
                    <Text
                     style={{
                        textAlign: "center",
                        fontFamily: "Roboto-Medium",
                        fontSize: 20,
                        lineHeight: 56,
                        marginLeft:35,
                        color:"#4F5065CC"
                     }}
                    >{translate(appLabelKey.lang_eng_label)}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        marginVertical:15,
                        alignItems: "flex-start",
                        backgroundColor: "#FFFFFF",
                        height: 56,
                        width:"92%",
                        shadowOpacity: 0.9,
                        shadowOffset:{height:3},
                        shadowColor: '#2328321F'
                    }}
                    onPress={() =>
                        onLanguageClicked(AppConstant.APP_LANGUAGE.HINDI)
                    }>
                    <Text
                     style={{
                        textAlign: "center",
                        fontFamily: "Roboto-Medium",
                        fontSize: 20,
                        lineHeight: 56,
                        marginLeft:35,
                        color:"#4F5065CC"
                     }}
                    >{ translate(appLabelKey.lang_hindi_label)}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        marginVertical:15,
                        alignItems: "flex-start",
                        backgroundColor: "#FFFFFF",
                        height: 56,
                        width:"92%",
                        shadowOpacity: 0.9,
                        shadowOffset:{height:3},
                        shadowColor: '#2328321F'
                    }}
                    onPress={() =>
                        onLanguageClicked(AppConstant.APP_LANGUAGE.TAMIL)
                    }>
                    <Text
                     style={{
                        textAlign: "center",
                        fontFamily: "Roboto-Medium",
                        fontSize: 20,
                        lineHeight: 56,
                        marginLeft:35,
                        color:"#4F5065CC"
                     }}
                    >{ translate(appLabelKey.lang_tamil_label)}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        marginVertical:15,
                        alignItems: "flex-start",
                        backgroundColor: "#FFFFFF",
                        height: 56,
                        width:"92%",
                        shadowOpacity: 0.9,
                        shadowOffset:{height:3},
                        shadowColor: '#2328321F'
                    }}
                    onPress={() =>
                        onLanguageClicked(AppConstant.APP_LANGUAGE.MARATHI)
                    }>
                    <Text
                     style={{
                        textAlign: "center",
                        fontFamily: "Roboto-Medium",
                        fontSize: 20,
                        lineHeight: 56,
                        marginLeft:35,
                        color:"#4F5065CC"
                     }}
                    >{ translate(appLabelKey.lang_marathi_label)}</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={{
                        marginVertical:15,
                        alignItems: "flex-start",
                        backgroundColor: "#FFFFFF",
                        height: 56,
                        width:"92%",
                        shadowOpacity: 0.9,
                        shadowOffset:{height:3},
                        shadowColor: '#2328321F'
                    }}
                    onPress={() =>
                        onLanguageClicked(AppConstant.APP_LANGUAGE.KANNADA)
                    }>
                    <Text
                     style={{
                        textAlign: "center",
                        fontFamily: "Roboto-Medium",
                        fontSize: 20,
                        lineHeight: 56,
                        marginLeft:35,
                        color:"#4F5065CC"
                     }}
                    >{ translate(appLabelKey.lang_kanada_label)}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        marginVertical:15,
                        alignItems: "flex-start",
                        backgroundColor: "#FFFFFF",
                        height: 56,
                        width:"92%",
                        shadowOpacity: 0.9,
                        shadowOffset:{height:3},
                        shadowColor: '#2328321F'
                    }}
                    onPress={() =>
                        onLanguageClicked(AppConstant.APP_LANGUAGE.GUJARATHI)
                    }>
                    <Text
                     style={{
                        textAlign: "center",
                        fontFamily: "Roboto-Medium",
                        fontSize: 20,
                        lineHeight: 56,
                        marginLeft:35,
                        color:"#4F5065CC"
                     }}
                    >{ translate(appLabelKey.lang_gujarathi_label) }</Text>
                </TouchableOpacity>

            </View>

        </View>
    );
}

export default OnBoardingScreen;

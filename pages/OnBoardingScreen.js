
import React, { useContext } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import AppStorage from '../storage/AppStorage';
import AppConstant from '../misc/AppConstant';
import commonStyling from '../styling/commonStyle';
import AppStringContext from '../misc/AppStringContext';
import { appLabelKey } from '../misc/AppStrings';
import LogoComponent from './components/LogoComponent';

const LanguageOptions = [
    { label: appLabelKey.lang_eng_label, code: AppConstant.APP_LANGUAGE.ENGLISH },
    { label: appLabelKey.lang_hindi_label, code: AppConstant.APP_LANGUAGE.HINDI },
    { label: appLabelKey.lang_tamil_label, code: AppConstant.APP_LANGUAGE.TAMIL },
    { label: appLabelKey.lang_marathi_label, code: AppConstant.APP_LANGUAGE.MARATHI },
    { label: appLabelKey.lang_kanada_label, code: AppConstant.APP_LANGUAGE.KANNADA },
    { label: appLabelKey.lang_gujarathi_label, code: AppConstant.APP_LANGUAGE.GUJARATHI }
];
function OnBoardingScreen({ navigation }) {
    const { translate } = useContext(AppStringContext);
    const { setLanguage } = useContext(AppStringContext);

    const onLanguageClicked = (lang) => {
        AppStorage.storeAppInfo("locale", lang).then((value) => {
            console.log("  value   " + value)
            setLanguage(lang);
            console.log(lang)

            AppStorage.getAppInfo(AppConstant.APP_STORE_KEY.IS_VEFIRIED)
                .then((resp) => {
                    console.log("APP resp :  " + resp);
                    if (resp === "true") {
                    console.log("APP resp :  " + resp);
                    navigation.navigate(AppConstant.APP_PAGE.DASHBOARD);
                    } else {
                        navigation.navigate(AppConstant.APP_PAGE.ON_BOARDING_INFO);
                    }
                }).catch(error => {
                    navigation.navigate(AppConstant.APP_PAGE.ON_BOARDING_INFO);
                });

        });
    }

    const getLangBtnOptions = () => {
        const btnList = []
        LanguageOptions.forEach(singleLang => {
            btnList.push((
                <TouchableOpacity
                    style={commonStyling.languageButtonContainer}
                    onPress={() =>
                        onLanguageClicked(singleLang.code)
                    }>
                    <Text
                        style={commonStyling.languageButtonText}
                    >{translate(singleLang.label)}</Text>
                </TouchableOpacity>
            ));
        });
        return btnList;
    }
    return (
        <View style={{ flexDirection: "column", padding: 10, flex: 1  }} >
            <LogoComponent/>
            <ScrollView style={{ 
                    flex: 1
                    }}>
                <View style={{ alignItems: "center", marginBottom: 50 }} >
                    {getLangBtnOptions()}
                </View>
            </ScrollView>

        </View>
    );
}

export default OnBoardingScreen;

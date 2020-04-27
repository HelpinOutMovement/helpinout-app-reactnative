import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Button, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { default as MaterialCommunityIcon } from 'react-native-vector-icons/MaterialCommunityIcons';
import AppConstant from '../misc/AppConstant';
import AppStorage from '../storage/AppStorage';
import translate from 'react-native-i18n';
import AppStringContext from '../misc/AppStringContext';
import { appLabelKey } from '../misc/AppStrings';
import commonStyling from '../styling/commonStyle';

import Dashboard from './Dashboard';
import MyRequestScreen from './MyRequestScreen';
import LogoComponent from './components/LogoComponent';
import SearchHelpProvidersRequesters from './SearchHelpProvidersRequesters'

const Drawer = createDrawerNavigator();

const SideMenuOptions = {
    primay: [{
        label: translate.t(appLabelKey.home),
        pageName: AppConstant.APP_PAGE.DASHBOARD

    }, {
        label: translate.t(appLabelKey.ask_for_Help),
        pageName: AppConstant.APP_PAGE.ASK_FOR_HELP
    }, {
        label: translate.t(appLabelKey.offer_Help),
        pageName: AppConstant.APP_PAGE.OFFER_HELP_SCREEN
    }, {
        label: translate.t(appLabelKey.my_Requests),
        pageName: AppConstant.APP_PAGE.MY_REQUEST_SCREEN
    }, {
        label: translate.t(appLabelKey.my_Offers),
        pageName: AppConstant.APP_PAGE.MY_OFFERS_SCREEN
    }, {
        label: translate.t(appLabelKey.profile),
        pageName: AppConstant.APP_PAGE.REGISTER_MOBILE,
        pageProps: {
            showBack: true
        }
    }, {
        label: translate.t(appLabelKey.about_Us),
        pageName: AppConstant.APP_PAGE.SCREEN_WITH_SIDE_DRAWER
    },{
        label: translate.t(appLabelKey.logout),
        pageName: AppConstant.APP_PAGE.LOGOUT_ACTION
    }],
    secondary: [{
        label: translate.t(appLabelKey.lang_eng_label),
        localeCode: AppConstant.APP_LANGUAGE.ENGLISH
    }, {
        label: translate.t(appLabelKey.lang_hindi_label),
        localeCode: AppConstant.APP_LANGUAGE.HINDI
    }
        , {
        label: translate.t(appLabelKey.lang_marathi_label),
        localeCode: AppConstant.APP_LANGUAGE.MARATHI
    },
    {
        label: translate.t(appLabelKey.lang_kanada_label),
        localeCode: AppConstant.APP_LANGUAGE.KANNADA
    },
    {
        label: translate.t(appLabelKey.lang_gujarathi_label),
        localeCode: AppConstant.APP_LANGUAGE.GUJARATHI
    },
    {
        label: translate.t(appLabelKey.lang_tamil_label),
        localeCode: AppConstant.APP_LANGUAGE.TAMIL
    }]
}

const CustomSideBarView = ({ navigation }) => {
    const { setLanguage, language } = useContext(AppStringContext);
    const getSecondaryMenu = () => {
        const primaryMenu = []
        SideMenuOptions.secondary.forEach((singleMenu, index) => {
            primaryMenu.push((
                <View style={{ alignItems: "center", marginVertical: 15 }} >
                    <TouchableOpacity
                        style={[{
                            flexDirection: 'row'
                        }]}
                        onPress={() =>
                            setLanguage(singleMenu.localeCode)
                        }>
                        <Text
                            style={commonStyling.sideDrawerText}
                        >{singleMenu.label}</Text>
                        <View style={{
                            marginLeft: 10
                        }}>
                            {
                                (singleMenu.localeCode === language) && (
                                    <MaterialCommunityIcon
                                        name="check"
                                        style={{
                                            color: "#EE6B6B",
                                            fontSize: 18
                                        }} />
                                )
                            }


                        </View>
                    </TouchableOpacity>
                </View>
            ))

        });
        return primaryMenu;
    }

    const getPrimaryMenu = () => {
        const primaryMenu = []
        SideMenuOptions.primay.forEach((singleMenu, index) => {
            primaryMenu.push((
                <View style={{ alignItems: "center", marginVertical: 15 }} >
                    <TouchableOpacity
                        style={commonStyling.sideDrawerTextContainer}
                        onPress={() => {
                            if(singleMenu.pageName !== AppConstant.APP_PAGE.LOGOUT_ACTION) {
                                navigation.closeDrawer();
                                let pageProps = singleMenu.pageProps ? singleMenu.pageProps : {};
                                pageProps = {...pageProps , navigationIns :navigation}
                                navigation.navigate(singleMenu.pageName, pageProps);
                            } else {
                                navigation.closeDrawer();
                                AppStorage.removeAppInfo(AppConstant.APP_STORE_KEY.USER_REG_DETAILS);
                                AppStorage.removeAppInfo(AppConstant.APP_STORE_KEY.IS_VEFIRIED)
                                navigation.navigate(AppConstant.APP_PAGE.ON_BOARDING);
                                // AsyncStorage.setItem('userRegistrationDetails', JSON.stringify(result.data)).
                            }
                            
                        }}
                    >
                        <Text
                            style={commonStyling.sideDrawerText}
                        >{singleMenu.label}</Text>
                    </TouchableOpacity>
                </View>
            ))

        });
        return primaryMenu;
    }
    return (
        <View>
            <LogoComponent marginVertical={10} hideName={true} />
            <View>

                {getPrimaryMenu()}
            </View>
            <View
                style={{
                    borderBottomColor: '#bfbfbf',
                    borderBottomWidth: 1,
                    marginVertical: 15
                }}
            />
            <View>
                {getSecondaryMenu()}
            </View>
        </View>
    )
}
function MyDrawer(props) {
    return (
        <Drawer.Navigator 
        permanent={'front'}
        drawerContent={(props) => (<CustomSideBarView  {...props} />)}>
            <Drawer.Screen name="Feed" {...props} component={Dashboard} />
            <Drawer.Screen name="Search Providers" {...props} component={SearchHelpProvidersRequesters} />
        </Drawer.Navigator>
    );
}

export default MyDrawer;
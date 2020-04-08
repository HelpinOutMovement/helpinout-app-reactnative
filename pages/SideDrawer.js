import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Button, View, Text, FlatList, TouchableOpacity } from 'react-native';
import AppConstant from '../misc/AppConstant';

import Dashboard from './Dashboard';
import LogoComponent from './components/LogoComponent';

const Drawer = createDrawerNavigator();

const SideMenuOptions = {
    primay: [{
        label: "Home",
        pageName: AppConstant.APP_PAGE.DASHBOARD,
        componentName: Dashboard
    }, {
        label: "Ask",
        pageName: AppConstant.APP_PAGE.REGISTER_MOBILE,
        componentName: Dashboard
    }, {
        label: "Help",
        pageName: AppConstant.APP_PAGE.SCREEN_WITH_SIDE_DRAWER,
        componentName: Dashboard
    }, {
        label: "Offer",
        pageName: AppConstant.APP_PAGE.SCREEN_WITH_SIDE_DRAWER,
        componentName: Dashboard
    }, {
        label: "My requests",
        pageName: AppConstant.APP_PAGE.SCREEN_WITH_SIDE_DRAWER,
        componentName: Dashboard
    }, {
        label: "My Offers",
        pageName: AppConstant.APP_PAGE.SCREEN_WITH_SIDE_DRAWER,
        componentName: Dashboard
    }, {
        label: "Profile",
        pageName: AppConstant.APP_PAGE.SCREEN_WITH_SIDE_DRAWER,
        componentName: Dashboard
    }, {
        label: "About",
        pageName: AppConstant.APP_PAGE.SCREEN_WITH_SIDE_DRAWER,
        componentName: Dashboard
    }],
    secondary: [{
        label: "English",
        localeCode: "en"
    },
    {
        label: "Marathi",
        localeCode: "en"
    }]
}

const CustomSideBarView = ({ navigation }) => {
    const getSecondaryMenu = () => {
        const primaryMenu = []
        SideMenuOptions.secondary.forEach((singleMenu, index) => {
            primaryMenu.push((
                <View style={{ alignItems: "center", marginVertical: 15 }} >
                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            width: "92%",
                            shadowColor: '#2328321F',

                        }}
                        onPress={() =>
                            console.log(singleMenu.localeCode)
                            //navigation.navigate(singleMenu.pageName)
                        }>
                        <Text
                            style={{
                                textAlign: "center",
                                fontFamily: "Roboto-Medium",
                                fontSize: 14,
                                color: "#4F5065"

                            }}
                        >{singleMenu.label}</Text>
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
                        style={{
                            alignItems: "center",
                            width: "92%",
                            shadowColor: '#2328321F',

                        }}
                        onPress={() =>
                            navigation.navigate(singleMenu.pageName)
                        }>
                        <Text
                            style={{
                                textAlign: "center",
                                fontFamily: "Roboto-Medium",
                                fontSize: 14,
                                color: "#4F5065"

                            }}
                        >{singleMenu.label}</Text>
                    </TouchableOpacity>
                </View>
            ))

        });
        return primaryMenu;
    }
    return (
        <View>
            <LogoComponent marginVertical={20} />
            <View>

                {getPrimaryMenu()}
            </View>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
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
        <Drawer.Navigator drawerContent={(props) => (<CustomSideBarView  {...props} />)}>
            <Drawer.Screen name="Feed" component={Dashboard} />
        </Drawer.Navigator>
    );
}

export default MyDrawer;
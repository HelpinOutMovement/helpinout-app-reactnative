
import React from 'react';
import { Button, View, Text, Image, StyleSheet } from 'react-native';
import commonStyling from '../styling/commonStyle';
import AppStorage from '../storage/AppStorage';
import AppConstant from '../misc/AppConstant';



function SplashScreen({ navigation }) {
    return (
        <View style={commonStyling.splashScreenContainer}>
            <Image
                style={commonStyling.splashImage}
                source={require('../images/logo.png')}
            />
            <View style={commonStyling.appLabelView}>
                <Text style={commonStyling.appLabelHelp}>Helpin</Text>
                <Text style={commonStyling.appLabelInout}>Out</Text>
            </View>
        </View>
    );
}

export default SplashScreen;

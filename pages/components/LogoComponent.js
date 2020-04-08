import React  from 'react';
import {  View, Image, Text } from 'react-native';
import commonStyling from '../../styling/commonStyle';


const LogoComponent = ()=>{
    return (
        <View style={{ alignItems: "center", marginVertical: 60 }}>
                    <Image
                        style={commonStyling.splashSmallImage}
                        source={require('../../images/logo.png')}
                    />
                    <View style={commonStyling.appLabelView}>
                        <Text style={commonStyling.appLabelHelp}>Helpin</Text>
                        <Text style={commonStyling.appLabelInout}>Out</Text>
                    </View>
                </View>
    )
};

export default LogoComponent;
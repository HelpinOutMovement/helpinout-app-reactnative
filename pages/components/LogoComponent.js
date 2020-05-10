import React from 'react';
import { View, Image, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import commonStyling from '../../styling/commonStyle';


const LogoComponent = (props) => {
    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <View style={{ 
                alignItems: "center", 
                marginVertical: props.marginVertical ? props.marginVertical : 60,
                marginTop: props.marginTop ? props.marginTop : 50,
                 }}>
            <Image
                style={commonStyling.splashSmallImage}
                source={require('../../images/logo.png')}
            />
            {(!props.hideName) && (
                <View style={commonStyling.appLabelView}>
                    <Text adjustsFontSizeToFit={true}  minimumFontScale={1.5} style={commonStyling.appLabelHelp}>Helpin</Text>
                    <Text adjustsFontSizeToFit={true}  minimumFontScale={1.5} style={commonStyling.appLabelInout}>Out</Text>
                </View>
            )}
        </View>
        </TouchableWithoutFeedback>
    )
};

export default LogoComponent;
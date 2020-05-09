import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import translate from 'react-native-i18n';
import {verticalScale, scale, moderateScale} from 'react-native-size-matters';

function AskForHelpButton(props) {
  return (
    <View style={{
      backgroundColor:"#EE6B6B",
      borderRadius:4,
      paddingHorizontal: 25,
      paddingVertical:15      
    }}>
      <Text adjustsFontSizeToFit={true} minimumFontScale={0.5} style={styles.askForHelp}>{translate.t("ask_for_help")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(243,103,103,1)",
    justifyContent:'center',
    height:verticalScale(40),
    width:scale(130),
    alignItems: 'center',
    borderRadius: 3,
  },
  askForHelp: {
    color: "rgba(245,245,245,1)",
    //fontSize: 20,
    fontFamily: "roboto-regular", 
    alignItems: 'center',    
    justifyContent:'center',
  }
});

export default AskForHelpButton;

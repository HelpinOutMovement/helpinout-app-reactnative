import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import translate from 'react-native-i18n';  
import {verticalScale, scale, moderateScale} from 'react-native-size-matters';

function OfferHelpButon(props) {
  return (    
    <View style={[styles.container, props.style]}>
    <Text style={styles.offerHelp}>{translate.t("offer_help")}</Text>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(109,115,130,1)",
    justifyContent:'center',
    height:verticalScale(40),
    width:scale(130),
    alignItems: 'center',
    borderRadius: 9,
  },
  offerHelp: {
    color: "rgba(245,245,245,1)",
    fontSize: 20,
    fontFamily: "roboto-regular", 
    alignItems: 'center',    
    justifyContent:'center',
  }
});

export default OfferHelpButon;

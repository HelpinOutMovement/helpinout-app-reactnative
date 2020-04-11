import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

function AskForHelpButton(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.askForHelp}>Ask For Help</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(243,103,103,1)",
    justifyContent:'center',
    height:50,
    width:150,
    alignItems: 'center',
    borderRadius: 9,
  },
  askForHelp: {
    color: "rgba(245,245,245,1)",
    fontSize: 20,
    fontFamily: "roboto-regular", 
    alignItems: 'center',    
    justifyContent:'center',
  }
});

export default AskForHelpButton;

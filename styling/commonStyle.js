import { StyleSheet } from 'react-native';
const commonStyling = StyleSheet.create({
    splashScreenContainer: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    onBoardingScreenContainer:{

    },
    splashSmallImage:{
        height:74,
         width:74
    },
    splashImage:{
        height:112, width:112
    },
    appLabelView:{
         alignItems: "center",
         flexDirection:'row', 
         flexWrap:'wrap' ,
         marginTop:20
    },
    appLabelHelp: {
        textAlign: "center",
        fontFamily: "Roboto-Medium",
        fontSize: 24,
        color:"#EE6B6B"
    },
    appLabelInout: {
        textAlign: "center",
        fontFamily: "Roboto-Medium",
        fontSize: 24,
        color:"#4F5065"
    },
});

export default commonStyling;
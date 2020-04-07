import { StyleSheet } from 'react-native';
import { Left, Right } from 'native-base';
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

    appFooterView:{
        alignItems: "center",
        flexDirection:'row', 
        flexWrap:'wrap' ,
        marginTop:20,  
        fontSize:20
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
    appPhoneNumberInputView:{
        width:350,
        alignItems: "center",
        flexDirection:'row', 
        flexWrap:'wrap' ,
        marginTop:20
   },
   phoneLoginCountrySelect: {
    fontSize: 20,
    paddingVertical: 12,
    paddingHorizontal: 1,
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10,
    width:75,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 5, // to ensure the text is never behind the icon
  },
  phoneCountryCode: {
    fontSize: 20,
    paddingVertical: 12,
    paddingHorizontal: 1,
    borderTopRightRadius:0,
    borderBottomRightRadius:0,
    borderRightWidth:0,    
    width:40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 9,
    color: 'black',
    paddingRight: 1, // to ensure the text is never behind the icon
    textAlign:'right'
  },
  phoneLoginInput: {
      fontSize: 20,
      paddingVertical: 12,
      paddingHorizontal: 1,
      borderTopLeftRadius:0,
      borderBottomLeftRadius:0,
      width:200,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 9,
      color: 'black',
      paddingRight: 5, // to ensure the text is never behind the icon
    },
   
});

const pickerSelectStyles = StyleSheet.create({
    

  
  });

export default commonStyling;
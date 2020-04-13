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
        width:"100%",
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
      width:240,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 9,
      color: 'black',
      paddingRight: 5, // to ensure the text is never behind the icon
      paddingLeft: 10
    },
    registerSwitch: {
        marginTop: 0, 
        width: 45,
        height: 23,
        textAlign: "left",        
      },
    registerSwitchText: {
        textAlign: "right",
        fontFamily: "Roboto-Medium",
        fontSize: 20,
        color:'black',
        height:50,
        marginLeft:20

    },
    registerSwitchRow: {
        marginTop: 0, 
        height: 50,
        width:"100%",
        flexDirection: "row",
        flex: 1,
        marginRight: -1,
        textAlign: "left",        
      },
      registerSwitchColumn: {
        marginTop: 0, 
        height: 50,
        width:"100%",
        flexDirection: "column",
        flex: 1,
        marginRight: -1,
        textAlign: "left",        
      },
      registerSwitch: {
        marginBottom: 0,    
        textAlign: "left",
        width: 45,
        height: 22
      },      
      RegistrationInput: {
        fontSize: 20,
        marginTop: 20, 
        paddingVertical: 12,
        paddingHorizontal: 1,        
        width:'100%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 9,
        color: 'black',
        paddingRight: 5, // to ensure the text is never behind the icon
      },
      pickerSelectStyles: {
        marginTop: 20,
      fontSize: 20,
      paddingVertical: 12,
      paddingHorizontal: 1,
      borderRadius: 9,  
      width: "100%",
      height: 50,
      borderWidth: 1,
      borderColor: 'gray',  
      borderWidth: 1,
      color: 'black',
      paddingRight: 5, // to ensure the text is never behind the icon
      textAlign:'center'
    },
    pickerCcountryStyles: {
      marginTop: 0,
      fontSize: 20,
      paddingVertical: 12,
      paddingHorizontal: 1,      
      borderRadius: 0,  
      width: 100,
      height: 50,
      borderWidth: 1,
      borderRightWidth: 0,
      borderLeftWidth: 0,
      borderColor: 'gray',  
      borderWidth: 1,
      color: 'black',
      paddingRight: 8, // to ensure the text is never behind the icon
      paddingLeft: 1,
      textAlign:'center'
    },


    languageButtonContainer: {
      marginVertical:30,
      alignItems: "flex-start",
      backgroundColor: "#FFFFFF",
      height: 56,
      width:"92%",
      shadowOpacity: 0.9,
      shadowOffset:{height:3},
      shadowColor: '#2328321F'
    }, 
    
    languageButtonText: {
      textAlign: "center",
      fontFamily: "Roboto-Medium",
      fontSize: 20,
      lineHeight: 56,
      marginLeft:35,
      color:"#4F5065CC"
  }

});

export default commonStyling;

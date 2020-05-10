import { StyleSheet } from 'react-native';
import { Left, Right } from 'native-base';
import { verticalScale, scale, moderateScale } from 'react-native-size-matters';

const commonStyling = StyleSheet.create({
    splashScreenContainer: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    sideDrawerTextContainer: {		
      alignItems: "center",		
      width: "92%",		
      backgroundColor:"#ffffff",		

     },		
   inputRowComponentText: {		
    fontSize: 16,		
    fontFamily: "Roboto-Regular",		
    borderWidth: 1,		
    borderColor: '#4F5065B8',		
    borderRadius: 9,		
    color: '#4F5065B8',		
    height:50,		
    paddingLeft:10		

   },		
    sideDrawerText: {		
      textAlign: "center",		
      fontFamily: "Roboto-Medium",		
      fontSize: 18,		
      color: "#4F5065"		
    },		
    languageButtonContainer: {		
      marginTop: 30,		
      alignItems: "flex-start",		
      backgroundColor: "#FFFFFF",		
      height: 56,		
      width: "92%",		
      shadowOpacity: 0.9,		
      shadowOffset: { height: 3 },		
      shadowColor: '#2328321F'		
    },		
    languageButtonText: {		
      textAlign: "center",		
      fontFamily: "Roboto-Medium",		
      fontSize: 20,		
      lineHeight: 56,		
      marginLeft: 35,		
      color: "#4F5065CC"		
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
        //fontSize: 24,
        color:"#EE6B6B"
    },
    appLabelInout: {
        textAlign: "center",
        fontFamily: "Roboto-Medium",
        //fontSize: 20,

        color:"#4F5065"
    },
    appPhoneNumberInputView:{
        width:scale(350),
        alignItems: "center",
        flexDirection:'row', 
        flexWrap:'wrap' ,
        marginTop:20
   },
  phoneCountryCode: {
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 1,
    borderTopRightRadius:0,
    borderBottomRightRadius:0,
    borderRightWidth:0,    
    width:scale(40),
    borderWidth: 4,
    borderTopWidth:1,
    borderLeftWidth:1,
    borderColor: '#E8E8E8',
    borderRadius: 9,
    color: '#4F5065',
    paddingRight: 1, // to ensure the text is never behind the icon
    textAlign:'right',
    height: verticalScale(60),      
  },
  phoneLoginInput: {
      fontSize: 20,
      paddingVertical: 10,
      paddingHorizontal: 1,
      borderTopLeftRadius:0,
      borderBottomLeftRadius:0,
      width:scale(180),
      borderTopWidth:1,
      borderLeftWidth:0,
      borderWidth: 4,
      borderColor: '#E8E8E8',
      borderRadius: 9,
      color: '#4F5065',
      paddingRight: 5, // to ensure the text is never behind the icon
      paddingLeft: 10,
      height: verticalScale(60),     
    },
    registerSwitch: {
        marginTop: 0, 
        width: 45,
        height: 23,
        textAlign: "left",        
      },
    registerSwitchText: {
        textAlign: "left",
        fontFamily: "Roboto-Medium",
        //fontSize: 16,
        color:'#4F5065',
        height:50,
        marginLeft:20,
        width:scale(245)
    },
    registerSwitchRow: {
        marginTop: 0, 
        height: 50,
        width:scale(310),
        flexDirection: "row",
        flex: 1,
        marginRight: -1,
        textAlign: "left",        
      },
      registerSwitchColumn: {
        marginTop: 0, 
        height: 50,
        width:scale(350),
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
        alignItems: "center",
        textAlign: "center",
        fontSize: 20,
        marginTop: 20, 
        paddingVertical: 12,
        paddingHorizontal: 1,  
        paddingLeft: 10,       
        width:scale(310),
        borderTopWidth:1,
        borderLeftWidth:1,
        borderWidth: 4,
        borderColor: '#E8E8E8',
        borderRadius: 9,
        color: '#000000',
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
      color: '#4F5065',
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
      color: '#4F5065',
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
  },

  myRequestOffersClickableRow:{
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#dddddd",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
  
  }

});

export default commonStyling;

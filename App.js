/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import LoginScreen from './pages/LoginScreen';
import DetailsScreen from './pages/DetailsScreen';
import SplashScreen from './pages/SplashScreen';
import OnBoardingScreen from './pages/OnBoardingScreen';
import RegisterMobile from './pages/RegisterMobile';
import OnBoardingInfoScreen from './pages/OnBoardingInfoScreen';
import MapComponent from './pages/MapComponent';


import AppTheme from './styling/AppTheme';
import { UserProvider } from './misc/UserContext';
import { AppStringProvider } from './misc/AppStringContext';
import AppStorage from './storage/AppStorage';
import AppConstant from './misc/AppConstant';
import MyDrawer from './pages/SideDrawer';
import AskForHelpScreen from './pages/AskForHelp';
import Dashboard from './pages/Dashboard';
import OfferHelpScreen from './pages/OfferHelpScreen';
import MyOfferScreen from './pages/MyOfferScreen';
import MyRequestScreen from './pages/MyRequestScreen';
import MyRequestSentRequestScreen from './pages/MyRequestScreen.SentRequest';
import MyOfferSentOfferScreen from './pages/MyOfferScreen.SentOffer';
import VerifyScreen from './pages/VerifyScreen';
import AddActivityScreen from './pages/components/AddActivityScreen';
import SearchHelpProvidersRequesters from './pages/SearchHelpProvidersRequesters';

import Toast from 'react-native-tiny-toast'
//import RNRestart from 'react-native-restart'; // Import package from node modules


import firebase from "react-native-firebase";
import { DevSettings } from 'react-native';

console.disableYellowBox = true;
const Stack = createStackNavigator();



function App() {


  const [appState, setAppState] = useState(AppConstant.APP_STATE.IS_LOADING);
  //AppStorage.storeAppInfo(AppConstant.APP_STORE_KEY.IS_VEFIRIED, "false");


  useEffect(() => {

    this.checkPermission();
    this.messageListener();

 }, []);


 checkPermission = async () => {

  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
      setFBCMTokenAndAppState()
  } else {
    this.requestPermission();
  }
 }


 getFcmToken = async () => {
  const fcmToken = await firebase.messaging().getToken();
  return fcmToken;
 }


 requestPermission = async () => {
  try {
   await firebase.messaging().requestPermission().then(async () => {
        setFBCMTokenAndAppState()
   })   
   // User has authorised
  } catch (error) {
    Toast.show("Error : User Has rejected notification permissions \n you need notification permissions for the application to work \n Go to settings and grant permissions. \n Please close the app and reatsrt after granting permissions" , {duration:0, position:0, animation:true, shadow:true} )
  }
 }



 closeApp = () => {

  DevSettings.reload();

 }

 setFBCMTokenAndAppState = async () =>{

  let fcmToken = await this.getFcmToken();
  if (fcmToken && fcmToken.length > 0) {
    console.log("Your Firebase Token is:" + fcmToken);
    AppStorage.storeAppInfo(AppConstant.FIREBASE_CLOUD_MESSAGING_TOKEN, fcmToken).then((storedResponse) => {
      console.log("storedResponse : " + storedResponse)
      AppStorage.getAppInfo(AppConstant.FIREBASE_CLOUD_MESSAGING_TOKEN).then((response) => {
        console.log("Your Firebase Stored Token is:" + JSON.stringify(response));
        if(response !== null){
          console.log("in useEffect : ")
          ////setAppState(AppConstant.APP_STATE.IS_NOT_AUTENTICATED);
          AppStorage.getAppInfo(AppConstant.IS_VEFIRIED)
          .then((resp) => {
            console.log("in IS_VEFIRIED Response : " + resp)
            if (resp === "true") {
              console.log("IS_VEFIRIED resp :  " + resp);
              AppStorage.getAppInfo(AppConstant.IS_LOGGED_IN).then((resp1) => {        
                console.log("IS_LOGGED_IN resp :  " + resp1);
                if (resp1 === "true") {
                  setAppState(AppConstant.APP_STATE.IS_AUTHENTICATED);
                  console.log("AppConstant.APP_STATE.IS_AUTHENTICATED ")
                }else{
                  console.log("AppConstant.APP_STATE.IS_NOT_AUTENTICATED ")
                  setAppState(AppConstant.APP_STATE.IS_NOT_AUTENTICATED);
                }            
              }).catch(error1 => {
                setAppState(AppConstant.APP_STATE.IS_NOT_AUTENTICATED);
              });
              
            } else {
              console.log("AppConstant.APP_STATE.IS_NOT_AUTENTICATED ")
              setAppState(AppConstant.APP_STATE.IS_NOT_AUTENTICATED);
            }
          }).catch(error => {
            console.log("AppConstant.APP_STATE.IS_NOT_AUTENTICATED ")
            setAppState(AppConstant.APP_STATE.IS_NOT_AUTENTICATED);              
          });
        }              
      });
    })
   } else {
     console.log("Failed", "No token received")
     Toast.show("Error : Failed to get Token" , {duration:0, position:0, animation:true, shadow:true})
   }  

 }


 messageListener = async () => {
      console.log("In message Listner")
      this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        console.log("Notification Data 1 : " + title , " ", body)
        //this.showAlert(title, body);
      });
    
      this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        console.log("Notification Data 2 : " + title , " ", body)
        //this.showAlert(title, body);
      });
    
      const notificationOpen = await firebase.notifications().getInitialNotification();
      if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        console.log("Notification Data 3 : " + title , " ", body)
        //this.showAlert(title, body);
      }
    
      this.messageListener = firebase.messaging().onMessage((message) => {
        console.log("Notification Data 4 : " + message)
      console.log(JSON.stringify(message));
      });
 }


 showAlert = (title, message) => {
  alert(
   title,
   message,
   [
    {text: "OK", onPress: () => console.log("OK Pressed")},
   ],
   {cancelable: false},
  );
 }



  console.log("appState  :  " + appState);
  const getStackedScreen = () => {
    const stackedScreen = [];
    switch (appState) {
      case AppConstant.APP_STATE.IS_AUTHENTICATED:
        stackedScreen.push((
          //"Dashboard  SearchHelpProvidersRequesters MyOfferScreen 7429E07C-37AF-4F17-AD31-5721EA75D0F"
          <Stack.Navigator key='n_authen' initialRouteName="SplashScreen" screenOptions={{
            headerShown: false
          }} >
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.DASHBOARD}`} name={AppConstant.APP_PAGE.DASHBOARD}  component={Dashboard} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.SEARCH_HELP_PROVIDERS_REQUESTERS}`} name={AppConstant.APP_PAGE.SEARCH_HELP_PROVIDERS_REQUESTERS} component={MyDrawer} /*initialParams={{activity_type:2, activity_uuid:"C923AB2B-2122-4674-98F6-809850172A27", region:{}, address:""}}*//>

            <Stack.Screen key={`a_${AppConstant.APP_PAGE.SIDE_DRAWER}`} name={AppConstant.APP_PAGE.SIDE_DRAWER} component={MyDrawer} />

            <Stack.Screen key={`a_${AppConstant.APP_PAGE.LOGIN}`} name={AppConstant.APP_PAGE.LOGIN} component={LoginScreen} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.VERIFY}`} name={AppConstant.APP_PAGE.VERIFY} component={VerifyScreen} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.ON_BOARDING}`} name={AppConstant.APP_PAGE.ON_BOARDING} component={OnBoardingScreen} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.ON_BOARDING_INFO}`} name={AppConstant.APP_PAGE.ON_BOARDING_INFO} component={OnBoardingInfoScreen} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.REGISTER_MOBILE}`} name={AppConstant.APP_PAGE.REGISTER_MOBILE} component={RegisterMobile} />



            <Stack.Screen key={`a_${AppConstant.APP_PAGE.MY_REQUEST_SCREEN}`} name={AppConstant.APP_PAGE.MY_REQUEST_SCREEN} component={MyRequestScreen} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.MY_REQUEST_SENT_REQUEST_SCREEN}`} name={AppConstant.APP_PAGE.MY_REQUEST_SENT_REQUEST_SCREEN} component={MyRequestSentRequestScreen} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.MY_OFFER_SENT_OFFER_SCREEN}`} name={AppConstant.APP_PAGE.MY_OFFER_SENT_OFFER_SCREEN} component={MyOfferSentOfferScreen} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.MY_OFFERS_SCREEN}`} name={AppConstant.APP_PAGE.MY_OFFERS_SCREEN} component={MyOfferScreen} />

            <Stack.Screen key={`a_${AppConstant.APP_PAGE.SPLASH}`} name={AppConstant.APP_PAGE.SPLASH} component={SplashScreen} /> 
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.ASK_FOR_HELP}`} name={AppConstant.APP_PAGE.ASK_FOR_HELP} component={AskForHelpScreen} />
            
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.MAP_COMPONENT}`} name={AppConstant.APP_PAGE.MAP_COMPONENT} component={MapComponent} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.OFFER_HELP_SCREEN}`} name={AppConstant.APP_PAGE.OFFER_HELP_SCREEN} component={OfferHelpScreen} />

            <Stack.Screen key={`a_${AppConstant.APP_PAGE.ADD_ACTIVITY_SCREEN}`} name={AppConstant.APP_PAGE.ADD_ACTIVITY_SCREEN} component={AddActivityScreen} />
            


            {/*          <Stack.Screen key= 'n_login' name="Login" component={LoginScreen} />
            <Stack.Screen key= 'n_details' name="Details" component={DetailsScreen} />
*/}
          </Stack.Navigator>
        ));
        break;
      case AppConstant.APP_STATE.IS_NOT_AUTENTICATED:
        stackedScreen.push((
          <Stack.Navigator headerMode="none" key='a_authen' initialRouteName={AppConstant.APP_PAGE.ON_BOARDING}>
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.SPLASH}`} name={AppConstant.APP_PAGE.SPLASH} component={SplashScreen} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.ON_BOARDING}`} name={AppConstant.APP_PAGE.ON_BOARDING} component={OnBoardingScreen} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.ON_BOARDING_INFO}`} name={AppConstant.APP_PAGE.ON_BOARDING_INFO} component={OnBoardingInfoScreen} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.LOGIN}`} name={AppConstant.APP_PAGE.LOGIN} component={LoginScreen} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.VERIFY}`} name={AppConstant.APP_PAGE.VERIFY} component={VerifyScreen} />

            <Stack.Screen key={`a_${AppConstant.APP_PAGE.REGISTER_MOBILE}`} name={AppConstant.APP_PAGE.REGISTER_MOBILE} component={RegisterMobile} />
            
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.ASK_FOR_HELP}`} name={AppConstant.APP_PAGE.ASK_FOR_HELP} component={AskForHelpScreen} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.DASHBOARD}`} name={AppConstant.APP_PAGE.DASHBOARD} component={MyDrawer} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.MAP_COMPONENT}`} name={AppConstant.APP_PAGE.MAP_COMPONENT} component={MapComponent} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.OFFER_HELP_SCREEN}`} name={AppConstant.APP_PAGE.OFFER_HELP_SCREEN} component={OfferHelpScreen} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.MY_REQUEST_SCREEN}`} name={AppConstant.APP_PAGE.MY_REQUEST_SCREEN} component={MyRequestScreen} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.MY_REQUEST_SENT_REQUEST_SCREEN}`} name={AppConstant.APP_PAGE.MY_REQUEST_SENT_REQUEST_SCREEN} component={MyRequestSentRequestScreen} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.MY_OFFER_SENT_OFFER_SCREEN}`} name={AppConstant.APP_PAGE.MY_OFFER_SENT_OFFER_SCREEN} component={MyOfferSentOfferScreen} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.MY_OFFERS_SCREEN}`} name={AppConstant.APP_PAGE.MY_OFFERS_SCREEN} component={MyOfferScreen} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.ADD_ACTIVITY_SCREEN}`} name={AppConstant.APP_PAGE.ADD_ACTIVITY_SCREEN} component={AddActivityScreen} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.SEARCH_HELP_PROVIDERS_REQUESTERS}`} name={AppConstant.APP_PAGE.SEARCH_HELP_PROVIDERS_REQUESTERS} component={SearchHelpProvidersRequesters}/>
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.SIDE_DRAWER}`} name={AppConstant.APP_PAGE.SIDE_DRAWER} component={MyDrawer} />
            

          </Stack.Navigator>
        ));

        /*stackedScreen.push((
            <Stack.Navigator  key= 'a_authen' initialRouteName="Login">
              <Stack.Screen key= 'a_login' name="Login" component={LoginScreen} />
              <Stack.Screen key= 'a_dashboard' name="Dashboard" component={ScreenWithSideOption} />
              <Stack.Screen key= 'a_details' name="Details" component={DetailsScreen} />
            </Stack.Navigator>
          ));
          */
        break;
      case AppConstant.APP_STATE.IS_LOADING:
      default:
        stackedScreen.push((
          <Stack.Navigator key='b_splash_1' initialRouteName="Splash">
            <Stack.Screen key='b_splash' name="Splash" component={SplashScreen} />
          </Stack.Navigator>));
        break;
    }
    return stackedScreen;
  }
  const user = { name: 'Tania', loggedIn: true };
  return (
    <UserProvider value={user}>
      <AppStringProvider >
        <NavigationContainer theme={AppTheme}>
          {getStackedScreen()}
        </NavigationContainer>
      </AppStringProvider>
    </UserProvider>
  );
}

export default App;



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
import AddActivityScreen from './pages/components/AddActivityScreen'
import SearchHelpProvidersRequesters from './pages/SearchHelpProvidersRequesters'


console.disableYellowBox = true;
const Stack = createStackNavigator();



function App() {

  const [appState, setAppState] = useState(AppConstant.APP_STATE.IS_LOADING);
  //AppStorage.storeAppInfo(AppConstant.APP_STORE_KEY.IS_VEFIRIED, "false");


  useEffect(() => {
    AppStorage.getAppInfo(AppConstant.APP_STORE_KEY.IS_VEFIRIED)
      .then((resp) => {
        if (resp === "true") {
          console.log("APP resp :  " + resp);
          setAppState(AppConstant.APP_STATE.IS_AUTHENTICATED);
        } else {
          setAppState(AppConstant.APP_STATE.IS_NOT_AUTENTICATED);
        }
      }).catch(error => {
        setAppState(AppConstant.APP_STATE.IS_NOT_AUTENTICATED);
      });
  }, []);
  console.log("appState  :  " + appState);
  const getStackedScreen = () => {
    const stackedScreen = [];
    switch (appState) {
      case AppConstant.APP_STATE.IS_AUTHENTICATED:
        stackedScreen.push((
          //"Dashboard  SearchHelpProvidersRequesters"
          <Stack.Navigator key='n_authen' initialRouteName="SplashScreen" screenOptions={{
            headerShown: false
          }} >
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.SEARCH_HELP_PROVIDERS_REQUESTERS}`} name={AppConstant.APP_PAGE.SEARCH_HELP_PROVIDERS_REQUESTERS} component={SearchHelpProvidersRequesters} initialParams={{activity_type:1, activity_uuid:"0C7ABDEE-F88B-46CD-8A40-445C04799ED1", region:{}, address:""}}/>

            <Stack.Screen key={`a_${AppConstant.APP_PAGE.DASHBOARD}`} name={AppConstant.APP_PAGE.DASHBOARD} component={Dashboard} />
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
          <Stack.Navigator headerMode="none" key='a_authen' initialRouteName={AppConstant.APP_PAGE.LOGIN}>
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.LOGIN}`} name={AppConstant.APP_PAGE.LOGIN} component={LoginScreen} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.VERIFY}`} name={AppConstant.APP_PAGE.VERIFY} component={VerifyScreen} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.SPLASH}`} name={AppConstant.APP_PAGE.SPLASH} component={SplashScreen} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.ON_BOARDING}`} name={AppConstant.APP_PAGE.ON_BOARDING} component={OnBoardingScreen} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.ON_BOARDING_INFO}`} name={AppConstant.APP_PAGE.ON_BOARDING_INFO} component={OnBoardingInfoScreen} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.REGISTER_MOBILE}`} name={AppConstant.APP_PAGE.REGISTER_MOBILE} component={RegisterMobile} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.ASK_FOR_HELP}`} name={AppConstant.APP_PAGE.ASK_FOR_HELP} component={AskForHelpScreen} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.DASHBOARD}`} name={AppConstant.APP_PAGE.DASHBOARD} component={MyDrawer} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.MAP_COMPONENT}`} name={AppConstant.APP_PAGE.MAP_COMPONENT} component={MapComponent} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.OFFER_HELP_SCREEN}`} name={AppConstant.APP_PAGE.OFFER_HELP_SCREEN} component={OfferHelpScreen} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.MY_REQUEST_SCREEN}`} name={AppConstant.APP_PAGE.MY_REQUEST_SCREEN} component={MyRequestScreen} />
            <Stack.Screen key={`a_${AppConstant.APP_PAGE.MY_OFFERS_SCREEN}`} name={AppConstant.APP_PAGE.MY_OFFERS_SCREEN} component={MyOfferScreen} />


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



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

import ScreenWithSideOption from './pages/ScreenWithSideOption';
import AppTheme from './styling/AppTheme';
import { UserProvider } from './misc/UserContext';
import { AppStringProvider } from './misc/AppStringContext';
import AppStorage from './storage/AppStorage';
import AppConstant from './misc/AppConstant';


const Stack = createStackNavigator();



function App() {

  const [appState, setAppState] = useState(AppConstant.APP_STATE.IS_LOADING);
  useEffect(() => {
    AppStorage.getAppInfo(AppConstant.IS_LOGGED_IN)
      .then((resp) => {
        if(resp) {
          setAppState(AppConstant.APP_STATE.IS_AUTHENTICATED);
        } else {
          setAppState(AppConstant.APP_STATE.IS_NOT_AUTENTICATED);
        }
      }).catch(error => {
        setAppState(AppConstant.APP_STATE.IS_NOT_AUTENTICATED);
      });
  },[]);

  const getStackedScreen = () => {
    const stackedScreen = [];
    switch (appState) {
      case AppConstant.APP_STATE.IS_AUTHENTICATED:
        stackedScreen.push((
          <Stack.Navigator  key= 'n_authen'  initialRouteName="Dashboard">
               <Stack.Screen key= 'n_login' name="Login" component={LoginScreen} />
            <Stack.Screen key= 'n_dashboard' name="Dashboard" component={ScreenWithSideOption} />
            <Stack.Screen key= 'n_details' name="Details" component={DetailsScreen} />
          </Stack.Navigator>
        ));
        break;
      case AppConstant.APP_STATE.IS_NOT_AUTENTICATED:
        stackedScreen.push((
          <Stack.Navigator key= 'a_authen' initialRouteName={AppConstant.APP_PAGE.ON_BOARDING}>
            <Stack.Screen key= {`a_${AppConstant.APP_PAGE.SPLASH}`} name={AppConstant.APP_PAGE.SPLASH} component={SplashScreen} /> 
            <Stack.Screen key= {`a_${AppConstant.APP_PAGE.ON_BOARDING}`} name={AppConstant.APP_PAGE.ON_BOARDING} component={OnBoardingScreen} />
            <Stack.Screen key= {`a_${AppConstant.APP_PAGE.ON_BOARDING_INFO}`} name={AppConstant.APP_PAGE.ON_BOARDING_INFO}  component={OnBoardingInfoScreen} />
            
            <Stack.Screen key= {`a_${AppConstant.APP_PAGE.REGISTER_MOBILE}`} name={AppConstant.APP_PAGE.REGISTER_MOBILE}  component={RegisterMobile} />
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
          <Stack.Navigator key= 'b_splash_1' initialRouteName="Splash">
            <Stack.Screen key= 'b_splash' name="Splash" component={SplashScreen} /> 
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



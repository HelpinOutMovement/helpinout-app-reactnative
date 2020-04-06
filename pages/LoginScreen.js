
import React from 'react';
import { Button, View, Text } from 'react-native';
import AppStorage from '../storage/AppStorage';
import AppConstant from '../misc/AppConstant';



function LoginScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Login Screen</Text>
        <Button
          title="Save Login Information"
          onPress={() => 
            AppStorage.storeAppInfo(AppConstant.IS_LOGGED_IN, ' TEST DATA ')
          }
        />

        
        <Button
          title="( Login / SignUp ) Complete"
          onPress={() => navigation.navigate('Dashboard')}
        />
        
      </View>
    );
  }

export default LoginScreen;
  
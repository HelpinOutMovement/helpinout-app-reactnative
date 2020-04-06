import React from 'react';
import { Button, View, Text, Image, StyleSheet } from 'react-native';
import AppStorage from '../storage/AppStorage';
import AppConstant from '../misc/AppConstant';

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <View style={styles.container}>

      </View>
      <View
        style={{ paddingTop: 90 }}
      >
<Button
          title="Remove Login  Information"
          onPress={() => 
            AppStorage.removeAppInfo(AppConstant.IS_LOGGED_IN)
          }
        />

        <Button
          title="Go to Details... again"
          onPress={() => navigation.push('Details')}
        />
        <Button title="Go to Home" onPress={() => navigation.navigate('Login')} />
        <Button title="Go back" onPress={() => navigation.goBack()} />
        <Button
          title="Go back to first screen in stack"
          onPress={() => navigation.popToTop()}
        />

      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  stretch: {
    width: 250,
    height: 100,
    resizeMode: 'stretch',
  },
});

export default DetailsScreen;
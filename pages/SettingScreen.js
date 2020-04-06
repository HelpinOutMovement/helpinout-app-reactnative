
import React from 'react';
import { Button, View, Text } from 'react-native';
import { UserConsumer } from '../misc/UserContext';
import { AppStringConsumer } from '../misc/AppStringContext';

/**
 * 
 *  example to use multiple CONTEXT in class component
 */

const InteralSettings = ({ navigation, user }) => {
  return (
    <AppStringConsumer>
      {appLanguage => (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text> Settings screen</Text>
          <Text> {appLanguage.translate('loginLabel')}</Text>
          <Button onPress={() => appLanguage.setLanguage('marathi')} title="Switch to Marathi" />
          <Button onPress={() => appLanguage.setLanguage('english')} title="Switch to English" />
          <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>)}
    </AppStringConsumer>
  );
}

class SettingScreen extends React.Component {
  render() {
    return (
      <UserConsumer>
        {user => (<InteralSettings navigation={this.props.navigation} user={user} />)}
      </UserConsumer>
    );
  }
}

export default SettingScreen;

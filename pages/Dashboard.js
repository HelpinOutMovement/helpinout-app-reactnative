
import React, { useContext }  from 'react';
import { Button, View, Text } from 'react-native';
import UserContext from '../misc/UserContext';
import AppStringContext from '../misc/AppStringContext';

function Dashboard({ navigation }) {
    const user = useContext(UserContext);
    const {translate} = useContext(AppStringContext);
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Dashboard Screen {user.name} {translate('loginLabel','marathi')}</Text>
        <Button onPress={() => navigation.openDrawer()} title="Open Drawer" />
        <Button onPress={() => navigation.closeDrawer()} title="Close Drawer" />
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    );
}

export default Dashboard;
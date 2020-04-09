
import React, { useContext }  from 'react';
import {Container, Header, Left, Body, Right, Button, Title, Text } from 'native-base';
import UserContext from '../misc/UserContext';
import AppStringContext from '../misc/AppStringContext';
import HeaderComponent from './components/HeaderComponent';

function AskForHelpScreen(props) {
    const user = useContext(UserContext);
    const {translate} = useContext(AppStringContext);
    return (
      <Container style={{width:"100%"}}>
        <HeaderComponent {...props} title="Need Help With" bgColor="#EE6B6B"/>
      </Container>
    );
}
/**
 * 
 * <Text> AskForHelpScreen  {user.name} {translate('loginLabel','marathi')}</Text>
        <Button onPress={() => navigation.openDrawer()} title="Open Drawer" />
        <Button onPress={() => navigation.closeDrawer()} title="Close Drawer" />
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />

 */
export default AskForHelpScreen;
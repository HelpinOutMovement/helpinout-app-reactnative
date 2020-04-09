
import React, { useContext , useEffect }  from 'react';
import { StatusBar, StyleSheet } from "react-native";
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import UserContext from '../misc/UserContext';
import AppStringContext from '../misc/AppStringContext';
import MapComponent from './MapComponent'

function Dashboard({ navigation }) {
    const user = useContext(UserContext);
    const {translate} = useContext(AppStringContext);

    useEffect(() => {
      return () => { navigation.closeDrawer(); }
    }, [] );

   /*
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
    */
   return (
    <Container>
    <Header>
      <Left>
        <Button
          transparent
          onPress={() => navigation.openDrawer()}>
          <Icon name="menu" />
        </Button>
      </Left>
      <Body>
        <Title>Dashboard</Title>
      </Body>
      <Right />
    </Header>
    <Content padder contentContainerStyle={{
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  }} >
     <MapComponent />
    </Content>
  </Container>
   )

}

export default Dashboard;
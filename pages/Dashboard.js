
import React, { useContext , useEffect }  from 'react';
import { StatusBar, StyleSheet, View, Dimensions } from "react-native";
import { Container, Header, Footer, FooterTab, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import UserContext from '../misc/UserContext';
import AppStringContext from '../misc/AppStringContext';
import ModalComponent from './components/ModalComponent';
import MapComponent from './MapComponent';

import AskForHelpButton from "./components/AskForHelpButton";
import OfferHelpButton from "./components/OfferHelpButton";
import ButtonComponent from "./components/ButtonComponent";

function Dashboard({ navigation }) {
    const user = useContext(UserContext);
    const {translate} = useContext(AppStringContext);
    let dimensions = Dimensions.get('window');

    console.log(JSON.stringify(dimensions) + " ---- " + dimensions.width);
    useEffect(() => {
      return () => { navigation.closeDrawer(); }
    }, [] );
   
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
    <Content padder contentContainerStyle={{...StyleSheet.absoluteFillObject, justifyContent: 'flex-end', alignItems: 'center',}} >
          <MapComponent />      
    </Content>
      <View style={styles(dimensions).hintTextContainer}>
          <Text style={styles(dimensions).hintText}>
            Inentify your location above, then select below
          </Text>
      </View>  
      <View style={{alignItems: "center", marginTop:10, marginBottom:10}}>
        <View style={styles(dimensions).buttonContainer}>
          <View style={styles(dimensions).AskForHelp}>
            <AskForHelpButton />
          </View>
          <View style={styles(dimensions).OfferHelp}>
            <OfferHelpButton />
          </View>                
        </View> 
      </View>
    <Footer>                        
          <FooterTab>
            <Button vertical>
              <Icon name="ios-home" style={{color:"red"}}/>
              <Text>Home</Text>
            </Button>
            <Button vertical>
              <Icon name="camera" />
              <Text>Camera</Text>
            </Button>
            <Button vertical active>
              <Icon active name="navigate" />
              <Text>Navigate</Text>
            </Button>          
          </FooterTab>
        </Footer>
  </Container>
   )

}

const styles = (dimensions) => StyleSheet.create({

  container: {
    flex: 1
  },
  
  bottomPanelGroup: {  
    flex: 1,  
    flexDirection: "column",
    top: (dimensions.height*.58),
    left: 0,
    width: dimensions.width,
    height: 200,
    position: "absolute",
    borderColor: 'red',
    borderWidth: 2,    
    alignItems: 'center',    
    justifyContent:'center',
  },
  hintTextContainer: {
    width: dimensions.width,
    height: 30,
    backgroundColor: "rgba(163,159,159,1)",
    alignItems: 'center',      
    justifyContent:'center',    
  },
  hintText: {
    color: "rgba(245,245,245,1)",
    fontSize : 15,
    fontFamily: "roboto-regular",
    alignItems: 'center',    
    justifyContent:'center',
  },
  buttonContainer:{
    padding: 10,        
    flexDirection: "row",     
    width: (dimensions.width*.95),        
    //borderColor: 'green',
    //borderWidth: 2,         
    justifyContent:'center',
    alignItems: 'center', 
  },
  AskForHelp:{    
    paddingRight:10,
  },
  OfferHelp:{
    paddingLeft:10,
  }

});

export default Dashboard;
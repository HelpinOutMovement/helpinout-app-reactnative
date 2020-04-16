
import React, { useContext , useEffect }  from 'react';
import { StatusBar, StyleSheet, View, Dimensions , TouchableOpacity} from "react-native";
import { Container, Header, Footer, FooterTab, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import UserContext from '../misc/UserContext';
import AppStringContext from '../misc/AppStringContext';
import ModalComponent from './components/ModalComponent';
import MapComponent from './MapComponent';
import AppConstant from '../misc/AppConstant';
import AskForHelpButton from "./components/AskForHelpButton";
import OfferHelpButton from "./components/OfferHelpButton";
import HView from "./components/HView"


import translate from 'react-native-i18n';

const dimensions = Dimensions.get('window');       
class Dashboard extends React.Component {
    constructor(props){
        super(props);
        const { navigate } = this.props.navigation;        
        //this.state = this.props.route.params.loginState;
        this.state = {hintIsHidden:false};
        this.navigate = this.props.navigation.navigate;
        console.log("VerifyScreen Constructor")
        console.log(JSON.stringify(this.state)); 
        setTimeout(() => {
          this.setState({
            hintIsHidden: true
          })
          }, 5000);          
    }
      
    render() { 
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
                  <HView style={styles(this.dimensions).hintTextContainer} hide={this.state.hintIsHidden}>
                      <Text style={styles(this.dimensions).hintText}>
                        Inentify your location above, then select below
                      </Text>
                  </HView>  
                  <View style={{alignItems: "center", marginTop:10, marginBottom:10}}>
                    <View style={styles(this.dimensions).buttonContainer}>
                      <TouchableOpacity style={styles(this.dimensions).AskForHelp} onPress={() => navigation.navigate(AppConstant.APP_PAGE.ASK_FOR_HELP)}>
                        <AskForHelpButton  />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles(this.dimensions).OfferHelp} onPress={() => navigation.navigate(AppConstant.APP_PAGE.OFFER_HELP_SCREEN)}>
                        <OfferHelpButton  />
                      </TouchableOpacity>                
                    </View> 
                  </View>
                  <Footer>                        
                    <FooterTab>
                      <Button vertical active  onPress={() => navigation.navigate(AppConstant.APP_PAGE.DASHBOARD)}>
                        <Icon name="ios-home" style={{color:"red"}}/>
                        <Text>{translate.t("Home")}</Text>
                      </Button>
                      <Button vertical onPress={() => navigation.navigate(AppConstant.APP_PAGE.MY_REQUEST_SCREEN)}>
                        <Icon name="camera" />
                        <Text>{translate.t("My_Requests")}</Text>
                      </Button>
                      <Button vertical onPress={() => navigation.navigate(AppConstant.APP_PAGE.MY_OFFERS_SCREEN)}>
                        <Icon active name="navigate" />
                        <Text>{translate.t("My_Offers")}</Text>
                      </Button>          
                    </FooterTab>
                  </Footer>
            </Container>
          
        );             
    }



  }
/*
function Dashboard({ navigation }) {
    const user = useContext(UserContext);
    //const {translate} = useContext(AppStringContext);
    let dimensions = Dimensions.get('window');    
    let hintIsHidden =  false;
    
    setTimeout(() => {
      hintIsHidden = true
      }, 5000);
    //setTimeout((this.state.hintIsHidden = true), 5000);

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
      <HView style={styles(dimensions).hintTextContainer} hide={hintIsHidden}>
          <Text style={styles(dimensions).hintText}>
            Inentify your location above, then select below
          </Text>
      </HView>  
      <View style={{alignItems: "center", marginTop:10, marginBottom:10}}>
        <View style={styles(dimensions).buttonContainer}>
          <TouchableOpacity style={styles(dimensions).AskForHelp} onPress={() => navigation.navigate(AppConstant.APP_PAGE.ASK_FOR_HELP)}>
            <AskForHelpButton  />
          </TouchableOpacity>
          <TouchableOpacity style={styles(dimensions).OfferHelp} onPress={() => navigation.navigate(AppConstant.APP_PAGE.OFFER_HELP_SCREEN)}>
            <OfferHelpButton  />
          </TouchableOpacity>                
        </View> 
      </View>
       <Footer>                        
          <FooterTab>
            <Button vertical active  onPress={() => navigation.navigate(AppConstant.APP_PAGE.DASHBOARD)}>
              <Icon name="ios-home" style={{color:"red"}}/>
              <Text>{translate.t("Home")}</Text>
            </Button>
            <Button vertical onPress={() => navigation.navigate(AppConstant.APP_PAGE.MY_REQUEST_SCREEN)}>
              <Icon name="camera" />
              <Text>{translate.t("My_Requests")}</Text>
            </Button>
            <Button vertical onPress={() => navigation.navigate(AppConstant.APP_PAGE.MY_OFFERS_SCREEN)}>
              <Icon active name="navigate" />
              <Text>{translate.t("My_Offers")}</Text>
            </Button>          
          </FooterTab>
        </Footer>
  </Container>
   )

}
*/

const styles = (dimensions1) => StyleSheet.create({

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
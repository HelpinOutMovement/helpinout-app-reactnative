
import React, { useContext , useEffect }  from 'react';
import { StatusBar, StyleSheet, View, Dimensions , TouchableOpacity, SafeAreaView} from "react-native";
import { Container, Header, Footer, FooterTab, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import UserContext from '../misc/UserContext';
import AppStringContext from '../misc/AppStringContext';

import ModalComponent from './components/ModalComponent';
import MapComponent from './MapComponent';
import AppConstant from '../misc/AppConstant';
import AskForHelpButton from "./components/AskForHelpButton";
import OfferHelpButton from "./components/OfferHelpButton";
import HView from "./components/HView"
import API from "../APIClient/API";
import Utils from "../misc/Utils"

import translate from 'react-native-i18n';
import appStorage from '../storage/AppStorage';
import Geolocation from '@react-native-community/geolocation';
import { getDistance, getPreciseDistance } from 'geolib';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = (Platform.OS === global.platformIOS ? 1.5 : 0.5);
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const footerTop = Utils.isIphoneX() ? height-70 : height-60;
const bottomPanelTop = Utils.isIphoneX() ? height-190 : height-180;


const dimensions = Dimensions.get('window');   
class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.mapComponentRef = React.createRef();
        this.navigation = this.props.navigation;                
        //this.state = this.props.route.params.loginState;
        this.state = {hintIsHidden:false,userDetails: {}, region:{}, address:"Default Address"};
        this.navigate = this.props.navigation.navigate;
        console.log("VerifyScreen Constructor")
        console.log(JSON.stringify(this.state)); 
        setTimeout(() => {
          this.setState({
            hintIsHidden: true,
            userDetails: {}
          })
          }, 5000);   
  
          
    }

   
    callMapComponentMethod = (markers) =>{      
      this.mapComponentRef.current.addMarker(markers);
    }


    callbackOnRegionChange = (rgn, mapState) =>{
        this.setState({region:rgn, address:mapState.address})
        console.log("Dashboard callbackOnRegionChange : " + JSON.stringify(rgn), "       ---      " , mapState.address)
        
        // Use Geocoding and get address.
        this.getLocationSuggestions(mapState);

    }


    getLocationSuggestions = (mapState) =>{

      this.setLanLon(mapState.region.latitude, mapState.region.longitude);
      let restApi = new API();
      reqObj =  restApi.locationSuggestion(mapState.region.latitude, mapState.region.longitude, "10.424", getDistance(mapState.boundries.northEast,mapState.boundries.southWest)/2);     
      reqObj.then((val)=> {
        //console.log("API Response Data  1  " + JSON.stringify(val))
        //this.addMarker(val)
        this.mapComponentRef.current.addMarker(val)
      }).catch(err => {
        if(err.response.status === 409){
          alert("appid expired ")
          appStorage.storeAppInfo(AppConstant.APP_STORE_KEY.IS_VEFIRIED, "false");
          this.navigate(AppConstant.APP_PAGE.LOGIN);
        }
      })
    }

    setLanLon(lat, lon){
      this.setState({region:{latitude: lat, longitude:lon, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA}});
    }


    
    render() { 
      return (
          <Container style={{ alignItems:"center"}}>
                                    <MapComponent  mapHeight={this.state.mapHeight} callbackOnRegionChange={this.callbackOnRegionChange} mapProps={this.props} ref={this.mapComponentRef}>                      
                        </MapComponent>  
 
          <SafeAreaView style={{width:"100%", alignItems:"center"}}>
                        <View style={{ flex: 0, flexDirection: 'row',top:this.topBarPos , borderRadius:6 ,height:50, width:"90%", borderWidth:0, borderColor:"#000000" }}>                
                            <View style={{width: "15%", backgroundColor:"white", height: 50, borderRadius:6, borderTopRightRadius:0,borderBottomRightRadius:0 ,borderLeftWidth:1,borderTopWidth:1,borderBottomWidth:1}} ><Button transparent style={{padding:0}} onPress={() => this.navigation.openDrawer()}><Icon name="menu"/></Button></View>
                            <View style={{width: "65%", backgroundColor:"white", height: 50, borderRadius:0, borderTopWidth:1,borderBottomWidth:1,alignItems:"center", justifyContent:"center"}} >
                                <Text style={{fontSize:10, overflow:"hidden", height:10, textAlign:"left", width: "100%" , color:"grey", paddingTop:0, paddingBottom:0}}>You are here</Text>
                                <Text style={{fontSize:12, overflow:"hidden", height:30,textAlign:"left", width: "100%", paddingTop:0}}>{this.state.address}</Text>
                            </View>
                            <View style={{width: "20%", backgroundColor:"white", height: 50, borderRadius:6, borderTopLeftRadius:0,borderBottomLeftRadius:0 ,borderTopWidth:1,borderBottomWidth:1,borderRightWidth:1,alignItems:"center", justifyContent: 'center'}} ><Text style={{fontFamily: "roboto-medium",fontSize:14 , color:"rgba(243,103,103,1)"}}>Change</Text></View>                            
                        </View>
 
                          <View style={{position:"absolute", left:0, top:footerTop-100, width:"100%", backgroundColor:"#FFFFFF"}}>  
                          <HView style={styles(this.dimensions).hintTextContainer} hide={this.state.hintIsHidden}>
                              <Text style={styles(this.dimensions).hintText}>
                                Inentify your location above, then select below
                              </Text>
                          </HView> 
                              <View style={{position:"absolute", left:0, top:20, width:"100%",alignItems: "center", marginTop:10, marginBottom:10, backgroundColor:"#FFFFFF"}}>
                                <View style={styles(this.dimensions).buttonContainer}>
                                  <TouchableOpacity style={styles(this.dimensions).AskForHelp} onPress={() => this.navigate(AppConstant.APP_PAGE.ASK_FOR_HELP, {region:this.state.region, address:this.state.address})}>
                                    <AskForHelpButton  />
                                  </TouchableOpacity>
                                  <TouchableOpacity style={styles(this.dimensions).OfferHelp} onPress={() => this.navigate(AppConstant.APP_PAGE.OFFER_HELP_SCREEN, {region:this.state.region, address:this.state.address})}>
                                    <OfferHelpButton  />
                                  </TouchableOpacity>                
                                </View> 
                              </View>       
                        </View>  
                        <FooterTab style={{position:"absolute", left:0, top:footerTop,width:"100%", backgroundColor:"#FFFFFF"}}>
                          <Button vertical active  onPress={() => this.navigate(AppConstant.APP_PAGE.DASHBOARD)}>
                            <Icon name="ios-home" style={{color:"red"}}/>
                            <Text>{translate.t("Home")}</Text>
                          </Button>
                          <Button vertical onPress={() => this.navigate(AppConstant.APP_PAGE.MY_REQUEST_SCREEN)}>
                            <Icon name="camera" />
                            <Text>{translate.t("My_Requests")}</Text>
                          </Button>
                          <Button vertical onPress={() => this.navigate(AppConstant.APP_PAGE.MY_OFFERS_SCREEN)}>
                            <Icon active name="navigate" />
                            <Text>{translate.t("My_Offers")}</Text>
                          </Button>          
                        </FooterTab>
          </SafeAreaView>
          
          </Container>
      )
    }
  /*
    render() { 
        return (
            <Container >
              
                <Header>
                  <Left>
                    <Button
                      transparent
                      onPress={() => this.navigation.openDrawer()}>
                      <Icon name="menu" />
                    </Button>
                  </Left>
                  <Body>
                    <Title>Dashboard</Title>
                  </Body>
                  <Right />
                </Header>   
                <Content padder contentContainerStyle={{height:"100%", justifyContent: 'flex-end', alignItems: 'center',}} >                
                  <MapComponent mapHeight={"100%"} callbackOnRegionChange={this.callbackOnRegionChange} mapProps={this.props} ref={this.mapComponentRef} onPress={() => this.callMapComponentMethod()} />      
                </Content>
                  <HView style={styles(this.dimensions).hintTextContainer} hide={this.state.hintIsHidden}>
                      <Text style={styles(this.dimensions).hintText}>
                        Inentify your location above, then select below
                      </Text>
                  </HView>  
                  <View style={{alignItems: "center", marginTop:10, marginBottom:10}}>
                    <View style={styles(this.dimensions).buttonContainer}>
                      <TouchableOpacity style={styles(this.dimensions).AskForHelp} onPress={() => this.navigate(AppConstant.APP_PAGE.ASK_FOR_HELP, {region:this.state.region, address:this.state.address})}>
                        <AskForHelpButton  />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles(this.dimensions).OfferHelp} onPress={() => this.navigate(AppConstant.APP_PAGE.OFFER_HELP_SCREEN, {region:this.state.region, address:this.state.address})}>
                        <OfferHelpButton  />
                      </TouchableOpacity>                
                    </View> 
                  </View>
                  <Footer>                        
                    <FooterTab>
                      <Button vertical active  onPress={() => this.navigate(AppConstant.APP_PAGE.DASHBOARD)}>
                        <Icon name="ios-home" style={{color:"red"}}/>
                        <Text>{translate.t("Home")}</Text>
                      </Button>
                      <Button vertical onPress={() => this.navigate(AppConstant.APP_PAGE.MY_REQUEST_SCREEN)}>
                        <Icon name="camera" />
                        <Text>{translate.t("My_Requests")}</Text>
                      </Button>
                      <Button vertical onPress={() => this.navigate(AppConstant.APP_PAGE.MY_OFFERS_SCREEN)}>
                        <Icon active name="navigate" />
                        <Text>{translate.t("My_Offers")}</Text>
                      </Button>          
                    </FooterTab>
                  </Footer>
            </Container>
          
        ); 
                   
    }
    */
  }



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
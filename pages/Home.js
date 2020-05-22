
import React, { useContext, useState,  useEffect } from 'react';
import { StatusBar, StyleSheet, View, Dimensions, TouchableOpacity, SafeAreaView } from "react-native";
import { Container, Header, Footer, FooterTab, Title, Left, Icon, Right, Button, Body, Content, Text, Card, CardItem } from "native-base";
import UserContext from '../misc/UserContext';
import AppStringContext from '../misc/AppStringContext';

import ModalComponent from './components/ModalComponent';
import MapComponent from './MapComponent';
import AppConstant from '../misc/AppConstant';
import AskForHelpButton from "./components/AskForHelpButton";
import OfferHelpButton from "./components/OfferHelpButton";
import HView from "./components/HView"
import API from "../APIClient/API";
import { apiInstance } from "../APIClient/API";

import Utils from "../misc/Utils"
import FooterTabComponent from './components/FooterTabComponent';

import translate from 'react-native-i18n';
import appStorage from '../storage/AppStorage';
import Geolocation from '@react-native-community/geolocation';
import { getDistance, getPreciseDistance } from 'geolib';
import Toast from 'react-native-tiny-toast'
import { verticalScale, scale, moderateScale } from 'react-native-size-matters';

import Modal from 'react-native-modal';

import SpinnerComponent from './components/SpinnerComponent';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = (Platform.OS === global.platformIOS ? 1.5 : 0.5);
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const footerTop = Utils.isIphoneX() ? verticalScale(620) : verticalScale(610);
const bottomPanelTop = Utils.isIphoneX() ? height - 190 : height - 180;

const dimensions = Dimensions.get('window');

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



function Home(props) {
    let mapComponentRef = React.createRef();
    let navigation = props.navigation;

    //let tik = (props.route.params["tik"]) ? props.route.params.tik : 0;
    const { latlon , setLatLon, setRegion} = useContext(UserContext);

    const [showSpinner, setShowSpinner] = useState(false);

    const [state, setState] = useState({ 
      hintIsHidden: false, 
          userDetails: {}, 
          region: {}, 
          address: "Default Address", 
          requestMatchCount:3,
          offerMatchCount:3, 
          requestAlert:{
            width: scale(20),
            left: scale(330),
            expanded: false,
            },         
          offerAlert:{
            width: scale(20),
            left: scale(330),
            expanded: false,
            },
          ShowAskForHelpModal:false
    });

      useEffect(() => {
        console.log("Home")
        setShowSpinner(true)
        apiInstance.userPastActivity(0).then(resp => {
          if(resp.data.requests.length > 0){
            resp.data.requests.map((request) =>{
              if(request.mapping){
                let max_mapping_time = new Date(Math.max.apply(null, request.mapping.map(function(e) {
                  var mapping_time = e.mapping_time.replaceAll("-", "/")
                  //var mapping_date_time = new Date(Date.parse(mapping_time));
                  return new Date(mapping_time);
                })));
                console.log(max_mapping_time)
              }else{
                console.log(0)
              }
            })
          }

          if(resp.data.offers.length > 0){
            resp.data.offers.map((offer) =>{
              if(offer.mapping){
                let max_mapping_time = new Date(Math.max.apply(null, offer.mapping.map(function(e) {
                  var mapping_time = e.mapping_time.replaceAll("-", "/")
                  //var mapping_date_time = new Date(Date.parse(mapping_time));
                  return new Date(mapping_time);
                })));
                console.log(max_mapping_time)
              }else{
                console.log(0)
              }
            })
          }
          setShowSpinner(false);
          
        }).catch((e) => {
          //setShowSpinner(false);
          //setRequestInformation([]);
        })

        setState({
          hintIsHidden: false, 
          userDetails: {}, 
          region: {}, 
          address: "Default Address", 
          requestMatchCount:3,
          offerMatchCount:3, 
          requestAlert:{
            width: scale(20),
            left: scale(330),
            expanded: false,
            },         
          offerAlert:{
            width: scale(20),
            left: scale(330),
            expanded: false,
            },
          ShowAskForHelpModal:false
        })
      }, []);


     const showRequestsAlertView = (type) => {    
            if (state[type].expanded) {
        setState({ ...state,[type]:{width:scale(20), left:scale(330), expanded:false}});        
            } else {      
        setState({ ...state,[type]:{width:scale(250), left:scale(100), expanded:true}});        
            }
        }
      
    const callMapComponentMethod = (markers) => {
        mapComponentRef.current.addMarker(markers);
    }
      
      
    const callbackOnRegionChange = (region, address, distance) => {
      console.log("callbackOnRegionChange")
      state["region"] = region;
      state["address"] = address;
      state["latlon"] =  region.latitude + "," + region.longitude;
      setLatLon(region.latitude + "," + region.longitude)
      setRegion(region)
      setState({ ...state})
      getLocationSuggestions(region, address, distance)
    }
      
      
    const getLocationSuggestions = (region, address, distance) => {    
      console.log("getLocationSuggestions") 
      setShowSpinner(true)
      reqObj = apiInstance.locationSuggestion(region.latitude, region.longitude, "10.424", distance / 2);
      reqObj.then((val) => {
        setState({ ...state,requestMatchCount:val.data.my_requests_match,offerMatchCount:val.data.my_offers_match})
        setShowSpinner(false)
      }).catch(err => {
        if (err.response.status === 409) {
          Toast.show('appid expired : ', { duration: 2000, position: 0, animation: true, shadow: true, animationDuration: 1000 })
          appStorage.storeAppInfo(AppConstant.APP_STORE_KEY.IS_VEFIRIED, "false");
          navigation.navigate(AppConstant.APP_PAGE.LOGIN);
        }
      })
    }
  

    return (

        <Container style={{ alignItems: "center" }}>
        <MapComponent mapLatLon={""} mapHeight={verticalScale(590)} callbackOnRegionChange={callbackOnRegionChange} mapProps={props} ref={mapComponentRef}>
        </MapComponent>


  

        <SafeAreaView style={{ width: scale(350), alignItems: "center" }}>

                <View style={{ width:scale(330), flex: 0, flexDirection: 'row' , borderRadius:6 ,height: verticalScale(50), borderWidth:0, borderColor:"#000000" }}>                
                    <View style={{width: scale(50), backgroundColor:"white", height: verticalScale(50), borderRadius:6, borderTopRightRadius:0,borderBottomRightRadius:0 ,borderLeftWidth:1,borderTopWidth:1,borderBottomWidth:1, justifyContent:"center"}} ><Button transparent style={{padding:0}} onPress={() => { navigation.openDrawer() }}><Icon name="menu"/></Button></View>
                    <View style={{width: scale(200), backgroundColor:"white", height: verticalScale(50), borderRightWidth:0,  borderRadius:0, borderTopLeftRadius:0,borderBottomLeftRadius:0 ,borderTopWidth:1,borderBottomWidth:1,alignItems:"center", justifyContent: 'center'}} >
                        <Text adjustsFontSizeToFit={true}  minimumFontScale={.5} style={{ overflow:"hidden", height:verticalScale(10), textAlign:"left", width:  scale(200) , color:"grey", paddingTop:0, paddingBottom:0}}>You are here</Text>
                        <Text adjustsFontSizeToFit={true}  minimumFontScale={.6} numberOfLines={2} style={{ overflow:"hidden", height:verticalScale(30),textAlign:"left", width:  scale(200), paddingTop:0}}>{state.address}</Text>
                    </View>
                    <View adjustsFontSizeToFit={true}  minimumFontScale={1} style={{width: scale(80), backgroundColor:"white", height: verticalScale(50), borderRadius:6, borderTopLeftRadius:0,borderBottomLeftRadius:0 ,borderTopWidth:1,borderBottomWidth:1,borderRightWidth:1,alignItems:"center", justifyContent: 'center'}} ><Text style={{fontFamily: "roboto-medium",fontSize:14 , color:"rgba(243,103,103,1)"}}>Change</Text></View>
                </View>
               {/*
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    minLength={2} 
                    autoFocus={false}
                    returnKeyType={'search'} 
                    listViewDisplayed='auto'    
                    fetchDetails={true}
                    query={{
                      key: 'AIzaSyCswhMNoMbszea_-hhz6wr3TSBogllMLdw',
                      language: 'en', // language of the results
                      types: '(cities)' // default: 'geocode'
                    }}
                    onPress={(data, details = null) => console.log(data)}
                    onFail={error => console.error(error)}
                    requestUrl={{
                      url:
                        'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
                      useOnPlatform: 'web',
                    }} 
                    styles={{
                      textInputContainer: {
                        width: '100%'
                      },
                      description: {
                        fontWeight: 'bold'
                      },
                      predefinedPlacesDescription: {
                        color: '#1faadb'
                      }
                    }}
                />
                  */}
                  
                <TouchableOpacity
                  onPress={() => {
                    showRequestsAlertView("requestAlert");
                  }}
                  style={{
                    flex:1,
                    flexDirection:"row",
                    position: 'absolute',
                    left: state.requestAlert.left,
                    top: verticalScale(100),
                    width: state.requestAlert.width,
                    height: verticalScale(30),
                    backgroundColor: '#FFF',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomLeftRadius: 4,
                    borderTopLeftRadius: 4,
                }}>
                    <View style={{ color: 'black', overflow:"hidden", width: state.requestAlert.width,  height: verticalScale(15),}}>
                        <Text adjustsFontSizeToFit={true} minimumFontScale={.01}  numberOfLines={1} style={{ color: 'red', overflow:"hidden", paddingLeft:scale(10)}}>{state.requestMatchCount} help givers match your requests</Text>
                    </View>
                    
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    showRequestsAlertView("requestAlert");
                  }}
                  style={{
                    flex:1,
                    flexDirection:"row",
                    position: 'absolute',
                    left: scale(330),
                    top: verticalScale(100),
                    width: scale(20),
                    height: verticalScale(30),
                    backgroundColor: '#FFF',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomLeftRadius: 4,
                    borderTopLeftRadius: 4,
                  }}>
                  <Text style={{ color: 'red',}}>!</Text>
                </TouchableOpacity>


                <TouchableOpacity
                  onPress={() => {
                    showRequestsAlertView("offerAlert");
                  }}
                  style={{
                    flex:1,
                    flexDirection:"row",
                    position: 'absolute',
                    left: state.offerAlert.left,
                    top: verticalScale(150),
                    width: state.offerAlert.width,
                    height: verticalScale(30),
                    backgroundColor: '#FFF',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomLeftRadius: 4,
                    borderTopLeftRadius: 4,
                }}>
                    <View style={{ color: 'black', overflow:"hidden", width: state.offerAlert.width,  height: verticalScale(15),}}>
                        <Text adjustsFontSizeToFit={true} minimumFontScale={.05}  numberOfLines={1} style={{ color: 'black', overflow:"hidden", paddingLeft:scale(10)}}>{state.offerMatchCount} help seekers match your offers</Text>
                    </View>
                    
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    showRequestsAlertView("offerAlert");
                  }}
                  style={{
                    flex:1,
                    flexDirection:"row",
                    position: 'absolute',
                    left: scale(330),
                    top: verticalScale(150),
                    width: scale(20),
                    height: verticalScale(30),
                    backgroundColor: '#FFF',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomLeftRadius: 4,
                    borderTopLeftRadius: 4,
                  }}>
                  <Text style={{ color: 'black',}}>!</Text>
                </TouchableOpacity>



          
                <View style={{ position: "absolute", left: 0, top: footerTop - 100, width: scale(350), backgroundColor: "#FFFFFF" }}>

                  <View style={{ position: "absolute", left: 0, top: 0, width: scale(350), alignItems: "center", marginVertical:10, backgroundColor: "#FFFFFF" }}>
                    <View style={{backgroundColor: "#FFFFFF", height:verticalScale(20),width: scale(330)}}>
                        <View style={{backgroundColor: "#FFFFFF", height:verticalScale(20),}}>
                          <Text adjustsFontSizeToFit={true} minimumFontScale={.01} numberOfLines={2} style={{textAlign:"center", color:"grey", fontSize:12, paddingTop:5}}>
                            {translate.t("identify_location")}
                          </Text>
                        </View>
                    </View>
                      
                    <View style={styles(dimensions).buttonContainer}>
                      {/*<TouchableOpacity style={styles(dimensions).AskForHelp} onPress={() => navigate(AppConstant.APP_PAGE.ASK_FOR_HELP, { region: state.region, address: state.address })}> */}
                      <TouchableOpacity style={styles(dimensions).AskForHelp} onPress={() => {setState({ ...state,ShowAskForHelpModal:true})}}>
                        <AskForHelpButton />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles(dimensions).OfferHelp} onPress={() => navigation.navigate(AppConstant.APP_PAGE.OFFER_HELP_SCREEN, { region: state.region, address: state.address, self_else:0, latlon:state.latlon })}>
                        <OfferHelpButton />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <FooterTab style={{ position: "absolute", left: 0, top: footerTop, width: scale(350), backgroundColor: "#FFFFFF" }}>
                  <FooterTabComponent {...props} activeTab={AppConstant.APP_FOOTER_TABS.HOME} latlon={state.latlon} />
                </FooterTab>
        </SafeAreaView>

        <Modal
            testID={'modal'}
            isVisible={state.ShowAskForHelpModal}
            onBackdropPress={() => { setState({ ...state,ShowAskForHelpModal:false}) }}
            onSwipeComplete={() => { }}
            style={{
                justifyContent: 'center',
                margin: 0,
                marginBottom: 2,
                position:"absolute",
                top:verticalScale(150),
                left:scale(25), 
                borderRadius:8,
                borderColor:"#EE6B6B",

            }}>
              <View style={{flex:1, flexDirection:"column",  borderRadius:8, borderColor:"#EE6B6B", width:scale(300), height:verticalScale(100) , backgroundColor:"#FFF" ,  justifyContent:"center", alignItems:"center" }}>
                <View style={{width:scale(300), height:verticalScale(40) ,alignItems:"flex-start", paddingHorizontal:scale(10), justifyContent:"center", borderWidth:0}}>
                  <Text > Who neds help?</Text>
                </View>
              
                <View style={{flex:1, flexDirection:"row",  width:scale(280), height:verticalScale(60)  , justifyContent:"center", alignItems:"center", borderWidth:0}}>
                        <TouchableOpacity  style={{paddingHorizontal:scale(10), paddingVertical:verticalScale(20)}} onPress={() => { setState({ ...state,ShowAskForHelpModal:false}); navigation.navigate(AppConstant.APP_PAGE.ASK_FOR_HELP, { region: state.region, address: state.address, self_else:0 })}}>
                        <View style={{
                          backgroundColor:"#EE6B6B",
                          borderRadius:4,
                          paddingHorizontal: 5,
                          paddingVertical:10,
                          borderColor:"#EE6B6B",
                          borderWidth:1,
                          width:scale(130),
                          height:verticalScale(40) ,
                          alignItems:"center",
                          justifyContent:"center"
                        }}>
                          <Text adjustsFontSizeToFit={true} minimumFontScale={0.5} numberOfLines={1} style={{color: "rgba(245,245,245,1)",fontFamily: "roboto-regular", alignItems: 'center',justifyContent:'center',}}>Myself</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity  style={{paddingHorizontal:scale(10), paddingVertical:verticalScale(20)}} onPress={() => { setState({ ...state,ShowAskForHelpModal:false}); navigation.navigate(AppConstant.APP_PAGE.ASK_FOR_HELP, { region: state.region, address: state.address, self_else:1 })}}>
                          <View style={{
                            backgroundColor:"#FFF",
                            borderRadius:4,
                            paddingHorizontal: 5,
                            paddingVertical:10, 
                            borderColor:"#EE6B6B",
                            borderWidth:1,
                            width:scale(130),
                            height:verticalScale(40) ,
                            alignItems:"center",
                            justifyContent:"center"
                          }}>
                            <Text adjustsFontSizeToFit={true} minimumFontScale={0.5} numberOfLines={1} style={{color: "#EE6B6B",fontFamily: "roboto-regular", alignItems: 'center',justifyContent:'center',}}>Someone else</Text>
                          </View>
                        </TouchableOpacity>
                </View>
             </View>
        </Modal>
        {showSpinner && (<SpinnerComponent />)}                      
      </Container>

    );

}



const styles = (dimensions1) => StyleSheet.create({

    container: {
      flex: 1
    },
  
    bottomPanelGroup: {
      flex: 1,
      flexDirection: "column",
      top: (dimensions.height * .58),
      left: 0,
      width: scale(350),
      height: verticalScale(200),
      position: "absolute",
      borderColor: 'red',
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    hintTextContainer: {
      width: scale(350),
      height: verticalScale(30),
      backgroundColor: "rgba(163,159,159,1)",
      alignItems: 'center',
      justifyContent: 'center',
    },
    hintText: {
      color: "rgba(245,245,245,1)",
      fontFamily: "roboto-regular",
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      padding: 10,
      flexDirection: "row",
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    AskForHelp: {
      paddingRight: 10,
    },
    OfferHelp: {
      paddingLeft: 10,
    }
  
  });
export default Home;
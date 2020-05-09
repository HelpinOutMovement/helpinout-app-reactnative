
import React, { useContext, useEffect } from 'react';
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
import Utils from "../misc/Utils"
import FooterTabComponent from './components/FooterTabComponent';

import translate from 'react-native-i18n';
import appStorage from '../storage/AppStorage';
import Geolocation from '@react-native-community/geolocation';
import { getDistance, getPreciseDistance } from 'geolib';
import Toast from 'react-native-tiny-toast'
import { verticalScale, scale, moderateScale } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = (Platform.OS === global.platformIOS ? 1.5 : 0.5);
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const footerTop = Utils.isIphoneX() ? verticalScale(620) : verticalScale(610);
const bottomPanelTop = Utils.isIphoneX() ? height - 190 : height - 180;


const dimensions = Dimensions.get('window');
class Dashboard extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    console.log("Props :   " + JSON.stringify(props))
    this.mapComponentRef = React.createRef();
    this.navigation = this.props.navigation;
    //this.state = this.props.route.params.loginState;
    this.state = { hintIsHidden: false, userDetails: {}, region: {}, address: "Default Address" };
    this.navigate = this.props.navigation.navigate;

    console.log("VerifyScreen Constructor")
    console.log(JSON.stringify(this.state));
    setTimeout(() => {
      this.setState({
        hintIsHidden: true,
        userDetails: {}
      })
    }, 5000);

    this.props.route.latlon ? this.setState({ latlon: this.props.route.latlon }) : this.setState({ latlon: "" })

  }


  callMapComponentMethod = (markers) => {
    this.mapComponentRef.current.addMarker(markers);
  }


  callbackOnRegionChange = (rgn, mapState) => {
    this.setState({ region: rgn, address: mapState.address })
    console.log("Dashboard callbackOnRegionChange : " + JSON.stringify(rgn), "       ---      ", mapState.address)
    this.setState({ latlon: rgn.latitude + "," + rgn.longitude })

    // Use Geocoding and get address.
    this.getLocationSuggestions(mapState);

  }


  getLocationSuggestions = (mapState) => {

    this.setLanLon(mapState.region.latitude, mapState.region.longitude);
    let restApi = new API();
    reqObj = restApi.locationSuggestion(mapState.region.latitude, mapState.region.longitude, "10.424", getDistance(mapState.boundries.northEast, mapState.boundries.southWest) / 2);
    reqObj.then((val) => {
      //console.log("API Response Data  1  " + JSON.stringify(val))
      //this.addMarker(val)
      this.mapComponentRef.current.addMarker(val)
    }).catch(err => {
      if (err.response.status === 409) {
        Toast.show('appid expired : ', { duration: 2000, position: 0, animation: true, shadow: true, animationDuration: 1000 })
        appStorage.storeAppInfo(AppConstant.APP_STORE_KEY.IS_VEFIRIED, "false");
        this.navigate(AppConstant.APP_PAGE.LOGIN);
      }
    })
  }

  setLanLon(lat, lon) {
    this.setState({ region: { latitude: lat, longitude: lon, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA } });
  }


  componentDidMount = () => {
  }

  componentDidUpdate = () => {

  }

  componentWillReceiveProps = () => {
  }



  render() {
    return (
      <Container style={{ alignItems: "center" }}>
        <MapComponent mapHeight={verticalScale(590)} callbackOnRegionChange={this.callbackOnRegionChange} mapProps={this.props} ref={this.mapComponentRef}>
        </MapComponent>

        <SafeAreaView style={{ width: scale(350), alignItems: "center" }}>
          <View style={{
            backgroundColor: "#FFFFFF",
            width: "94%",
            alignSelf: "center",
            borderRadius: 10,
            flexDirection: "row",
            paddingVertical: 10,
            alignItems: "center"
          }}>
            <View
              style={{
                width: "15%"
              }}>
              <Button transparent
                style={{
                  padding: 0
                }}
                onPress={() => { this.context.setLatLon({ region: this.state.region, address: this.state.address }); this.navigation.openDrawer() }}>
                <Icon name="menu" />
              </Button>
            </View>
            <View style={{
              width: "75%"
            }}>

              <Text
              adjustsFontSizeToFit={true}  minimumFontScale={.1}
                style={{
                  color: "#4F50657A",
                  fontFamily: "Roboto-Regular",
                  fontSize: 12,
                  lineHeight: 18,
                  alignSelf: "flex-start"
                }}>{translate.t("you_are_here")}</Text>
              <Text
              adjustsFontSizeToFit={true}  minimumFontScale={.6}
                style={{
                  color: "#4F5065",
                  fontFamily: "Roboto-Regular",
                  fontSize: 14,
                  alignSelf: "flex-start"
                }}>{this.state.address}</Text>

            </View>
          </View>
          {
            /*
            <View
            style={{
              width: scale(330),
              flex: 0,
              flexDirection: 'row',
              top: this.topBarPos,
              borderRadius: 6,
              height: verticalScale(50),
              borderWidth: 0,
              borderColor: "#000000"
            }}>
            <View
              style={{
                width: scale(50),
                backgroundColor: "white", 
                height: verticalScale(50), 
                borderRadius: 6, 
                borderTopRightRadius: 0, 
                borderBottomRightRadius: 0, 
                borderLeftWidth: 1, 
                borderTopWidth: 1,
                borderBottomWidth: 1, 
                justifyContent: "center"
              }} >
                  <Button transparent 
                      style={{ 
                      padding: 0 
                      }} 
                      onPress={() => { this.context.setLatLon({ region: this.state.region, address: this.state.address }); this.navigation.openDrawer() }}>
                        <Icon name="menu" />
                  </Button>
              </View>
            <View 
              style={{ 
                  width: scale(200), 
                  backgroundColor: "#FFFFFF", 
                  height: verticalScale(50), 
                  borderRightWidth: 0, 
                  borderRadius: 0, 
                  borderTopLeftRadius: 0, 
                  borderBottomLeftRadius: 0, 
                  borderTopWidth: 1, 
                  borderBottomWidth: 1, 
                  alignItems: "center", 
                  justifyContent: 'center' 
                  }} >
              <Text 
                style={{ 
                   color:"#4F50657A",
                   fontFamily: "Roboto-Regular",		
                   fontSize: 12,
                   lineHeight:18,
                   alignSelf:"flex-start"
                }}>{translate.t("you_are_here")}</Text>
              <Text 
                style={{ 
                  color:"#4F5065",
                  fontFamily: "Roboto-Regular",		
                  fontSize: 14,
                  alignSelf:"flex-start"
                   }}>{this.state.address}</Text>
            </View>
            <View style={{ width: scale(80), backgroundColor: "white", height: verticalScale(50), borderRadius: 6, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderTopWidth: 1, borderBottomWidth: 1, borderRightWidth: 1, alignItems: "center", justifyContent: 'center' }} ><Text style={{ fontFamily: "roboto-medium", fontSize: 14, color: "rgba(243,103,103,1)" }}>Change</Text></View>
          </View>
      */}

          <View style={{ position: "absolute", left: 0, top: footerTop - 100, width: scale(350), backgroundColor: "#FFFFFF" }}>
            <HView style={styles(this.dimensions).hintTextContainer} hide={false}>
              <View style={{backgroundColor: "rgba(163,159,159,1)", height:verticalScale(20)}}>
              <Text adjustsFontSizeToFit={true} minimumFontScale={.01} style={{textAlign:"center"}}>
                {translate.t("identify_location")}
              </Text>
              </View>
              
            </HView>
            <View style={{ position: "absolute", left: 0, top: 20, width: scale(350), alignItems: "center", marginTop: 10, marginBottom: 10, backgroundColor: "#FFFFFF" }}>
              <View style={styles(this.dimensions).buttonContainer}>
                <TouchableOpacity style={styles(this.dimensions).AskForHelp} onPress={() => this.navigate(AppConstant.APP_PAGE.ASK_FOR_HELP, { region: this.state.region, address: this.state.address })}>
                  <AskForHelpButton />
                </TouchableOpacity>
                <TouchableOpacity style={styles(this.dimensions).OfferHelp} onPress={() => this.navigate(AppConstant.APP_PAGE.OFFER_HELP_SCREEN, { region: this.state.region, address: this.state.address })}>
                  <OfferHelpButton />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <FooterTab style={{ position: "absolute", left: 0, top: footerTop, width: scale(350), backgroundColor: "#FFFFFF" }}>
            <FooterTabComponent {...this.props} activeTab={AppConstant.APP_FOOTER_TABS.HOME} latlon={this.state.latlon} />
          </FooterTab>
        </SafeAreaView>

      </Container>
    )
  }
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

export default Dashboard;

import React from 'react';
import {
  StyleSheet,
  View,
  Header,
  Left,
  Icon,
  Body,
  Title,
  Right,
  Text,
  Dimensions,
  TouchableOpacity,
  Button,
  Image
} from 'react-native';

import AppStorage from '../storage/AppStorage';
import AppConstant from '../misc/AppConstant';
import AppStringContext from '../misc/AppStringContext';

import API from "../APIClient/API";
import DeviceInfo from 'react-native-device-info';
import Geolocation from '@react-native-community/geolocation';
//import Geocoder from 'react-native-geocoding';

import MapView, { Marker, MAP_TYPES, ProviderPropType , PROVIDER_GOOGLE} from 'react-native-maps';
import { getDistance, getPreciseDistance } from 'geolib';
import Toast from 'react-native-tiny-toast'


const LATITUDE = 0;
const LONGITUDE = 0;
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = (Platform.OS === global.platformIOS ? 1.5 : 0.5);
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const currentLocationIcon = require("../images/current_location_icon.png")
const requesterIcon = require("../images/red-pin.png")
const offererIcon = require("../images/black-pin.png")

import Geocoder from 'react-native-geocoder';


Geocoder.fallbackToGoogle("AIzaSyDgaOp_orkTcVpcH6NfNE3XtOH6tdiXlsg");

class MapComponent extends React.Component {

  constructor(props) {
   // console.log(props)
    super(props);
    //Geocoder.init("AIzaSyDgaOp_orkTcVpcH6NfNE3XtOH6tdiXlsg");
    this.navigate = this.props.mapProps.navigation.navigate;
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      boundries: {},
      deviceInfo:[],
      markerList: [],
      radius:5,
    };  

    Geolocation.requestAuthorization();
    // Define the const outside the class
    //this.setCurrentLocation(0,0);   
    


  }

  /*

  componentWillReceiveProps = (nextProps) => {
    console.log(" In componentWillReceiveProps")
    this.setState({ region:{latitude: nextProps.mapLatLon.split(",")[0], longitude:nextProps.mapLatLon.split(",")[1], latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA} });  
  }
*/





  setLanLon(lat, lon){
    this.setState({region:{latitude: lat, longitude:lon, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA}}, () => {
      //console.log("calling force update")
    });
    
    this.map.animateToRegion({ latitude: this.props.mapLatLon.split(",")[0], longitude: this.props.mapLatLon.split(",")[1], latitudeDelta: LATITUDE_DELTA * Number(this.state.radius/15), longitudeDelta: LONGITUDE_DELTA * Number(this.state.radius/15) }, 2000); 

    this.forceUpdate()

  }
  
  setCurrentLocation(lat, lon){
    if(lat === 0 && lon === 0){


      let mapBoundries = this.map.getMapBoundaries();
      mapBoundries.then((boundries) => {
        this.setState({boundries},() => {

            Geolocation.getCurrentPosition((info) => {
              this.setLanLon(info.coords.latitude, info.coords.longitude);
              this.setState({latitude: lat, longitude:lon});
              // Use the below code to zoom to particular location with radius.
    
              this.map.animateToRegion({ latitude: this.state.region.latitude, longitude: this.state.region.longitude, latitudeDelta: LATITUDE_DELTA * Number(this.state.radius/15), longitudeDelta: LONGITUDE_DELTA * Number(this.state.radius/15) }, 2000); 
              /*
              let restApi = new API();
              let address = restApi.geocode(this.state.region.latitude, this.state.region.longitude)
                address.then((addr) => {
                this.setState({address:addr})   
                this.props.callbackOnRegionChange(this.state.region, this.state);
              }).catch(err => {
                this.props.callbackOnRegionChange(this.state.region, this.state);
              })
              */
              Geocoder.geocodePosition({lat:info.coords.latitude, lon:info.coords.longitude}).then((retval) => {
                this.setState({address:retval[0].formattedAddress},() => { 
                  this.props.callbackOnRegionChange(this.state.region, this.state);
                })  
              }).catch(error => {          
                //this.props.callbackOnRegionChange(this.state.region, this.state);
              });
            /*
            Geocoder.from(this.state.region.latitude, this.state.region.longitude)
            .then(json => {
                var addressComponent = json.results[0].address_components[0];
                this.setState({address:JSON.stringify(addressComponent)},() => { 
                  this.props.callbackOnRegionChange(this.state.region, this.state);
                })  
            })
            .catch(error => {          
            });
            */
          })


        })
      })

    }else{
      this.setState({region:{latitude: lat, longitude:lon, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA}}, () => {

        this.map.animateToRegion({ latitude: this.state.region.latitude, longitude: this.state.region.longitude, latitudeDelta: LATITUDE_DELTA * Number(this.state.radius/15), longitudeDelta: LONGITUDE_DELTA * Number(this.state.radius/15) }, 2000); 

        Geocoder.geocodePosition({lat:lat, lon:lon}).then((retval) => {
          this.setState({address:retval[0].formattedAddress},() => { 
            this.props.callbackOnRegionChange(this.state.region, this.state);
          })  
        }).catch(error => {          
          //this.props.callbackOnRegionChange(this.state.region, this.state);
        });

      })
      
    }
  }


  onRegionChange(region) {
    this.setState({ region });
  }

  jumpRandom() {
    this.setState({ region: this.randomRegion() });
  }

  animateRandom() {
    this.map.animateToRegion(this.randomRegion());
  }

  animateRandomCoordinate() {
    this.map.animateCamera({ center: this.randomCoordinate() });
  }

  animateToRandomBearing() {
    this.map.animateCamera({ heading: this.getRandomFloat(-360, 360) });
  }

  animateToRandomViewingAngle() {
    this.map.animateCamera({ pitch: this.getRandomFloat(0, 90) });
  }

  getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }

  randomCoordinate() {
    const region = this.state.region;
    return {
      latitude:
        region.latitude + (Math.random() - 0.5) * (region.latitudeDelta / 2),
      longitude:
        region.longitude + (Math.random() - 0.5) * (region.longitudeDelta / 2),
    };
  }

  randomRegion() {
    return {
      ...this.state.region,
      ...this.randomCoordinate(),
    };
  }


  addMarker= (markers)  => {
    
    let markerDataList = [];
    if(markers.data.requests){
      markers.data.requests.map((data) => {
        var markerData = {
          lat: data.geo_location.split(",")[0],      
          lon: data.geo_location.split(",")[1],
          type: "requests",
          title: "requests  from : " + data.user_detail.first_name + " " + data.user_detail.last_name,
          description: "Description: " , // data.user_detail.first_name,
          icon:requesterIcon
        }         
        markerDataList.push(markerData);
      })
    }
    
    if(markers.data.offers){
      markers.data.offers.map((data) => {
        var markerData = {
          lat: data.geo_location.split(",")[0],      
          lon: data.geo_location.split(",")[1],
          type: "Offers",
          title: "Offers from :  " + data.user_detail.first_name + " " + data.user_detail.last_name,
          description: "Description: " , //data.user_detail.first_name,
          icon:offererIcon
        }         
        markerDataList.push(markerData);
      })
    }
    



    this.setState({markerList:markerDataList})
   //this.map.fitToElements(true);
   

  }


  onRegionChangeComplete(region){
 

    this.setState({ region },() => { 
      
        let mapBoundries = this.map.getMapBoundaries();
        mapBoundries.then((boundries) => {
          this.setState({boundries},() => {
              //this.state.boundries = val;
              const distance = getDistance(
                boundries.northEast,
                boundries.southWest
              );
              
              /*
              let restApi = new API();

              let address = restApi.geocode(region.latitude, region.longitude)
                address.then((addr) => {
                  this.setState({address:addr},() => { 
                    this.props.callbackOnRegionChange(region, this.state);
                  })              
                }).catch(err => {
                  this.props.callbackOnRegionChange(this.state.region, this.state);
                })    

              */  
              Geocoder.geocodePosition({lat:region.latitude, lng:region.longitude}).then((retval) => {
                const address = retval[0].formattedAddress;
                this.setState({address:retval[0].formattedAddress},() => { 
                  this.props.callbackOnRegionChange(region, address, distance);
                })  
              }).catch(error => {          
                //this.props.callbackOnRegionChange(this.state.region, this.state);
              });

              /*
                Geocoder.from(region.latitude, region.longitude)
                .then(json => {
                var addressComponent = json.results[0].address_components[0];
                  this.setState({address:JSON.stringify(addressComponent)},() => { 
                    this.props.callbackOnRegionChange(region, this.state);
                  })  
                })
                .catch(error => {          
                });
            */
            //this.getLocationSuggestions();


          })
          
        })
     })
    
  }

  componentDidMount(){
    if(this.props.mapLatLon && this.props.mapLatLon.length >0){
      this.setCurrentLocation(this.props.mapLatLon.split(",")[0],this.props.mapLatLon.split(",")[1]);    
    }else{
      this.setCurrentLocation(0,0)
    }
    
    
  }



  getLocationSuggestions = () =>{

        this.setLanLon(this.state.region.latitude, this.state.region.longitude);
        let restApi = new API();
        reqObj =  restApi.locationSuggestion(this.state.region.latitude, this.state.region.longitude, "10.424", getDistance(this.state.boundries.northEast,this.state.boundries.southWest)/3);     
        reqObj.then((val)=> {
          this.addMarker(val)
        }).catch((err) => {
          if(err.response.status === 409){
            Toast.show('appid expired : ', {duration:2000, position:0, animation:true, shadow:true, animationDuration:1000})
            AppStorage.storeAppInfo(AppConstant.APP_STORE_KEY.IS_VEFIRIED, "false");
            this.navigate(AppConstant.APP_PAGE.LOGIN);
          }
        })
  }

  onMapPress(e) {
 

    this.setLanLon(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)
    this.map.animateToRegion({ latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude, latitudeDelta: LATITUDE_DELTA * Number(this.state.radius/15), longitudeDelta: LONGITUDE_DELTA * Number(this.state.radius/15) }, 2000); 

    //this.onRegionChangeComplete(this.state.region)
  }
  render() {

    return (
      <View style={styles.container}>
                
        <MapView
          provider={this.props.provider}
          ref={ref => {
            this.map = ref;
          }}
          onPress={this.onMapPress.bind(this)}
          //mapType={MAP_TYPES.TERRAIN}
          //provider={PROVIDER_GOOGLE}
          onRegionChangeComplete={region => this.onRegionChangeComplete(region)}   
          style={{...StyleSheet.absoluteFillObject, height:this.props.mapHeight}}
          initialRegion={this.state.region}
          onRegionChange={region => this.onRegionChange(region)}          
        >
                    <Marker
                      showsUserLocation={true}
                      coordinate={{ latitude: this.state.region.latitude, longitude: this.state.region.longitude}}
                      title={""}
                      description={""}
                      tracksViewChanges={false}
                      region={this.state.region}
                    >
                     <Image source={currentLocationIcon} style={{height:55, width:55}} resizeMode="contain" />
                    </Marker>
            {this.state.markerList.map(data => (                  
                  <Marker
                      coordinate={{ latitude: data.lat, longitude: data.lon}}
                      title={ data.title}
                      description={data.description}
                      tracksViewChanges={false}
                     // icon={require('../images/red-pin.png')}
                  >
                     <Image source={data.icon} style={{height:35, width:35}} resizeMode="contain" />
                  </Marker>
            ))}
        </MapView>
     
      </View>
    );
  }
}

/*
MapComponents.propTypes = {
  provider: ProviderPropType,
};
*/
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 100,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  buttonText: {
    textAlign: 'center',
  },
  centeredText: { textAlign: 'center' },
});


export default MapComponent;
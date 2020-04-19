
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Button
} from 'react-native';
import API from "../APIClient/API";
import DeviceInfo from 'react-native-device-info';
import Geolocation from '@react-native-community/geolocation';


import MapView, { Marker, MAP_TYPES, ProviderPropType , PROVIDER_GOOGLE} from 'react-native-maps';
import { getDistance, getPreciseDistance } from 'geolib';

const LATITUDE = 18.5204;
const LONGITUDE = 73.8567;
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = (Platform.OS === global.platformIOS ? 1.5 : 0.5);
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log("MapComponent Constructor" )
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
      radius:50

    };
    
    // Define the const outside the class


    
    this.setCurrentLocation(0,0);    

  }

  setLanLon(lat, lon){
    this.setState({region:{latitude: lat, longitude:lon, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA}});
  }
  
  setCurrentLocation(lat, lon){
    if(lat === 0 && lon === 0){
      Geolocation.getCurrentPosition((info) => {
        console.log("getCurrentPosition "+ JSON.stringify(info))
        this.setLanLon(info.coords.latitude, info.coords.longitude);
        console.log("setCurrentLocation")
      console.log("Current Location " + JSON.stringify(info))
      this.setState({latitude: lat, longitude:lon});
      // Use the below code to zoom to particular location with radius.
      console.log(this.state.region)
      this.map.animateToRegion({ latitude: this.state.region.latitude, longitude: this.state.region.longitude, latitudeDelta: LATITUDE_DELTA * Number(this.state.radius/15), longitudeDelta: LONGITUDE_DELTA * Number(this.state.radius/15) }, 2000); 
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
    console.log(this.state.markers.member.length)
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
    console.log("Markers Data : "+ JSON.stringify(markers))
    
    let markerDataList = [];
    markers.data.requests.map((data) => {
      //console.log(" markers.data.requests.map : " + JSON.stringify(data))
      var markerData = {
        lat: data.geo_location.split(",")[0],      
        lon: data.geo_location.split(",")[1],
        type: "requests",
        title: "requests   : " + data.user_detail.first_name + " " + data.user_detail.last_name,
        description: data.user_detail.first_name
      }         
      markerDataList.push(markerData);
    })

    markers.data.offers.map((data) => {
      //console.log(" markers.data.requests.map : " + JSON.stringify(data))
      var markerData = {
        lat: data.geo_location.split(",")[0],      
        lon: data.geo_location.split(",")[1],
        type: "Offers",
        title: "Offers  :  " + data.user_detail.first_name + " " + data.user_detail.last_name,
        description: data.user_detail.first_name
      }         
      markerDataList.push(markerData);
    })


    console.log(" markers.data.map : " + JSON.stringify(markerDataList))

    this.setState({markerList:markerDataList})
   //this.map.fitToElements(true);
   

  }


  onRegionChangeComplete(region){
    this.setState({ region });
    //console.log("onRegionChangeComplete")
    let mapBoundries = this.map.getMapBoundaries();
    mapBoundries.then((val) => {
      console.log("onRegionChangeComplete   " + JSON.stringify(val))
      this.state.boundries = val;
      var dis = getDistance(
        val.northEast,
        val.southWest
      );
      console.log(`Distance\n${dis} Meter\nor\n${dis / 1000} KM`);
      console.log("this.state.region.    " + JSON.stringify(this.state))
      this.getLocationSuggestions();
    })
  }


  getLocationSuggestions = () =>{

        this.setLanLon(this.state.region.latitude, this.state.region.longitude);
        let restApi = new API();


        reqObj =  restApi.locationSuggestion(this.state.region.latitude, this.state.region.longitude, "10.424", getDistance(this.state.boundries.northEast,this.state.boundries.southWest)/3);
      
        reqObj.then((val)=> {
        console.log("API Response Data  1  " + JSON.stringify(val))
        
        this.addMarker(val)
    });
  }

  componentDidMount() {
    //this.map.fitToElements(true);
   }

  render() {
      console.log(DeviceInfo.getUniqueId());
      const { navigation} = this.props;
    return (
      <View style={styles.container}>
       
        <MapView
          provider={this.props.provider}
          ref={ref => {
            this.map = ref;
          }}
          //mapType={MAP_TYPES.TERRAIN}
          //provider={PROVIDER_GOOGLE}
          onRegionChangeComplete={region => this.onRegionChangeComplete(region)}   
          style={styles.map}
          initialRegion={this.state.region}
          //onRegionChange={region => this.onRegionChange(region)}          
        >
            {this.state.markerList.map(data => (                  
                  <Marker
                      coordinate={{ latitude: data.lat, longitude: data.lon}}
                      title={ data.title}
                      description={data.description}
                  />
            ))}
        </MapView>
        {/*  
        <View style={[styles.bubble, styles.latlng]}>
          <Text style={styles.centeredText}>
            {this.state.region.latitude.toPrecision(7)},
            {this.state.region.longitude.toPrecision(7)}
          </Text>
        </View>
        
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.jumpRandom()}
            style={[styles.bubble, styles.button]}
          >
            <Text style={styles.buttonText}>Jump</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.animateRandom()}
            style={[styles.bubble, styles.button]}
          >
            <Text style={styles.buttonText}>Animate (Region)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.animateRandomCoordinate()}
            style={[styles.bubble, styles.button]}
          >
            <Text style={styles.buttonText}>Animate (Coordinate)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.animateToRandomBearing()}
            style={[styles.bubble, styles.button]}
          >
            <Text style={styles.buttonText}>Animate (Bearing)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.animateToRandomViewingAngle()}
            style={[styles.bubble, styles.button]}
          >
            <Text style={styles.buttonText}>Animate (View Angle)</Text>
          </TouchableOpacity>
        </View>
        */
        }
       
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
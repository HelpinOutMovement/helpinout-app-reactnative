/*
import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';

import MapView from 'react-native-maps';

import geolocation from '@react-native-community/geolocation';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const SAMPLE_REGION = {
  latitude: LATITUDE,
  longitude: LONGITUDE,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

class MapComponents extends React.Component {

    state = {
        
    }

    componentDidMount() {

        findCoordinates = () => {
            console.log("before ");
            console.log("before " + this.state);
          geolocation.getCurrentPosition(
              position => {
                  const location = JSON.stringify(position);
                  console.log("after " + SAMPLE_REGION.latitude);
                  console.log(position)
                  
                  this.setState({ position }); 
                  
                  
                 // console.log("after " + this.state);
              },
              error => Alert.alert(error.message),
                  { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
          );
          };
          findCoordinates();
        
    }

    
  render() {
    const maps = [];
    
    for (let i = 0; i < 10; i++) {
      maps.push(
        <MapView
          provider={this.props.provider}
          liteMode
          key={`map_${i}`}
          style={styles.map}
          initialRegion={SAMPLE_REGION}
        />
      );
    }
    return (
      <ScrollView style={StyleSheet.absoluteFillObject}>{maps}</ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: 200,
    marginVertical: 50,
  },
});

export default MapComponents;

*/
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Button
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import MapView, { MAP_TYPES, ProviderPropType , PROVIDER_GOOGLE} from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      deviceInfo:[]
    };
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
          style={styles.map}
          initialRegion={this.state.region}
          onRegionChange={region => this.onRegionChange(region)}
          
        />
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
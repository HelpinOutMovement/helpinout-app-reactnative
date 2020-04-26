import React from 'react';
import {View, Dimensions} from 'react-native';
import {Spinner} from 'native-base';

export default class SpinnerComponent extends React.Component {
    render(){
        return (
            <View style={{
                width: "100%",
                height: Dimensions.get("window").height,
                position: "absolute",
                justifyContent: "center",
                alignSelf: "center"
            }}>
                <View style={{
                    backgroundColor: "#ffffff",
                    width: "100%",
                    height: Dimensions.get("window").height,
                    position: "absolute",
                    justifyContent: "center",
                    alignSelf: "center",
                    opacity: 0.5
                }}>

                </View>
                <Spinner color='red' />
            </View>
        )
    }
}
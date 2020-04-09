import React  from 'react';
import {   Image } from 'react-native';
import {  Body, Text, Card, CardItem } from "native-base";


const CardComponent = (props)=>{
    
    return (
        <Card style={{ alignItems: "center" }}>
            <CardItem bordered >
              <Body>
                <Image
                  style={{ alignSelf:"center"}}
                  source={ props.path }/>
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Text> {props.label}</Text>
            </CardItem>
          </Card>
    )
};

export default CardComponent;
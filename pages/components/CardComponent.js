import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Body, Text, Card, CardItem, Grid, Row, Col } from "native-base";


const CardComponent = (props) => {
  if (props.singleRow) {
    return (
        <Card style={{ alignItems: "center" }}>
          <CardItem bordered >
            <Body>
              <Grid>
                <Row style={{}}>
                  <Col style={{ width: "30%" }}>
                    <Image
                      style={{ alignSelf: "flex-start", width: 70, height: 56 }}
                      source={props.path} />
                  </Col>
                  <Col style={{ width: "70%", alignItems: "flex-start" }}>
                    <Text
                      style={{
                        fontFamily: "Roboto-Regular",
                        fontSize: 16,
                        color: "#4F5065"
                      }}> Food </Text>
                    <Text style={{
                      fontFamily: "Roboto-Regular",
                      fontSize: 14,
                      color: "#4F50657A"
                    }}> 24 Requests near me </Text>
                    <Text style={{
                      fontFamily: "Roboto-Regular",
                      fontSize: 14,
                      color: "#4F50657A",
                      alignSelf: "flex-end"
                    }}>4200 Total</Text>
                  </Col>
                </Row>

              </Grid>

            </Body>
          </CardItem>
        </Card>
    )
  }
  return (
    
      <Card style={{ alignItems: "center" }} >
        <CardItem bordered  >
          <Body>
            <Image
              style={{ alignSelf: "center" }}
              source={props.path} />
          </Body>
        </CardItem>
        <CardItem footer bordered>
          <Text> {props.label}</Text>
        </CardItem>
      </Card>
   
  )
};

export default CardComponent;
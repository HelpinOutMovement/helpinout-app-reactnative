import React from 'react';
import { Image, TouchableOpacity, Linking, Platform } from 'react-native';
import { Body, Text, Card, CardItem, Grid, Row, Col } from "native-base";
import { default as MaterialIcon } from 'react-native-vector-icons/MaterialIcons';
import { BasicButton } from './ButtonComponent';
import AppConstant from '../../misc/AppConstant'

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


const TabCardComponent = (props) => {

  dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else { phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);
  };




  return (
    <Card style={{ alignItems: "center" }} >
      <CardItem bordered  >

        <Grid style={{ width: "100%", alignItems: "center" }}>
          <Row style={{ width: "90%", height: 20, backgroundColor: "yellow" }}>
            <Col style={{ width: "60%" }}>
              <Text style={{
                textAlign: "left",
                fontFamily: "Roboto-Medium",
                fontSize: 14,
                color: "#4F5065"
              }}> {props.name}</Text>
            </Col>
            <Col style={{ width: "40%", alignSelf: "flex-end" }}>
              <Image
                style={{ alignSelf: "center", width: 24, height: 19 }}
                source={props.helpOption} />
            </Col>
          </Row>
          <Row style={{ width: "90%", height: 90, borderColor: "green", borderWidth: 2 }}>
            <Col style={{ width: "90%", flex: 1, flexDirection: 'row' }}>
              <Text style={{
                width: "100%",
                textAlign: "left",
                fontFamily: "Roboto-Regular",
                fontSize: 14,
                flex: 1,
                color: "#4F5065B8"
              }}> {props.description}</Text>
            </Col>
          </Row>
          {
            (props.callerInfo) && (
              <Row style={{ width: "90%", height: 30, borderWidth: 2 }}>
                <Col style={{ width: "80%", flex: 1, borderColor: "green", flexDirection: 'row' }}>
                  <Text style={{
                    width: "100%",
                    textAlign: "left",
                    fontFamily: "Roboto-Regular",
                    fontSize: 14,
                    flex: 1,
                    color: "#4F5065B8"
                  }}> {props.callerInfo}</Text>
                </Col>
                <Col style={{ width: "20%" }}>

                  <TouchableOpacity onPress={() => {
                    dialCall(props.callerNumber)
                  }}>
                    <MaterialIcon name="call" style={{
                      fontSize: 24
                    }} />
                  </TouchableOpacity>

                </Col>
              </Row>
            )
          }
          <Row style={{ width: "90%" }}>
            <Col>
              <BasicButton 
                label="Rate / Report" 
                clickHandler={() => {props.clickHandler(props, AppConstant.APP_ACTION.RATE_REPORT)} }/>
            </Col>
            <Col>
              <BasicButton label="Delete"
              clickHandler={() => {props.clickHandler(props, AppConstant.APP_ACTION.DELETE)} }/>
            </Col>
          </Row>

        </Grid>

      </CardItem>
    </Card>
  )
}
export {
  TabCardComponent
}
export default CardComponent;
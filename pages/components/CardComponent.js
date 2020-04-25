import React from 'react';
import { Image, TouchableOpacity, Linking, Platform, View } from 'react-native';
import { Body, Text, Card, CardItem, Grid, Row, Col } from "native-base";
import translate from 'react-native-i18n';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { default as MaterialIcon } from 'react-native-vector-icons/MaterialIcons';
import { BasicButton } from './ButtonComponent';
import AppConstant from '../../misc/AppConstant'
import StaticImage from '../../styling/StaticImage';
import Utilities from '../../misc/Utils';
import { appLabelKey } from '../../misc/AppStrings';
import { App } from 'react-native-firebase';


const CardComponent = (props) => {
  if (props.singleRow) {
    return (
      <Card style={{
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        paddingVertical: 20,
        borderRadius: 10,
        borderBottomWidth: 1,
        shadowColor: '#4F5065CC',
        shadowOffset: { width: 5, height: 6 }
      }}>
        <CardItem  >
          <Body>
            <Grid>
              <Row style={{}}>
                <Col style={{ width: "30%" }}>
                  <Image
                    style={{
                      alignSelf: "flex-start",
                      width: 70,
                      height: 56,
                      marginLeft: 10
                    }}
                    source={props.path} />
                </Col>
                <Col style={{ width: "70%", alignItems: "flex-start" }}>
                  <Text
                    style={{
                      fontFamily: "Roboto-Regular",
                      fontSize: 16,
                      lineHeight: 18,
                      color: "#4F5065"
                    }}> {props.label} </Text>
                  <Text style={{
                    fontFamily: "Roboto-Regular",
                    fontSize: 14,
                    color: "#4F50657A"
                  }}> {props.nearMe} Requests near me </Text>
                  <Text style={{
                    fontFamily: "Roboto-Regular",
                    fontSize: 14,
                    color: "#4F50657A",
                    alignSelf: "flex-end",
                    marginRight: 10
                  }}>{props.total} Total</Text>
                </Col>
              </Row>
            </Grid>

          </Body>
        </CardItem>
      </Card>
    )
  }
  return (

    <Card style={{
      alignItems: "center",
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
      paddingVertical: 20,
      borderRadius: 10,
      borderBottomWidth: 1,
      shadowColor: '#4F5065CC',
      shadowOffset: { width: 5, height: 6 }
    }} >
      <CardItem   >
        <Body>
          <Image
            style={{ alignSelf: "center", height: 65, width: 79 }}
            source={props.path} resizeMode="contain" />
        </Body>
      </CardItem>
      <CardItem footer >
        <Text style={{
          textAlign: "center",
          fontFamily: "Roboto-Regular",
          fontSize: 14,
          color: "#4F5065CC"
        }}> {props.label}</Text>
      </CardItem>
    </Card>

  )
};


const RequesterInfoCardComponent = (props) => {

  const getCallerView = () => {
    const callerView = [];
    if (props.primayInfo && props.primayInfo.mobile_no_visibility && props.primayInfo.mobile_no_visibility == 1) {
      callerView.push(
        <TouchableOpacity
          style={{ alignSelf: "center" }}
          onPress={() => {
            dialCall(props.callerNumber)
          }}>
          <MaterialIcon name="call" style={{
            fontSize: 17
          }} />
        </TouchableOpacity>
      );
    }
    return callerView;

  }
  dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else { phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);
  };




  return (
    <Card style={{
      alignItems: "center",
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
      paddingVertical: 20,
      borderRadius: 10,
      borderBottomWidth: 1,
      shadowColor: '#4F5065CC',
      shadowOffset: { width: 5, height: 6 }
    }} >
      <CardItem >
        <View style={{ width: "100%", flexDirection: "column" }}>
          <View style={{ marginVertical: 10, justifyContent: "space-between", flexDirection: "row" }}>
            <View>
              <Text style={{
                textAlign: "left",
                fontFamily: "Roboto-Medium",
                fontSize: 14,
                color: "#000000"
              }}> {Utilities.getDateTime(props.dateTime)}</Text>
              <Text style={{
                textAlign: "left",
                fontFamily: "Roboto-Medium",
                fontSize: 14,
                color: "#000000"
              }}> {props.name}</Text>
              <View style={{ alignItems: "flex-start" }}>
                <AirbnbRating
                  defaultRating={props.primayInfo.rating_avg}
                  reviews={[]}
                  ratingCount={5}
                  fractions={1}
                  size={20}
                />
              </View>
            </View>
            <View>
              {
                getCallerView()
              }
            </View>

          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ width: "80%" }}>
              <Text style={{
                fontFamily: "Roboto-Regular",
                fontSize: 16,
                color: "#4F5065B8"
              }}> {translate.t("They_will_call_you_if_they_can_help_you")}</Text>
              <Text style={{ fontSize: 17 }}>{props.callerInfo}</Text>
            </View>
          </View>
          <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }}>
            <BasicButton
              label="Rate / Report"
              clickHandler={() => { props.clickHandler(props, AppConstant.APP_ACTION.RATE_REPORT) }} />
            <BasicButton label="Delete"
              clickHandler={() => { props.clickHandler(props, AppConstant.APP_ACTION.DELETE) }} />
          </View>
        </View>
      </CardItem>
    </Card>
  )
}
export {
  RequesterInfoCardComponent
}
export default CardComponent;
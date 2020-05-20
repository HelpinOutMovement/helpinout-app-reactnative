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
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import call from 'react-native-phone-call'

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
                      width: scale(70),
                      height: verticalScale(56),
                      marginLeft: 10, 
                      resizeMode:"contain"
                    }}
                    source={props.path} />
                </Col>
                <Col style={{ width: scale(200), alignItems: "flex-start" , borderWidth:0}}>
                  <Text
                  adjustsFontSizeToFit={true}  minimumFontScale={1}
                    style={{
                      fontFamily: "Roboto-Regular",
                      //fontSize: 16,
                      //lineHeight: 18,
                      color: "#4F5065"
                    }}> {props.label} </Text>
                  <Text adjustsFontSizeToFit={true}  minimumFontScale={1} style={{
                    fontFamily: "Roboto-Regular",
                    //fontSize: 14,
                    color: "#4F50657A"
                  }}> {props.nearMe} {translate.t("request_near_me")} </Text>
                  <View style={{alignSelf: "flex-end", height:verticalScale(18), marginTop:10}}>
                  <Text adjustsFontSizeToFit={true}  minimumFontScale={.5} style={{
                    fontFamily: "Roboto-Regular",
                    //fontSize: 14,
                    color: "#4F50657A",
                    alignSelf: "flex-end",
                    marginRight: 10
                  }}>{props.total} {translate.t("request_total")}</Text>
                  </View>
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
  JSON.stringify("RequesterInfoCardComponent")
  const getCallerView = () => {
    const callerView = [];
    if (props.primayInfo && props.primayInfo.mobile_no_visibility && props.primayInfo.mobile_no_visibility == 1) {
      callerView.push(

        <TouchableOpacity
          style={{ alignSelf: "center", alignItems: "center" }}
          onPress={() => {
            //dialCall(props.primayInfo.country_code+""+props.primayInfo.mobile_no)
            makeCall(props.primayInfo.country_code+""+props.primayInfo.mobile_no)
          }}>
          <MaterialIcon name="call" style={{
            fontSize: 17
          }} />
          <Text style={{
            fontSize: 12
          }}> Call them </Text>
        </TouchableOpacity>
      );
    }
    return callerView;

  }

  makeCall = (number) => {
    const args = {
        number: number, // String value with the number to call
        prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
    }
   call(args).catch(console.error)
}


  const dialCall = (number) => {
    if( props.clickHandler){
      props.clickHandler(props, AppConstant.APP_ACTION.CALL_THEM); 
    }
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else { phoneNumber = `telprompt:${number}`; }
    //Linking.openURL(phoneNumber);

      const url = 'tel:+16505555555';
      console.log("Calling Phone URL " + url)
      Linking.canOpenURL(url)
        .then((supported) => {
          console.log("Calling is Supported " + supported)
          if (supported) {
            return Linking.openURL(url)
              .catch((e) => {console.log(JSON.stringify(e))});
          }
        });
  };




  return (
    
    <Card style={{
      alignItems: "center",
      borderBottomWidth: 1
    }} >
      <CardItem >
        <View style={{ width: "100%", flexDirection: "column"}}>
          <View style={{ marginVertical: 0, justifyContent: "space-between", flexDirection: "row" }}>
            <View>
              <Text style={{
                textAlign: "left",
                fontFamily: "Roboto-Regular",
                fontWeight:"100",
                fontSize: 14,
                color: "#000000"
              }}> {Utilities.getDateTime(props.dateTime)}</Text>
              <Text style={{
                textAlign: "left",
                fontFamily: "Roboto-Medium",
                fontSize: 14,
                color: "#000000"
              }}> {props.name}</Text>
              <View style={{ alignItems: "flex-start", paddingVertical:10 }}>
                <Rating
                  isDisabled={true}
                  defaultRating={props.primayInfo.rating_avg}
                  reviews={[]}
                  ratingCount={5}
                  fractions={1}
                  size={10}
                  imageSize={20}
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
                fontSize: 14,
                color: "#4F5065B8"
              }}> {translate.t("request_call_him") }</Text>
              {console.log(JSON.stringify(props))}
              <Text style={{ fontSize: 17 }}>{props.callerInfo}</Text>
            </View>
          </View>
          <TouchableOpacity
              style={{
                  marginVertical: moderateScale(10), alignItems:"flex-start" 
              }}
              onPress={() => { props.clickHandler(props, AppConstant.APP_ACTION.VIEW_DETAILS) }}>

              <View style={{
                  backgroundColor: "#4F5065",
                  width: scale(100),
                  height: verticalScale(20),
                  justifyContent: "center",
                  borderRadius: 6,
                  alignItems: "center"
              }}>
                  <Text style={{
                      fontFamily: "Roboto-Regular",
                      fontSize: 12,
                      color: "#ffffff"
                  }}>{translate.t("view_details")}</Text>
              </View>
          </TouchableOpacity>
          <View style={{ marginTop: 10, flex:1, flexDirection: "row", justifyContent:"space-between", paddingHorizontal:10}}>
            <View style={{justifyContent:"space-between"}}>
            <BasicButton 
              label={translate.t("rate_report")}
              clickHandler={() => { props.clickHandler(props, AppConstant.APP_ACTION.RATE_REPORT) }} />
            </View>
            <View style={{justifyContent:"space-between"}}>
            <BasicButton label={translate.t("canceled")}
              clickHandler={() => { props.clickHandler(props, AppConstant.APP_ACTION.CANCEL) }} />
            </View>
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
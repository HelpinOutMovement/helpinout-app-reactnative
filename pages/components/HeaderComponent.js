import React from 'react';
import { Header, Left, Body, Right, Icon, Button, Title } from 'native-base';
import commonStyling from '../../styling/commonStyle';
import AppConstant from '../../misc/AppConstant';


const HeaderComponent = (props) => {
  console.log(" HeaderComponent props  " + JSON.stringify(props))
  // backgroundColor:props.bgColor? props.bgColor: ""
  return (
    <Header style={{ backgroundColor: props.bgColor ? props.bgColor : "#EE6B6B", height: 60, paddingBottom: 15 }}>
      <Left>
        <Button
          transparent
          onPress={() => { 
            if (!props.navigationHandler) { 
              if(props.route.params.request.activity_type === 1){
                props.navigation.navigate(AppConstant.APP_PAGE.MY_REQUEST_SCREEN)
              }else{
                props.navigation.navigate(AppConstant.APP_PAGE.MY_OFFERS_SCREEN)
              }
              //props.navigation.goBack() 
            }else {
              props.navigationHandler() 
            } }}>
          {props.hamburgerMenu && (<Icon name="menu" style={{ color: "#ffffff" }} />)}
          {!props.hamburgerMenu && (<Icon name="ios-arrow-back" style={{ color: "#ffffff" }} />)}
        </Button>
      </Left>
      <Body>
        <Title adjustsFontSizeToFit={true}  minimumFontScale={.6} numberOfLines={2} style={{
          color: "#ffffff",
          fontFamily: "Roboto-Medium",
          width: 300,
          borderWidth: 0,
          //fontSize: 18
        }}> {(props.title ? props.title : 'Need help with')} </Title>
      </Body>
      <Right />
    </Header>

  )
};

export default HeaderComponent;
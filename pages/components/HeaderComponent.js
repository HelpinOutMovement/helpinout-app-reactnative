import React  from 'react';
import {Container, Header, Left, Body, Right,Icon, Button, Title, Text , View} from 'native-base';
import commonStyling from '../../styling/commonStyle';


const HeaderComponent = (props)=>{
    // backgroundColor:props.bgColor? props.bgColor: ""
    return (
        <Header style={{
        backgroundColor: props.bgColor? props.bgColor: "",
        width: "100%",
        padding: "1%"
            
        }}>
          <Left >
          <Button transparent onPress={() => {
                console.log("navigation ", props.navigation)
                        props.navigation.goBack()
                    }}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <View style={{
              width: "70%",
              paddingTop: "4%",
              marginLeft: "3%"
          }}>
              <Title style={{
                  textAlign: "center",
                  fontFamily: "Roboto-Medium",
                  fontSize: 20,
                  color:"#ffffff"
              }}>  {props.title}</Title>
            <Title> </Title>
          </View>
        </Header>
    )
};

export default HeaderComponent;
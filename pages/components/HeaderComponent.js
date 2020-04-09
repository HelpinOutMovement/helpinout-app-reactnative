import React  from 'react';
import { Header, Left, Body, Right,Icon, Button, Title} from 'native-base';
import commonStyling from '../../styling/commonStyle';


const HeaderComponent = (props)=>{
    // backgroundColor:props.bgColor? props.bgColor: ""
    return (
      <Header style={{ backgroundColor: "#EE6B6B" }}>
      <Left>
        <Button
          transparent
          onPress={() => props.navigation.goBack()}>
          <Icon name="ios-arrow-back" style={{color:"#ffffff"}} />
        </Button>
      </Left>
      <Body>
        <Title style={{ 
          color: "#ffffff",
      fontFamily: "Roboto-Medium",
      fontSize: 18 
      }}> Need help with </Title>
      </Body>
      <Right />
    </Header>
    
    )
};

export default HeaderComponent;
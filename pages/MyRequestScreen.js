
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Header, Grid, Row, Col, Title, Left, Icon, Right, Button, Body, Content, Text, Footer, FooterTab, Card, CardItem } from "native-base";
import translate from 'react-native-i18n';
import { appLabelKey } from '../misc/AppStrings';
import AppConstant from '../misc/AppConstant';
import StaticImage from '../styling/StaticImage';
import ModalComponent from './components/ModalComponent';
import HeaderComponent from './components/HeaderComponent';
import TabWrapperComponent from './components/TabWrapperComponent';



const primaryData = [
    {
        id: 412,
        helpOption: StaticImage.FOOD,
        name: "Tina 11111Jamna",
        description: "has offered to help you. 14 April 2020, 10:45 am.as offered to help you. 14 April 2as offered to help you. 14 April 2",
        callerInfo: "Call them on +91 543053490 Time: 6pm to 9pm.",
        callerNumber: "+91543053490"
    },
    {
        id: 122,
        helpOption: StaticImage.MEDICINE,
        name: " Bhaskar Rao ",
        description: "has offered to help you. 14 April 2020, 10:45 am",
        callerInfo: "Call them on +91 543053490 Time: 6pm to 9pm.",
        callerNumber: "+91543053490"
    }
];

const secondaryData = [
    {
        id: 121,
        helpOption: StaticImage.AMBULANCE,
        name: "Shyam Narayan ",
        description: "was sent a help request on 14 April 2020, 10:45 am They will call you if they can help you.",
    },
];
function MyRequestScreen(props) {
    const colorTheme = "#EE6B6B";
    const [showModal, setShowModal] = useState(false);
    const [modalInfo, setModalInfo] = useState({});

    
    const primaryActionHandler = (ele, actions) => {
        console.log(ele.id, "$$$$", actions);
        if(actions === AppConstant.APP_ACTION.RATE_REPORT) {
            setModalInfo({
                type:AppConstant.APP_ACTION.RATE_REPORT,
                ...ele
            });
            setShowModal(!showModal);
        }
    }
    const secondaryActionHandler = (ele, actions) => {
        console.log(ele.id, "$$$$", actions);
    }
    
    const closePopUp = () => {
        setShowModal(!showModal);
    }
    return (
        <Container>
            <HeaderComponent {...props}
                title="My Requests "
                bgColor={colorTheme} />
            <Content padder  >
                <Grid>
                    {
                    (<TabWrapperComponent 
                    primaryTabTitle={translate.t(appLabelKey.offers_Received)}
                    secondaryTabTitle={translate.t(appLabelKey.requests_Sent)}
                    primayTabData={primaryData}
                    primaryActionHandler={primaryActionHandler}
                    secondaryActionHandler={secondaryActionHandler}
                    secondaryTabData={secondaryData}
                        />)
                     }
                </Grid>

            </Content>
            <ModalComponent 
                {...modalInfo}
                viewName={(modalInfo && modalInfo.type)? modalInfo.type : ""}
                showModal={showModal} 
                closePopUp={closePopUp} />
       <Footer>                        
          <FooterTab>
            <Button vertical onPress={() => props.navigation.navigate(AppConstant.APP_PAGE.DASHBOARD)}>
              <Icon name="ios-home" style={{color:"red"}}/>
              <Text>Home</Text>
            </Button>
            <Button vertical active onPress={() => props.navigation.navigate(AppConstant.APP_PAGE.MY_REQUEST_SCREEN)}>
              <Icon name="camera" />
              <Text>My Requests</Text>
            </Button>
            <Button vertical onPress={() => props.navigation.navigate(AppConstant.APP_PAGE.MY_OFFERS_SCREEN)}>
              <Icon active name="navigate" />
              <Text>My Offers</Text>
            </Button>          
          </FooterTab>
        </Footer>                
        </Container>
    );
}

export default MyRequestScreen;
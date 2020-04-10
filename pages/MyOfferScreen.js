
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Header, Grid, Row, Col, Title, Left, Icon, Right, Button, Body, Content, Text, Card, CardItem } from "native-base";
import translate from 'react-native-i18n';
import { appLabelKey } from '../misc/AppStrings';
import AppConstant from '../misc/AppConstant';
import StaticImage from '../styling/StaticImage';
import ModalComponent from './components/ModalComponent';
import HeaderComponent from './components/HeaderComponent';
import TabWrapperComponent from './components/TabWrapperComponent';


const primaryData = [
    {
        id:412,
        helpOption:StaticImage.FOOD,
        name:"Tina 11111Jamna",
        description:"has offered to help you. 14 April 2020, 10:45 am.as offered to help you. 14 April 2as offered to help you. 14 April 2",
        callerInfo: "Call them on +91 543053490 Time: 6pm to 9pm.",
        callerNumber:"+91543053490"
    },
    {
        id:122,
        helpOption:StaticImage.MEDICINE,
        name:" Bhaskar Rao ",
        description:"has offered to help you. 14 April 2020, 10:45 am",
        callerInfo: "Call them on +91 543053490 Time: 6pm to 9pm.",
        callerNumber:"+91543053490"
    }
];

const secondaryData = [
    {
        id:121,
        helpOption:StaticImage.AMBULANCE,
        name:"Shyam Narayan ",
        description:"was sent a help request on 14 April 2020, 10:45 am They will call you if they can help you.",
    },
];

function MyOfferScreen(props) {
    const colorTheme = "#4F5065";
    const [showModal, setShowModal] = useState(false);
    const [modalInfo, setModalInfo] = useState({});


    const primaryActionHandler = (ele , actions)=> {
        console.log(ele.id, "$$$$", actions);
        if(actions === AppConstant.APP_ACTION.RATE_REPORT) {
            setModalInfo({
                type:AppConstant.APP_ACTION.RATE_REPORT,
                ...ele
            });
            setShowModal(!showModal);
        }
    }
    const secondaryActionHandler = (ele , actions)=> {
        console.log(ele.id, "$$$$", actions);
    }
    const closePopUp = () => {
        setShowModal(!showModal);
    }
    return (
        <Container>
            <HeaderComponent {...props} 
                    title="My Offers " 
                    bgColor={colorTheme} />
            <Content padder  >
                <Grid>
                <TabWrapperComponent 
                    primaryTabTitle={translate.t(appLabelKey.offers_Received)}
                    secondaryTabTitle={translate.t(appLabelKey.offers_Sent)}
                    primayTabData={primaryData}
                    primaryActionHandler={primaryActionHandler}
                    secondaryActionHandler={secondaryActionHandler}
                    secondaryTabData={secondaryData}
                        />
                   
                </Grid>

            </Content>
            <ModalComponent 
                {...modalInfo}
                viewName={(modalInfo && modalInfo.type)? modalInfo.type : ""}
                showModal={showModal} 
                closePopUp={closePopUp} />
        </Container>
    );
}

export default MyOfferScreen;
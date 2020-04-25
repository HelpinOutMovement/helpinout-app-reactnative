
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Container, Header, Grid, Row, Col, Title, Left, Icon, Right, Button, Body, Content, Text, Footer, FooterTab, Card, CardItem } from "native-base";
import translate from 'react-native-i18n';
import { DrawerActions } from '@react-navigation/native';
import { TabCardComponent } from './components/CardComponent';
import {apiInstance} from "../APIClient/API";


import { appLabelKey } from '../misc/AppStrings';
import AppConstant from '../misc/AppConstant';
import StaticImage from '../styling/StaticImage';
import ModalComponent from './components/ModalComponent';
import HeaderComponent from './components/HeaderComponent';
import TabWrapperComponent from './components/TabWrapperComponent';


const realReq = [
    {
        "activity_type": 1,
        "activity_uuid": "0C7ABDEE-F88B-46CD-8A40-445C04799ED1",
        "date_time": "2020-03-24T16:19:36.000-05:30",
        "activity_category": 1,
        "activity_count": 1,
        "geo_location": "17.78583400,78.40641700",
        "status": 1,
        "activity_detail": [
            {
                "detail": "Bead",
                "quantity": 20
            }
        ]
    },
    {
        "activity_type": 1,
        "activity_uuid": "A1DD40A8-00F9-4AE3-9525-E595BBBDCE68",
        "date_time": "2020-03-23T23:22:51.000-05:30",
        "activity_category": 2,
        "activity_count": 1,
        "geo_location": "17.44303093,78.52630595",
        "status": 1,
        "activity_detail": [
            {
                "volunters_required": 1,
                "volunters_detail": "Clean\t\t ",
                "volunters_quantity": 5,
                "technical_personal_required": 1,
                "technical_personal_detail": "Lab ",
                "technical_personal_quantity": 4
            }
        ]
    },
    {
        "activity_type": 1,
        "activity_uuid": "4058E8B8-E76F-487F-B723-820612901761",
        "date_time": "2020-03-23T23:17:31.000-05:30",
        "activity_category": 2,
        "activity_count": 1,
        "geo_location": "17.78583400,78.40641700",
        "status": 1
    },
    {
        "activity_type": 1,
        "activity_uuid": "49D9CE23-FADE-4B1E-A014-281DA2910DEB",
        "date_time": "2020-03-23T23:12:47.000-05:30",
        "activity_category": 2,
        "activity_count": 1,
        "geo_location": "17.78583400,78.40641700",
        "status": 1
    },
    {
        "activity_type": 1,
        "activity_uuid": "41832912-3259-4179-BA35-20732834A4CE",
        "date_time": "2020-03-23T22:02:57.000-05:30",
        "activity_category": 7,
        "activity_count": 1,
        "geo_location": "17.78583400,78.40641700",
        "status": 1,
        "activity_detail": [
            {
                "quantity": 12
            }
        ]
    },
    {
        "activity_type": 1,
        "activity_uuid": "E9192F61-FD62-4BF0-9B56-581BD7C95A55",
        "date_time": "2020-03-23T21:58:36.000-05:30",
        "activity_category": 1,
        "activity_count": 1,
        "geo_location": "17.78583400,78.40641700",
        "status": 1,
        "activity_detail": [
            {
                "detail": "We’re",
                "quantity": 1
            }
        ]
    },
    {
        "activity_type": 1,
        "activity_uuid": "DFBFDE42-85C9-407E-82F1-09E1074CC1F2",
        "date_time": "2020-03-23T21:53:25.000-05:30",
        "activity_category": 1,
        "activity_count": 1,
        "geo_location": "17.78583400,78.40641700",
        "status": 1
    },
    {
        "activity_type": 1,
        "activity_uuid": "D0B8FA89-C62F-46C9-83CA-8AE6BCD3C2E1",
        "date_time": "2020-03-23T21:43:10.000-05:30",
        "activity_category": 1,
        "activity_count": 1,
        "geo_location": "17.78583400,78.40641700",
        "status": 1
    },
    {
        "activity_type": 1,
        "activity_uuid": "4D91F87E-F027-4AFD-A6E8-6D2E39105B9D",
        "date_time": "2020-03-23T21:30:35.000-05:30",
        "activity_category": 1,
        "activity_count": 2,
        "geo_location": "18.07793179,78.40641700",
        "status": 1
    },
    {
        "activity_type": 1,
        "activity_uuid": "7C670D99-1FBC-4898-A6BB-35F5780EF678",
        "date_time": "2020-03-23T21:27:08.000-05:30",
        "activity_category": 1,
        "activity_count": 95,
        "geo_location": "17.78583400,78.40641700",
        "status": 1
    },
    {
        "activity_type": 1,
        "activity_uuid": "0F924B44-280F-41A3-8532-538FBD139FA7",
        "date_time": "2020-03-23T20:19:42.000-05:30",
        "activity_category": 1,
        "activity_count": 2,
        "geo_location": "18.75258903,73.51005096",
        "status": 1
    },
    {
        "activity_type": 1,
        "activity_uuid": "857D19CB-A092-4DEF-A6B1-CDDF5B34D3BA",
        "date_time": "2020-03-21T05:04:00.000-05:30",
        "activity_category": 1,
        "activity_count": 1,
        "geo_location": "65.29798048,-17.78159094",
        "status": 1,
        "activity_detail": [
            {
                "detail": "Dinner",
                "quantity": 10
            }
        ]
    },
    {
        "activity_type": 1,
        "activity_uuid": "69F67A85-05BC-4A25-92FD-C714223CE854",
        "date_time": "2020-03-21T03:00:21.000-05:30",
        "activity_category": 1,
        "activity_count": 1,
        "geo_location": "37.78583400,-122.40641700",
        "status": 1,
        "activity_detail": [
            {
                "detail": "Fruits",
                "quantity": 20
            }
        ]
    },
    {
        "activity_type": 1,
        "activity_uuid": "C84E4CAD-F5D0-4694-AA05-25C28749C22B",
        "date_time": "2020-03-21T02:59:03.000-05:30",
        "activity_category": 8,
        "activity_count": 1,
        "geo_location": "41.33934470,-119.15714783",
        "status": 1,
        "activity_detail": [
            {
                "detail": "Ventilator",
                "quantity": 5
            }
        ]
    },
    {
        "activity_type": 1,
        "activity_uuid": "4CA241D0-63A2-4957-A532-79C2119AFC7E",
        "date_time": "2020-03-21T02:59:03.000-05:30",
        "activity_category": 8,
        "activity_count": 1,
        "geo_location": "41.33934470,-119.15714783",
        "status": 1,
        "activity_detail": [
            {
                "detail": "Ventilator",
                "quantity": 5
            }
        ]
    }
]

function MyRequestScreen(props) {
    const colorTheme = "#EE6B6B";
    const activity_type = 1;
    const [showModal, setShowModal] = useState(false);
    const [modalInfo, setModalInfo] = useState({});
    const [requestInformation, setRequestInformation] = useState([]);
    useEffect(()=>{
        apiInstance.userPastActivity(activity_type).then(resp => {
            setRequestInformation(resp.data.requests);
        }).catch((e)=>{
            setRequestInformation([]);
        })
    },[]);


    const primaryActionHandler = (ele, actions) => {
        console.log(ele.id, "$$$$", actions);
        if (actions === AppConstant.APP_ACTION.RATE_REPORT) {
            setModalInfo({
                type: AppConstant.APP_ACTION.RATE_REPORT,
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

    const getRequestList = () => {
        const cardListView = [];
        // requestInformation.forEach((singleOption, index) => {
            realReq.forEach((singleOption, index) => {
            cardListView.push((
                <TabCardComponent
                    key={singleOption.activity_uuid}
                    count_suffix= {translate.t("offers")}
                    colorTheme={colorTheme}
                    {...singleOption}
                    clickHandler={primaryActionHandler} />
            ));
        });
        return cardListView;

    }
    //hamburgerMenu={true}
    /*
     navigationHandler={() => {
                    console.log('HERE!!');
                    props.navigation.dispatch(DrawerActions.openDrawer())
                }}
    */
    return (
        <Container>
            <HeaderComponent {...props}
               

                title={translate.t("My_Requests")}
                bgColor={colorTheme} />
            <Content   >
                {getRequestList()}
                {
                    /**
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
                     */
                }

            </Content>
            <ModalComponent
                {...modalInfo}
                viewName={(modalInfo && modalInfo.type) ? modalInfo.type : ""}
                showModal={showModal}
                closePopUp={closePopUp} />
            <Footer>
                <FooterTab>
                    <Button vertical onPress={() => props.navigation.navigate(AppConstant.APP_PAGE.DASHBOARD)}>
                        <Icon name="ios-home" style={{ color: "red" }} />
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
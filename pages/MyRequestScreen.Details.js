import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Container, Header, Grid, Row, Col, Title, Left, Icon, Right, Button, Body, Content, Text, Footer, FooterTab, Card, CardItem } from "native-base";
import translate from 'react-native-i18n';
import { BasicFilledButton } from './components/ButtonComponent';
import { PastOfferRequestComponent } from './components/PastOfferRequestComponent';
import { apiInstance } from "../APIClient/API";
import AppConstant from '../misc/AppConstant';
import { RequesterInfoCardComponent } from './components/CardComponent';
import ModalComponent from './components/ModalComponent';
import HeaderComponent from './components/HeaderComponent';

const realReq = [
    {
        "activity_type": 1,
        "activity_uuid": "9ff0d5db-f154-4057-a169-80cfd7ee4910",
        "date_time": "2020-04-11T15:49:50.000+05:30",
        "activity_category": 1,
        "activity_count": 1,
        "geo_location": "18.59409090,73.90899140",
        "status": 1,
        "activity_detail": [
            {
                "detail": "Bshs",
                "quantity": 1
            }
        ],
        "mapping": [
            {
                "offer_detail": {
                    "activity_type": 2,
                    "activity_uuid": "F390A4C5-81A6-481D-B926-34ECEB942B7B",
                    "date_time": "2020-03-21T22:41:31.000-05:30",
                    "activity_category": 1,
                    "activity_count": 1,
                    "geo_location": "19.23246073,74.80682373",
                    "status": 1,
                    "offer_condition": "",
                    "activity_detail": [
                        {
                            "detail": "Lunch",
                            "quantity": 20
                        }
                    ],
                    "user_detail": {
                        "country_code": "+91",
                        "mobile_no": "9730131849",
                        "first_name": "VSRV",
                        "last_name": "Raghavan",
                        "mobile_no_visibility": 0,
                        "user_type": 2,
                        "org_name": null,
                        "org_type": null,
                        "org_division": null,
                        "rating_avg": 0,
                        "rating_count": 0
                    }
                },
                "status": 1,
                "mapping_initiator": 1,
                "rate_report": "{}"
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

function MyRequestDetailScreen(props) {
    const colorTheme = "#EE6B6B";
    const [showModal, setShowModal] = useState(false);
    const [modalInfo, setModalInfo] = useState({});
    const requestParams = (props.route && props.route.params && props.route.params.request) ? props.route.params.request : {};
    const closePopUp = () => {
        setShowModal(!showModal);
    }

    const primaryActionHandler = (ele, actions) => {
        console.log(ele, "$$$$", actions);

        if (actions === AppConstant.APP_ACTION.RATE_REPORT) {
            setModalInfo({
                type: AppConstant.APP_ACTION.RATE_REPORT,
                ...ele
            });
            setShowModal(!showModal);
        }

    }

    const getMappedRequestView = () => {
        const mappedRequestView = [];
        if (requestParams && requestParams.mapping && requestParams.mapping.length) {
            requestParams.mapping.forEach((singleMapping) => {
                console.log("singleMapping:: ", singleMapping)
                mappedRequestView.push(
                    <RequesterInfoCardComponent
                        name={singleMapping.offer_detail.user_detail.first_name + " " + singleMapping.offer_detail.user_detail.last_name}
                        primayInfo={singleMapping.offer_detail.user_detail}
                        dateTime={singleMapping.offer_detail.date_time}
                        clickHandler={primaryActionHandler}
                        {...singleMapping} />)
            });
        }

        // if no items 
        if (mappedRequestView.length <= 0) {
            mappedRequestView.push(
                <View>
                    <Text> This is Request Details </Text>
                </View>
            )
        }

        return mappedRequestView;
    }

    return (
        <Container>
            <HeaderComponent {...props}
                title={translate.t("Request_have_been_sent_to")}
                bgColor={colorTheme} />
            <Content   >
                {getMappedRequestView()}
            </Content>
            <ModalComponent
                {...modalInfo}
                viewName={(modalInfo && modalInfo.type) ? modalInfo.type : ""}
                showModal={showModal}
                closePopUp={closePopUp} />
            <Footer>
                <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                    <BasicFilledButton
                        clickHandler={() => { props.closePopUp() }}
                        label={translate.t("Cancel_This_Request")}
                        colorTheme={colorTheme} />
                </View>
            </Footer>
        </Container>
    );
}

export default MyRequestDetailScreen;
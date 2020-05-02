
import React, { useState, useEffect } from 'react';
import {  View } from 'react-native';
import { Container, Content, Text, Footer} from "native-base";
import translate from 'react-native-i18n';
import { useFocusEffect } from '@react-navigation/native';
import { PastOfferRequestComponent } from './components/PastOfferRequestComponent';
import {apiInstance} from "../APIClient/API";
import AppConstant from '../misc/AppConstant';
import HeaderComponent from './components/HeaderComponent';
import SpinnerComponent from './components/SpinnerComponent';
import FooterTabComponent from './components/FooterTabComponent';

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
            "detail": "Description of the request comes here and maximum two lines...",
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
        "activity_uuid": "fbd7e6c0-5282-4817-8364-7e1600d92db6",
        "date_time": "2020-04-17T21:43:28.000+05:30",
        "activity_category": 4,
        "activity_count": 1,
        "geo_location": "28.64439120,77.36176942",
        "status": 1,
        "activity_detail": [
          {
            "detail": "Gd",
            "quantity": 35
          }
        ],
        "mapping": [
          {
            "offer_detail": {
              "activity_type": 2,
              "activity_uuid": "89af57b3-f148-4162-bc08-d76d93bb6389",
              "date_time": "2020-04-17T21:43:07.000+05:30",
              "activity_category": 4,
              "activity_count": 1,
              "geo_location": "28.64426530,77.36177710",
              "status": 1,
              "offer_condition": "",
              "activity_detail": [
                {
                  "detail": "Bdnd",
                  "quantity": 98
                }
              ],
              "user_detail": {
                "country_code": "+91",
                "mobile_no": "8800579215",
                "first_name": "Avneesh",
                "last_name": "Kumar Gupta",
                "mobile_no_visibility": 1,
                "user_type": 2,
                "org_name": "Organization",
                "org_type": 4,
                "org_division": "Unit2",
                "rating_avg": 3.5,
                "rating_count": 4
              }
            },
            "status": 1,
            "mapping_initiator": 1,
            "rate_report":  {}
          },
          {
            "offer_detail": {
              "activity_type": 2,
              "activity_uuid": "8123123129af57b3-f148-4162-bc08-d76d93bb6389",
              "date_time": "2020-04-17T21:43:07.000+05:30",
              "activity_category": 4,
              "activity_count": 1,
              "geo_location": "28.64426530,77.36177710",
              "status": 1,
              "offer_condition": "",
              "activity_detail": [
                {
                  "detail": "Bdnd",
                  "quantity": 98
                }
              ],
              "user_detail": {
                "country_code": "+91",
                "mobile_no": "8800579215",
                "first_name": "ANLC",
                "last_name": " Gupta",
                "mobile_no_visibility": 0,
                "user_type": 2,
                "org_name": "Organization",
                "org_type": 4,
                "org_division": "Unit2",
                "rating_avg": 2,
                "rating_count": 4
              }
            },
            "status": 1,
            "mapping_initiator": 1,
            "rate_report":  {}
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
    const [requestInformation, setRequestInformation] = useState([]);
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(()=>{
      setShowSpinner(true);
      apiInstance.userPastActivity(activity_type).then(resp => {
          setShowSpinner(false);
          setRequestInformation(resp.data.requests);
      }).catch((e)=>{
          setShowSpinner(false);
          setRequestInformation([]);
      })
    },[])
    
    /*
    useFocusEffect(
      React.useCallback(() => {
        setShowSpinner(true);
        apiInstance.userPastActivity(activity_type).then(resp => {
            setShowSpinner(false);
            setRequestInformation(resp.data.requests);
        }).catch((e)=>{
            setShowSpinner(false);
            setRequestInformation([]);
        })
      }, [])
    );
  */
    const primaryActionHandler = (ele, actions) => {
        console.log(ele, "$$$$", actions);
        if(actions === AppConstant.APP_ACTION.SENT_REQUEST) {
            props.navigation.navigate(AppConstant.APP_PAGE.MY_REQUEST_SENT_REQUEST_SCREEN,{
                request: ele
            });
        } else if (actions === AppConstant.APP_ACTION.SEARCH_FOR_PROVIDERS) {
          props.navigation.navigate(AppConstant.APP_PAGE.SEARCH_HELP_PROVIDERS_REQUESTERS,
             {  
               activity_type:activity_type,
               activity_uuid:ele.activity_uuid,
               activity_category:ele.activity_category, 
               region:{}, 
               address:"",
               latlon:ele.geo_location
              })
        } else if (actions === AppConstant.APP_ACTION.OFFERS_RCVD) {
          props.navigation.navigate(AppConstant.APP_PAGE.MY_REQUEST_SENT_REQUEST_SCREEN,{
            request: ele,
            screenType:AppConstant.APP_ACTION.OFFERS_RCVD
        });
        }
    }

    const getRequestList = () => {
        let cardListView = [];
        requestInformation.forEach((singleOption, index) => {
        // realReq.forEach((singleOption, index) => {
            cardListView.push((
                <PastOfferRequestComponent
                    key={singleOption.activity_uuid}
                    count_suffix= {translate.t("total_offers")}
                    colorTheme={colorTheme}
                    {...singleOption}
                    primayActionLabel={translate.t("search_for_help_provider")}
                    secondaryActionLabel={translate.t("sent_requests")}
                    clickHandler={primaryActionHandler}
                   />
            ));
        });

        
        if(cardListView.length <= 0) {
            cardListView.push(<View>
                <Text>
                    {translate.t("label_no_request_send")}
                </Text>
            </View>)
        }
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
                title={translate.t("title_my_request")}
                bgColor={colorTheme} />
            <Content   >
                {getRequestList()}
            </Content>
            <Footer>
                <FooterTabComponent {...props} activeTab={AppConstant.APP_FOOTER_TABS.MY_REQUEST} />
            </Footer>
            {showSpinner && (<SpinnerComponent />)}
        </Container>
    );
}

export default MyRequestScreen;
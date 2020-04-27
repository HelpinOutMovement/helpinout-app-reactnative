import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Dimensions } from 'react-native';
import { Container, Spinner, Content, Text, Footer, FooterTab, Card, CardItem } from "native-base";
import translate from 'react-native-i18n';
import { BasicFilledButton } from './components/ButtonComponent';
import { apiInstance } from "../APIClient/API";
import AppConstant from '../misc/AppConstant';
import { RequesterInfoCardComponent } from './components/CardComponent';
import ModalComponent from './components/ModalComponent';
import HeaderComponent from './components/HeaderComponent';
import SpinnerComponent from './components/SpinnerComponent';


function MyOfferSentOfferScreen(props) {
    const colorTheme = "#4F5065";
    const [showModal, setShowModal] = useState(false);
    const [modalInfo, setModalInfo] = useState({});
    const [showSpinner, setShowSpinner] = useState(false);
    const [mappedRequestEntity, setMappedRequestEntity] = useState([]);
    const requestParams = (props.route && props.route.params && props.route.params.request) ? props.route.params.request : {};
    // set the content
    useEffect(()=>{
        if (requestParams && requestParams.mapping && requestParams.mapping.length){
               setMappedRequestEntity(requestParams.mapping);
             }
    }, [])
    const closePopUp = () => {
        setShowModal(!showModal);
    }

    const updateMappedRequest = () => {
        let mapLocalRequest = [];
        mappedRequestEntity.forEach((singleMapping) => {
            if(singleMapping.offer_detail.activity_uuid !== ele.offer_detail.activity_uuid){
                mapLocalRequest.push(singleMapping);
            }
        });
        setMappedRequestEntity(mapLocalRequest)
    }

    const primaryActionHandler = (ele, actions) => {
        console.log(ele, "$$$$", actions);

        if (actions === AppConstant.APP_ACTION.RATE_REPORT) {
            setModalInfo({
                type: AppConstant.APP_ACTION.RATE_REPORT,
                ...ele
            });
            setShowModal(!showModal);
        } else if (actions === AppConstant.APP_ACTION.CANCEL) {
            apiInvocation({
                uuid:ele.offer_detail.activity_uuid, 
                actType:ele.offer_detail.activity_type,
                successCallback:updateMappedRequest,
                deleteType:AppConstant.APP_DELET_ACTION.DELETE_MAPPING
            });
        }

    }

    const getMappedRequestView = () => {
        const mappedRequestView = [];
        if (mappedRequestEntity.length > 0) {
            mappedRequestEntity.forEach((singleMapping) => {
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
                    <Text> {translate.t("Your_offer_was_registered_but_no_direct_offer_has_been_sent_to_anyone_yet")} </Text>
                    <Text> {translate.t("Others_may_request_your_help_when_they_see_your_offer_on_the_map")} </Text>
                    <Text> {translate.t("This_request_will_remain_active_until_you_cancel_it")} </Text>
                </View>
            )
        }

        return mappedRequestView;
    }

    const onActionClick = (ratingPayload) => {
        console.log(ratingPayload);
        closePopUp();
    }

    const apiInvocation = ({uuid, actType, successCallback, deleteType}) => {
        
        if(uuid && actType) {
            setShowSpinner(true);
            let apiInstancePromise;
            //same is used for cancellation & delete request
            if(deleteType === AppConstant.APP_DELET_ACTION.DELETE_ACTIVITY) {
                apiInstancePromise = apiInstance.activityDelete(uuid,actType);
            } else if(deleteType === AppConstant.APP_DELET_ACTION.DELETE_MAPPING) {
                apiInstancePromise = apiInstance.mappingDelete(uuid,actType);
            }
            apiInstancePromise.then((resp) => {
                    setShowSpinner(false);
                    if(successCallback) {
                        successCallback(resp)
                    } else {
                        props.navigation.goBack();
                    }
                }).catch((err) => {
                    setShowSpinner(false);
                    console.log(err)
                });
        }
    }
    const cancelRequest = ( ) => {
        apiInvocation(
            {
                uuid: props.route.params.request.activity_uuid, 
                actType:props.route.params.request.activity_type,
                deleteType:AppConstant.APP_DELET_ACTION.DELETE_ACTIVITY
            })
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
                closePopUp={closePopUp}
                onActionClick={onActionClick} />
            <Footer>
                <View style={{
                    marginTop: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "90%"
                }}>
                    <BasicFilledButton
                        buttonStyle={{
                            borderRadius: 10
                        }}
                        clickHandler={() => { cancelRequest() }}
                        label={translate.t("Cancel_This_Offer")}
                        colorTheme={colorTheme} />
                </View>
            </Footer>
            {showSpinner && (<SpinnerComponent />)}

        </Container>
    );
}

export default MyOfferSentOfferScreen;
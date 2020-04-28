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


function MyRequestSentRequestScreen(props) {
    const colorTheme = "#EE6B6B";
    const typeRestriction = 'requests';
    const [showModal, setShowModal] = useState(false);
    const [modalInfo, setModalInfo] = useState({});
    const [showSpinner, setShowSpinner] = useState(false);
    const [mappedRequestEntity, setMappedRequestEntity] = useState([]);
    const requestParams = (props.route && props.route.params && props.route.params.request) ? props.route.params.request : {};
    const createdIdParams = (props.route && props.route.params && props.route.params.created_activity) ? props.route.params.created_activity : {};
    // set the content
    useEffect(()=>{
        if (requestParams && requestParams.mapping && requestParams.mapping.length){
               setMappedRequestEntity(requestParams.mapping);
        }else if (createdIdParams && createdIdParams.activity_uuid) {
            // work-around for now
            apiInstance.userPastActivity(activity_type).then(resp => {
                setShowSpinner(false);
                let localRequestParam = {};
                if(resp.data && resp.data[typeRestriction] && resp.data[typeRestriction].length > 0) {
                    resp.data[typeRestriction].every(singleRequest => {
                        if(singleRequest.activity_uuid == createdIdParams.activity_uuid) {
                            localRequestParam = singleRequest;
                            return false;
                        }
                        return true;
                    });
                    setMappedRequestEntity(localRequestParam.mapping);
                }
            }).catch((e)=>{
                setShowSpinner(false);
                setMappedRequestEntity([]);
            })
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
                    mapping_initiator:ele.mapping_initiator,
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
                    <Text> {translate.t("Your_request_was_registered_but_no_direct_request_has_been_sent_to_anyone_yet")} </Text>
                    <Text> {translate.t("Others_may_offer_to_help_you_when_they_see_your_request_on_the_map")} </Text>
                </View>
            )
        }

        return mappedRequestView;
    }

    const onActionClick = (ratingPayload) => {
        console.log(ratingPayload);
        closePopUp();
    }

    const apiInvocation = ({uuid, actType, successCallback, deleteType, mapping_initiator}) => {
        
        if(uuid && actType) {
            setShowSpinner(true);
            let apiInstancePromise;
            //same is used for cancellation & delete request
            if(deleteType === AppConstant.APP_DELET_ACTION.DELETE_ACTIVITY) {
                apiInstancePromise = apiInstance.activityDelete(uuid,actType);
            } else if(deleteType === AppConstant.APP_DELET_ACTION.DELETE_MAPPING) {
                let rootActivityUUID = (requestParams && requestParams.activity_uuid) ? 
                requestParams.activity_uuid : (createdIdParams && 
                createdIdParams.activity_uuid)? createdIdParams.activity_uuid : '';
                apiInstancePromise = apiInstance.mappingDelete(rootActivityUUID, actType, mapping_initiator , uuid);
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
                        label={translate.t("Cancel_This_Request")}
                        colorTheme={colorTheme} />
                </View>
            </Footer>
            {showSpinner && (<SpinnerComponent />)}

        </Container>
    );
}

export default MyRequestSentRequestScreen;
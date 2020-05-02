import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { Container, Spinner, Content, Text, Footer, FooterTab, Card, CardItem, } from "native-base";
import { BasicFilledButton } from './ButtonComponent';
import { apiInstance } from "../../APIClient/API";
import AppConstant from '../../misc/AppConstant';
import { RequesterInfoCardComponent } from './CardComponent';
import ModalComponent from './ModalComponent';
import HeaderComponent from './HeaderComponent';
import SpinnerComponent from './SpinnerComponent';


const RequesterAndOffererListing = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [modalInfo, setModalInfo] = useState({});
    const [showSpinner, setShowSpinner] = useState(false);
    const [mappedRequestEntity, setMappedRequestEntity] = useState([]);
    
    // set the content
    useEffect(() => {
        if (props.requestParams && props.requestParams.mapping && props.requestParams.mapping.length) {
            setMappedRequestEntity(props.requestParams.mapping);
        } else if (props.createdIdParams && props.createdIdParams.activity_uuid) {
            // work-around for now
            apiInstance.userPastActivity(props.createdIdParams.activity_type).then(resp => {
                setShowSpinner(false);
                let localRequestParam = {};
                if (resp.data && resp.data[props.typeRestriction] && resp.data[props.typeRestriction].length > 0) {
                    resp.data[props.typeRestriction].every(singleRequest => {
                        if (singleRequest.activity_uuid == props.createdIdParams.activity_uuid) {
                            localRequestParam = singleRequest;
                            return false;
                        }
                        return true;
                    });
                    setMappedRequestEntity((localRequestParam.mapping && localRequestParam.mapping.length && localRequestParam.mapping.length > 0) ? localRequestParam.mapping : []);
                }
            }).catch((e) => {
                setShowSpinner(false);
                setMappedRequestEntity([]);
            })
        }

    }, [])
    const closePopUp = () => {
        setShowModal(!showModal);
    }

    const updateMappedRequest = (resp, uuid) => {
        let mapLocalRequest = [];
        mappedRequestEntity.forEach((singleMapping) => {
            if (singleMapping[props.inputMappingObject].activity_uuid !== uuid) {
                mapLocalRequest.push(singleMapping);
            }
        });
        setMappedRequestEntity(mapLocalRequest)
    }
    const primaryActionHandler = (ele, actions) => {
        if (actions === AppConstant.APP_ACTION.RATE_REPORT) {
            setModalInfo({
                type: AppConstant.APP_ACTION.RATE_REPORT,
                ...ele
            });
            setShowModal(!showModal);
        } else if (actions === AppConstant.APP_ACTION.CANCEL) {
            apiInvocation({
                uuid: ele[props.inputMappingObject].activity_uuid,
                actType: props.mappingIndicator,
                mapping_initiator: ele.mapping_initiator,
                successCallback: updateMappedRequest,
                deleteType: AppConstant.APP_DELET_ACTION.DELETE_MAPPING
            });
        }else if (actions === AppConstant.APP_ACTION.VIEW_DETAILS) {
            setModalInfo({
                type: AppConstant.APP_ACTION.VIEW_DETAILS,
                ...ele,
                inputMappingObject: props.inputMappingObject
            });
            setShowModal(!showModal);
        }

    }

    const getMappedRequestView = () => {
        const mappedRequestView = [];
        if (mappedRequestEntity.length > 0) {
            mappedRequestEntity.forEach((singleMapping) => {
                if (singleMapping.mapping_initiator === props.mappingIndicator) {
                    mappedRequestView.push(
                        <RequesterInfoCardComponent
                            name={singleMapping[props.inputMappingObject].user_detail.first_name + " " + singleMapping[props.inputMappingObject].user_detail.last_name}
                            primayInfo={singleMapping[props.inputMappingObject].user_detail}
                            dateTime={singleMapping[props.inputMappingObject].date_time}
                            clickHandler={primaryActionHandler}
                            {...singleMapping} />)
                }
            });
        }

        
        
        // if no items 
        if (mappedRequestView.length <= 0) {
            const textList = [];
            textList.push( <Text> {props.noDataOnScreenText1} </Text>);
            textList.push( <Text> {props.noDataOnScreenText2} </Text>);
            if (props.noDataOnScreenText3) {
                textList.push( <Text> {props.noDataOnScreenText3} </Text>);
            }
            mappedRequestView.push(
                <View>
                    {textList}
                </View>
            )
        }

        return mappedRequestView;
    }

    const onActionClick = (ratingPayload, modalProps) => {
        console.log(ratingPayload);
        /*
        recommendedForOthers: recommended,
            comments: commentText,
            rating: ratingVal
        */
        closePopUp();
        setShowSpinner(true);
        let rootActivityUUID = (props.requestParams && props.requestParams.activity_uuid) ?
            props.requestParams.activity_uuid : (props.createdIdParams &&
                props.createdIdParams.activity_uuid) ? props.createdIdParams.activity_uuid : '';
        let mapping_initiator = (modalProps && modalProps.mapping_initiator) ? modalProps.mapping_initiator : '';
        let uuid = (modalProps && modalProps[props.inputMappingObject] && modalProps[props.inputMappingObject].activity_uuid) ?
            modalProps[props.inputMappingObject].activity_uuid : '';
        apiInstance.mappingRating(
            rootActivityUUID,
            props.mappingIndicator,
            mapping_initiator,
            uuid,
            ratingPayload.rating,
            (ratingPayload.recommendedForOthers) ? 1 : 0,
            ratingPayload.comments).then((resp) => {
                console.log(resp)
                setShowSpinner(false);
            }).catch(() => {
                setShowSpinner(false);
            });
    }

    const apiInvocation = ({ uuid, actType, successCallback, deleteType, mapping_initiator }) => {
        if (uuid && actType) {
            setShowSpinner(true);
            let apiInstancePromise;
            //same is used for cancellation & delete request
            if (deleteType === AppConstant.APP_DELET_ACTION.DELETE_ACTIVITY) {
                apiInstancePromise = apiInstance.activityDelete(uuid, actType);
            } else if (deleteType === AppConstant.APP_DELET_ACTION.DELETE_MAPPING) {
                let rootActivityUUID = (props.requestParams && props.requestParams.activity_uuid) ?
                    props.requestParams.activity_uuid : (props.createdIdParams &&
                        props.createdIdParams.activity_uuid) ? props.createdIdParams.activity_uuid : '';
                apiInstancePromise = apiInstance.mappingDelete(rootActivityUUID, actType, mapping_initiator, uuid);
            }
            apiInstancePromise.then((resp) => {
                setShowSpinner(false);
                if (successCallback) {
                    successCallback(resp, uuid)
                } else {
                    props.navigation.goBack();
                }
            }).catch((err) => {
                setShowSpinner(false);
                console.log(err)
            });
        }
    }
    const cancelRequest = () => {
        apiInvocation(
            {
                uuid: props.route.params.request.activity_uuid,
                actType: props.route.params.request.activity_type,
                deleteType: AppConstant.APP_DELET_ACTION.DELETE_ACTIVITY
            })
    }
    return (
        <Container>
            <View style={{ height: "100%" }}>
                <HeaderComponent {...props}
                    title={props.screenTitle}
                    bgColor={props.colorTheme} />

                <Content   >
                    {getMappedRequestView()}
                </Content>
                <ModalComponent
                    {...modalInfo}
                    viewName={(modalInfo && modalInfo.type) ? modalInfo.type : ""}
                    showModal={showModal}
                    closePopUp={closePopUp}
                    onActionClick={onActionClick} />
                <Footer style={{ height: 100 }}>
                    <View style={{
                        marginTop: 0,
                        justifyContent: "center",
                        alignItems: "center",
                        width: "90%",

                    }}>
                        <BasicFilledButton
                            buttonStyle={{
                                borderRadius: 10
                            }}
                            clickHandler={() => { cancelRequest() }}
                            label={props.cancelButtonLabel}
                            colorTheme={props.colorTheme} />
                    </View>
                </Footer>
            </View>
            {showSpinner && (<SpinnerComponent />)}

        </Container>
    );
}


export default RequesterAndOffererListing;

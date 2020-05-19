import React, { useState, useEffect } from 'react';
import { Image, TouchableOpacity, Dimensions, View } from 'react-native';
import { Container, Textarea, Grid, CheckBox, Row, Col, Form, Title, Item, Input, Label, Left, Right, Button, Body, Content, Text, Card, CardItem, Footer } from "native-base";
import { Rating, AirbnbRating } from 'react-native-ratings';
import Modal from 'react-native-modal';
import { default as EvilIcon } from 'react-native-vector-icons/EvilIcons';
import AppConstant from '../../misc/AppConstant';
import ButtonComponent, { BasicFilledButton } from './ButtonComponent';
import Utilities from '../../misc/Utils';

import { apiInstance } from "../../APIClient/API";


import translate from 'react-native-i18n';
import { appLabelKey } from '../../misc/AppStrings';


import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { ScrollView } from 'react-native-gesture-handler';


const windowHeight = Dimensions.get('window').height;
const rateAndReviewModalContent = (props) => {

    const [recommended, setRecommended] = useState(false);
    const [ratingVal, setRating] = useState(0);
    const [commentText, setCommentText] = useState('');

    const resetComponent = () => {
        setRecommended(false);
        setCommentText('');
        setRating(0)
    }

    const onClosePopUp = () => {
        resetComponent();
        if (props.closePopUp) {
            props.closePopUp(true)
        }
    }
    const onSubmitClick = () => {
        const payload = {
            recommendedForOthers: recommended,
            comments: commentText,
            rating: ratingVal
        }
        if (props.onActionClick) {
            props.onActionClick(payload, props);
        }
        resetComponent();
    }
    const ratingCompleted = (val) => {
        setRating(val)
    }



    return (
        <View style={{
            backgroundColor: 'white',
            paddingHorizontal: 10,
            height: windowHeight - (windowHeight * 0.4),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            borderColor: 'rgba(0, 0, 0, 0.1)'
        }}>
            <View style={{ width: "100%" }}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <Text style={{
                        color: "#232832",
                        fontFamily: "Roboto-Regular",
                        fontSize: 16
                    }}>{translate.t("rate_report")}   </Text>
                    <TouchableOpacity
                        onPress={() => { onClosePopUp() }}>
                        <EvilIcon name="close" style={{
                            color: "#4F5065",
                            fontSize: 34
                        }} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={{
                        fontFamily: "Roboto-Medium",
                        fontSize: 16,
                        color: "#232832",
                        marginTop: 15
                    }}>{props.name}  </Text>
                </View>
                <View style={{ alignItems: "flex-start", marginBottom: 10 }}>
                    <AirbnbRating
                        reviews={[]}
                        defaultRating={(props.primayInfo && props.primayInfo.rating_avg) ? props.primayInfo.rating_avg : 0}
                        ratingCount={5}
                        fractions={1}
                        startingValue={1.57}
                        size={30}
                        onFinishRating={ratingCompleted}
                    />
                </View>
                <View style={{
                    marginBottom: 15
                }}>
                    <Text style={{
                        color: "#4F5065CC",
                        fontFamily: "Roboto-Regular",
                        fontSize: 16
                    }}>{translate.t("help_from_them")}</Text>
                </View>
                <View style={{
                    flexDirection: "row", marginBottom: 20
                }}>
                    <TouchableOpacity
                        style={{ flexDirection: "row" }}
                        onPress={() => {
                            setRecommended(!recommended)
                        }}>
                        <CheckBox
                            checked={recommended}
                            color="#4F5065"
                            style={{ marginRight: 20 }} />
                        <Text style={{
                            color: "#4F5065",
                            fontFamily: "Roboto-Regular",
                            fontSize: 16
                        }}>{translate.t(appLabelKey.yes)}   </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ flexDirection: "row" }}
                        onPress={() => {
                            setRecommended(!recommended)
                        }}>
                        <CheckBox checked={!recommended} color="#4F5065" style={{ marginRight: 20 }} />
                        <Text
                            style={{
                                color: "#4F5065",
                                fontFamily: "Roboto-Regular",
                                fontSize: 16
                            }}>{translate.t(appLabelKey.no)}   </Text>
                    </TouchableOpacity>

                </View>
                <View >
                    <Text style={{
                        color: "#4F5065CC",
                        fontFamily: "Roboto-Regular",
                        fontSize: 16,
                        marginBottom: 5
                    }}> {translate.t("comment")} </Text>
                    <Textarea
                        onChangeText={(txt) => {
                            setCommentText(txt)
                        }}
                        placeholder="Enter here"
                        rowSpan={5}
                        style={{
                            marginHorizontal: 10,
                            borderRadius: 10,
                            borderWidth: 2,
                            borderColor: "#4F5065CC"
                        }} >

                    </Textarea>

                </View>
                <View style={{ alignItems: "center" }}>
                    <BasicFilledButton
                        buttonStyle={{
                            borderRadius: 10
                        }}
                        clickHandler={() => { onSubmitClick() }}
                        label={translate.t(appLabelKey.submit)}
                        colorTheme={props.colorTheme} />
                </View>
            </View>
        </View>
    );

}
const needHelpWithModalContent = (props) => {


    return (
        <View style={{
            backgroundColor: 'white',
            padding: 5,
            height: verticalScale(190),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2,
            borderColor: 'red',//''rgba(0, 0, 0, 0.1)',
            borderWidth: 1

        }}>
            <Grid style={{ width: "100%", alignItems: "center" }}>
                <Row>
                    <Col style={{width:"90%"}}>
                        <Text adjustsFontSizeToFit={true}  minimumFontScale={.1} numberOfLines={4}
                            style={{ color: "grey" }}>{(props.activity_type == AppConstant.APP_MAPPING_INDICATOR.REQUESTER)? translate.t("request_confirmation"): translate.t("offer_confirmation")}   </Text>
                    </Col>
                </Row>
                <Row>
                    <ButtonComponent
                        setShowModal={() => { props.closePopUp(AppConstant.APP_CONFIRMATION.YES) }}
                        label={translate.t(appLabelKey.yes)}
                        buttonVal={AppConstant.APP_CONFIRMATION.YES}
                        colorTheme={props.colorTheme}
                        activity_type={props.activity_type}
                        activity_category={props.activity_category}
                        activity_uuid={props.activity_uuid}
                        latlon={props.latlon}
                    />
                    <ButtonComponent
                        containerStyle={{ marginLeft: 10 }}
                        setShowModal={() => { props.closePopUp(AppConstant.APP_CONFIRMATION.NO) }}
                        unfilled={true}
                        label={translate.t(appLabelKey.no)}
                        buttonVal={AppConstant.APP_CONFIRMATION.NO}
                        colorTheme={props.colorTheme}
                        activity_type={props.activity_type}
                        activity_category={props.activity_category}
                        activity_uuid={props.activity_uuid}
                        latlon={props.latlon}
                    />
                </Row>
            </Grid>
        </View>
    );

}

const getViewIfExist = (textInformation, extra) => {
    if (textInformation) {
        if (extra) {
            return (
                <Text style={{
                    fontFamily: "Roboto-Regular",
                    fontSize: 14,
                    color: "#4F5065CC"
                }}> ({textInformation} )</Text>)
        }
        return (
            <Text style={{
                fontFamily: "Roboto-Regular",
                fontSize: 14,
                color: "#4F5065CC"
            }}>{textInformation} </Text>
        )
    }
}

const viewBasedOnCategory = (category, props) => {
    const viewList = []
    switch (category) {
        case AppConstant.APP_OPTIONS.AMBULANCE:
            props.activity_detail && props.activity_detail.length && props.activity_detail.forEach(singleDetail => {
                const qtyText = (singleDetail.quantity) ? " " + singleDetail.quantity : "";
                if (qtyText) {
                    viewList.push(
                        <>
                            {getViewIfExist(qtyText, 'round')}
                        </>
                    )
                }
            });
            break;
        case AppConstant.APP_OPTIONS.PEOPLE:
            /**
             {
                              "volunters_required": 1,
                              "volunters_detail": "Clean\t\t ",
                              "volunters_quantity": 5,
                              "technical_personal_required": 1,
                              "technical_personal_detail": "Lab ",
                              "technical_personal_quantity": 4
                          }
             */

            props.activity_detail && props.activity_detail.length && props.activity_detail.forEach(singleDetail => {
                const volunteers_detail = (singleDetail.volunters_detail) ? singleDetail.volunters_detail : "";
                const volunteers_qty = (singleDetail.volunters_quantity) ? singleDetail.volunters_quantity : "";
                const finalVolunteerText = (volunteers_detail) ? translate.t("volunteers") + ":" + volunteers_detail + " " + volunteers_qty : ""

                const techPersonnel_detail = (singleDetail.technical_personal_detail) ? singleDetail.technical_personal_detail : "";
                const techPersonnel_qty = (singleDetail.technical_personal_quantity) ? singleDetail.technical_personal_quantity : "";
                const finalTechPersonnelText = (techPersonnel_detail) ? translate.t("technical_personnel") + ":" + techPersonnel_detail + " " + techPersonnel_qty : ""

                viewList.push(
                    <View>
                        {getViewIfExist(finalVolunteerText)}
                        {getViewIfExist(finalTechPersonnelText)}
                    </View>

                )
            });

            break;
        default:
            // {singleDetail.detail+" "+singleDetail.quantity}
            props.activity_detail && props.activity_detail.length && props.activity_detail.forEach(singleDetail => {
                const qtyText = (singleDetail.quantity) ? singleDetail.quantity : "";
                viewList.push(
                    <View style={{ flexDirection: "row" }}>

                        {getViewIfExist(singleDetail.detail)}
                        {getViewIfExist(qtyText, 'round')}
                    </View>
                )

            });

            break;
    }
    return viewList;
}

const viewDetailsModalContent = (props) => {

    const helpOption = Utilities.getCategoryFromCode(props.activity_category);
    const mainDetails = (props &&
        props.inputMappingObject &&
        props[props.inputMappingObject]) ?
        props[props.inputMappingObject] : {};

   
    const onClosePopUp = () => {
        if (props.closePopUp) {
            props.closePopUp(true)
        }
    }

    const getNoteView = () => {
        if (mainDetails.offer_condition) {
            return (<View style={{ marginVertical: 10 }}>
                <Text>{translate.t("availability_condition")}</Text>
                <Text>{mainDetails.offer_condition}</Text>
            </View>);
        }

    }


    return (
        <View style={{
            backgroundColor: 'white',
            paddingHorizontal: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            borderColor: 'rgba(0, 0, 0, 0.1)',
            paddingVertical: 15,
            paddingHorizontal: 15
        }}>
            <View style={{ width: "100%" }}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <Text style={{
                        fontFamily: "Roboto-Medium",
                        fontSize: 16,
                        color: "#232832",
                        marginVertical: 15
                    }}>{props.name}   </Text>
                    <TouchableOpacity
                        onPress={() => { onClosePopUp() }}>
                        <EvilIcon name="close" style={{
                            color: "#232832",
                            fontSize: 28
                        }} />
                    </TouchableOpacity>
                </View>
                <View style={{
                    marginVertical: 15
                }}>
                    <Text style={{
                        color: "#232832",
                        fontFamily: "Roboto-Regular",
                        fontSize: 16
                    }} > {(props.showLabelInModal) ? props.showLabelInModal : translate.t("can_help_with")}</Text>
                    <View style={{ marginVertical: 10 }}>
                        {viewBasedOnCategory(helpOption, mainDetails)}
                    </View>
                    {getNoteView()}
                </View>
            </View>
        </View>
    );
}


const viewDetailsForRequestAndOfferModalContent = (props) => {

    const helpOption = Utilities.getCategoryFromCode(props.activity_category);
    const categoryName = translate.t(appLabelKey[helpOption.toLowerCase()]);
    const onClosePopUp = () => {
        if (props.closePopUp) {
            props.closePopUp(true)
        }
    }

    const getNoteView = () => {
        if (props.offer_condition) {
            return (<View style={{ marginVertical: 10 }}>
                <Text>{translate.t("availability_condition")}</Text>
                <Text>{props.offer_condition}</Text>
            </View>);
        }

    }


    return (
        <View style={{
            backgroundColor: 'white',
            paddingHorizontal: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            borderColor: 'rgba(0, 0, 0, 0.1)',
            paddingHorizontal: 15,
            paddingBottom:"25%",
            paddingTop:"5%",
            flexDirection: "column",
        }}>
            <ScrollView style={{ width: "100%" }}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <View>
                        <Text style={{
                            fontFamily: "Roboto-Medium",
                            fontSize: 16,
                            color: "#4F5065"
                        }}>{categoryName}</Text>
                        <Text style={{
                            marginTop: 5,
                            fontFamily: "Roboto-Regular",
                            fontSize: 12,
                            color: "#4F50657A"
                        }}>{Utilities.getDateTime(props.date_time)}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => { onClosePopUp() }}>
                        <EvilIcon name="close" style={{
                            color: "#232832",
                            fontSize: 28
                        }} />
                    </TouchableOpacity>
                </View>
                <View style={{
                    marginVertical: 15,
                }}>
                    {viewBasedOnCategory(helpOption, props)}
                </View>
                {getNoteView()}
            </ScrollView>
            <View style={{flex:1, flexDirection:"row", position:"absolute", bottom:verticalScale(20), left:scale(20)}}>
            <View style={{
                          borderRadius:4,
                          paddingHorizontal: 5,
                          paddingVertical:0,
                          width:scale(80),
                          height:verticalScale(30) ,
                          alignItems:"center",
                          justifyContent:"center",position:"absolute", bottom:verticalScale(0), left:scale(0)}}>
                <Text adjustsFontSizeToFit={true} minimumFontScale={0.5} numberOfLines={1} style={{fontFamily:"roboto", fontWeight:"900"}}>{(props.pay === 1) ? "Can pay" : "Cannot pay"}</Text>
                </View>
                <TouchableOpacity onPress={() => {props.cancelHandeler(props.activity_uuid, props.activity_type)}}>
                <View style={{
                          backgroundColor:((props.activity_type == AppConstant.APP_MAPPING_INDICATOR.REQUESTER) ? "#EE6B6B" : "#4F5065"),
                          borderRadius:4,
                          paddingHorizontal: 5,
                          paddingVertical:0,
                          borderColor:((props.activity_type == AppConstant.APP_MAPPING_INDICATOR.REQUESTER) ? "#EE6B6B" : "#4F5065"),
                          borderWidth:1,
                          width:scale(130),
                          height:verticalScale(30) ,
                          alignItems:"center",
                          justifyContent:"center",position:"absolute", bottom:verticalScale(0), left:scale(180)}}>
                <Text adjustsFontSizeToFit={true} minimumFontScale={0.5} numberOfLines={1} style={{fontFamily:"roboto", color:"#FFF"}}>{(props.activity_type == AppConstant.APP_MAPPING_INDICATOR.REQUESTER)? translate.t("cancel_this_request"): translate.t("cancel_this_offer")}</Text>
                </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const ModalComponent = (props) => {
    const getModalContent = () => {
        let modalContent;
        switch (props.viewName) {
            case AppConstant.APP_ACTION.RATE_REPORT:
                modalContent = rateAndReviewModalContent(props)
                break;
            case AppConstant.APP_ACTION.VIEW_DETAILS:
                if (props.requestOfferScreen) {
                    modalContent = viewDetailsForRequestAndOfferModalContent(props)
                } else {
                    modalContent = viewDetailsModalContent(props)
                }

                break;
            default:
                modalContent = needHelpWithModalContent(props)
                break;
        }
        return modalContent;
    }

    return (
        <Modal
            testID={'modal'}
            isVisible={props.showModal}
            onBackdropPress={() => { if(!props.backdropClickNotAllowed){props.closePopUp();} }}
            onSwipeComplete={() => { props.closePopUp() }}
            style={{
                justifyContent: 'flex-end',
                margin: 0,
                marginBottom: 2
            }}>
            {getModalContent()}
        </Modal>
    );
}

export default ModalComponent;
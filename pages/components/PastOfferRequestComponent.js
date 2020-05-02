import React from 'react';
import { Image, TouchableOpacity, Linking, Platform, View } from 'react-native';
import { Text, Card, CardItem } from "native-base";
import translate from 'react-native-i18n';
import { BasicButton } from './ButtonComponent';
import AppConstant from '../../misc/AppConstant'
import StaticImage from '../../styling/StaticImage';
import Utilities from '../../misc/Utils';
import { appLabelKey } from '../../misc/AppStrings';



const getViewIfExist = (textInformation) => {
    if (textInformation) {
        return (
            <Text style={{
                fontFamily: "Roboto-Regular",
                fontSize: 14,
                color: "#4F5065CC"
            }}>{textInformation}</Text>
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
                        <Text style={{
                            fontFamily: "Roboto-Regular",
                            fontSize: 14,
                            color: "#4F5065CC"
                        }}>({qtyText})</Text>
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
                const finalVolunteerText = (volunteers_detail) ? translate.t("Volunteers") + ":" + volunteers_detail + " " + volunteers_qty : ""

                const techPersonnel_detail = (singleDetail.technical_personal_detail) ? singleDetail.technical_personal_detail : "";
                const techPersonnel_qty = (singleDetail.technical_personal_quantity) ? singleDetail.technical_personal_quantity : "";
                const finalTechPersonnelText = (techPersonnel_detail) ? translate.t("Technical_Personnel") + ":" + techPersonnel_detail + " " + techPersonnel_qty : ""

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
                const qtyText = (singleDetail.quantity) ? " : " + singleDetail.quantity : "";
                if (qtyText) {
                    viewList.push(
                        <Text style={{
                            fontFamily: "Roboto-Regular",
                            fontSize: 14,
                            color: "#4F5065CC"
                        }}>{singleDetail.detail + " " + qtyText}</Text>
                    )
                }

            });

            break;
    }
    return viewList;
}

const getOfferList = (props) => {
    const finalOfferList = [];
    if (props.mapping && props.mapping.length > 0) {
        props.mapping.forEach(singleOffer => {
            if (singleOffer.mapping_initiator == AppConstant.APP_MAPPING_INDICATOR.OFFERER) {
                finalOfferList.push(singleOffer);
            }
        })
    }
    return finalOfferList;
}

const getOfferListingView = (props) => {
    const offerListLength = getOfferList(props).length ;
    if (offerListLength > 0) {
        return (
            <TouchableOpacity
                                onPress={() => {
                                    if (props.clickHandler) {
                                        props.clickHandler(props, AppConstant.APP_ACTION.OFFERS_RCVD)
                                    }
                                }}
                                style={{
                                    width: "25%",
                                    backgroundColor: "#EE6B6B",
                                    height: 25,
                                    borderRadius: 50,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                <View style={{
                                    width: "100%",
                                    backgroundColor: (props.colorTheme)?props.colorTheme:"#EE6B6B",
                                    height: 25,
                                    borderRadius: 50,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                                >
    
                                    <Text style={{
                                        fontFamily: "Roboto-Regular",
                                        fontSize: 12,
                                        color: "#FFFFFF"
                                    }}> {getOfferList(props).length + " " + props.count_suffix}</Text>
                                </View>
                            </TouchableOpacity>
                        
        )
    }
   
}
const PastOfferRequestComponent = (props) => {
    //console.log(props.activity_category)
    const helpOption = Utilities.getCategoryFromCode(props.activity_category);
    const categoryName = translate.t(appLabelKey[helpOption.toLowerCase()]);
    return (
        <Card style={{
            alignSelf: "center",
            marginTop: 10,
            width: "94%",
            borderRadius: 10,
            borderWidth: 2,
            shadowOpacity: 0.9,
            shadowOffset: { height: 5, width: 5 },
            shadowColor: '#EE6B6B3D'
        }} >
            <CardItem >
                <View style={{ width: "100%", flexDirection: "column" }}>
                    <View style={{ marginVertical: 10, flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ width: "70%" }}>
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
                            {getOfferListingView(props)}
                        </View>

                    <View style={{
                        marginVertical: 10,
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}>
                        <View style={{
                            width: "70%",
                        }}>{viewBasedOnCategory(helpOption, props)}
                        </View>
                        <View style={{
                            width: "25%",
                            alignItems: "flex-end",
                            paddingRight: 10
                        }}>
                            <Image
                                style={{
                                    width: 28,
                                    height: 22
                                }}
                                source={StaticImage[helpOption]} />
                        </View>

                    </View>



                    <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }}>

                        <BasicButton
                            btnStyle={{
                                fontFamily: "Roboto-Regular",
                                fontSize: 14,
                                color: "#4F5065"
                            }}
                            label={props.primayActionLabel}
                            clickHandler={() => { (props.clickHandler) && props.clickHandler(props, AppConstant.APP_ACTION.SEARCH_FOR_PROVIDERS) }} />
                        <BasicButton
                            btnStyle={{
                                fontFamily: "Roboto-Regular",
                                fontSize: 14,
                                color: "#4F5065"
                            }}
                            label={props.secondaryActionLabel}
                            clickHandler={() => { (props.clickHandler) && props.clickHandler(props, AppConstant.APP_ACTION.SENT_REQUEST) }} />
                    </View>


                </View>
            </CardItem>
        </Card>
    )
}
export {
    PastOfferRequestComponent
}

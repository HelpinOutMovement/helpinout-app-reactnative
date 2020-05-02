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

const getOfferList = (props, compareWith) => {
    const finalOfferList = [];
    if (props.mapping && props.mapping.length > 0) {
        props.mapping.forEach(singleOffer => {
            if (singleOffer.mapping_initiator == compareWith) {
                finalOfferList.push(singleOffer);
            }
        })
    }
    return finalOfferList;
}

const getOfferListingView = (props, compareWith) => {
    const offerListLength = getOfferList(props, (compareWith ? compareWith : AppConstant.APP_MAPPING_INDICATOR.OFFERER)).length;

    return (
        <TouchableOpacity
            onPress={() => {
                if (props.clickHandler) {
                    props.clickHandler(props, AppConstant.APP_ACTION.OFFERS_RCVD)
                }
            }}
            style={{
                width: "25%",
                height: 25,
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center"
            }}>
            <Text style={{
                fontFamily: "Roboto-Regular",
                fontSize: 12,
                color: "#4F5065"
            }}> {offerListLength}</Text>

        </TouchableOpacity>

    )

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
                            <TouchableOpacity
                                style={{
                                    marginVertical: 10
                                }}
                                onPress={() => {
                                    if (props.clickHandler) {
                                        props.clickHandler(props, AppConstant.APP_ACTION.VIEW_DETAILS)
                                    }
                                }}
                            >
                                <View style={{
                                    backgroundColor: "#4F5065",
                                    width: "40%",
                                    borderRadius: 10,
                                    alignItems: "center"
                                }}>
                                    <Text style={{
                                        fontFamily: "Roboto-Regular",
                                        fontSize: 12,
                                        color: "#ffffff"
                                    }}>{translate.t("view_details")}</Text>
                                </View>

                            </TouchableOpacity>
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

                    <TouchableOpacity
                        style={{ marginVertical: 10, flexDirection: "row", justifyContent: "space-between" }}
                        onPress={() => {
                            if (props.clickHandler) {
                                props.clickHandler(props, (props.tertiaryAction)? props.tertiaryAction:AppConstant.APP_ACTION.OFFERS_RCVD)
                            }
                        }}
                    >
                        <View style={{ width: "70%" }}>
                            <Text style={{
                                fontFamily: "Roboto-Medium",
                                fontSize: 14,
                                color: "#4F5065"
                            }}>{(props.tertiaryActionLabel)? props.tertiaryActionLabel : translate.t("niu_offfer_received")}</Text>
                        </View>
                        {getOfferListingView(props, (props.tertiaryCompareWith)? props.tertiaryCompareWith : AppConstant.APP_MAPPING_INDICATOR.OFFERER)}
                    </TouchableOpacity>



                    <TouchableOpacity
                        style={{ marginVertical: 10, flexDirection: "row", justifyContent: "space-between" }}
                        onPress={() => {
                            if (props.clickHandler) {
                                props.clickHandler(props,(props.secondaryAction)?props.secondaryAction: AppConstant.APP_ACTION.SENT_REQUEST)
                            }
                        }}
                    >
                        <View style={{ width: "70%" }}>
                            <Text style={{
                                fontFamily: "Roboto-Medium",
                                fontSize: 14,
                                color: "#4F5065"
                            }}>{props.secondaryActionLabel}</Text>
                        </View>
                        {getOfferListingView(props, (props.secondaryCompareWith)? props.secondaryCompareWith :AppConstant.APP_MAPPING_INDICATOR.REQUESTER)}
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={{ marginVertical: 10, flexDirection: "row", justifyContent: "space-between" }}
                        onPress={() => {
                            if (props.clickHandler) {
                                props.clickHandler(props, AppConstant.APP_ACTION.SEARCH_FOR_PROVIDERS)
                            }
                        }}
                    >
                        <View style={{ width: "70%" }}>
                            <Text style={{
                                fontFamily: "Roboto-Medium",
                                fontSize: 14,
                                color: "#4F5065"
                            }}>{props.primayActionLabel}</Text>
                        </View>
                    </TouchableOpacity>


                </View>
            </CardItem>
        </Card>
    )
}
export {
    PastOfferRequestComponent
}

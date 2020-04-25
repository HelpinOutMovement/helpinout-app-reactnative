import React from 'react';
import { Image, TouchableOpacity, Linking, Platform, View } from 'react-native';
import { Text, Card, CardItem } from "native-base";
import translate from 'react-native-i18n';
import { BasicButton } from './ButtonComponent';
import AppConstant from '../../misc/AppConstant'
import StaticImage from '../../styling/StaticImage';
import Utilities from '../../misc/Utils';
import { appLabelKey } from '../../misc/AppStrings';




const viewBasedOnCategory = (category, props) => {
    const viewList = []
    switch (category) {
        case AppConstant.APP_OPTIONS.AMBULANCE:
            props.activity_detail && props.activity_detail.length && props.activity_detail.forEach(singleDetail => {
                const qtyText = (singleDetail.quantity) ? " " + singleDetail.quantity : "";
                viewList.push(
                    <Text style={{
                        textAlign: "left",
                        fontFamily: "Roboto-Medium",
                        fontSize: 14,
                        color: "#000000"
                    }}> {qtyText}</Text>
                )
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
                        {
                            finalVolunteerText &&
                            <Text style={{
                                textAlign: "left",
                                fontFamily: "Roboto-Medium",
                                fontSize: 14,
                                color: "#000000"
                            }}> {finalVolunteerText}</Text>
                        }

                        {
                            finalTechPersonnelText &&
                            <Text style={{
                                textAlign: "left",
                                fontFamily: "Roboto-Medium",
                                fontSize: 14,
                                color: "#000000"
                            }}> {finalTechPersonnelText}</Text>
                        }

                    </View>

                )
            });

            break;
        default:
            // {singleDetail.detail+" "+singleDetail.quantity}
            props.activity_detail && props.activity_detail.length && props.activity_detail.forEach(singleDetail => {
                const qtyText = (singleDetail.quantity) ? " : " + singleDetail.quantity : "";
                viewList.push(
                    <Text style={{
                        textAlign: "left",
                        fontFamily: "Roboto-Medium",
                        fontSize: 14,
                        color: "#000000"
                    }}> {singleDetail.detail + " " + qtyText}</Text>
                )
            });

            break;
    }
    return viewList;
}

const PastOfferRequestComponent = (props) => {

    dialCall = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
        else { phoneNumber = `telprompt:${number}`; }
        Linking.openURL(phoneNumber);
    };

    //console.log(props.activity_category)
    const helpOption = Utilities.getCategoryFromCode(props.activity_category);
    const categoryName = translate.t(appLabelKey[helpOption.toLowerCase()]);
    return (
        <Card style={{
            marginTop: 25,
            marginHorizontal: 10,
            alignSelf: "center",
            width: "90%",
            borderRadius: 10,
            borderWidth: 4
        }} >
            <CardItem >
                <View style={{ width: "100%", flexDirection: "column" }}>
                    <View style={{ marginVertical: 10, flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ width: "70%" }}>
                            <Text style={{
                                textAlign: "left",
                                fontFamily: "Roboto-Medium",
                                fontSize: 14,
                                color: "#EE6B6B"
                            }}> {categoryName}</Text>
                            <Text style={{
                                textAlign: "left",
                                fontFamily: "Roboto-Medium",
                                fontSize: 12,
                                color: "#EE6B6B"
                            }}>   {Utilities.getDateTime(props.date_time)}</Text>
                        </View>
                        <View style={{ width: "20%" }}>
                            <Text style={{
                                textAlign: "left",
                                fontFamily: "Roboto-Medium",
                                fontSize: 12,
                                color: "#EE6B6B"
                            }}> {props.activity_count + " " + props.count_suffix}</Text>
                        </View>
                    </View>

                    <View style={{ marginVertical: 10, flexDirection: "row", justifyContent: "space-between" }}>
                        <View>
                            {viewBasedOnCategory(helpOption, props)}
                        </View>
                        <Image
                            style={{ alignSelf: "center", width: 24, height: 19 }}
                            source={StaticImage[helpOption]} />
                    </View>



                    <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }}>

                        <BasicButton
                            label={translate.t("Search_for_Help_Providers")}
                            clickHandler={() => { (props.clickHandler) && props.clickHandler(props, AppConstant.APP_ACTION.SEARCH_FOR_PROVIDERS) }} />
                        <BasicButton
                            label={translate.t("Sent_Requests")}
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

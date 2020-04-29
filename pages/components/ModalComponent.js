import React, { useState, useEffect } from 'react';
import { Image, TouchableOpacity, Dimensions, View } from 'react-native';
import { Container, Textarea, Grid, CheckBox, Row, Col, Form, Title, Item, Input, Label, Left, Right, Button, Body, Content, Text, Card, CardItem, Footer } from "native-base";
import { Rating, AirbnbRating } from 'react-native-ratings';
import Modal from 'react-native-modal';
import { default as EvilIcon } from 'react-native-vector-icons/EvilIcons';
import AppConstant from '../../misc/AppConstant';
import ButtonComponent, { BasicFilledButton } from './ButtonComponent';


import translate from 'react-native-i18n';
import { appLabelKey } from '../../misc/AppStrings';

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
            props.onActionClick(payload,props);
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
                    }}>{translate.t(appLabelKey.rate_Report)}   </Text>
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
                    }}>{translate.t(appLabelKey.should_others_take_help_from_them)}</Text>
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
                            style={{ color: "#4F5065",
                            fontFamily: "Roboto-Regular",
                            fontSize: 16 }}>{translate.t(appLabelKey.no)}   </Text>
                    </TouchableOpacity>

                </View>
                <View >
                        <Text style={{
                             color: "#4F5065CC",
                             fontFamily: "Roboto-Regular",
                             fontSize: 16,
                             marginBottom: 5
                        }}> Comments </Text>
                        <Textarea
                            onChangeText={(txt) => {
                                console.log(txt)
                                setCommentText(txt)
                            }}
                            placeholder="Enter here"
                            rowSpan={5}
                            style={{
                                marginHorizontal:10,
                                borderRadius: 10,
                                borderWidth: 2,
                                borderColor:"#4F5065CC"
                            }} >

                        </Textarea>
                   
                </View>
                <View style={{alignItems:"center"}}>
                    <BasicFilledButton
                        buttonStyle={{
                           borderRadius:10
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
            padding: 22,
            height: 190,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2,
            borderColor: 'red',//''rgba(0, 0, 0, 0.1)',
            borderWidth: 1

        }}>
            <Grid style={{ width: "100%", alignItems: "center" }}>
                <Row>
                    <Col>
                        <Text style={{ color: "#000000" }}>{translate.t(appLabelKey.your_Request_for_Help_has_been_registered)}   </Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text> {translate.t(appLabelKey.would_you_like_to_search_for_Help_Providers_in_your_location)}</Text>
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
                    />
                </Row>
            </Grid>
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
import React, { useState } from 'react';
import { Image, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Container, Textarea, Grid, CheckBox, Row, Col, Form, Title, Item, Input, Label, Left, Right, Button, Body, Content, Text, Card, CardItem, Footer } from "native-base";
import { Rating, AirbnbRating } from 'react-native-ratings';
import Modal from 'react-native-modal';
import { default as EvilIcon } from 'react-native-vector-icons/EvilIcons';
import AppConstant from '../../misc/AppConstant';
import ButtonComponent, { BasicFilledButton } from './ButtonComponent';
import StaticImage from '../../styling/StaticImage';

import translate from 'react-native-i18n';
import { appLabelKey } from '../../misc/AppStrings';

const rateAndReviewModalContent = (props) => {
    const ratingCompleted = (val) => {
        console.log(val)
    }
    return (
        <View style={{
            backgroundColor: 'white',
            padding: 22,
            height: 490,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            borderColor: 'rgba(0, 0, 0, 0.1)',

        }}>
            <Grid style={{ width: "100%" }}>
                <Row style={{ borderColor: "green", borderWidth: 2 }}>
                    <Col style={{ width: "80%" }}>
                        <Text style={{ color: "#000000" }}>{translate.t(appLabelKey.rate_Report)}   </Text>
                    </Col>
                    <Col style={{ width: "20%" }}>
                        <TouchableOpacity
                            onPress={() => {
                                props.closePopUp(true)
                            }
                            }>
                            <EvilIcon name="close" style={{
                                color: "#4F5065",
                                fontSize: 34
                            }} />
                        </TouchableOpacity>
                    </Col>
                </Row>
                <Row style={{ borderColor: "green", borderWidth: 2 }} >
                    <Col style={{ width: "90%" }}>
                        <Text style={{
                            textAlign: "left",
                            fontFamily: "Roboto-Medium",
                            fontSize: 16,
                            color: "#232832"
                        }}>
                            {props.name}  </Text>
                    </Col>
                </Row>
                <Row><Col style={{ borderColor: "green", borderWidth: 2 }}>
                    <AirbnbRating
                        reviews={[]}
                        ratingCount={5}
                        fractions={1}
                        startingValue={1.57}
                        imageSize={40}
                        onFinishRating={ratingCompleted}


                    />
                </Col></Row>
                <Row>
                    <Col>
                        <Text style={{ color: "#4F5065CC" }}>{translate.t(appLabelKey.should_others_take_help_from_them)}   </Text>
                    </Col>
                </Row>
                <Row>
                    <Col style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }} >
                        <CheckBox checked={props.checked} color="#4F5065" style={{ marginRight: 20 }} />
                        <Text style={{ color: "#4F5065CC" }}>{translate.t(appLabelKey.yes)}   </Text>
                    </Col>
                    <Col style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }}>
                        <CheckBox checked={props.checked} color="#4F5065" style={{ marginRight: 20 }} />
                        <Text style={{ color: "#4F5065CC" }}>{translate.t(appLabelKey.no)}   </Text>
                    </Col>
                </Row>
                <Row>
                    <BasicFilledButton
                        clickHandler={() => { props.closePopUp() }}
                        label={translate.t(appLabelKey.submit)}
                        colorTheme={props.colorTheme} />
                </Row>
            </Grid>
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
            borderWidth:1

        }}>
            <Grid style={{ width: "100%" , alignItems:"center"}}>
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
                        />
                    <ButtonComponent
                        containerStyle={{ marginLeft: 10 }}
                        setShowModal={() => { props.closePopUp(AppConstant.APP_CONFIRMATION.NO) }}
                        unfilled={true}
                        label={translate.t(appLabelKey.no)}
                        buttonVal={AppConstant.APP_CONFIRMATION.NO}
                        colorTheme={props.colorTheme} 
                        activity_type={props.activity_type}
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
                marginBottom:2
            }}>
            {getModalContent()}
        </Modal>
    );
}

export default ModalComponent;
import React from 'react';
import { Image, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Container, Textarea, Grid, CheckBox, Row, Col, Form, Title, Item, Input, Label, Left, Right, Button, Body, Content, Text, Card, CardItem, Footer } from "native-base";
import Modal from 'react-native-modal';
import AppConstant from '../../misc/AppConstant';


const needHelpWithModalContent = (props) => {
    return (
        <View style={{
            backgroundColor: 'white',
            padding: 22,
            height: 190,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            borderColor: 'rgba(0, 0, 0, 0.1)',

        }}>
            <Grid style={{ width: "100%" }}>
                <Row>
                    <Col>
                        <Text style={{ color: "#000000" }}> Your Request for Help has been registered </Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text> Would you like to search for Help Providers   in your location</Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <TouchableOpacity
                            style={{
                                marginLeft: 10,
                                alignItems: "center",
                                backgroundColor: "#EE6B6B",
                                height: 56,
                                borderRadius: 10
                            }}
                            onPress={() => { props.closePopUp(AppConstant.APP_CONFIRMATION.YES) }}
                        >
                            <Text style={{
                                textAlign: "center",
                                fontFamily: "Roboto-Regular",
                                fontSize: 16,
                                lineHeight: 56,
                                color: "#ffffff"
                            }}> Yes  </Text>
                        </TouchableOpacity>
                   
                         </Col>
                    <Col>
                    <TouchableOpacity
                            style={{
                                marginLeft: 10,
                                alignItems: "center",
                                borderColor: "#EE6B6B",
                                borderWidth:2,
                                height: 56,
                                borderRadius: 10
                            }}
                            onPress={() => { props.closePopUp(AppConstant.APP_CONFIRMATION.NO) }}
                        >
                            <Text style={{
                                textAlign: "center",
                                fontFamily: "Roboto-Regular",
                                fontSize: 16,
                                lineHeight: 56,
                                color: "#000000"
                            }}> No </Text>
                        </TouchableOpacity>
                   
                        </Col>

                </Row>
            </Grid>
        </View>
    );

}

const ModalComponent = (props) => {
    const getModalContent = () => {
        let modalContent;
        switch (props.viewName) {
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
            }}>
            {getModalContent()}
        </Modal>
    );
}

export default ModalComponent;
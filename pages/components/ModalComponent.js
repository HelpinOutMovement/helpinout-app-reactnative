import React from 'react';
import { Image, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Container, Textarea, Grid, CheckBox, Row, Col, Form, Title, Item, Input, Label, Left, Right, Button, Body, Content, Text, Card, CardItem, Footer } from "native-base";
import Modal from 'react-native-modal';
import AppConstant from '../../misc/AppConstant';
import ButtonComponent from './ButtonComponent';
import translate from 'react-native-i18n';
import {appLabelKey} from '../../misc/AppStrings';


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
                        colorTheme={props.colorTheme}  />
                    <ButtonComponent 
                        containerStyle={{ marginLeft: 10 }} 
                        setShowModal={() => { props.closePopUp(AppConstant.APP_CONFIRMATION.NO) }} 
                        unfilled={true} 
                        label={translate.t(appLabelKey.no)}
                        colorTheme={props.colorTheme}  />
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
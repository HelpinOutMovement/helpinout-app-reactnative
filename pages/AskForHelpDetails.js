
import React, { useContext, useState } from 'react';
import { Image, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Container, Textarea, Grid, CheckBox, Row, Col, Form, Title, Item, Input, Label, Left, Right, Button, Body, Content, Text, Card, CardItem, Footer } from "native-base";
import { default as EntypoIcon } from 'react-native-vector-icons/AntDesign';
import { default as MaterialCommunityIcon } from 'react-native-vector-icons/MaterialCommunityIcons';
import translate from 'react-native-i18n';
import { appLabelKey } from '../misc/AppStrings';
import HeaderComponent from './components/HeaderComponent';
import AppConstant from '../misc/AppConstant';
import PeopleAskComponent from './components/PeopleAskComponent';
import ModalComponent from './components/ModalComponent';
import ButtonComponent from './components/ButtonComponent';
import InputRowComponent from './components/InputRowComponent';
import Utilities from '../misc/Utils';


function AskForHelpDetailsScreen(props) {
    const colorTheme = "#EE6B6B";
    const firstId = Utilities.getID();
    const [totalInput, setTotalInput] = useState([firstId]);
    const [volunteers, setVolunteers] = useState(false);
    const [technicalPersonnel, setTechnicalPersonnel] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const { optionCode, optionImage } = props.route.params;


    const onDeleteAction = (code) => {
        let tempTotal = [...totalInput];
        const index = tempTotal.indexOf(code);
        if (index != -1) {
            tempTotal.splice(index, 1);
            setTotalInput(tempTotal);
        }
    }
    const showDynamicallyAddedInput = () => {
        const dynamicInput = [];
        totalInput.forEach(singleInstance => {
            dynamicInput.push((
                <InputRowComponent
                    key={"input_r" + singleInstance}
                    showDelete={singleInstance == firstId ? false : true}
                    code={singleInstance}
                    onDelete={() => {
                        onDeleteAction(singleInstance);
                    }}
                />
            ))
        })
        return dynamicInput;
    }
    const defaultHelpOptionDetails = () => {
        return (

            <Row style={{ marginVertical: 40 }}>
                <Col>
                    <Image
                        style={{ alignSelf: "center", height: 64, width: 79 }}
                        source={optionImage} />

                </Col>
            </Row>

        );
    }

    const showAmbulanceOption = () => {
        return (
            <Row>
                <Col style={{ alignItems: "center" }}>

                    <Input
                        placeholder={translate.t(appLabelKey.how_many_people)}
                        style={{
                            width: "80%",
                            borderColor: "#2328323D",
                            borderWidth: 2,
                            borderRadius: 10
                        }} />
                </Col>
            </Row>
        );
    }
    const showPeopleOption = () => {
        return (
            <React.Fragment>
                <PeopleAskComponent label={translate.t(appLabelKey.volunteers)} setChecked={setVolunteers} checked={volunteers} />
                <PeopleAskComponent label={translate.t(appLabelKey.technical_Personnel)} setChecked={setTechnicalPersonnel} checked={technicalPersonnel} />
            </React.Fragment>
        )
    }

    const getAddMoreOption = () => {
        if (optionCode !== AppConstant.APP_OPTIONS.PEOPLE && optionCode !== AppConstant.APP_OPTIONS.AMBULANCE) {
            return (
                <Row style={{ marginBottom: 10, width: "92%", alignItems: "center", alignSelf: "center" }}>
                    <Col>
                        <TouchableOpacity
                            style={{
                                alignItems: "center",
                                borderColor: "#CACBCE",
                                height: 56,
                                borderStyle: "dashed",
                                borderWidth: 2,
                                borderRadius: 5,
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                alignItems: "center",
                                justifyContent: "center",
                                alignContent: "center"

                            }}
                            onPress={() => { //this.findCoordinates()
                                let totalInputTemp = [...totalInput];
                                totalInputTemp.push(Utilities.getID());
                                console.log(totalInputTemp);
                                setTotalInput(totalInputTemp);
                            }
                            }>
                            <EntypoIcon name="plus" style={{ fontSize: 18, color: "#4F5065" }} />
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontFamily: "Roboto-Regular",
                                    fontSize: 17,
                                    color: "#4F5065",


                                }}
                            >{translate.t(appLabelKey.add_more)} </Text>
                        </TouchableOpacity>

                    </Col>
                </Row>
            );
        }

    }

    const decideWhichViewToMake = () => {
        let outputView;
        switch (optionCode) {
            case AppConstant.APP_OPTIONS.PEOPLE:
                outputView = showPeopleOption();
                break;
            case AppConstant.APP_OPTIONS.AMBULANCE:
                outputView = showAmbulanceOption();
                break;
            default:
                outputView = showDynamicallyAddedInput();
                break;
        }

        return outputView;
    }

    const closePopUp = (userAction) => {
        setShowModal(false);
        if (userAction === AppConstant.APP_CONFIRMATION.YES) {
            props.navigation.navigate(AppConstant.APP_PAGE.DASHBOARD);
        } else {
            props.navigation.navigate(AppConstant.APP_PAGE.DASHBOARD);
        }
    }

    return (
        <Container>
            <HeaderComponent {...props} />
            <Content padder  >
                {defaultHelpOptionDetails()}
                {decideWhichViewToMake()}
            </Content>
            <Footer
                style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#ffffff",
                    height: (optionCode !== AppConstant.APP_OPTIONS.PEOPLE && optionCode !== AppConstant.APP_OPTIONS.AMBULANCE) ? 150 : 60
                }} >
                <Grid>
                    {getAddMoreOption()}
                    <Row style={{ alignSelf: "center" }}>
                        <ButtonComponent
                            setShowModal={setShowModal}
                            unfilled={true}
                            label={translate.t(appLabelKey.we_can_pay)}
                            color={colorTheme} />
                        <ButtonComponent
                            containerStyle={{ marginLeft: 10 }}
                            setShowModal={setShowModal}
                            
                            label={translate.t(appLabelKey.we_cannot_pay)}
                            color={colorTheme} />
                    </Row>
                </Grid>
            </Footer>
            <ModalComponent showModal={showModal} closePopUp={closePopUp} />
        </Container>
    );
}

export default AskForHelpDetailsScreen;
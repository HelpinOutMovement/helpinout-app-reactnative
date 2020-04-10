
import React, { useContext, useState } from 'react';
import { Image, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Container, Textarea, Grid, CheckBox, Row, Col, Form, Title, Item, Input, Label, Left, Right, Button, Body, Content, Text, Card, CardItem, Footer } from "native-base";
import { default as EntypoIcon } from 'react-native-vector-icons/AntDesign';
import { default as MaterialCommunityIcon } from 'react-native-vector-icons/MaterialCommunityIcons';
import translate from 'react-native-i18n';
import {appLabelKey} from '../misc/AppStrings';
import HeaderComponent from './components/HeaderComponent';
import AppConstant from '../misc/AppConstant';
import PeopleAskComponent from './components/PeopleAskComponent';
import ModalComponent from './components/ModalComponent';
import ButtonComponent from './components/ButtonComponent';


const InputRowComponent = (props) => {
    return (
        <Row style={{ alignItems: "center", marginVertical: 10 }}>
            <Col style={{ width: "66%" }}>
                <Input
                    placeholder= {translate.t(appLabelKey.enter_items_optional)} 
                    maxLength={AppConstant.APP_TEXT_INPUT.MAX_LENGTH}
                    style={{
                        fontSize: 20,
                        borderWidth: 1,
                        borderColor: 'gray',
                        borderRadius: 9,
                        color: 'black',

                    }} />
            </Col>
            <Col style={{ width: "20%", marginLeft: 10 }}>
                <Input
                    placeholder={translate.t(appLabelKey.qty)} 
                    keyboardType={'numeric'}
                    style={{
                        fontSize: 20,
                        borderWidth: 1,
                        borderColor: 'gray',
                        borderRadius: 9,
                        color: 'black',
                    }} />
            </Col>
            <Col style={{ width: "10%", marginLeft: 10 }}>
                <TouchableOpacity
                    style={{
                        alignItems: "center"

                    }}
                    onPress={() => {
                        if (props.onDelete) {
                            props.onDelete(props.code)
                        }
                    }}>
                    {props.showDelete && (<MaterialCommunityIcon name="delete" style={{ fontSize: 40 }} />)}
                </TouchableOpacity>
            </Col>
        </Row>
    )
}
const getID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};

function AskForHelpDetailsScreen(props) {
    const firstId = getID();
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

            <Row style={{ margin: 20 }}>
                <Col>
                    <Image
                        style={{ alignSelf: "center" }}
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
                        placeholder= {translate.t(appLabelKey.how_many_people)} 
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
                <PeopleAskComponent label= {translate.t(appLabelKey.volunteers)}  setChecked={setVolunteers} checked={volunteers} />
                <PeopleAskComponent label= {translate.t(appLabelKey.technical_Personnel)}  setChecked={setTechnicalPersonnel} checked={technicalPersonnel} />
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
                                borderColor: "#EE6B6B",
                                height: 56,
                                borderStyle: "dashed",
                                borderWidth: 2,
                                borderRadius: 10,
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                alignItems: "center"

                            }}
                            onPress={() => { //this.findCoordinates()
                                let totalInputTemp = [...totalInput];
                                totalInputTemp.push(getID());
                                console.log(totalInputTemp);
                                setTotalInput(totalInputTemp);
                            }
                            }>
                            <EntypoIcon name="plus" style={{ fontSize: 15 }} />
                            <Text
                                style={{

                                    textAlign: "center",
                                    fontFamily: "Roboto-Regular",
                                    fontSize: 16,
                                    lineHeight: 56,
                                    color: "#EE6B6B"

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
        if(userAction === AppConstant.APP_CONFIRMATION.YES) {
            props.navigation.navigate(AppConstant.APP_PAGE.DASHBOARD);
        } else {
            props.navigation.navigate(AppConstant.APP_PAGE.DASHBOARD);
        }
        // props.navigation.navigate(AppConstant.APP_PAGE.)

    }

    return (
        <Container>
            <HeaderComponent {...props} />
            <Content padder  >
                {defaultHelpOptionDetails()}
                {decideWhichViewToMake()}
            </Content>
            <Footer style={{ height: (optionCode !== AppConstant.APP_OPTIONS.PEOPLE && optionCode !== AppConstant.APP_OPTIONS.AMBULANCE) ? 150 : 60, width: "100%" }} >
                <Grid>
                    {getAddMoreOption()}
                    <Row style={{ alignSelf: "center" }}>
                    <ButtonComponent setShowModal={setShowModal} label={translate.t(appLabelKey.we_can_pay)} />
                    <ButtonComponent containerStyle={{marginLeft:10}} setShowModal={setShowModal} unfilled={true} label={translate.t(appLabelKey.we_cannot_pay)} />
                    </Row>
                </Grid>
            </Footer>
            <ModalComponent showModal={showModal} closePopUp={closePopUp} />
        </Container>
    );
}

export default AskForHelpDetailsScreen;
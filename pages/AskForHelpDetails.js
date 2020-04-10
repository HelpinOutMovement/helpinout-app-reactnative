
import React, { useContext, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Container, Textarea, Grid, CheckBox, Row, Col, Form, Title, Item, Input, Label, Left, Right, Button, Body, Content, Text, Card, CardItem, Footer } from "native-base";
import { default as EntypoIcon } from 'react-native-vector-icons/AntDesign';
import { default as MaterialCommunityIcon } from 'react-native-vector-icons/MaterialCommunityIcons';
import UserContext from '../misc/UserContext';
import AppStringContext from '../misc/AppStringContext';
import StaticImage from '../styling/StaticImage';
import CardComponent from './components/CardComponent';
import HeaderComponent from './components/HeaderComponent';
import AppConstant from '../misc/AppConstant';
import PeopleAskComponent from './components/PeopleAskComponent';

const optionsOnScreen = [
    {
        label: "Food",
        path: StaticImage.FOOD,
        code: AppConstant.APP_OPTIONS.FOOD
    },
    {
        label: "People",
        path: StaticImage.PEOPLE,
        code: AppConstant.APP_OPTIONS.PEOPLE
    },
    {
        label: "Shelter",
        path: StaticImage.SHELTER,
        code: AppConstant.APP_OPTIONS.SHELTER
    },
    {
        label: "Med PPE",
        path: StaticImage.MED_PPE,
        code: AppConstant.APP_OPTIONS.MED_PPE
    },
    {
        label: "Testing",
        path: StaticImage.TESTING,
        code: AppConstant.APP_OPTIONS.TESTING
    },
    {
        label: "Medicine",
        path: StaticImage.MEDICINE,
        code: AppConstant.APP_OPTIONS.MEDICINE
    },
    {
        label: "Ambulance",
        path: StaticImage.AMBULANCE,
        code: AppConstant.APP_OPTIONS.AMBULANCE
    },
    {
        label: "Medical Equipment",
        path: StaticImage.MED_EQUIPMENT,
        code: AppConstant.APP_OPTIONS.MED_EQUIPMENT
    },
    {
        label: "Other",
        path: StaticImage.OTHER,
        code: AppConstant.APP_OPTIONS.OTHER
    }
]


const InputRowComponent = (props) => {
    return (
        <Row style={{ alignItems: "center", marginVertical: 10 }}>
            <Col style={{ width: "66%" }}>
                <Input
                    placeholder="Enter Items"
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
                    placeholder="Qty"
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
                        placeholder="How many people ?"
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
                <PeopleAskComponent label="Volunteers" setChecked={setVolunteers} checked={volunteers} />
                <PeopleAskComponent label="Technical Personnel" setChecked={setTechnicalPersonnel} checked={technicalPersonnel} />
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
                            > Add More </Text>
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

    return (
        <Container>
            <HeaderComponent {...props} />
            <Content padder  >

                {defaultHelpOptionDetails()}
                {decideWhichViewToMake()}
                {}

            </Content>
            <Footer style={{ height: (optionCode !== AppConstant.APP_OPTIONS.PEOPLE && optionCode !== AppConstant.APP_OPTIONS.AMBULANCE) ? 150 : 60, width: "100%" }} >
                <Grid>

                    {getAddMoreOption()}

                    <Row style={{ alignSelf: "center" }}>


                        <Col style={{ width: "40%" }}>
                            <TouchableOpacity
                                style={{
                                    alignItems: "center",
                                    borderColor: "#EE6B6B",
                                    height: 56,
                                    borderWidth: 2,
                                    borderRadius: 10

                                }}
                                onPress={() => { //this.findCoordinates()
                                    navigate(AppConstant.APP_PAGE.DASHBOARD);
                                }
                                }>
                                <Text
                                    style={{
                                        textAlign: "center",
                                        fontFamily: "Roboto-Regular",
                                        fontSize: 16,
                                        lineHeight: 56,
                                        color: "#EE6B6B"

                                    }}
                                > We Can Pay</Text>
                            </TouchableOpacity>
                        </Col>
                        <Col style={{ width: "40%" }}>
                            <TouchableOpacity
                                style={{
                                    marginLeft: 10,
                                    alignItems: "center",
                                    backgroundColor: "#EE6B6B",
                                    height: 56,
                                    borderRadius: 10

                                }}
                                onPress={() => { //this.findCoordinates()
                                    navigate(AppConstant.APP_PAGE.DASHBOARD);
                                }
                                }>
                                <Text
                                    style={{

                                        textAlign: "center",
                                        fontFamily: "Roboto-Regular",
                                        fontSize: 16,
                                        lineHeight: 56,
                                        color: "#ffffff"

                                    }}
                                > We Cannot Pay</Text>
                            </TouchableOpacity>
                        </Col>
                    </Row>
                </Grid>
            </Footer>
        </Container>
    );
}

export default AskForHelpDetailsScreen;
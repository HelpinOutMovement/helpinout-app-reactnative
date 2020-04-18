import React, { useRef, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Container, Grid,  Row, Col,  Input,  Content, Text,  Footer } from "native-base";
import { default as EntypoIcon } from 'react-native-vector-icons/AntDesign';
import translate from 'react-native-i18n';
import { appLabelKey } from '../../misc/AppStrings';
import HeaderComponent from './HeaderComponent';
import AppConstant from '../../misc/AppConstant';
import PeopleAskComponent from './PeopleAskComponent';
import ModalComponent from './ModalComponent';
import ButtonComponent from './ButtonComponent';
import InputRowComponent from './InputRowComponent';
import Utilities from '../../misc/Utils';

const AddActivityDetailsComponent = (props) => {
    const { optionCode, optionImage } = props.route.params;
    const [totalInput, setTotalInput] = useState((optionCode !== AppConstant.APP_OPTIONS.PEOPLE) ? [props.firstId] : []);
    const [inputValues, setInputValues] = useState({});
    const [inputQuantities, setInputQuantities] = useState({});
    const [notFilled, setNotFilled] = useState([]);
    const [volunteers, setVolunteers] = useState(false);
    const [technicalPersonnel, setTechnicalPersonnel] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [pplForAmbulance, setPplForAmbulance] = useState(0);
    const [ambulanceSelection, setAmbulanceSelection] = useState(0);
    const inputEl = useRef(null);

    const validateTheInput = (paymentIndicator) => {
        // Get the size of an object
        const notFilledLocal = [];
        const filledItems = [];
        const actualFilledValues = [];
        const localTotalInput = [...totalInput];
        let localIndex;
        for (let [key, value] of Object.entries(inputValues)) {
            if (value) {
                filledItems.push(key);
                actualFilledValues.push({ code: key, requested: value, qty: (inputQuantities[key]) ? inputQuantities[key] : '' })
            }
        }

        if (optionCode === AppConstant.APP_OPTIONS.PEOPLE) {
            localIndex = localTotalInput.indexOf(AppConstant.APP_PEOPLE_OPTIONS.VOLUNTEERS);
            if (volunteers && localIndex === -1) {
                localTotalInput.push(AppConstant.APP_PEOPLE_OPTIONS.VOLUNTEERS);
            } else if (!volunteers) {
                localTotalInput.splice(localIndex, 1);
            }

            const localIndex2 = localTotalInput.indexOf(AppConstant.APP_PEOPLE_OPTIONS.TECT_PERSONNEL);
            if (technicalPersonnel && localIndex2 === -1) {
                localTotalInput.push(AppConstant.APP_PEOPLE_OPTIONS.TECT_PERSONNEL);
            } else if (!technicalPersonnel){
                localTotalInput.splice(localIndex2, 1);
            }

            if(!volunteers && !technicalPersonnel){
                localTotalInput.push(AppConstant.APP_PEOPLE_OPTIONS.VOLUNTEERS);
                localTotalInput.push(AppConstant.APP_PEOPLE_OPTIONS.TECT_PERSONNEL);
            }
        }
        for (let singleItem = 0; singleItem < localTotalInput.length; singleItem++) {
            if (filledItems.indexOf(localTotalInput[singleItem]) === -1) {
                notFilledLocal.push(localTotalInput[singleItem])
            }
        }
        if (localTotalInput.length > 0 && notFilledLocal.length > 0) {
            setNotFilled(notFilledLocal)
        } else {
            props.inputIsValid({ requested: actualFilledValues, ambulanceReq: 0, paymentIndicator: paymentIndicator })
        }

    }

    

    const onQtyChangeAction = (code, val) => {
        const inputQuantitiesLocal = { ...inputQuantities };
        inputQuantitiesLocal[code] = val;
        setInputQuantities(inputQuantitiesLocal);
    }
    const onTextChangeAction = (code, val) => {
        const inputValuesLocal = { ...inputValues };
        inputValuesLocal[code] = val;
        setInputValues(inputValuesLocal);
    }
    const onDeleteAction = (code) => {
        let tempTotal = [...totalInput];
        if (inputValues[code]) {
            const inputValuesLocal = { ...inputValues };
            delete inputValuesLocal[code];
            setInputValues(inputValuesLocal);
        }
        const index = tempTotal.indexOf(code);
        if (index != -1) {
            tempTotal.splice(index, 1);
            setTotalInput(tempTotal);
        }
    }
    const showDynamicallyAddedInput = () => {
        const dynamicInput = [];
        totalInput.forEach(singleInstance => {
            if (singleInstance == props.firstId) {
                dynamicInput.push((
                    <InputRowComponent
                        ref={inputEl}
                        key={"input_r" + singleInstance}
                        showError={(notFilled.indexOf(singleInstance) !== -1) ? true : false}
                        showDelete={false}
                        code={singleInstance}
                        onDelete={() => {
                            onDeleteAction(singleInstance);
                        }}
                        onTextChange={(code, val) => {
                            onTextChangeAction(code, val)
                        }}
                        onQtyChange={(code, val) => {
                            onQtyChangeAction(code, val)
                        }}
                    />
                ))
            } else {
                dynamicInput.push((
                    <InputRowComponent
                        key={"input_r" + singleInstance}
                        showDelete={true}
                        showError={(notFilled.indexOf(singleInstance) !== -1) ? true : false}
                        code={singleInstance}
                        onDelete={() => {
                            onDeleteAction(singleInstance);
                        }}
                        onTextChange={(code, val) => {
                            onTextChangeAction(code, val)
                        }}
                    />
                ))
            }

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

                        onChangeText={(val) => {
                            setPplForAmbulance(val)
                        }}
                        keyboardType={'numeric'}
                        maxLength={AppConstant.APP_TEXT_INPUT.NUMBER_MAX_LENGTH}
                        placeholder={translate.t(appLabelKey.how_many_people)}
                        style={[{
                            width: "80%",
                            borderColor: "#2328323D",
                            borderWidth: 2,
                            borderRadius: 10
                        },
                        (ambulanceSelection) ? { borderColor: "red" } : { borderColor: "#2328323D" }
                        ]} />
                </Col>
            </Row>
        );
    }
    const showPeopleOption = () => {
        return (
            <React.Fragment>
                <PeopleAskComponent
                    showError={(notFilled.indexOf(AppConstant.APP_PEOPLE_OPTIONS.VOLUNTEERS) !== -1) ? true : false}
                    onTextChange={(code, val) => {
                        onTextChangeAction(code, val)
                    }}
                    onQtyChange={(code, val) => {
                        onQtyChangeAction(code, val)
                    }}
                    code={AppConstant.APP_PEOPLE_OPTIONS.VOLUNTEERS}
                    label={translate.t(appLabelKey.volunteers)}
                    setChecked={setVolunteers}
                    checked={volunteers} />
                <PeopleAskComponent
                    showError={(notFilled.indexOf(AppConstant.APP_PEOPLE_OPTIONS.TECT_PERSONNEL) !== -1) ? true : false}
                    onTextChange={(code, val) => {
                        onTextChangeAction(code, val)
                    }}
                    onQtyChange={(code, val) => {
                        onQtyChangeAction(code, val)
                    }}
                    code={AppConstant.APP_PEOPLE_OPTIONS.TECT_PERSONNEL}
                    label={translate.t(appLabelKey.technical_Personnel)}
                    setChecked={setTechnicalPersonnel}
                    checked={technicalPersonnel} />
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

    const decideWhichValidation = (paymentIndicator) => {
        switch (optionCode) {
            case AppConstant.APP_OPTIONS.PEOPLE:
                validateTheInput(paymentIndicator);
                break;
            case AppConstant.APP_OPTIONS.AMBULANCE:
                if (pplForAmbulance <= 0) {
                    setAmbulanceSelection(true)
                } else {
                    props.inputIsValid({ requested: [], ambulanceReq: pplForAmbulance, paymentIndicator: paymentIndicator })
                }
                break;
            default:
                validateTheInput(paymentIndicator);
                break;
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
            <HeaderComponent {...props} title={props.title} bgColor={props.colorTheme} />
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
                            setShowModal={() => {
                                decideWhichValidation(AppConstant.APP_CONFIRMATION.WE_CAN_PAY)
                            }}
                            unfilled={true}
                            label={translate.t(appLabelKey.we_can_pay)}
                            color={props.colorTheme} 
                            colorTheme={props.colorTheme}/>
                        <ButtonComponent
                            containerStyle={{ marginLeft: 10 }}
                            setShowModal={() => {
                                decideWhichValidation(AppConstant.APP_CONFIRMATION.WE_CANNOT_PAY)
                            }}

                            label={translate.t(appLabelKey.we_cannot_pay)}
                            color={props.colorTheme}
                            colorTheme={props.colorTheme}
                             />
                    </Row>
                </Grid>
            </Footer>
            <ModalComponent showModal={showModal} closePopUp={closePopUp} />
        </Container>
    );

}

export default AddActivityDetailsComponent;
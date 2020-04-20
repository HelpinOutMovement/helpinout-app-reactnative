
import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Header, Grid, Row, Col, Title, Left, Icon, Right, Button, Body, Content, Text, Card, CardItem } from "native-base";
import translate from 'react-native-i18n';
import { appLabelKey } from '../misc/AppStrings';
import AppConstant from '../misc/AppConstant';
import StaticImage from '../styling/StaticImage';
import CardComponent from './components/CardComponent';
import HeaderComponent from './components/HeaderComponent';

const optionsOnScreen = [
    {
        label: translate.t(appLabelKey.food),
        path: StaticImage.FOOD,
        code: AppConstant.API_REQUEST_CONSTANTS.activity_category.FOOD
    },
    {
        label: translate.t(appLabelKey.people),
        path: StaticImage.PEOPLE,
        code: AppConstant.API_REQUEST_CONSTANTS.activity_category.PEOPLE
    },
    {
        label: translate.t(appLabelKey.shelter),
        path: StaticImage.SHELTER,
        code: AppConstant.API_REQUEST_CONSTANTS.activity_category.SHELTER
    },
    {
        label: translate.t(appLabelKey.medical_PPE),
        path: StaticImage.MED_PPE,
        code: AppConstant.API_REQUEST_CONSTANTS.activity_category.MED_PPE
    },
    {
        label: translate.t(appLabelKey.testing),
        path: StaticImage.TESTING,
        code: AppConstant.API_REQUEST_CONSTANTS.activity_category.TESTING
    },
    {
        label: translate.t(appLabelKey.medicines),
        path: StaticImage.MEDICINE,
        code: AppConstant.API_REQUEST_CONSTANTS.activity_category.MEDICINE
    },
    {
        label: translate.t(appLabelKey.ambulance),
        path: StaticImage.AMBULANCE,
        code: AppConstant.API_REQUEST_CONSTANTS.activity_category.AMBULANCE
    },
    {
        label: translate.t(appLabelKey.medical_Equipment),
        path: StaticImage.MED_EQUIPMENT,
        code: AppConstant.API_REQUEST_CONSTANTS.activity_category.MED_EQUIPMENT
    },
    {
        label: translate.t(appLabelKey.other),
        path: StaticImage.OTHER,
        code: AppConstant.API_REQUEST_CONSTANTS.activity_category.OTHER
    }
]


function OfferHelpScreen(props) {
    const onOfferHelpSelection = (optionCode, optionImage) => {
        props.navigation.navigate(AppConstant.APP_PAGE.OFFER_HELP_SCREEN_DETAILS, {
            activity_type: AppConstant.API_REQUEST_CONSTANTS.activity_type.Offer,
            optionCode: optionCode,
            optionImage: optionImage,
            region:props.route.params.region,
            address:props.route.params.address
        })
    }

    const getHelpOptionsView = () => {
        const cardListView = [];
        optionsOnScreen.forEach((singleOption, index) => {
            cardListView.push((
                <Row key={singleOption.code}>
                    <Col>
                        <TouchableOpacity onPress={() => {
                            onOfferHelpSelection(singleOption.code, singleOption.path);
                        }} >
                            
                            <CardComponent {...singleOption} singleRow={true} />
                        </TouchableOpacity>
                    </Col>
                </Row>
            ));
        });


        return cardListView;

    }
    return (
        <Container>
            <HeaderComponent {...props} title="Offer help with " bgColor="#4F5065" />
            <Content padder  >
                <Grid>
                    {getHelpOptionsView()}
                </Grid>

            </Content>
        </Container>
    );
}

export default OfferHelpScreen;

import React, { useContext, useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Header, Grid, Row, Col, Title, Left, Icon, Right, Button, Body, Content, Text, Card, CardItem } from "native-base";
import translate from 'react-native-i18n';
import { appLabelKey } from '../misc/AppStrings';
import AppConstant from '../misc/AppConstant';
import StaticImage from '../styling/StaticImage';
import CardComponent from './components/CardComponent';
import HeaderComponent from './components/HeaderComponent';


import API from "../APIClient/API";

const optionsOnScreen = [
    {
        label: appLabelKey.food,
        path: StaticImage.FOOD,
        code: AppConstant.API_REQUEST_CONSTANTS.activity_category.FOOD,
        total:0,
        nearMe:0
    },
    {
        label: appLabelKey.people,
        path: StaticImage.PEOPLE,
        code: AppConstant.API_REQUEST_CONSTANTS.activity_category.PEOPLE,
        total:0,
        nearMe:0
    },
    {
        label: appLabelKey.shelter,
        path: StaticImage.SHELTER,
        code: AppConstant.API_REQUEST_CONSTANTS.activity_category.SHELTER,
        total:0,
        nearMe:0
    },
    {
        label: appLabelKey.med_ppe,
        path: StaticImage.MED_PPE,
        code: AppConstant.API_REQUEST_CONSTANTS.activity_category.MED_PPE,
        total:0,
        nearMe:0
    },
    {
        label: appLabelKey.testing,
        path: StaticImage.TESTING,
        code: AppConstant.API_REQUEST_CONSTANTS.activity_category.TESTING,
        total:0,
        nearMe:0
    },
    {
        label: appLabelKey.medicines,
        path: StaticImage.MEDICINE,
        code: AppConstant.API_REQUEST_CONSTANTS.activity_category.MEDICINES,
        total:0,
        nearMe:0
    },
    {
        label: appLabelKey.ambulance,
        path: StaticImage.AMBULANCE,
        code: AppConstant.API_REQUEST_CONSTANTS.activity_category.AMBULANCE,
        total:0,
        nearMe:0
    },
    {
        label: appLabelKey.medical_Equipment,
        path: StaticImage.MED_EQUIPMENT,
        code: AppConstant.API_REQUEST_CONSTANTS.activity_category.MED_EQUIPMENT,
        total:0,
        nearMe:0
    },
    {
        label: appLabelKey.other,
        path: StaticImage.OTHER,
        code: AppConstant.API_REQUEST_CONSTANTS.activity_category.OTHER,
        total:0,
        nearMe:0
    }
]


function OfferHelpScreen(props) {


    const [dataFectched, setDataFectched] = useState(false);

    useEffect(() => {
    }, [props.route.params]);


    const getOptionsData = (props) => {
        console.log("getOptionsData  : " + JSON.stringify(props))
        let restApi = new API();
        let reqObj =  restApi.locationRequesterSummary(props.route.params.region.latitude, props.route.params.region.longitude, 50);
        reqObj.then((response) => {
            for(var i=0;i<response.data.length;i++){
                var index =  optionsOnScreen.findIndex((item, idx) => {
                    return (item.code === response.data[i].activity_category)
                });
                optionsOnScreen[index]["total"] = response.data[i].total;
                optionsOnScreen[index]["nearMe"] = response.data[i].near;
            }
            setDataFectched(true)
        })
    }

    getOptionsData(props)

    const onOfferHelpSelection = (optionCode, optionImage) => {
        props.navigation.navigate(AppConstant.APP_PAGE.ADD_ACTIVITY_SCREEN, {
            activity_type: AppConstant.API_REQUEST_CONSTANTS.activity_type.Offer,
            optionCode: optionCode,
            optionImage: optionImage,
            region:props.route.params.region,
            address:props.route.params.address,
            activity_category:optionCode, 
            self_else:props.route.params.self_else, 
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
            <HeaderComponent {...props} title={translate.t("toolbar_offer_help_with")} bgColor="#4F5065" />
            <Content padder  >
                <Grid>
                    {getHelpOptionsView()}
                </Grid>
            </Content>    
        </Container>
    );
}


const onOfferHelpSelection = (optionCode, optionImage, props) => {
    props.navigation.navigate(AppConstant.APP_PAGE.OFFER_HELP_SCREEN_DETAILS, {
        activity_type: AppConstant.API_REQUEST_CONSTANTS.activity_type.Offer,
        optionCode: optionCode,
        optionImage: optionImage,
        region:props.route.params.region,
        activity_category:optionCode, 
        address:props.route.params.address
    })
}

const getHelpOptionsView = (optionsOnScreen,props) => {
    const cardListView = [];
    optionsOnScreen.forEach((singleOption, index) => {
        singleOption.label = translate.t(singleOption.label)
        cardListView.push((
            <Row key={singleOption.code}>
                <Col>
                    <TouchableOpacity onPress={() => {
                        onOfferHelpSelection(singleOption.code, singleOption.path, props);
                    }} >
                        
                        <CardComponent {...singleOption} singleRow={true} />
                    </TouchableOpacity>
                </Col>
            </Row>
        ));
    });


    return cardListView;

}
 
const getOptionsData = (props) => {
    console.log("getOptionsData  : " + JSON.stringify(props))
    let restApi = new API();
    let reqObj =  restApi.locationRequesterSummary(props.route.params.region.latitude, props.route.params.region.longitude, 50);
    reqObj.then((response) => {
        for(var i=0;i<response.data.length;i++){
            var index =  optionsOnScreen.findIndex((item, idx) => {
                return (item.code === response.data[i].activity_category)
            });
            optionsOnScreen[index]["total"] = response.data[i].total;
            optionsOnScreen[index]["nearMe"] = response.data[i].near;
        }
        props.navigation.navigate(AppConstant.APP_PAGE.OFFER_HELP_SCREEN)
    })
}

export default OfferHelpScreen;
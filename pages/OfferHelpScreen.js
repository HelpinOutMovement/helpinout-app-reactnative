
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
        label: appLabelKey.shelter,
        path: StaticImage.SHELTER,
        code: AppConstant.API_REQUEST_CONSTANTS.activity_category.SHELTER,
        total:0,
        nearMe:0
    },
    {
        label: appLabelKey.transport,
        path: StaticImage.TRANSPORT,
        code: AppConstant.API_REQUEST_CONSTANTS.activity_category.TRANSPORT,
        total:0,
        nearMe:0
    },
    {
        label: appLabelKey.volunteers,
        path: StaticImage.VOLUNTEERS,
        code: AppConstant.API_REQUEST_CONSTANTS.activity_category.VOLUNTEERS,
        total:0,
        nearMe:0
    },
    {
        label: appLabelKey.giveaways,
        path: StaticImage.GIVEAWAYS,
        code: AppConstant.API_REQUEST_CONSTANTS.activity_category.GIVEAWAYS,
        total:0,
        nearMe:0
    },
    {
        label: appLabelKey.paid_work,
        path: StaticImage.PAID_WORK,
        code: AppConstant.API_REQUEST_CONSTANTS.activity_category.PAID_WORK,
        total:0,
        nearMe:0
    },
    {
        label: appLabelKey.animal_care,
        path: StaticImage.ANIMAL_SUPPORT,
        code: AppConstant.API_REQUEST_CONSTANTS.activity_category.ANIMAL_SUPPORT,
        total:0,
        nearMe:0
    },
    {
        label: appLabelKey.fruits_vegetables,
        path: StaticImage.FRUITS_VEGS,
        code: AppConstant.API_REQUEST_CONSTANTS.activity_category.FRUITS_VEGS,
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
        //console.log("getOptionsData  : " + JSON.stringify(props))
        let restApi = new API();
        let reqObj =  restApi.locationRequesterSummary(props.route.params.region.latitude, props.route.params.region.longitude, 50);
        reqObj.then((response) => {
            //console.log(JSON.stringify(response))
            for(var i=0;i<response.data.length;i++){
                var index =  optionsOnScreen.findIndex((item, idx) => {
                    return (item.code === response.data[i].activity_category)
                });
                optionsOnScreen[index]["total"] = response.data[i].total;
                optionsOnScreen[index]["nearMe"] = response.data[i].near;
            }
            setDataFectched(true)
        }).catch((e) => {
            Toast.show('Network error : Please check ir you have network connectivity ', { duration: 3000, position: 0, animation: true, shadow: true, animationDuration: 1000 })
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

    const getHelpOptionsView = (optsOnScreen) => {
        const cardListView = [];
        optsOnScreen.forEach((singleOption, index) => {
            cardListView.push((
                <Row key={singleOption.code}>
                    <Col>
                        <TouchableOpacity onPress={() => {
                            onOfferHelpSelection(singleOption.code, singleOption.path);
                        }} >
                            
                            <CardComponent {...singleOption} singleRow={true} translateLabel={true} />
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
                    {getHelpOptionsView(optionsOnScreen)}
                </Grid>
            </Content>    
        </Container>
    );
}

export default OfferHelpScreen;
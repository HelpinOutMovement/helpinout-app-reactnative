
import React from 'react';
import {  TouchableOpacity } from 'react-native';
import { Container, Grid, Row, Col,  Content} from "native-base";
import translate from 'react-native-i18n';
import {appLabelKey} from '../misc/AppStrings';
import StaticImage from '../styling/StaticImage';
import CardComponent from './components/CardComponent';
import HeaderComponent from './components/HeaderComponent';
import AppConstant from '../misc/AppConstant';

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


function AskForHelpScreen(props) {
    const onAskForHelpSelection = (optionCode, optionImage) => {
      props.navigation.navigate(AppConstant.APP_PAGE.ASK_FOR_HELP_DETAILS, {
        activity_type: AppConstant.API_REQUEST_CONSTANTS.activity_type.Request,
        optionCode: optionCode,
        optionImage:optionImage,
        region:props.route.params.region,
        address:props.route.params.address,
      })
    }

  const getHelpOptionsView = () => {
    const cardListView = [];
    let twoColGrid = [];
    optionsOnScreen.forEach((singleOption, index) => {
      twoColGrid.push((
            <Col key={singleOption.code}>
              <TouchableOpacity onPress={() => {
                  onAskForHelpSelection(singleOption.code, singleOption.path);
              }} >
                <CardComponent {...singleOption} />
              </TouchableOpacity>
            </Col>
          ));

      if (index % 2 != 0) {
        cardListView.push(
          (<Row key={"i_" + cardListView.length}>
            {twoColGrid}
          </Row>)
        );
        twoColGrid = [];
      }
    });

    if (twoColGrid.length > 0) {
      cardListView.push(
        (<Row>
          <Col>
            {twoColGrid}
          </Col>
          <Col></Col>
        </Row>)
      );
    }
    return cardListView;
  }
 

  const getOptionGridView = () => {
    return (<Grid>
      {getHelpOptionsView()}
    </Grid>)

  }


  return (
      <Container>
        <HeaderComponent {...props} title={translate.t(appLabelKey.need_help_with)}/>
        <Content padder  >
          {getOptionGridView()}
        </Content>
      </Container>
   
  );
}
export default AskForHelpScreen;
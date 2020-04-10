
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
    code: AppConstant.APP_OPTIONS.FOOD
  },
  {
    label: translate.t(appLabelKey.people),
    path: StaticImage.PEOPLE,
    code: AppConstant.APP_OPTIONS.PEOPLE
  },
  {
    label: translate.t(appLabelKey.shelter),
    path: StaticImage.SHELTER,
    code: AppConstant.APP_OPTIONS.SHELTER
  },
  {
    label: translate.t(appLabelKey.medical_PPE),
    path: StaticImage.MED_PPE,
    code: AppConstant.APP_OPTIONS.MED_PPE
  },
  {
    label: translate.t(appLabelKey.testing),
    path: StaticImage.TESTING,
    code: AppConstant.APP_OPTIONS.TESTING
  },
  {
    label: translate.t(appLabelKey.medicines),
    path: StaticImage.MEDICINE,
    code: AppConstant.APP_OPTIONS.MEDICINE
  },
  {
    label: translate.t(appLabelKey.ambulance),
    path: StaticImage.AMBULANCE,
    code: AppConstant.APP_OPTIONS.AMBULANCE
  },
  {
    label: translate.t(appLabelKey.medical_Equipment),
    path: StaticImage.MED_EQUIPMENT,
    code: AppConstant.APP_OPTIONS.MED_EQUIPMENT
  },
  {
    label: translate.t(appLabelKey.other),
    path: StaticImage.OTHER,
    code: AppConstant.APP_OPTIONS.OTHER
  }
]


function AskForHelpScreen(props) {
  
  const onAskForHelpSelection = (optionCode, optionImage) => {
    //setSelectedOption(optionCode);
    // setSelectedOptionComponent(optionImage);
    props.navigation.navigate(AppConstant.APP_PAGE.ASK_FOR_HELP_DETAILS, {
      optionCode: optionCode,
      optionImage:optionImage
    })
  }

  const getHelpOptionsView = () => {
    const cardListView = [];
    let twoColGrid = [];
    optionsOnScreen.forEach((singleOption, index) => {
      twoColGrid.push((<Col key={singleOption.code}>
        <TouchableOpacity onPress={() => {
          onAskForHelpSelection(singleOption.code, singleOption.path);
        }} >
          <CardComponent {...singleOption} />
        </TouchableOpacity>
      </Col>));

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

import React from 'react';
import {  TouchableOpacity } from 'react-native';
import { Container, Grid, Row, Col,  Content} from "native-base";
import translate from 'react-native-i18n';
import {appLabelKey} from '../misc/AppStrings';
import StaticImage from '../styling/StaticImage';
import CardComponent from './components/CardComponent';
import HeaderComponent from './components/HeaderComponent';
import AppConstant from '../misc/AppConstant';
import AddActivityScreen from './components/AddActivityScreen';

const optionsOnScreen = [
  {
    label: appLabelKey.food,
    path: StaticImage.FOOD,
    code: AppConstant.API_REQUEST_CONSTANTS.activity_category.FOOD
  },
  {
    label: appLabelKey.shelter,
    path: StaticImage.SHELTER,
    code: AppConstant.API_REQUEST_CONSTANTS.activity_category.SHELTER
  },
  {
    label: appLabelKey.transport,
    path: StaticImage.TRANSPORT,
    code: AppConstant.API_REQUEST_CONSTANTS.activity_category.TRANSPORT
  },
  {
    label: appLabelKey.volunteers,
    path: StaticImage.VOLUNTEERS,
    code: AppConstant.API_REQUEST_CONSTANTS.activity_category.VOLUNTEERS
  },
  {
    label: appLabelKey.giveaways,
    path: StaticImage.GIVEAWAYS,
    code: AppConstant.API_REQUEST_CONSTANTS.activity_category.GIVEAWAYS
  },
  {
    label: appLabelKey.paid_work,
    path: StaticImage.PAID_WORK,
    code: AppConstant.API_REQUEST_CONSTANTS.activity_category.PAID_WORK
  },
  {
    label: appLabelKey.animal_care,
    path: StaticImage.ANIMAL_SUPPORT,
    code: AppConstant.API_REQUEST_CONSTANTS.activity_category.ANIMAL_SUPPORT
  },
  {
    label: appLabelKey.fruits_vegetables,
    path: StaticImage.FRUITS_VEGS,
    code: AppConstant.API_REQUEST_CONSTANTS.activity_category.FRUITS_VEGS
  },
  {
    label: appLabelKey.other,
    path: StaticImage.OTHER,
    code: AppConstant.API_REQUEST_CONSTANTS.activity_category.OTHER
  }
]


function AskForHelpScreen(props) {

    const onAskForHelpSelection = (optionCode, optionImage) => {
      /*
      props.navigation.navigate(AppConstant.APP_PAGE.ASK_FOR_HELP_DETAILS, {
        activity_type: AppConstant.API_REQUEST_CONSTANTS.activity_type.Request,
        optionCode: optionCode,
        optionImage:optionImage,
        region:props.route.params.region,
        address:props.route.params.address,
      })
      */

      props.navigation.navigate(AppConstant.APP_PAGE.ADD_ACTIVITY_SCREEN, {
        activity_type: AppConstant.API_REQUEST_CONSTANTS.activity_type.Request,
        optionCode: optionCode,
        optionImage:optionImage,
        region:props.route.params.region,
        address:props.route.params.address,
        activity_category:optionCode,  
        self_else:props.route.params.self_else    
      })

    }

  const getHelpOptionsView = () => {
    const cardListView = [];
    let twoColGrid = [];
    optionsOnScreen.forEach((singleOption, index) => {
      //singleOption.label = translate.t(singleOption.label)
      twoColGrid.push((
            <Col key={singleOption.code}>
              <TouchableOpacity onPress={() => {
                  onAskForHelpSelection(singleOption.code, singleOption.path);
              }} >
                
                <CardComponent {...singleOption} translateLabel={true} />
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
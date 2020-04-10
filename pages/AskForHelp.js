
import React, { useContext, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Container, Header, Grid, Row, Col, Form, Title, Item, Input, Label, Left, Icon, Right, Button, Body, Content, Text, Card, CardItem } from "native-base";
import UserContext from '../misc/UserContext';
import AppStringContext from '../misc/AppStringContext';
import StaticImage from '../styling/StaticImage';
import CardComponent from './components/CardComponent';
import HeaderComponent from './components/HeaderComponent';
import AppConstant from '../misc/AppConstant';

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


function AskForHelpScreen(props) {
  // const [selectedOption, setSelectedOption] = useState("");
  // const [selectedOptionComponent, setSelectedOptionComponent] = useState();
  // const user = useContext(UserContext);
  // const { translate } = useContext(AppStringContext);


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


  const helpOptionDetails = () => {
    return (
      <Form>
        <Item inlineLabel>
          <Grid>
            <Row style={{ marginBottom: 20 }}>
              <Col>
                <Image
                  style={{ alignSelf: "center" }}
                  source={selectedOptionComponent} />

              </Col>
            </Row>
            <Row>
              <Col style={{ width: "60%" }}>
                <Input
                  placeholder="Enter Items"
                  maxLength={4}
                  style={{

                    fontSize: 20,
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 9,
                    color: 'black',

                  }} />
              </Col>
              <Col style={{ width: "30%", marginLeft: 10 }}>
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
            </Row>
          </Grid>



        </Item>

      </Form>
    );
  }

  const getOptionGridView = () => {
    return (<Grid>
      {getHelpOptionsView()}
    </Grid>)

  }


  return (
      <Container>
        <HeaderComponent {...props} />
        <Content padder  >

          {getOptionGridView()}


        </Content>
      </Container>
   
  );
}
export default AskForHelpScreen;
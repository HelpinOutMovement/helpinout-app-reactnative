
import React, { useContext } from 'react';
import { Container, Header, Grid, Row, Col, Title, Left, Icon, Right, Button, Body, Content, Text, Card, CardItem } from "native-base";
import UserContext from '../misc/UserContext';
import AppStringContext from '../misc/AppStringContext';
import StaticImage from '../styling/StaticImage';
import CardComponent from './components/CardComponent';
import HeaderComponent from './components/HeaderComponent';

const optionsOnScreen = [
  {
    label: "Food",
    path: StaticImage.FOOD,
    pageName: ""
  },
  {
    label: "People",
    path: StaticImage.PEOPLE,
    pageName: ""
  },
  {
    label: "Shelter",
    path: StaticImage.SHELTER,
    pageName: ""
  },
  {
    label: "Med PPE",
    path: StaticImage.MED_PPE,
    pageName: ""
  },
  {
    label: "Testing",
    path: StaticImage.TESTING,
    pageName: ""
  },
  {
    label: "Medicine",
    path: StaticImage.MEDICINE,
    pageName: ""
  },
  {
    label: "Ambulance",
    path: StaticImage.AMBULANCE,
    pageName: ""
  },
  {
    label: "Medical Equipment",
    path: StaticImage.MED_EQUIPMENT,
    pageName: ""
  },
  {
    label: "Other",
    path: StaticImage.OTHER,
    pageName: ""
  }
]

function AskForHelpScreen(props) {
  const user = useContext(UserContext);
  const { translate } = useContext(AppStringContext);


  const getHelpOptionsView = () => {
    const cardListView = [];
    let twoColGrid = [];
    optionsOnScreen.forEach((singleOption, index) => {
      twoColGrid.push((<Col>
        <CardComponent {...singleOption} />
      </Col>));

      if (index % 2 != 0) {
        cardListView.push(
          (<Row>
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
  return (
    <Container>
      <HeaderComponent {...props} />
      <Content padder  >
        <Grid>

          {getHelpOptionsView()}
        </Grid>

      </Content>
    </Container>
  );
}
/**
 * 
 * <Text> AskForHelpScreen  {user.name} {translate('loginLabel','marathi')}</Text>
        <Button onPress={() => navigation.openDrawer()} title="Open Drawer" />
        <Button onPress={() => navigation.closeDrawer()} title="Close Drawer" />
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />

 */
export default AskForHelpScreen;
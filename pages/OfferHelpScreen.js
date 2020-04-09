
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

function OfferHelpScreen(props) {
    const user = useContext(UserContext);
    const { translate } = useContext(AppStringContext);


    const getHelpOptionsView = () => {
        const cardListView = [];
        optionsOnScreen.forEach((singleOption, index) => {
            cardListView.push((
                <Row key={singleOption.label}>
                    <Col>
                        <CardComponent {...singleOption} singleRow={true}/>
                    </Col></Row>));


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
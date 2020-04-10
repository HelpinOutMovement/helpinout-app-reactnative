

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Grid, Row, Col, Right,  Text } from 'native-base';
import {TabCardComponent} from './CardComponent';

const SingleTabComponent = (props) => {

    const getHelpOptionsView = () => {
        const cardListView = [];
        props.tabData.forEach((singleOption, index) => {
            cardListView.push((
                <Row key={singleOption.id}>
                    <Col>
                            <TabCardComponent {...singleOption} clickHandler={props.clickHandler} />
                    </Col></Row>));
        });
        return cardListView;

    }


    return (

       <Grid>
           {getHelpOptionsView()}
       </Grid>
    )

}

export default SingleTabComponent;
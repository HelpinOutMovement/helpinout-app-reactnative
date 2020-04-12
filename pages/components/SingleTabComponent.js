

import React from 'react';
import { View } from 'react-native';
import { Grid, Row, Col, Right, Text } from 'native-base';
import { TabCardComponent } from './CardComponent';

const SingleTabComponent = (props) => {

    const getHelpOptionsView = () => {
        const cardListView = [];
        props.tabData.forEach((singleOption, index) => {
            cardListView.push((
                <TabCardComponent key={singleOption.id} colorTheme={props.colorTheme} {...singleOption} clickHandler={props.clickHandler} />
            ));
        });
        return cardListView;

    }


    return (
        <View>
            {getHelpOptionsView()}
        </View>
    )

}

export default SingleTabComponent;
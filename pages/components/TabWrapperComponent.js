

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';
import SingleTabComponent from './SingleTabComponent';

const TabWrapperComponent = (props) => {
    return (
        <Container>
            <Tabs>
                <Tab
                    heading={
                        <TabHeading>
                            <Text>{props.primaryTabTitle}</Text>
                        </TabHeading>}>
                    <SingleTabComponent 
                        tabData={props.primayTabData}
                        clickHandler={props.primaryActionHandler} />
                </Tab>
                <Tab heading={
                    <TabHeading>
                        <Text>{props.secondaryTabTitle}</Text>
                    </TabHeading>}>
                    <SingleTabComponent title="BB" 
                        tabData={props.secondaryTabData}
                        clickHandler={props.secondaryActionHandler} />
                </Tab>
            </Tabs>
        </Container>
    )

}

export default TabWrapperComponent;
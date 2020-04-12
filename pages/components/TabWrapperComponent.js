

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';
import SingleTabComponent from './SingleTabComponent';

const TabWrapperComponent = (props) => {
    return (
        <Container >
            <Tabs
                tabBarInactiveTextColor="#4F50657A"
                tabBarUnderlineStyle={{ borderBottomWidth: 5, borderBottomColor: props.colorTheme }}>
                <Tab
                
                    heading={
                        <TabHeading 
                        
                            style={{ backgroundColor: "#ffffff" }}>
                            <Text style={{
                                color: props.colorTheme,
                                fontFamily: "Roboto-Medium",
                                fontSize: 16
                            }}>{props.primaryTabTitle}</Text>
                        </TabHeading>}>
                    <SingleTabComponent
                        tabData={props.primayTabData}
                        clickHandler={props.primaryActionHandler} />
                </Tab>
                <Tab heading={
                    <TabHeading style={{ backgroundColor: "#ffffff" }}>
                        <Text style={{
                            color: props.colorTheme,
                            fontFamily: "Roboto-Medium",
                            fontSize: 16
                        }}>{props.secondaryTabTitle}</Text>
                    </TabHeading>}>
                    <SingleTabComponent
                        tabData={props.secondaryTabData}
                        clickHandler={props.secondaryActionHandler} />
                </Tab>
            </Tabs>
        </Container>
    )

}

export default TabWrapperComponent;
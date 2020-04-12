

import React from 'react';
import { View } from 'react-native';
import { Container, Header, Tab, Tabs, TabHeading, Grid, Text } from 'native-base';
import SingleTabComponent from './SingleTabComponent';

const TabWrapperComponent = (props) => {
    return (
        <Container >
            <Tabs
            locked={true}
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
                    <View>
                        <SingleTabComponent
                            colorTheme={ props.colorTheme}
                            tabData={props.primayTabData}
                            clickHandler={props.primaryActionHandler} />
                    </View>
                </Tab>
                <Tab heading={
                    <TabHeading style={{ backgroundColor: "#ffffff" }}>
                        <Text style={{
                            color: props.colorTheme,
                            fontFamily: "Roboto-Medium",
                            fontSize: 16
                        }}>{props.secondaryTabTitle}</Text>
                    </TabHeading>}>
                    <View>
                        <SingleTabComponent
                            tabData={props.secondaryTabData}
                            clickHandler={props.secondaryActionHandler} />
                    </View>
                </Tab>
            </Tabs>
        </Container>
    )

}

export default TabWrapperComponent;
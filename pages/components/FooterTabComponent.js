import React from 'react';
import { FooterTab, Button, Text } from 'native-base';
import translate from 'react-native-i18n';
import AppConstant from '../../misc/AppConstant';

import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../assets/config.json';
const Icon = createIconSetFromFontello(fontelloConfig);

const FooterTabComponent = (props) => {
    return (
        <FooterTab
            style={{
                height: 70,
                backgroundColor: "#FFFFFF",
                borderTopWidth:1,
                
            }}>
            <Button vertical 
                active={props.activeTab === AppConstant.APP_FOOTER_TABS.HOME}
                onPress={() => props.navigation.navigate(AppConstant.APP_PAGE.HOME, {tik:new Date(), resetHistory:true})}
                style={{
                    color: "#FFFFFF",
                    height: 70
                }}
            >
                <Icon name="home" style={props.activeTab === AppConstant.APP_FOOTER_TABS.HOME ? {fontSize:25 , color:"#EE6B6B"} : {fontSize:25, color:"#4F50657A"}}/>
                <Text style={{
                    //color: (props.activeTab === AppConstant.APP_FOOTER_TABS.HOME) ? "#EE6B6B" : "#4F50657A",
                    fontFamily: "Roboto-Regular",
                    fontSize: 12
                }}>{translate.t("title_home")}</Text>
            </Button>
            <Button vertical
                active={props.activeTab === AppConstant.APP_FOOTER_TABS.MY_REQUEST}
                onPress={() => props.navigation.navigate(AppConstant.APP_PAGE.MY_REQUEST_SCREEN, {tik:new Date(), resetHistory:true})}
                style={{
                    height: 70
                }}
            >
                <Icon name="request" style={props.activeTab === AppConstant.APP_FOOTER_TABS.MY_REQUEST ? {fontSize:25 , color:"#EE6B6B"} : {fontSize:25, color:"#4F50657A"}}/>
                <Text style={{
                    //color: (props.activeTab === AppConstant.APP_FOOTER_TABS.MY_REQUEST) ? "#EE6B6B" : "#4F50657A",
                    fontFamily: "Roboto-Regular",
                    fontSize: 12
                }} >{translate.t("title_my_request")}</Text>
            </Button>
            <Button vertical
                active={props.activeTab === AppConstant.APP_FOOTER_TABS.MY_OFFER}
                onPress={() => props.navigation.navigate(AppConstant.APP_PAGE.MY_OFFERS_SCREEN, {tik:new Date(), resetHistory:true})}
                style={{
                    height: 70
                }}
            >
                <Icon active name="offer" style={props.activeTab === AppConstant.APP_FOOTER_TABS.MY_OFFER ? {fontSize:25 , color:"#EE6B6B"} : {fontSize:25, color:"#4F50657A"}}/>
                <Text style={{
                    //color: (props.activeTab === AppConstant.APP_FOOTER_TABS.MY_OFFER) ? "#EE6B6B" : "#4F50657A",
                    fontFamily: "Roboto-Regular",
                    fontSize: 12
                }}>{translate.t("title_my_offers")}</Text>
            </Button>
        </FooterTab>

    );

}

export default FooterTabComponent;
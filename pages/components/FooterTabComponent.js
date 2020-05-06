import React from 'react';
import { FooterTab, Button, Icon, Text } from 'native-base';
import translate from 'react-native-i18n';
import AppConstant from '../../misc/AppConstant';

const FooterTabComponent = (props) => {
    return (
        <FooterTab>
            {/*
                <Button vertical
                active={props.activeTab === AppConstant.APP_FOOTER_TABS.HOME}
                 onPress={() => props.navigation.navigate(AppConstant.APP_PAGE.DASHBOARD)}>
                <Icon name="ios-home" style={{ color: "red" }} />
                <Text style={{overflow:"hidden"}}>{translate.t("title_home")}</Text>
            </Button>
            <Button vertical
            active={props.activeTab === AppConstant.APP_FOOTER_TABS.MY_REQUEST}
              onPress={() => props.navigation.navigate(AppConstant.APP_PAGE.MY_REQUEST_SCREEN)}>
                <Icon name="camera" />
                <Text style={{overflow:"hidden"}}>{translate.t("title_my_request")}</Text>
            </Button>
            <Button vertical 
            active={props.activeTab === AppConstant.APP_FOOTER_TABS.MY_OFFER}
            onPress={() => props.navigation.navigate(AppConstant.APP_PAGE.MY_OFFERS_SCREEN)}>
                <Icon active name="navigate" />
                <Text style={{overflow:"hidden"}}>{translate.t("title_my_offers")}</Text>
            </Button>
            */
            }
            <Button vertical
                active={props.activeTab === AppConstant.APP_FOOTER_TABS.HOME}
                onPress={() => props.navigation.navigate(AppConstant.APP_PAGE.DASHBOARD)}>
                <Icon name="ios-home" style={{ color: "red" }} />
                <Text style={{
                    color:"#4F50657A",
                    fontFamily: "Roboto-Regular",		
                    fontSize: 12
                }}>{translate.t("title_home")}</Text>
            </Button>
            <Button vertical
                active={props.activeTab === AppConstant.APP_FOOTER_TABS.MY_REQUEST}
                onPress={() => props.navigation.navigate(AppConstant.APP_PAGE.MY_REQUEST_SCREEN)}>
                <Icon name="camera" />
                <Text style={{
                   color:"#4F50657A",
                   fontFamily: "Roboto-Regular",		
                   fontSize: 12
                }} >{translate.t("title_my_request")}</Text>
            </Button>
            <Button vertical
                active={props.activeTab === AppConstant.APP_FOOTER_TABS.MY_OFFER}
                onPress={() => props.navigation.navigate(AppConstant.APP_PAGE.MY_OFFERS_SCREEN)}>
                <Icon active name="navigate" />
                <Text style={{
                    color:"#4F50657A",
                    fontFamily: "Roboto-Regular",		
                    fontSize: 12
                }}>{translate.t("title_my_offers")}</Text>
            </Button>
        </FooterTab>

    );

}

export default FooterTabComponent;
import React from 'react';
import { FooterTab, Button, Icon, Text } from 'native-base';
import translate from 'react-native-i18n';
import AppConstant from '../../misc/AppConstant';

const FooterTabComponent = (props) => {
    return (
        <FooterTab
            style={{
                height: 70,
                backgroundColor: "#FFFFFF"
            }}>
            <Button vertical
                active={props.activeTab === AppConstant.APP_FOOTER_TABS.HOME}
                onPress={() => props.navigation.navigate(AppConstant.APP_PAGE.DASHBOARD)}
                style={{
                    height: 70
                }}
            >
                <Icon name="ios-home" style={{ color: (props.activeTab === AppConstant.APP_FOOTER_TABS.HOME) ? "#EE6B6B" : "#4F50657A" }} />
                <Text style={{
                    color: (props.activeTab === AppConstant.APP_FOOTER_TABS.HOME) ? "#EE6B6B" : "#4F50657A",
                    fontFamily: "Roboto-Regular",
                    fontSize: 12
                }}>{translate.t("title_home")}</Text>
            </Button>
            <Button vertical
                active={props.activeTab === AppConstant.APP_FOOTER_TABS.MY_REQUEST}
                onPress={() => props.navigation.navigate(AppConstant.APP_PAGE.MY_REQUEST_SCREEN)}
                style={{
                    height: 70
                }}
            >
                <Icon name="camera" style={{ color: (props.activeTab === AppConstant.APP_FOOTER_TABS.MY_REQUEST) ? "#EE6B6B" : "#4F50657A" }} />
                <Text style={{
                    color: (props.activeTab === AppConstant.APP_FOOTER_TABS.MY_REQUEST) ? "#EE6B6B" : "#4F50657A",
                    fontFamily: "Roboto-Regular",
                    fontSize: 12
                }} >{translate.t("title_my_request")}</Text>
            </Button>
            <Button vertical
                active={props.activeTab === AppConstant.APP_FOOTER_TABS.MY_OFFER}
                onPress={() => props.navigation.navigate(AppConstant.APP_PAGE.MY_OFFERS_SCREEN)}
                style={{
                    height: 70
                }}
            >
                <Icon active name="navigate" style={{ color: (props.activeTab === AppConstant.APP_FOOTER_TABS.MY_OFFER) ? "#EE6B6B" : "#4F50657A" }} />
                <Text style={{
                    color: (props.activeTab === AppConstant.APP_FOOTER_TABS.MY_OFFER) ? "#EE6B6B" : "#4F50657A",
                    fontFamily: "Roboto-Regular",
                    fontSize: 12
                }}>{translate.t("title_my_offers")}</Text>
            </Button>
        </FooterTab>

    );

}

export default FooterTabComponent;
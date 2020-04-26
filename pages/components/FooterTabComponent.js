import React from 'react';
import {FooterTab, Button, Icon, Text} from 'native-base';
import translate from 'react-native-i18n';
import AppConstant from '../../misc/AppConstant';

const FooterTabComponent = (props) => {
        return (
            <FooterTab>
            <Button vertical
                active={props.activeTab === AppConstant.APP_FOOTER_TABS.HOME}
                 onPress={() => props.navigation.navigate(AppConstant.APP_PAGE.DASHBOARD)}>
                <Icon name="ios-home" style={{ color: "red" }} />
                <Text>{translate.t("Home")}</Text>
            </Button>
            <Button vertical
            active={props.activeTab === AppConstant.APP_FOOTER_TABS.MY_REQUEST}
              onPress={() => props.navigation.navigate(AppConstant.APP_PAGE.MY_REQUEST_SCREEN)}>
                <Icon name="camera" />
                <Text>{translate.t("My_Requests")}</Text>
            </Button>
            <Button vertical 
            active={props.activeTab === AppConstant.APP_FOOTER_TABS.MY_OFFER}
            onPress={() => props.navigation.navigate(AppConstant.APP_PAGE.MY_OFFERS_SCREEN)}>
                <Icon active name="navigate" />
                <Text>{translate.t("My_Offers")}</Text>
            </Button>
        </FooterTab>
    
        );
    
}

export default FooterTabComponent;
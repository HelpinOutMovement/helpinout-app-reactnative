import React from 'react';
import translate from 'react-native-i18n';
import AppConstant from '../misc/AppConstant';
import RequesterAndOffererListing from './components/RequesterAndOffererListing';


function MyOfferSentOfferScreen(props) {
    const colorTheme = "#4F5065";
    const typeRestriction = 'offers';
    const inputMappingObject = 'request_detail';
    let mappingIndicator = AppConstant.APP_MAPPING_INDICATOR.REQUESTER;
    let screenTitle = translate.t("help_request_received_from");
    let cancelButtonLabel = translate.t("cancel_this_offer");

    let noDataOnScreenText1 =  translate.t("no_offer_sent");
    let noDataOnScreenText2 =  translate.t("Others_may_request_your_help_when_they_see_your_offer_on_the_map");
    let noDataOnScreenText3 =  translate.t("This_request_will_remain_active_until_you_cancel_it");

    let requestParams = (props.route && props.route.params && props.route.params.request) ? props.route.params.request : {};
    let createdIdParams = (props.route && props.route.params && props.route.params.created_activity) ? props.route.params.created_activity : {};
    let screenType = (props.route && props.route.params && props.route.params.screenType) ? props.route.params.screenType : '';
    if(screenType === AppConstant.APP_ACTION.OFFERS_RCVD) {
        screenTitle = translate.t("offer_send_to");
        mappingIndicator = AppConstant.APP_MAPPING_INDICATOR.OFFERER;
    }
    return (
        <RequesterAndOffererListing {...props} 
                    requestParams={requestParams}
                    createdIdParams={createdIdParams}
                    mappingIndicator={mappingIndicator} 
                    inputMappingObject={inputMappingObject} 
                    typeRestriction={typeRestriction} 
                    colorTheme={colorTheme}
                    screenTitle={screenTitle}
                    cancelButtonLabel={cancelButtonLabel}
                    noDataOnScreenText1={noDataOnScreenText1}
                    noDataOnScreenText2={""}
                    noDataOnScreenText3={""}
                    showLabelInModal={translate.t("need_help_with")}

                     />
    );
}

export default MyOfferSentOfferScreen;
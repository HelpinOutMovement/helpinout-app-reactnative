import React from 'react';
import translate from 'react-native-i18n';
import AppConstant from '../misc/AppConstant';
import RequesterAndOffererListing from './components/RequesterAndOffererListing';

function MyRequestSentRequestScreen(props) {

    const colorTheme = "#EE6B6B";
    const typeRestriction = 'requests';
    const inputMappingObject = 'offer_detail';
    let mappingIndicator = AppConstant.APP_MAPPING_INDICATOR.REQUESTER;
    let screenTitle = translate.t("request_send_to");
    let cancelButtonLabel = translate.t("cancel_this_request");

    let noDataOnScreenText1 =  translate.t("no_request_sent");
    let noDataOnScreenText2 =  translate.t("Others_may_offer_to_help_you_when_they_see_your_request_on_the_map");

    let requestParams = (props.route && props.route.params && props.route.params.request) ? props.route.params.request : {};
    let createdIdParams = (props.route && props.route.params && props.route.params.created_activity) ? props.route.params.created_activity : {};
    let screenType = (props.route && props.route.params && props.route.params.screenType) ? props.route.params.screenType : '';
    if(screenType === AppConstant.APP_ACTION.OFFERS_RCVD) {
        screenTitle = translate.t("help_offers_received_from");
        mappingIndicator = AppConstant.APP_MAPPING_INDICATOR.OFFERER;
    }
   console.log("requestParams" + JSON.stringify(requestParams))
   console.log("createdIdParams" + JSON.stringify(createdIdParams))
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

                     />
    );
}

export default MyRequestSentRequestScreen;
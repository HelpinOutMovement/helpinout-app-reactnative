import React from 'react';
import translate from 'react-native-i18n';
import AppConstant from '../misc/AppConstant';
import RequesterAndOffererListing from './components/RequesterAndOffererListing';

function MyRequestSentRequestScreen(props) {

    const colorTheme = "#EE6B6B";
    const typeRestriction = 'requests';
    const inputMappingObject = 'offer_detail';
    let mappingIndicator = AppConstant.APP_MAPPING_INDICATOR.REQUESTER;
    let screenTitle = translate.t("Request_have_been_sent_to");
    let cancelButtonLabel = translate.t("Cancel_This_Request");

    let noDataOnScreenText1 =  translate.t("Your_request_was_registered_but_no_direct_request_has_been_sent_to_anyone_yet");
    let noDataOnScreenText2 =  translate.t("Others_may_offer_to_help_you_when_they_see_your_request_on_the_map");

    let requestParams = (props.route && props.route.params && props.route.params.request) ? props.route.params.request : {};
    let createdIdParams = (props.route && props.route.params && props.route.params.created_activity) ? props.route.params.created_activity : {};
    let screenType = (props.route && props.route.params && props.route.params.screenType) ? props.route.params.screenType : '';
    if(screenType === AppConstant.APP_ACTION.OFFERS_RCVD) {
        screenTitle = translate.t("Help_Offers_Received_from");
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
                    noDataOnScreenText2={noDataOnScreenText2}

                     />
    );
}

export default MyRequestSentRequestScreen;
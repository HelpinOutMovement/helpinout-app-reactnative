
import React from 'react';
import AddActivityDetailsComponent from './components/AddActivityDetailsComponent';
import Utilities from '../misc/Utils';

const firstId = Utilities.getID();

function AskForHelpDetailsScreen(props) {
    const colorTheme = "#EE6B6B";

    const inputIsValid = (requestedDetails) => {
        console.log("requested :", requestedDetails.requested, "paymentIndicator : ", requestedDetails.paymentIndicator, "ambulance :", requestedDetails.ambulanceReq)
    }

    return (
        <AddActivityDetailsComponent 
            {...props} 
            title="Need help with!!"
            colorTheme={colorTheme} 
            firstId={firstId} 
            inputIsValid={inputIsValid} 
            />
    );
}

export default AskForHelpDetailsScreen;
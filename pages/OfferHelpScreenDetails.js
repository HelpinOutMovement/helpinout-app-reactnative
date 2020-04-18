
import React, {useState } from 'react';
import AddActivityDetailsComponent from './components/AddActivityDetailsComponent';
import Utilities from '../misc/Utils';

const firstId = Utilities.getID();

function OfferHelpScreenDetails(props) {
    const colorTheme = "#4F5065";

    const inputIsValid = (requestedDetails) => {
        console.log("requested :", requestedDetails.requested, "paymentIndicator : ", requestedDetails.paymentIndicator, "ambulance :", requestedDetails.ambulanceReq)
    }

    return (
        <AddActivityDetailsComponent 
            {...props} 
            title="Offer help "
            colorTheme={colorTheme} 
            firstId={firstId} 
            inputIsValid={inputIsValid} 
            />
    );
}

export default OfferHelpScreenDetails;

import React, {useState } from 'react';
import AddActivityDetailsComponent from './components/AddActivityDetailsComponent';
import Utilities from '../misc/Utils';
import API from "../APIClient/API";
import UUIDGenerator from 'react-native-uuid-generator';
import AppConstant from '../misc/AppConstant';
import ModalComponent from "./components/ModalComponent"


const firstId = Utilities.getID();

function OfferHelpScreenDetails(props) {
    const colorTheme = "#4F5065";
    const [modalInfo, setModalInfo] = useState({});
    const [showModal, setShowModal] = useState(false);

    const closePopUp = () => {
        setShowModal(!showModal);
    }

    const showPopUp = () => {
        setShowModal(!showModal);
    }
    const inputIsValid = (requestedDetails) => {
        console.log("requested :", requestedDetails.requested, "paymentIndicator : ", requestedDetails.paymentIndicator, "ambulance :", requestedDetails.ambulanceReq)

        console.log("requested :", requestedDetails.requested, "  address : ",requestedDetails.address, "  region : ",requestedDetails.region, "  activity_category : ",requestedDetails.activity_category, "  paymentIndicator : ", requestedDetails.paymentIndicator, "  nce :", requestedDetails.ambulanceReq)
        //let restApi = new API();
        
        UUIDGenerator.getRandomUUID((uuid) => {

            console.log("activity_uuid : " , uuid); 
            console.log("type" , AppConstant.API_REQUEST_CONSTANTS.activity_type.Offer);
            console.log("location",  requestedDetails.region.latitude+","+requestedDetails.region.longitude);
            console.log("acq ", "10");
            console.log("address", requestedDetails.address);
            console.log("Category ", requestedDetails.activity_category);
            console.log("Data length " , requestedDetails.requested.length);
            console.log("Data : ",  requestedDetails.requested);
            console.log("Payment indecator : " , requestedDetails.paymentIndicator)

            let canPay = requestedDetails.paymentIndicator;

            let restApi = new API();
            reqObj =  restApi.activityAdd(uuid, AppConstant.API_REQUEST_CONSTANTS.activity_type.Offer, requestedDetails.region.latitude+","+requestedDetails.region.longitude, "10", "Address1", requestedDetails.activity_category,requestedDetails.requested.length,requestedDetails.requested,"",canPay)
            reqObj.then((response) => {
                console.log("Add Response : " + JSON.stringify(response))
                if(response.status === "1") {
                    showPopUp();
                }
            })
        });
    }

    return (
        <>
            <AddActivityDetailsComponent 
                {...props} 
                title="Offer help "
                colorTheme={colorTheme} 
                firstId={firstId} 
                activity_type={AppConstant.API_REQUEST_CONSTANTS.activity_type.Offer}
                inputIsValid={inputIsValid} />
            <ModalComponent
                {...modalInfo}
                viewName={(modalInfo && modalInfo.type) ? modalInfo.type : ""}
                showModal={showModal}
                closePopUp={closePopUp} 
                activity_type={AppConstant.API_REQUEST_CONSTANTS.activity_type.Offer} />
        </>
    );
}

export default OfferHelpScreenDetails;
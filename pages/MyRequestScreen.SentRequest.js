import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Container, Header, Grid, Row, Col, Title, Left, Icon, Right, Button, Body, Content, Text, Footer, FooterTab, Card, CardItem } from "native-base";
import translate from 'react-native-i18n';
import { BasicFilledButton } from './components/ButtonComponent';
import { PastOfferRequestComponent } from './components/PastOfferRequestComponent';
import { apiInstance } from "../APIClient/API";
import AppConstant from '../misc/AppConstant';
import { RequesterInfoCardComponent } from './components/CardComponent';
import ModalComponent from './components/ModalComponent';
import HeaderComponent from './components/HeaderComponent';


function MyRequestSentRequestScreen(props) {
    const colorTheme = "#EE6B6B";
    const [showModal, setShowModal] = useState(false);
    const [modalInfo, setModalInfo] = useState({});
    const requestParams = (props.route && props.route.params && props.route.params.request) ? props.route.params.request : {};
    const closePopUp = () => {
        setShowModal(!showModal);
    }

    const primaryActionHandler = (ele, actions) => {
        console.log(ele, "$$$$", actions);

        if (actions === AppConstant.APP_ACTION.RATE_REPORT) {
            setModalInfo({
                type: AppConstant.APP_ACTION.RATE_REPORT,
                ...ele
            });
            setShowModal(!showModal);
        }

    }

    const getMappedRequestView = () => {
        const mappedRequestView = [];
        if (requestParams && requestParams.mapping && requestParams.mapping.length) {
            requestParams.mapping.forEach((singleMapping) => {
                mappedRequestView.push(
                    <RequesterInfoCardComponent
                        name={singleMapping.offer_detail.user_detail.first_name + " " + singleMapping.offer_detail.user_detail.last_name}
                        primayInfo={singleMapping.offer_detail.user_detail}
                        dateTime={singleMapping.offer_detail.date_time}
                        clickHandler={primaryActionHandler}
                        {...singleMapping} />)
            });
        }

        // if no items 
        if (mappedRequestView.length <= 0) {
            mappedRequestView.push(
                <View>
                    <Text> This is Request Details </Text>
                </View>
            )
        }

        return mappedRequestView;
    }

    return (
        <Container>
            <HeaderComponent {...props}
                title={translate.t("Request_have_been_sent_to")}
                bgColor={colorTheme} />
            <Content   >
                {getMappedRequestView()}
            </Content>
            <ModalComponent
                {...modalInfo}
                viewName={(modalInfo && modalInfo.type) ? modalInfo.type : ""}
                showModal={showModal}
                closePopUp={closePopUp} />
            <Footer>
                <View style={{ 
                        marginTop: 10, 
                        justifyContent: "center", 
                        alignItems: "center",
                        width:"90%" }}>
                    <BasicFilledButton
                        buttonStyle={{
                            borderRadius:10
                        }}
                        clickHandler={() => { props.closePopUp() }}
                        label={translate.t("Cancel_This_Request")}
                        colorTheme={colorTheme} />
                </View>
            </Footer>
        </Container>
    );
}

export default MyRequestSentRequestScreen;
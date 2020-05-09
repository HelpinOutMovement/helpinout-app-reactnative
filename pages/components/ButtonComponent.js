
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Col, Text } from "native-base";
import AppConstant from '../../misc/AppConstant';
import { useNavigation } from '@react-navigation/native';
import { verticalScale, scale } from 'react-native-size-matters';

const ButtonComponent = (props) => {

    const navigation = useNavigation();
    let buttonFilledStyle = {
        marginLeft: 10,
        alignItems: "center",
        backgroundColor: props.colorTheme ? props.colorTheme : "#EE6B6B",
        height: verticalScale(50),
        borderRadius: 10,
        justifyContent: "center",
        alignContent: "center"

    };
    if (props.unfilled) {
        buttonFilledStyle = {
            alignItems: "center",
            borderColor: props.colorTheme ? props.colorTheme : "#EE6B6B",
            height: verticalScale(50),
            borderWidth: 2,
            borderRadius: 10,
            justifyContent: "center",
            alignContent: "center"
        }
    }
    return (
        <Col style={{ width: scale(150) , ...props.containerStyle}}>
            <TouchableOpacity
                style={buttonFilledStyle}
                onPress={() => {
                    props.setShowModal(true)
                    if(props.activity_type === AppConstant.API_REQUEST_CONSTANTS.activity_type.Request){
                            if(props.buttonVal === AppConstant.APP_CONFIRMATION.YES){
                                navigation.navigate(AppConstant.APP_PAGE.SEARCH_HELP_PROVIDERS_REQUESTERS, {activity_type:props.activity_type, activity_uuid:props.activity_uuid,activity_category:props.activity_category, region:{}, address:""})
                            }else if(props.buttonVal === AppConstant.APP_CONFIRMATION.NO){
                                navigation.navigate(AppConstant.APP_PAGE.MY_REQUEST_SCREEN)
                            }
                    }else if(props.activity_type === AppConstant.API_REQUEST_CONSTANTS.activity_type.Offer){
                            if(props.buttonVal === AppConstant.APP_CONFIRMATION.YES){
                                navigation.navigate(AppConstant.APP_PAGE.SEARCH_HELP_PROVIDERS_REQUESTERS, {activity_type:props.activity_type, activity_uuid:props.activity_uuid,activity_category:props.activity_category, region:{}, address:""})
                            }else if(props.buttonVal === AppConstant.APP_CONFIRMATION.NO){
                                navigation.navigate(AppConstant.APP_PAGE.MY_OFFERS_SCREEN)
                            }
                    }
                    
                }
                }>
                <Text
                    adjustsFontSizeToFit={true}  minimumFontScale={.5}
                    style={{

                        textAlign: "center",
                        fontFamily: "Roboto-Regular",
                        //fontSize: 18,
                        color: (props.unfilled) ? (props.colorTheme ? props.colorTheme : "#EE6B6B") : "#ffffff"
                    }}
                > {props.label}</Text>
            </TouchableOpacity>
        </Col>
    );
};

const BasicFilledButton = (props) => {
    let buttonFilledStyle = {
        marginVertical: 30,
        alignItems: "center",
        backgroundColor: props.colorTheme ? props.colorTheme : "#EE6B6B",
        height: verticalScale(50),
        width: scale(315),
        shadowOpacity: 0.9,
        shadowOffset: { height: 3 },
        shadowColor: '#2328321F',

    };
    if(props.buttonStyle) {
        buttonFilledStyle = {
            ...buttonFilledStyle,
            ...props.buttonStyle
        }
    }
    return (
        <TouchableOpacity
        style={buttonFilledStyle}
        onPress={() => {
            props.clickHandler(true)
        }
        }>
        <Text
        adjustsFontSizeToFit={true}  minimumFontScale={.5}
            style={{
                textAlign: "center",
                                fontFamily: "Roboto-Medium",
                                //fontSize: 20,
                                //lineHeight: 56,
                                color: "#FFFFFF"
            }}
        > {props.label}</Text>
    </TouchableOpacity>
    );
}

const BasicButton = (props) => {
    let buttonFilledStyle = {
        alignItems: "flex-start",
        borderRadius: 10,
        alignItems:"center", 
        justifyContent:"center",
        flex:1,
        alignContent:"center",
    };
    if(props.btnStyle) {
        buttonFilledStyle = {
            ...buttonFilledStyle,
            ...props.btnStyle
        }
    }
    
    return (
        <TouchableOpacity
        style={buttonFilledStyle}
        onPress={() => {
            props.clickHandler(true)
        }
        }>
        <Text
        adjustsFontSizeToFit={true}  minimumFontScale={.5}
            style={{
                textAlign: "left",
                fontFamily: "Roboto-Regular",
                //fontSize: 14,
                //lineHeight: 26,
                color: "#4F5065"
            }}
        > {props.label}</Text>
    </TouchableOpacity>
    );
}

export {
    BasicButton,
    BasicFilledButton
}

export default ButtonComponent;
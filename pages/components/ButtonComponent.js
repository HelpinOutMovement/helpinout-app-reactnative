
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Col, Text } from "native-base";

const ButtonComponent = (props) => {

    let buttonFilledStyle = {
        marginLeft: 10,
        alignItems: "center",
        backgroundColor: props.colorTheme ? props.colorTheme : "#EE6B6B",
        height: 56,
        borderRadius: 10

    };
    if (props.unfilled) {
        buttonFilledStyle = {
            alignItems: "center",
            borderColor: props.colorTheme ? props.colorTheme : "#EE6B6B",
            height: 56,
            borderWidth: 2,
            borderRadius: 10
        }
    }

    return (
        <Col style={{ width: "40%" , ...props.containerStyle}}>
            <TouchableOpacity
                style={buttonFilledStyle}
                onPress={() => {
                    props.setShowModal(true)
                }
                }>
                <Text
                    style={{

                        textAlign: "center",
                        fontFamily: "Roboto-Regular",
                        fontSize: 16,
                        lineHeight: 56,
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
        backgroundColor: "#4F5065",
        height: 56,
        width: "92%",
        shadowOpacity: 0.9,
        shadowOffset: { height: 3 },
        shadowColor: '#2328321F',

    };
    return (
        <TouchableOpacity
        style={buttonFilledStyle}
        onPress={() => {
            props.clickHandler(true)
        }
        }>
        <Text
            style={{
                textAlign: "center",
                                fontFamily: "Roboto-Medium",
                                fontSize: 20,
                                lineHeight: 56,
                                color: "#FFFFFF"
            }}
        > {props.label}</Text>
    </TouchableOpacity>
    );
}

const BasicButton = (props) => {
    let buttonFilledStyle = {
        marginLeft: 10,
        alignItems: "flex-start",
        height: 56,
        borderRadius: 10

    };
    return (
        <TouchableOpacity
        style={buttonFilledStyle}
        onPress={() => {
            props.clickHandler(true)
        }
        }>
        <Text
            style={{
                textAlign: "left",
                fontFamily: "Roboto-Regular",
                fontSize: 14,
                lineHeight: 26,
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
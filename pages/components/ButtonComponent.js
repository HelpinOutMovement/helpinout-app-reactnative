
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Col, Text } from "native-base";

const ButtonComponent = (props) => {

    let buttonFilledStyle = {
        marginLeft: 10,
        alignItems: "center",
        backgroundColor: props.color ? props.color : "#EE6B6B",
        height: 56,
        borderRadius: 10

    };
    if (props.unfilled) {
        buttonFilledStyle = {
            alignItems: "center",
            borderColor: props.color ? props.color : "#EE6B6B",
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
                        color: (props.unfilled) ? (props.color ? props.color : "#EE6B6B") : "#ffffff"
                    }}
                > {props.label}</Text>
            </TouchableOpacity>
        </Col>
    );
};

export default ButtonComponent;
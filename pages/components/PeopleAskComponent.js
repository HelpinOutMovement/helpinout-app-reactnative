
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Textarea, CheckBox, Row, Col, Input, Text } from "native-base";


const PeopleAskComponent = (props) => {
    return (
        <React.Fragment>
            <Row style={{ marginVertical: 10 }}>
                <TouchableOpacity onPress={() => {
                    props.setChecked(!props.checked);
                }}>
                    <Col style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }}>
                        <CheckBox checked={props.checked} color="#4F5065" style={{ marginRight: 20 }} />
                        <Text>{props.label}</Text>
                    </Col>
                </TouchableOpacity>
            </Row>
            <Row style={{marginBottom:30}}>
                <Col>
                    <Textarea
                        style={{
                            color: "#4F5065B8",
                            fontFamily: "Roboto-Regular",
                            fontSize: 16,
                            borderRadius: 12,
                            borderColor: "#2328323D"
                        }}
                        rowSpan={5}
                        bordered
                        placeholder="Details" />
                </Col>
                <Col style={{ width: "20%", marginLeft: 10, height: 50 }}>
                    <Input
                        placeholder="Qty"
                        keyboardType={'numeric'}
                        style={{

                            fontSize: 20,
                            borderWidth: 1,
                            borderColor: '#2328323D',
                            borderRadius: 9,
                            color: '#4F5065B8',
                        }} />
                </Col>

            </Row>
        </React.Fragment>
    )
}

export default PeopleAskComponent;
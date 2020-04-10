import React  from 'react';
import { TouchableOpacity } from 'react-native';
import {  Row, Col, Input} from "native-base";
import { default as MaterialCommunityIcon } from 'react-native-vector-icons/MaterialCommunityIcons';
import translate from 'react-native-i18n';
import {appLabelKey} from '../../misc/AppStrings';
import AppConstant from '../../misc/AppConstant';

const InputRowComponent = (props) => {
    return (
        <Row style={{ alignItems: "center", marginVertical: 10 }}>
            <Col style={{ width: "66%" }}>
                <Input
                    placeholder= {translate.t(appLabelKey.enter_items_optional)} 
                    maxLength={AppConstant.APP_TEXT_INPUT.MAX_LENGTH}
                    style={{
                        fontSize: 20,
                        borderWidth: 1,
                        borderColor: 'gray',
                        borderRadius: 9,
                        color: 'black',

                    }} />
            </Col>
            <Col style={{ width: "20%", marginLeft: 10 }}>
                <Input
                    placeholder={translate.t(appLabelKey.qty)} 
                    keyboardType={'numeric'}
                    style={{
                        fontSize: 20,
                        borderWidth: 1,
                        borderColor: 'gray',
                        borderRadius: 9,
                        color: 'black',
                    }} />
            </Col>
            <Col style={{ width: "10%", marginLeft: 10 }}>
                <TouchableOpacity
                    style={{
                        alignItems: "center"

                    }}
                    onPress={() => {
                        if (props.onDelete) {
                            props.onDelete(props.code)
                        }
                    }}>
                    {props.showDelete && (<MaterialCommunityIcon name="delete" style={{ fontSize: 40 }} />)}
                </TouchableOpacity>
            </Col>
        </Row>
    )
}
export default InputRowComponent;
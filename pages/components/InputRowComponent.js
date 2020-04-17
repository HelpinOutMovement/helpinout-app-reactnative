import React  from 'react';
import { TouchableOpacity } from 'react-native';
import {  Row, Col, Input,Item, Icon} from "native-base";
import { default as MaterialCommunityIcon } from 'react-native-vector-icons/MaterialCommunityIcons';
import translate from 'react-native-i18n';
import {appLabelKey} from '../../misc/AppStrings';
import AppConstant from '../../misc/AppConstant';
import commonStyling from '../../styling/commonStyle';

const InputRowComponent = (props) => {
    
    return (
        <Row style={{ alignItems: "center", marginVertical: 15, marginHorizontal:10 }}>
            <Col style={{ width: "65%", marginRight:10 }}>
            <Input
                    color="red"
                    placeholderTextColor='#4F5065B8'
                    placeholder= {translate.t(appLabelKey.enter_items_optional)} 
                    maxLength={AppConstant.APP_TEXT_INPUT.MAX_LENGTH}
                    style={[commonStyling.inputRowComponentText, (props.showError ? {borderColor: 'red'}: {borderColor: '#4F5065B8'})]} 
                    onChangeText={(value)=> {
                        if(props.onTextChange){
                             props.onTextChange(props.code , value);
                        }
                    }}
                    />
            </Col>
            <Col style={{ width: "20%", marginLeft: 10 }}>
                <Input
                    placeholder={translate.t(appLabelKey.qty)} 
                    placeholderTextColor='#4F5065B8'
                    keyboardType={'numeric'}
                    maxLength={AppConstant.APP_TEXT_INPUT.NUMBER_MAX_LENGTH}
                    style={commonStyling.inputRowComponentText} 
                    onChangeText={(value)=> {
                        if(props.onQtyChange){
                             props.onQtyChange(props.code , value);
                        }
                    }}
                     />
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
                    {props.showDelete && (<MaterialCommunityIcon name="close" style={{ fontSize: 30, color:"#4F5065" }} />)}
                </TouchableOpacity>
            </Col>
        </Row>
    )
}
export default InputRowComponent;
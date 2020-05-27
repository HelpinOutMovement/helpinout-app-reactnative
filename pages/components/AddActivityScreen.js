

import React, { Component, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  View,
  TextInput,
  Switch,
  KeyboardAvoidingView
} from 'react-native';
import { Container, Content, Text, Row, Col, Textarea } from "native-base";
import { default as MaterialCommunityIcon } from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderComponent from './HeaderComponent';
import { default as EntypoIcon } from 'react-native-vector-icons/AntDesign';
import translate from 'react-native-i18n';
import { appLabelKey } from '../../misc/AppStrings';
import AppConstant from '../../misc/AppConstant';
import HView from "./HView"
import ModalComponent from './ModalComponent';
import UUIDGenerator from 'react-native-uuid-generator';
import API from '../../APIClient/API'
import Utils from '../../misc/Utils'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


const width = Dimensions.get('window').width;
const dimensions = Dimensions.get('window');
class Animated_Item extends Component {

  constructor(props) {

    super(props);
    this.animatedValue = new Animated.Value(0);

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.item.id !== this.props.item.id) {
      return true;
    }
    return false;
  }

  componentDidMount() {

    Animated.timing(
      this.animatedValue,
      {
        toValue: 0.5,
        duration: 510,
        useNativeDriver: true
      }
    ).start(() => {
      this.props.afterAnimationComplete();
    });

  }

  deleteItem = () => {
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 510,
        useNativeDriver: true
      }
    ).start(() => {
      this.props.deleteItem(this.props.item.id);
    });
  }


  itemDataOnChange = (itemType, itemIndex, itemValue) => {
    this.props.itemChangeCallback(itemType, itemIndex, itemValue);
  }



  render() {

    const translate_Animation_Object = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [-width, 0, width]
    });

    const opacity_Animation_Object = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0]
    });

    return (
      <Animated.View style={[
        styles.singleItemView, {
          transform: [{ translateX: translate_Animation_Object }],
          opacity: opacity_Animation_Object
        }]}>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-evenly", marginBottom: 10 }}>
          <TextInput
            placeholderTextColor="grey"
            placeholder={translate.t("hint_enter_item")}
            style={{ borderWidth: 1, borderRadius: 3, borderColor: "grey", height: 40, width: 200, marginRight: 10, padding: 10, color: "#000000" }}
            onChangeText={(val) => this.itemDataOnChange("detail", this.props.item.id, val)}
          >
          </TextInput>
          <TextInput
            keyboardType={'numeric'}
            placeholderTextColor="grey"
            placeholder={translate.t("hint_qty")}
            style={{ borderWidth: 1, borderRadius: 3, borderColor: "grey", height: 40, width: 80, marginLeft: 10, marginRight: 10, padding: 10, color: "#000000" }}
            onChangeText={(val) => this.itemDataOnChange("qty", this.props.item.id, val)}
          >
          </TextInput>
          <TouchableOpacity
            style={{
              alignItems: "center",
              marginTop: 5
            }}
            onPress={this.deleteItem}>
            {(<MaterialCommunityIcon name="close" style={{ fontSize: 30, color: "#4F5065" }} />)}
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
}

export default class AddActivityScreen extends Component {


  constructor(props) {
    
    super(props);
    this.state = {
      region: this.props.route.params.region, valueArray: [], disabled: false, hideAddMore: true, hideConstrains: false,
      constrainsData: "", volunters_required: false, volunters_detail: "", volunters_quantity: 0, technical_personal_required: false, technical_personal_detail: "", technical_personal_quantity: 0,
      enableVolunteers: false, enableTechPersonal: false,
      title: "Need help with...", headerBgColor: "#4F5065", showModal: false, address: this.props.route.params.address,
      activity_type: this.props.route.params.activity_type, activity_category: this.props.route.params.activity_category
    }
    this.addNewElement = false;
    this.index = 0;



    const colorTheme = "#4F5065";

  }

  setShowModal = (val) => {
    this.setState({ showModal: val })
  }
  closePopUp = () => {
    this.setState({ showModal: false })
  }
  showPopUp = () => {
    this.setState({ showModal: true })

  }

  itemChangeCallBack = (itemKey, itemIndex, itemValue) => {
    let indexVal = this.state.valueArray.findIndex(ele => ele.id === itemIndex);
    this.state.valueArray[indexVal][itemKey] = itemValue;
  }

  constrainsDataOnChange = async (val) => {
    await this.setState({ constrainsData: val })
  }
  setPeopleData = async (data_for, data) => {
    switch (data_for) {
      case "volunters_required":
        await this.setState({ volunters_required: data })
        break;
      case "technical_personal_required":
        await this.setState({ technical_personal_required: data })
        break;
      case "volunters_detail":
        await this.setState({ volunters_detail: data })
        break;
      case "volunters_quantity":
        await this.setState({ volunters_quantity: data })
        break;
      case "technical_personal_detail":
        await this.setState({ technical_personal_detail: data })
        break;
      case "technical_personal_quantity":
        await this.setState({ technical_personal_quantity: data })
        break;
      default:
        console.log("no matching data")
    }

  }

  submitData = (canPay) => {
    let restApi = new API();
    UUIDGenerator.getRandomUUID((uuid) => {
      switch (this.props.route.params.optionCode) {
        case AppConstant.API_REQUEST_CONSTANTS.activity_category.PEOPLE:
          let volReq = this.state.volunters_required ? 1 : 0;
          let techReq = this.state.technical_personal_required ? 1 : 0;
          let peopleData = {
            "volunters_required": volReq, "volunters_detail": this.state.volunters_detail, "volunters_quantity": this.state.volunters_quantity,
            "technical_personal_required": techReq, "technical_personal_detail": this.state.technical_personal_detail, "technical_personal_quantity": this.state.technical_personal_quantity
          }
          
          reqObj = restApi.activityAdd(uuid, this.props.route.params.activity_type, this.state.region.latitude + "," + this.state.region.longitude, "100", this.state.address, this.props.route.params.optionCode, 1, peopleData, this.state.constrainsData, canPay, this.props.route.params.self_else)
          reqObj.then((response) => {
            if (response.status === "1") {
              this.setState({ activity_category: response.data.activity_category, activity_uuid: response.data.activity_uuid, activity_type: response.data.activity_type }, () => {
                this.showPopUp();
              })

            }
          }).catch((err) => { console.log(err) })

          break;
        case AppConstant.API_REQUEST_CONSTANTS.activity_category.AMBULANCE:
          reqObj = restApi.activityAdd(uuid, this.props.route.params.activity_type, this.state.region.latitude + "," + this.state.region.longitude, "100", this.state.address, this.props.route.params.optionCode, 1, { qty: 0 }, this.state.constrainsData, canPay, this.props.route.params.self_else)
          reqObj.then((response) => {
            if (response.status === "1") {
              this.setState({ activity_category: response.data.activity_category, activity_uuid: response.data.activity_uuid, activity_type: response.data.activity_type }, () => {
                this.showPopUp();
              })
            }
          }).catch((err) => { console.log(err) })

          break;
        default:
          
          reqObj = restApi.activityAdd(uuid, this.props.route.params.activity_type, this.state.region.latitude + "," + this.state.region.longitude, "100", this.state.address, this.props.route.params.optionCode, this.state.valueArray.length, this.state.valueArray, this.state.constrainsData, canPay, this.props.route.params.self_else)

          reqObj.then((response) => {
            if (response.status === "1") {
              this.setState({ activity_category: response.data.activity_category, activity_uuid: response.data.activity_uuid, activity_type: response.data.activity_type }, () => {
                this.showPopUp();
              })
            }
          }).catch((err) => { console.log(err) })


      }

    })

  }


  componentDidMount() {

    if (this.props.route.params.activity_type === 1) {
      this.setState({ title:  translate.t("toolbar_need_help_with"), headerBgColor: "#EE6B6B" })
      if (this.props.route.params.optionCode === AppConstant.API_REQUEST_CONSTANTS.activity_category.PEOPLE || this.props.route.params.optionCode === AppConstant.API_REQUEST_CONSTANTS.activity_category.AMBULANCE) {
        this.setState({ hideAddMore: true })
        this.setState({ hideConstrains: true })
      } else {
        this.setState({ hideAddMore: false })
        this.setState({ hideConstrains: true })
        this.add_New_View();
      }
    } else {
      this.setState({ title: translate.t("toolbar_offer_help_with"), headerBgColor: "#4F5065" })
      if (this.props.route.params.optionCode === AppConstant.API_REQUEST_CONSTANTS.activity_category.PEOPLE || this.props.route.params.optionCode === AppConstant.API_REQUEST_CONSTANTS.activity_category.AMBULANCE) {
        this.setState({ hideAddMore: true })
        this.setState({ hideConstrains: true })
      } else {
        this.setState({ hideAddMore: false })
        this.setState({ hideConstrains: false })
        this.add_New_View();
      }
    }
    //this.add_New_View();

  }
  afterAnimationComplete = () => {
    this.index += 1;
    this.setState({ disabled: false });
  }

  add_New_View = () => {
    this.addNewElement = true;
    const newlyAddedValue = { id: "id_" + this.index, text: this.index + 1 };

    this.setState({
      disabled: true,
      valueArray: [...this.state.valueArray, newlyAddedValue]
    });
  }

  remove_Selected_Item(id) {
    this.addNewElement = false;
    const newArray = [...this.state.valueArray];
    newArray.splice(newArray.findIndex(ele => ele.id === id), 1);

    this.setState(() => {
      return {
        valueArray: newArray
      }
    }, () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Container >

          <HeaderComponent {...this.props} title={this.state.title} bgColor={this.state.headerBgColor} />
          <Content padder contentContainerStyle={{ ...StyleSheet.absoluteFillObject, justifyContent: 'flex-start', alignItems: 'center', }} >
                <View style={{height:verticalScale(100), width:scale(100)}}>
                <Image
                  resizeMode="contain"
                  style={{ alignSelf: "center", height: "100%", width: "100%" }}
                  source={this.props.route.params.optionImage} />
                </View>


                  <HView style={styles.hintTextContainer, (this.state.activity_type == 2) ? { borderWidth: 0, height: verticalScale(300) } : { borderWidth: 0, height: verticalScale(300)  }} hide={this.state.hideAddMore}>
                    <ScrollView
                      ref={scrollView => this.scrollView = scrollView}
                      onContentSizeChange={() => {
                        this.addNewElement && this.scrollView.scrollToEnd();
                      }}>

                      <View style={{ flex: 1, padding: 4 }}>

                        {this.state.valueArray.map(ele => {
                          return (
                            <Animated_Item {...this.props}
                              itemChangeCallback={this.itemChangeCallBack}
                              key={ele.id}
                              item={ele}
                              deleteItem={(id) => this.remove_Selected_Item(id)}
                              afterAnimationComplete={this.afterAnimationComplete}
                            />
                          )
                        })}
                      </View>
                    </ScrollView>
                  </HView>




            {this.props.route.params.optionCode === AppConstant.API_REQUEST_CONSTANTS.activity_category.PEOPLE
              ?
              <View style={{ width: scale(300), height: verticalScale(360), flex: 1, flexDirection: 'column', justifyContent: "center", marginBottom: 0, borderWidth: 0, marginTop: 0,  }}>
                <ScrollView style={{paddingHorizontal:10}}>
                <Row style={{borderWidth:0, }}>
                  <Col>
                    <View style={{ borderWidth: 0, marginTop:20}}>
                      <View style={styles.SwitchRow}>
                        <Switch
                          disabled={false}
                          activeText={'On'}
                          inActiveText={'Off'}
                          backgroundActive={'green'}
                          backgroundInactive={'gray'}
                          circleActiveColor={'#30a566'}
                          circleInActiveColor={'#000000'}

                          value={this.state.volunters_required ? true : false}
                          style={styles.Switch, { borderWidth: 0 }}
                          onValueChange={(switchValue) => { this.setPeopleData("volunters_required", switchValue) }}
                        ></Switch><Text adjustsFontSizeToFit={true}  minimumFontScale={1} style={{ marginLeft: 20 }}>{translate.t("volunteers")}</Text>
                      </View>
                      <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-evenly", marginTop: 0, marginBottom: 0, borderWidth: 0, marginLeft:10 }}>
                        <Textarea rowSpan={5} style={{ borderWidth: 1, borderRadius: 4, width: "80%" }}
                          onChangeText={(val) => this.setPeopleData("volunters_detail", val)}
                          disabled={!this.state.volunters_required}></Textarea>
                        <TextInput
                          keyboardType={'numeric'}
                          placeholderTextColor="grey"
                          placeholder={translate.t("hint_qty")}
                          style={{ borderWidth: 1, borderRadius: 3, borderColor: "grey", color: "#000000", height: 40, width: 60, marginLeft: 10, marginRight: 10, padding: 10 }}
                          onChangeText={(val) => this.setPeopleData("volunters_quantity", val)}
                          editable={this.state.volunters_required}
                        >
                        </TextInput>
                      </View>
                    </View>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <View style={{ borderWidth: 0, marginTop:20}}>
                    <View style={styles.SwitchRow}>
                      <Switch
                        disabled={false}
                        activeText={'On'}
                        inActiveText={'Off'}
                        backgroundActive={'green'}
                        backgroundInactive={'gray'}
                        circleActiveColor={'#30a566'}
                        circleInActiveColor={'#000000'}

                        value={this.state.technical_personal_required ? true : false}
                        style={styles.Switch, { borderWidth: 0 }}
                        onValueChange={(switchValue) => { this.setPeopleData("technical_personal_required", switchValue) }}
                      ></Switch><Text  adjustsFontSizeToFit={true}  minimumFontScale={1} style={{ marginLeft: 20 }}>{translate.t("technical_personnel")}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-evenly", marginTop: 0, marginBottom: 0, borderWidth: 0 , marginLeft:10 }}>
                      <Textarea rowSpan={5} style={{ borderWidth: 1, borderRadius: 4, width: "80%" }}
                        onChangeText={(val) => this.setPeopleData("technical_personal_detail", val)}
                        disabled={!this.state.technical_personal_required}></Textarea>
                      <TextInput
                        keyboardType={'numeric'}
                        placeholderTextColor="grey"
                        placeholder={translate.t("hint_qty")}
                        style={{ borderWidth: 1, borderRadius: 3, borderColor: "grey", color: "#000000", height: 40, width: 60, marginLeft: 10, marginRight: 10, padding: 10 }}
                        onChangeText={(val) => this.setPeopleData("technical_personal_quantity", val)}
                        editable={this.state.technical_personal_required}
                      >
                      </TextInput>
                    </View>
                    </View>
                  </Col>
                </Row>  
                </ScrollView>              
              </View>


              :
              <></>

            }


            <HView style={styles.hintTextContainer} hide={this.state.hideAddMore}>
              <HView style={{ textAlign: "left", borderWidth: 0, width: "100%", alignItems: "center", marginBottom: 20 }} hide={this.state.hideConstrains}>
                <Text  adjustsFontSizeToFit={true}  minimumFontScale={1}  style={{ textAlign: "left", borderWidth: 0, width: "90%" , fontWeight:"bold"}}>{translate.t("note")}</Text>
                <Textarea style={{ borderWidth: 1, borderRadius: 3, width: "90%" }}
                  rowSpan={5}
                  onChangeText={(val) => this.constrainsDataOnChange(val)}
                  placeholder={translate.t("hint_conditions")}></Textarea>
              </HView>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  borderColor: "#CACBCE",
                  height: 40,
                  borderStyle: "dashed",
                  borderWidth: 2,
                  borderRadius: 5,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: "center",
                  justifyContent: "center",
                  alignContent: "center",
                  width: "90%"
                }}
                onPress={this.add_New_View}>
                <EntypoIcon name="plus" style={{ fontSize: 18, color: "#4F5065" }} />
                <Text
                 adjustsFontSizeToFit={true}  minimumFontScale={1} 
                  style={{
                    textAlign: "center",
                    fontFamily: "Roboto-Regular",
                    //fontSize: 17,
                    color: "#4F5065",
                  }}
                >{translate.t("only_add_more_items")} </Text>
              </TouchableOpacity>
            </HView>
          </Content>
          <View style={{ alignItems: "center", marginTop: 10, marginBottom: 10 }}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.NonFilled} onPress={() => this.submitData(1)}>
                <View style={(this.props.route.params.activity_type === 1) ? styles.nonfilled_red : styles.nonfilled_grey}>
                  <Text adjustsFontSizeToFit={true}  minimumFontScale={.5} style={(this.props.route.params.activity_type === 1) ? styles.buttonTextNonFilled_red : styles.buttonTextNonFilled_grey}>{(this.props.route.params.activity_type === 1) ? translate.t("we_can_pay") : translate.t("we_charge")}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.Filled} onPress={() => this.submitData(0)}>
                <View style={(this.props.route.params.activity_type === 1) ? styles.filled_red : styles.filled_grey}>
                  <Text adjustsFontSizeToFit={true}  minimumFontScale={.5} style={(this.props.route.params.activity_type === 1) ? styles.buttonTextFilled_red : styles.buttonTextFilled_grey}>{(this.props.route.params.activity_type === 1) ? translate.t("we_can_not_pay") : translate.t("for_free")}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

        </Container>

        <ModalComponent
          {...this.props}
          backdropClickNotAllowed={true}
          viewName={(this.props && this.props.type) ? this.props.type : ""}
          showModal={this.state.showModal}
          closePopUp={this.closePopUp}
          colorTheme={this.state.headerBgColor}
          activity_uuid={this.state.activity_uuid}
          activity_type={this.state.activity_type}
          activity_category={this.state.activity_category}
          latlon={this.state.region.latitude + "," + this.state.region.longitude}
        />
      </View>

    );

  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    paddingTop: (Platform.OS == 'ios') ? 20 : 0
  },

  singleItemView: {
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 2,
    paddingLeft: 16,
    margin: 5,
    borderRadius: 8
  },

  singleItemText: {
    color: '#fff',
    fontSize: 23,
    paddingRight: 18
  },

  TouchableOpacityStyle: {

    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  FloatingButtonStyle: {

    resizeMode: 'contain',
    width: 50,
    height: 50,
  },

  deleteButton: {
    position: 'absolute',
    right: 10,
    width: 25,
    height: 25,
    borderRadius: 18,
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },

  removeIcon: {
    width: '100%',
    fontSize: 20
  },




  container: {
    flex: 1
  },

  hintTextContainer: {
    width: scale(350),
    alignItems: 'center',
    justifyContent: 'center',
    position: "absolute",
    bottom: 0
  },
  buttonContainer: {
    padding: 10,
    flexDirection: "row",
    width: scale(330),
    //borderColor: 'green',
    //borderWidth: 2,    
    //top:-(dimensions.width*.95),    
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  NonFilled: {
    paddingRight: 10,
  },
  Filled: {
    paddingLeft: 10,
  },

  filled_red: {
    backgroundColor: "#EE6B6B",
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: "#EE6B6B",
    borderRadius: 9,
  },
  nonfilled_red: {
    backgroundColor: "#ffffff",
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderColor: "rgba(243,103,103,1)",
    borderWidth: 2,
    borderRadius: 9,
  },

  filled_grey: {
    backgroundColor: "#4F5065",
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: "#4F5065",
    borderRadius: 9,
  },
  nonfilled_grey: {
    backgroundColor: "#ffffff",
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderColor: "#4F5065",
    borderWidth: 2,
    borderRadius: 9,
    color: "#4F5065",
  },


  buttonTextFilled_red: {
    color: "rgba(245,245,245,1)",
    //fontSize: 20,
    fontFamily: "roboto-regular",
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonTextNonFilled_red: {
    color: "rgba(243,103,103,1)",
    //fontSize: 20,
    fontFamily: "roboto-regular",
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonTextFilled_grey: {
    color: "rgba(245,245,245,1)",
    //fontSize: 20,
    fontFamily: "roboto-regular",
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonTextNonFilled_grey: {
    color: "rgba(109,115,130,1)",
    //fontSize: 20,
    fontFamily: "roboto-regular",
    alignItems: 'center',
    justifyContent: 'center',
  },






  SwitchText: {
    textAlign: "left",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: '#4F5065',
    height: 50,
    marginLeft: 20

  },
  SwitchRow: {
    marginTop: 0,
    height: 50,
    width: "100%",
    flexDirection: "row",
    flex: 0,
    marginRight: -1,
    textAlign: "left",
  },
  SwitchColumn: {
    marginTop: 0,
    height: 50,
    width: "100%",
    flexDirection: "column",
    flex: 1,
    marginRight: -1,
    textAlign: "left",
  },
  Switch: {
    marginBottom: 0,
    textAlign: "left",
    width: 45,
    height: 22
  },


});
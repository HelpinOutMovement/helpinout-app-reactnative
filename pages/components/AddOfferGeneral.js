
import React, { Component } from 'react';
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
} from 'react-native';
import { Container, Content,Text, Row, Col, Textarea } from "native-base";
import { default as MaterialCommunityIcon } from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderComponent from './HeaderComponent';
import { default as EntypoIcon } from 'react-native-vector-icons/AntDesign';
import translate from 'react-native-i18n';
import { appLabelKey } from '../../misc/AppStrings';
import HView from "./HView"


 
const width = Dimensions.get('window').width;
const dimensions = Dimensions.get('window');    
class Animated_Item extends Component {
 
  constructor(props) {
 
    super(props);
 
    this.animatedValue = new Animated.Value(0);
    this.state = {hideDeleteRow:props.hideDeleteRow}
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


  itemDataOnChange = (itemType, itemIndex, itemValue) =>{
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
 
        <View style={{flex: 1, flexDirection: 'row',justifyContent:"space-evenly", marginBottom:0}}>

                <TextInput 
                    placeholderTextColor="grey"
                    placeholder={"Enter Items"}                
                    style={{borderWidth:1, borderRadius:3, borderColor:"grey", height:40, width:200, marginRight:10, padding:10}}    
                    onChangeText={(val) => this.itemDataOnChange("item", this.props.item.id, val)} 
                >   
                </TextInput>
                <TextInput 
                        keyboardType={'numeric'}
                        placeholderTextColor="grey"
                        placeholder={"Qty"}                
                        style={{borderWidth:1, borderRadius:3, borderColor:"grey",height:40, width:80, marginLeft:10, marginRight:10, padding:10}} 
                        onChangeText={(val) => this.itemDataOnChange("qty", this.props.item.id, val)}                   
                >  
                </TextInput>
                <HView hide={this.state.hideDeleteRow}> 
                <TouchableOpacity
                    style={{
                        alignItems: "center",
                        marginTop:5
                    }}
                    onPress={this.deleteItem}>
                    {(<MaterialCommunityIcon name="close" style={{ fontSize: 30, color:"#4F5065" }} />)}
                </TouchableOpacity>
                </HView>
        
        </View> 
      </Animated.View>
    );
  }
}
 
export default class AddOfferGeneral extends Component {
 
  constructor(props) {
 
    super(props);
    console.log(JSON.stringify(this.props))
    this.state = { valueArray: [], disabled: false, hideAddMore:false, constrainsData:"" }
    this.addNewElement = false;
    this.index = 0;

    
    this.add_New_View();
  }

    itemChangeCallBack = (itemKey, itemIndex, itemValue) => {
        let indexVal = this.state.valueArray.findIndex(ele => ele.id === itemIndex);
        this.state.valueArray[indexVal][itemKey] = itemValue;
       //console.log(JSON.stringify(this.state.valueArray))
    }
 

componentDidMount(){

    this.add_New_View();

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
 

  constrainsDataOnChange = (val) =>{

    this.setState({constrainsData: val})

  }


  submitData = () =>{
    console.log(JSON.stringify(this.state.valueArray) , "   ",  this.state.constrainsData)

  }

  render() {
    return (
      <View style={styles.container}>
        <Container>
            <HeaderComponent {...this.props} title="Need help with" bgColor="#4F5065" />
            <Content padder contentContainerStyle={{...StyleSheet.absoluteFillObject, justifyContent: 'flex-start', alignItems: 'center',}} > 
                <Row style={{ marginVertical: 10 , borderWidth:0, borderColor:"black" ,height: 76}}>
                    <Col>
                        <Image
                            resizeMode="contain" 
                            style={{ alignSelf: "center", height: 76, width: 75 }}
                            source={require('../../images/food.png')} />

                    </Col>
                </Row> 
                <ScrollView
                    ref={scrollView => this.scrollView = scrollView}
                    onContentSizeChange={() => {
                        this.addNewElement && this.scrollView.scrollToEnd();
                    }}>
            
                    <View style={{ flex: 1, padding: 4 }}>
            
                        {this.state.valueArray.map(ele => {
                        return (
                            <Animated_Item
                            itemChangeCallback={this.itemChangeCallBack}
                            key={ele.id}
                            item={ele}
                            deleteItem={(id) => this.remove_Selected_Item(id)}
                            afterAnimationComplete={this.afterAnimationComplete}
                            hideDeleteRow={this.state.hideAddMore}
                            />
                        )
                        })}           
                    </View>           
                </ScrollView>
            </Content>
                    <HView style={styles.hintTextContainer} hide={this.state.hideAddMore}>
                        <HView style={{textAlign:"left", borderWidth:0, width:"100%", alignItems: "center",}} hide={false}>
                        <Text style={{textAlign:"left", borderWidth:0, width:"90%"}}>Note to requesters</Text>
                        <Textarea style={{borderWidth:1, borderRadius:3, width:"90%"}} 
                            rowSpan={5} 
                            onChangeText={(val) => this.constrainsDataOnChange(val)} 
                            placeholder={"Enter constrains on timing , delivery, selection, Any infor useful for the requester to know"}></Textarea>
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
                                width:"90%",
                                marginTop:10
                            }}
                            onPress={this.add_New_View}>
                            <EntypoIcon name="plus" style={{ fontSize: 18, color: "#4F5065" }} />
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontFamily: "Roboto-Regular",
                                    fontSize: 17,
                                    color: "#4F5065",
                                }}
                            >{translate.t(appLabelKey.add_more)} </Text>
                        </TouchableOpacity>
                    </HView>  
                  <View style={{alignItems: "center", marginTop:10, marginBottom:10}}>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity style={styles.WeCharge} onPress={() => this.submitData()}>
                        <View style={[styles.nonfilled]}>
                            <Text style={styles.buttonTextNonFilled}>{translate.t("We_Charge")}</Text>
                        </View> 
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.ForFree} onPress={() => this.submitData()}>
                        <View style={[styles.filled]}>
                            <Text style={styles.buttonTextFilled}>{translate.t("For_Free")}</Text>
                        </View>
                      </TouchableOpacity>                
                    </View> 
                  </View>
        </Container>
      </View>
      
    );
    
  }
  
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    paddingTop: (Platform.OS == 'ios') ? 20 : 0,
    borderWidth:0
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
  
  bottomPanelGroup: {  
    flex: 1,  
    flexDirection: "column",
    top: (dimensions.height*.58),
    left: 0,
    width: dimensions.width,
    height: 200,
    position: "absolute",
    borderColor: 'red',
    borderWidth: 2,    
    alignItems: 'center',    
    justifyContent:'center',
  },
  hintTextContainer: {
    width: dimensions.width,
    alignItems: 'center',      
    justifyContent:'center', 
    borderWidth:0   
  },
  buttonContainer:{
    padding: 10,        
    flexDirection: "row",     
    width: (dimensions.width*.95),        
    //borderColor: 'green',
    //borderWidth: 2,         
    justifyContent:'center',
    alignItems: 'center', 
  },
  WeCharge:{    
    paddingRight:10,
  },
  ForFree:{
    paddingLeft:10,
  },

    filled: {
      backgroundColor: "#4F5065",
      justifyContent:'center',
      height:50,
      width:150,
      alignItems: 'center',
      borderRadius: 9,
    },
    nonfilled: {
        justifyContent:'center',        
        height:50,
        width:150,
        alignItems: 'center',
        borderColor: "#4F5065",
        borderWidth: 2,
        borderRadius: 9,
      },
    buttonTextFilled: {
      color: "rgba(245,245,245,1)",
      fontSize: 20,
      fontFamily: "roboto-regular", 
      alignItems: 'center',    
      justifyContent:'center',
    },
  
    buttonTextNonFilled: {
        
        fontSize: 20,
        fontFamily: "roboto-regular", 
        alignItems: 'center',    
        justifyContent:'center',
      }




});
import React from 'react';
import {  Dimensions, StyleSheet, TouchableOpacity, Platform, Switch, Image} from "react-native";
import { Container, View, Text, Button, Icon}from "native-base";

import AppConstant from '../misc/AppConstant';
import Utilities from '../misc/Utils';
import HView from "./components/HView"
import API from "../APIClient/API";
import translate from 'react-native-i18n';
import { getDistance, getPreciseDistance } from 'geolib';
import MappingSuggestionResponseComponent from "./components/MappingSuggestionResponseComponent"
import MapComponent from './MapComponent';
import { ScrollView } from 'react-native-gesture-handler';
import StaticImage from '../styling/StaticImage';
import { withNavigation } from 'react-navigation';


import StarRating from 'react-native-star-rating';

import {verticalScale, scale, moderateScale} from 'react-native-size-matters';


import { DrawerActions } from 'react-navigation-drawer';

//import { ifIphoneX } from 'react-native-iphone-x-helper'

import { StackActions, NavigationActions } from 'react-navigation'

var {width, height} = Dimensions.get('window')
var dimensions  = Dimensions.get('window') 

var tempCheckValues = [];

class SearchHelpProvidersRequesters extends React.Component {
    constructor(props){
        super(props);


        this.navigation = this.props.navigation;     
        this.navigate = this.props.navigation.navigate;

        //this.props.navigation.dispatch(DrawerActions.openDrawer());

        //this.props.navigation.dispatch(DrawerActions.closeDrawer());

        this.state = {
            region:this.props.route.params.region,
            address:this.props.route.params.address,
            activity_category:this.props.route.params.activity_category,
            activity_type:this.props.route.params.activity_type,
            activity_uuid:this.props.route.params.activity_uuid,
            mapHeight:verticalScale(340),
            bottom_panel_icon:"ios-arrow-dropdown",
            bottom_panel_visible:true, 
            bottom_panel_bottom:height/2,
            activitySuggestionOfferResponse:[],
            checkBoxChecked: {},
            activity_data: [],   
            latlon:"",                
        }
        
        if(this.props.route.params.latlon){
            if(this.props.route.params.latlon.length > 0){
                this.setState({latlon:this.props.route.params.latlon})
                this.forceUpdate();
            }else{
                this.setState({latlon:""})
            }
        }else{
            this.setState({latlon:""})
        }

        //(this.props.route.params.latlon != "") ? this.setState({latlon:this.props.route.params.latlon}) : this.setState({latlon:""})

        this.topBarPos = 20;
        if(this.isIphoneX()){
            this.topBarPos = 40;
        }
        this.toggleBottomPanel()


        const helpOption = Utilities.getCategoryFromCode(props.activity_category);



/*

        this.navigation.addListener('tabPress', e => {
            // Prevent default action
            /////console.log("SearchHelpProvidersRequesters Navigation : tabPress " + JSON.stringify(e))
          });
      
      
          this.navigation.addListener('state', e => {
            // Prevent default action
            /////console.log("SearchHelpProvidersRequesters Navigation : state " + JSON.stringify(e))
            this.forceUpdate()
          });
      
      
          this.navigation.addListener('blur', e => {
            // Prevent default action
            /////console.log("SearchHelpProvidersRequesters Navigation : blur " + JSON.stringify(e))
          });
      
          this.navigation.addListener('tabPress', e => {
            // Prevent default action
            /////console.log("SearchHelpProvidersRequesters Navigation : blur " + JSON.stringify(e))
          });

*/
          
    }


        


      checkBoxChanged(id, value) {
        this.state.checkBoxChecked[id] = value;
        this.setState({
          checkBoxChecked: this.state.checkBoxChecked
        })
        /*
        if(value){
            this.state.activity_data.push(id)
        }else{
            var index = this.state.activity_data.indexOf(id);
            if (index !== -1) this.state.activity_data.splice(index, 1);
        }
        */
       if(value){
        this.state.activity_data.push({activity_uuid:id})
        }else{
            var index = this.state.activity_data.indexOf(x => x.activity_uuid === id);
            if (index !== -1) this.state.activity_data.splice(index, 1);
        }



      }


    isIphoneX = () => {
        const dimen = Dimensions.get('window');
        return (
            Platform.OS === 'ios' &&
            !Platform.isPad &&
            !Platform.isTVOS &&
            ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
        );
    }

    callbackOnRegionChange = (rgn, mapState) =>{
        this.setState({region:rgn, address:mapState.address, boundries:mapState.boundries}, () => {

            //this.setState({region:rgn, address:mapState.address})
            // Use Geocoding and get address.
            this.getActivitySuggestions()

        })
        
    }


    getActivitySuggestions = () =>{
        
        let restApi = new API();
        let reqObj =  restApi.activitySuggestions(this.state.activity_type, this.state.activity_uuid, this.state.region.latitude+","+this.state.region.longitude, "10.424", getDistance(this.state.boundries.northEast,this.state.boundries.southWest)/2)
                reqObj.then((respObject) => {
                    if(respObject.status === "1") {
                      //this.showPopUp();  
                        if(this.state.activity_type === 1){
                            this.setState({activitySuggestionOfferResponse:respObject.data.offers});
                        }else{
                            this.setState({activitySuggestionOfferResponse:respObject.data.requests});
                        }                                          
                    }
                }).catch((err) => {console.log(err)})    
        
/*
        let offers_data = [{"activity_type":2,"activity_uuid":"3B5E9462-C9DC-4FBF-8183-49E68C6D8B15","date_time":"2020-03-24T00:51:14.000-05:30","activity_category":1,"activity_count":1,"geo_location":"17.78583400,78.40641700","status":1,"offer_condition":"Vegan","activity_detail":[{"detail":"Food","quantity":5}],"user_detail":{"country_code":"+1","mobile_no":"6505551234","first_name":"Raghu","last_name":"Test1","mobile_no_visibility":0,"user_type":2,"org_name":null,"org_type":null,"org_division":null,"rating_avg":0,"rating_count":0}},{"activity_type":2,"activity_uuid":"4901a942-05b9-4003-9fe5-a62358d48281","date_time":"2020-04-22T19:07:44.000+05:30","activity_category":1,"activity_count":2,"geo_location":"13.06345812,77.61847425","status":1,"offer_condition":"Between 9am and 12 noon mornings. You must pickup and bring serving vessels. Please come wearing masks.","activity_detail":[{"detail":"Basic food, per day","quantity":1000},{"detail":"Rice","quantity":500}],"user_detail":{"country_code":"+91","mobile_no":"8431064108","first_name":"Ved","last_name":"Chikarmane","mobile_no_visibility":1,"user_type":2,"org_name":"Jakkur Collective","org_type":2,"org_division":"The Boss","rating_avg":0.5,"rating_count":3}},{"activity_type":2,"activity_uuid":"84389c6a-8b8e-4533-b28d-563075898e8d","date_time":"2020-04-22T17:04:28.000+05:30","activity_category":1,"activity_count":1,"geo_location":"28.64440150,77.36175768","status":1,"offer_condition":"Vdhs","activity_detail":[{"detail":"Food","quantity":20}],"user_detail":{"country_code":"+91","mobile_no":"7303767448","first_name":"new ","last_name":"user","mobile_no_visibility":0,"user_type":2,"org_name":"","org_type":null,"org_division":"","rating_avg":3.5,"rating_count":10}},{"activity_type":2,"activity_uuid":"F390A4C5-81A6-481D-B926-34ECEB942B7B","date_time":"2020-03-21T22:41:31.000-05:30","activity_category":1,"activity_count":1,"geo_location":"19.23246073,74.80682373","status":1,"offer_condition":"","activity_detail":[{"detail":"Lunch","quantity":20}],"user_detail":{"country_code":"+91","mobile_no":"9730131849","first_name":"VSRV","last_name":"Raghavan","mobile_no_visibility":0,"user_type":2,"org_name":null,"org_type":null,"org_division":null,"rating_avg":0,"rating_count":0}},{"activity_type":2,"activity_uuid":"5cd3b2dc-e32b-4010-80c7-659ca0568a98","date_time":"2020-04-20T18:53:38.000+05:30","activity_category":1,"activity_count":1,"geo_location":"13.06343820,77.61851180","status":1,"offer_condition":"Give us 48 hours notice. We will deliver from our We need 48 hours notice. We can location to a radius of 10 km","activity_detail":[{"detail":"Meals, per day","quantity":1000}],"user_detail":{"country_code":"+91","mobile_no":"8431064108","first_name":"Ved","last_name":"Chikarmane","mobile_no_visibility":1,"user_type":2,"org_name":"Jakkur Collective","org_type":2,"org_division":"The Boss","rating_avg":0.5,"rating_count":3}}]
        //offers_data = [];
        let respObject =  {"status":"1","message":"Success","data":{"offers":offers_data}};
        this.setState({activitySuggestionOfferResponse:respObject.data.offers});
*/       


    }

    toggleBottomPanel =() =>{
        if(this.state.bottom_panel_visible){
            this.setState({bottom_panel_visible:false})
            this.setState({bottom_panel_icon:"ios-arrow-dropup"})
            this.setState({mapHeight:verticalScale(680)})
            this.setState({bottom_panel_bottom:10})            
        }else{
            this.setState({bottom_panel_visible:true})
            this.setState({bottom_panel_icon:"ios-arrow-dropdown"})
            this.setState({mapHeight:verticalScale(340)})
            this.setState({bottom_panel_bottom:height/2})   
        }
    }

    getDistanceBetween(source, destination){
        return getDistance( source, destination)
        //getDistance( { latitude: this.state.region.latitude, longitude: this.state.region.longitude }, { latitude: singleData.latitude, longitude: singleData.longitude })
    }

    submitActivity = () =>{
        let offerer = [];
        let requester = [];
        (this.state.activity_type === 2) ? 
                        //requester = {activity_uuid:this.state.activity_uuid, activity_type:this.state.activity_type, request:this.state.activity_data}
                        requester = this.state.activity_data
                        :
                        //offerer = {activity_uuid:this.state.activity_uuid, activity_type:this.state.activity_type, offer:this.state.activity_data} 
                        offerer = this.state.activity_data 
            
        
        let restApi = new API();
        let reqObj =  restApi.activityMapping(this.state.activity_type, this.state.activity_uuid, offerer, requester)
        reqObj.then((response) => {
            if(response.status === "1") {
                //this.showPopUp();
                if(this.state.activity_type === 1){
                    this.navigate(AppConstant.APP_PAGE.MY_REQUEST_SENT_REQUEST_SCREEN, {request:response.data, created_activity:response.data})
                }else{
                    this.navigate(AppConstant.APP_PAGE.MY_OFFER_SENT_OFFER_SCREEN, {request:response.data, created_activity:response.data})
                }                
            }else{
                
            }
        }).catch((err) => {console.log(err)})    
                                         
    }

    

    render() { 
        return (
                    <Container style={{ alignItems:"center"}}>
          
                        <MapComponent  mapLatLon={this.props.route.params.latlon} mapHeight={this.state.mapHeight} callbackOnRegionChange={this.callbackOnRegionChange} mapProps={this.props} ref={this.mapComponentRef}>                      
                        </MapComponent>  
 
                        <View style={{ width:scale(330), flex: 0, flexDirection: 'row',top:this.topBarPos , borderRadius:6 ,height: verticalScale(50), borderWidth:0, borderColor:"#000000" }}>                
                            <View style={{width: scale(50), backgroundColor:"white", height: verticalScale(50), borderRadius:6, borderTopRightRadius:0,borderBottomRightRadius:0 ,borderLeftWidth:1,borderTopWidth:1,borderBottomWidth:1, justifyContent:"center"}} ><Button transparent style={{padding:0}} onPress={() => { this.props.navigation.toggleDrawer()}}><Icon name="menu"/></Button></View>
                            <View style={{width: scale(200), backgroundColor:"white", height: verticalScale(50), borderRightWidth:0,  borderRadius:0, borderTopLeftRadius:0,borderBottomLeftRadius:0 ,borderTopWidth:1,borderBottomWidth:1,alignItems:"center", justifyContent: 'center'}} >
                                <Text adjustsFontSizeToFit={true}  minimumFontScale={.4} numberOfLines={1} style={{fontSize:10, overflow:"hidden", height:verticalScale(10), textAlign:"left", width:  scale(200) , color:"grey", paddingTop:0, paddingBottom:0}}>You are here</Text>
                                <Text adjustsFontSizeToFit={true}  minimumFontScale={.6} numberOfLines={2} style={{fontSize:12, overflow:"hidden", height:verticalScale(30),textAlign:"left", width:  scale(200), paddingTop:0}}>{this.state.address}</Text>
                            </View>
                           <View style={{width: scale(80), backgroundColor:"white", height: verticalScale(50), borderRadius:6, borderTopLeftRadius:0,borderBottomLeftRadius:0 ,borderTopWidth:1,borderBottomWidth:1,borderRightWidth:1,alignItems:"center", justifyContent: 'center'}} ><Text style={{fontFamily: "roboto-medium",fontSize:14 , color:"rgba(243,103,103,1)"}}>Change</Text></View>
                        </View>

                        <View style={{position:"absolute",bottom:this.state.bottom_panel_bottom, height:verticalScale(50), justifyContent:"center"}}>
                                <View style={{ flex: 0, flexDirection: 'row',justifyContent:"center", top:0 , borderRadius:6 ,height:verticalScale(38), width:scale(350), borderWidth:0, borderColor:"#000000" }}>                
                                        <View style={{width: scale(60), backgroundColor:"white", height: verticalScale(50), borderRadius:6, borderWidth:0,  borderTopRightRadius:0,borderBottomRightRadius:0 , borderBottomLeftRadius:0,borderLeftWidth:0,borderTopWidth:0, alignItems:"center", justifyContent: 'center'}} >
                                            <Image
                                                style={{ alignSelf: "center", width: scale(30), height: verticalScale(30) }}
                                                source={StaticImage[Utilities.getCategoryFromCode(this.state.activity_category)]} 
                                                resizeMode='contain'/>
                                                
                                        </View>
                                        <View style={{width: scale(220), justifyContent:"center", backgroundColor:"white", height: verticalScale(50),  borderWidth:0,  borderRadius:0, borderTopWidth:0,alignItems:"center", justifyContent:"center"}} ><Text style={{fontSize:18, overflow:"hidden", justifyContent:"center", fontFamily:"roboto-medium"}}>{(this.state.activity_type === 1) ? translate.t("select_help_provider") : translate.t("select_help_requester")}</Text></View>
                                        <View style={{width: scale(70), justifyContent:"center", backgroundColor:"white", height: verticalScale(50), borderRadius:6, borderTopLeftRadius:0,borderBottomLeftRadius:0 ,borderBottomRightRadius:0, borderTopWidth:0,borderRightWidth:0,alignItems:"center", justifyContent: 'center'}} ><Button transparent style={{padding:0}} onPress={()=>{this.toggleBottomPanel()}}><Icon name={this.state.bottom_panel_icon}/></Button></View>                                                        
                                </View>
                        </View> 
                        
                            {(this.state.activitySuggestionOfferResponse.length > 0 ) 
        

                            ? 
                            <HView hide={!this.state.bottom_panel_visible} style={{position:"absolute",bottom:10, height:(height/2),justifyContent:"center",alignItems: 'center',  width:scale(340) , borderWidth:0}}>
                                <ScrollView style={{height:verticalScale(250), borderWidth:0, marginTop:moderateScale(10)}}>
                                    {this.state.activitySuggestionOfferResponse.map(singleData => {
                                        return (
                                            <View style={styles.itemContainer}>
                                                <View style={styles.rect}>
                                                    <View style={styles.rect2Row}>
                                                        <View style={styles.rect2}><Text style={{paddingLeft:5, borderWidth:0, fontFamily:'Roboto-Medium'}}>{singleData.user_detail.first_name + " " + singleData.user_detail.last_name}</Text></View>                                     
                                                            
                                                            <Switch
                                                                style={styles.rect3,{ borderWidth:0, marginTop:0, transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
                                                                disabled={false}
                                                                activeText={'On'}
                                                                inActiveText={'Off'}
                                                                backgroundActive={'green'}
                                                                backgroundInactive={'gray'}
                                                                circleActiveColor={'#30a566'}
                                                                circleInActiveColor={'#000000'}           
                                                                value={this.state.checkBoxChecked[singleData.activity_uuid] ? true : false}                            
                                                                onValueChange ={(switchValue)=>{this.checkBoxChanged(singleData.activity_uuid, switchValue)}}                                
                                                            />
                                                    
                                                    </View>
                                                    <View style={styles.rect4Row}>
                                                        <View style={styles.rect4}>
                                                        <StarRating
                                                            disabled={false}
                                                            maxStars={5}
                                                            rating={singleData.user_detail.rating_avg}
                                                            emptyStar={'ios-star-outline'}
                                                            fullStar={'ios-star'}
                                                            halfStar={'ios-star-half'}
                                                            iconSet={'Ionicons'}
                                                            fullStarColor={'orange'}
                                                            starSize={18}
                                                            //selectedStar={(rating) => this.onStarRatingPress(rating)}
                                                        />
                                                        </View>
                                                        <View style={styles.rect5}><Text style={{paddingLeft:moderateScale(5), fontSize:12, marginLeft:moderateScale(5)}}>{Utilities.timeSince(singleData.date_time)} ago  | {((this.getDistanceBetween({ latitude: this.state.region.latitude, longitude: this.state.region.longitude }, { latitude: singleData.geo_location.split(",")[0], longitude: singleData.geo_location.split(",")[1] }))/1000).toFixed(2)} kms away</Text></View>
                                                    </View>
                                                    <View style={styles.rect6}><Text style={{paddingLeft:moderateScale(5), fontSize:10}}>Can help with</Text></View>
                                                    <View style={styles.rect7}>
                                                        {(singleData.activity_detail && singleData.activity_detail.length > 0) ? 
                                                            <>
                                                            {
                                                            singleData.activity_detail.map(singleActivityData => {
                                                                return(
                                                                <Text style={{paddingLeft:5}}>
                                                                    {singleActivityData.detail + "   (" + singleActivityData.quantity +")"}
                                                                </Text>
                                                                )
                                                            })
                                                            }
                                                        </>
                                                        :
                                                            <Text style={{paddingLeft:5}}>{singleData.offer_condition}
                                                            </Text>
                                                        }    
                                                        
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })}
                                                                        
                                </ScrollView>
                                <Text style={{height:verticalScale(50), textAlign:"center", paddingLeft:moderateScale(15), paddingRight:moderateScale(15), paddingTop:moderateScale(10), color:"grey"}}>
                                    {(this.state.activity_type === 1) ? translate.t("phone_number_will_be_send_to_provider") : translate.t("phone_number_will_be_send_to_requester")}
                                </Text>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity  onPress={() => this.submitActivity()}>
                                    <View style={this.state.activity_type === 1 ? styles.ContinueButtonContainer_red : styles.ContinueButtonContainer_grey }>
                                        <Text style={styles.ContinueButtonText}>{ this.state.activity_type === 1 ? translate.t("send_request") :translate.t("send_offer")}</Text>
                                    </View>
                                    </TouchableOpacity>                                
                                </View>
                            </HView>
                            :
                            <HView hide={!this.state.bottom_panel_visible} style={{position:"absolute",bottom:verticalScale(10), height:verticalScale(340),justifyContent:"center",alignItems: 'center',  width:scale(340)}}>

                                <View style={{height:verticalScale(250), borderWidth:0, marginTop:moderateScale(30)}}>
                                    <Text>
                                        {translate.t("no_help_requeter")}
                                    </Text>
                                </View>    
                                <View style={styles.buttonContainer}>
                                <TouchableOpacity  onPress={() => {(this.state.activity_type === 1) ?  this.navigate(AppConstant.APP_PAGE.MY_REQUEST_SENT_REQUEST_SCREEN, {request:{}, created_activity:{}}) : this.navigate(AppConstant.APP_PAGE.MY_OFFER_SENT_OFFER_SCREEN, {request:{}, created_activity:{}})}}>
                                <View style={[styles.ContinueButtonContainer_grey]}>
                                    <Text style={styles.ContinueButtonText}>{translate.t("btn_continue")}</Text>
                                </View>
                                </TouchableOpacity>                                
                                </View>                            
                            </HView>
                            }                                      
                    </Container>
           
        )
    }

}

const styles =  StyleSheet.create({

    itemContainer:{
        
       
    
    },


    buttonContainer:{
      padding:  moderateScale(10),        
      flexDirection: "row",     
      width: scale(300),             
      justifyContent:'center',
      alignItems: 'center',  
      height:verticalScale(60)  ,
    borderWidth:0  
    },
   






    rect: {
        width: scale(330),
        height:verticalScale(150),
        backgroundColor: "#FFFFFF",//"rgba(230, 230, 230,1)",
        //marginTop: moderateScale(5),
        alignSelf: "center",
        borderBottomWidth:0,
        borderTopWidth:.25,
        borderRadius:6,
        borderColor:'#4F5065CC',
        shadowColor: '#4F5065CC',
        shadowOffset: { width: 5, height: 6 },
        marginTop:moderateScale(5),
        marginBottom: moderateScale(5),
        marginLeft: moderateScale(5),
        marginRight: moderateScale(5),
      },
      rect2: {
        width: scale(270),
        height: verticalScale(24),
        backgroundColor: "#FFFFFF",//"rgba(230, 230, 230,1)",
        marginRight:moderateScale(10),
        borderWidth:0,
        fontFamily:"roboto-bold",
        borderWidth:0,
        justifyContent:"center"

      },
      rect3: {
        width: scale(50),
        height: verticalScale(20),
        backgroundColor: "#FFFFFF",//"rgba(230, 230, 230,1)",
        marginLeft: moderateScale(2),
        borderWidth:0,
      },
      rect2Row: {
        width: scale(330),
        height: verticalScale(25),
        flexDirection: "row",
        marginTop: 7,
        marginLeft: 0,
        marginRight: 0,
        borderWidth:0,
        justifyContent:"center"
      },
      rect4: {
        width: scale(105),
        height: verticalScale(20),
        backgroundColor: "#FFFFFF",//"rgba(230, 230, 230,1)",
        borderWidth:0,
        paddingLeft:moderateScale(5)
      },
      rect5: {
        width: scale(210),
        height: 20,
        backgroundColor: "#FFFFFF",//"rgba(230, 230, 230,1)",
        marginLeft: "0%",
        borderWidth:0,
      },
      rect4Row: {
        width:scale(330),
        height: verticalScale(25),
        flexDirection: "row",
        marginTop: moderateScale(4),
        marginLeft: 0,
        marginRight: moderateScale(10)
      },
      rect6: {
        width: scale(175),
        height: 15,
        backgroundColor: "#FFFFFF",//"rgba(230, 230, 230,1)",
        marginLeft: 0,
        borderWidth:0,
        marginTop:0,
        paddingLeft:1
      },
      rect7: {
        width: scale(300),
        height: verticalScale(75),
        backgroundColor: "#FFFFFF",//"rgba(230, 230, 230,1)",
        marginTop: 2,
        marginLeft: 0,
        borderWidth:0,
        paddingLeft:3

      },

 
        ContinueButtonContainer_red: {
          backgroundColor: "rgba(243,103,103,1)",
          justifyContent:'center',
          height:verticalScale(50),
          width:scale(310),
          alignItems: 'center',
          borderRadius: 6,
        },

        ContinueButtonContainer_grey: {
            backgroundColor: "rgba(109,115,130,1)",
            justifyContent:'center',
            height:verticalScale(50),
            width:scale(310),
            alignItems: 'center',
            borderRadius: 6,
          },

        ContinueButtonText: {
          color: "rgba(245,245,245,1)",
          fontSize: 20,
          fontFamily: "roboto-regular", 
          alignItems: 'center',    
          justifyContent:'center',
        }


})

export default withNavigation(SearchHelpProvidersRequesters);
//export default SearchHelpProvidersRequesters;
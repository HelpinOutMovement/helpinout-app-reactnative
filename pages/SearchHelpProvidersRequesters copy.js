import React from 'react';
import {  Dimensions } from "react-native";
import { Container, View, Text, Button, Icon }from "native-base";
import Geolocation from '@react-native-community/geolocation';
import ModalComponent from './components/ModalComponent';
import AppConstant from '../misc/AppConstant';
import HView from "./components/HView"
import API from "../APIClient/API";
import translate from 'react-native-i18n';
import { getDistance, getPreciseDistance } from 'geolib';
import MappingSuggestionResponseComponent from "./components/MappingSuggestionResponseComponent"
import MapComponent from './MapComponent';
import { ScrollView } from 'react-native-gesture-handler';

const dimensions = Dimensions.get('window');    
   
class SearchHelpProvidersRequesters extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            region:{},
            address:"",
            activity_type:1,
            activity_uuid:0,
            mapHeight:"50%",
            bottom_panel_icon:"ios-arrow-dropdown",
            bottom_panel_visible:true, 
            bottom_panel_height:"50%",
            activitySuggestionOfferResponse:[],
                     
        }

    }

    callbackOnRegionChange = (rgn, mapState) =>{
        this.setState({region:rgn, address:mapState.address, boundries:mapState.boundries})
        this.setState({region:rgn, address:mapState.address})
        // Use Geocoding and get address.
        this.getActivitySuggestions()
    }

    componentDidMount(){
        
    }


    getActivitySuggestions = () =>{
        /*
        let restApi = new API();
        reqObj =  restApi.activitySuggestions(this.state.activity_type, this.state.activity_uuid, this.state.region.latitude+","+this.state.region.longitude, "10.424", getDistance(this.state.boundries.northEast,this.state.boundries.southWest)/2)
                reqObj.then((response) => {
                    if(response.status === "1") {
                      //this.showPopUp();
                    }
                }).catch((err) => {/////console.log(err)})    
        */
        let respObject =  {"status":"1","message":"Success","data":{"offers":[{"activity_type":2,"activity_uuid":"3B5E9462-C9DC-4FBF-8183-49E68C6D8B15","date_time":"2020-03-24T00:51:14.000-05:30","activity_category":1,"activity_count":1,"geo_location":"17.78583400,78.40641700","status":1,"offer_condition":"Vegan","activity_detail":[{"detail":"Food","quantity":5}],"user_detail":{"country_code":"+1","mobile_no":"6505551234","first_name":"Raghu","last_name":"Test1","mobile_no_visibility":0,"user_type":2,"org_name":null,"org_type":null,"org_division":null,"rating_avg":0,"rating_count":0}},{"activity_type":2,"activity_uuid":"4901a942-05b9-4003-9fe5-a62358d48281","date_time":"2020-04-22T19:07:44.000+05:30","activity_category":1,"activity_count":2,"geo_location":"13.06345812,77.61847425","status":1,"offer_condition":"Between 9am and 12 noon mornings. You must pickup and bring serving vessels. Please come wearing masks.","activity_detail":[{"detail":"Basic food, per day","quantity":1000},{"detail":"Rice","quantity":500}],"user_detail":{"country_code":"+91","mobile_no":"8431064108","first_name":"Ved","last_name":"Chikarmane","mobile_no_visibility":1,"user_type":2,"org_name":"Jakkur Collective","org_type":2,"org_division":"The Boss","rating_avg":0.5,"rating_count":3}},{"activity_type":2,"activity_uuid":"84389c6a-8b8e-4533-b28d-563075898e8d","date_time":"2020-04-22T17:04:28.000+05:30","activity_category":1,"activity_count":1,"geo_location":"28.64440150,77.36175768","status":1,"offer_condition":"Vdhs","activity_detail":[{"detail":"Food","quantity":20}],"user_detail":{"country_code":"+91","mobile_no":"7303767448","first_name":"new ","last_name":"user","mobile_no_visibility":0,"user_type":2,"org_name":"","org_type":null,"org_division":"","rating_avg":3.5,"rating_count":10}},{"activity_type":2,"activity_uuid":"F390A4C5-81A6-481D-B926-34ECEB942B7B","date_time":"2020-03-21T22:41:31.000-05:30","activity_category":1,"activity_count":1,"geo_location":"19.23246073,74.80682373","status":1,"offer_condition":"","activity_detail":[{"detail":"Lunch","quantity":20}],"user_detail":{"country_code":"+91","mobile_no":"9730131849","first_name":"VSRV","last_name":"Raghavan","mobile_no_visibility":0,"user_type":2,"org_name":null,"org_type":null,"org_division":null,"rating_avg":0,"rating_count":0}},{"activity_type":2,"activity_uuid":"5cd3b2dc-e32b-4010-80c7-659ca0568a98","date_time":"2020-04-20T18:53:38.000+05:30","activity_category":1,"activity_count":1,"geo_location":"13.06343820,77.61851180","status":1,"offer_condition":"Give us 48 hours notice. We will deliver from our We need 48 hours notice. We can location to a radius of 10 km","activity_detail":[{"detail":"Meals, per day","quantity":1000}],"user_detail":{"country_code":"+91","mobile_no":"8431064108","first_name":"Ved","last_name":"Chikarmane","mobile_no_visibility":1,"user_type":2,"org_name":"Jakkur Collective","org_type":2,"org_division":"The Boss","rating_avg":0.5,"rating_count":3}}]}};
        this.setState({activitySuggestionOfferResponse:respObject.data.offers});
       


    }

    toggleBottomPanel =() =>{
        if(this.state.bottom_panel_visible){
            this.setState({bottom_panel_visible:false})
            this.setState({bottom_panel_icon:"ios-arrow-dropup"})
            this.setState({mapHeight:"100%"})
            this.setState({bottom_panel_height:0})
        }else{
            this.setState({bottom_panel_visible:true})
            this.setState({bottom_panel_icon:"ios-arrow-dropdown"})
            this.setState({mapHeight:"50%"})
            this.setState({bottom_panel_height:"50%"})
        }
    }

    render() { 
        return (
                    <Container style={{ alignItems:"center"}}>
                        
                        <MapComponent  mapHeight={this.state.mapHeight} callbackOnRegionChange={this.callbackOnRegionChange} mapProps={this.props} ref={this.mapComponentRef}>                      
                        </MapComponent>  
 
                        <View style={{ flex: 0, flexDirection: 'row',top:20 , borderRadius:6 ,height:50, width:"90%", borderWidth:0, borderColor:"#000000" }}>                
                            <View style={{width: "15%", backgroundColor:"white", height: 50, borderRadius:6, borderTopRightRadius:0,borderBottomRightRadius:0 ,borderLeftWidth:1,borderTopWidth:1,borderBottomWidth:1}} ><Button transparent style={{padding:0}}><Icon name="menu"/></Button></View>
                            <View style={{width: "65%", backgroundColor:"white", height: 50, borderRadius:0, borderTopWidth:1,borderBottomWidth:1,alignItems:"center", justifyContent:"center"}} >
                                <Text style={{fontSize:10, overflow:"hidden", height:10, textAlign:"left", width: "100%" , color:"grey", paddingTop:0, paddingBottom:0}}>You are here</Text>
                                <Text style={{fontSize:12, overflow:"hidden", height:30,textAlign:"left", width: "100%", paddingTop:0}}>{this.state.address}</Text>
                            </View>
                            <View style={{width: "20%", backgroundColor:"white", height: 50, borderRadius:6, borderTopLeftRadius:0,borderBottomLeftRadius:0 ,borderTopWidth:1,borderBottomWidth:1,borderRightWidth:1,alignItems:"center", justifyContent: 'center'}} ><Text>Change</Text></View>                            
                        </View>
                        <View style={{ position: 'absolute', bottom: this.state.bottom_panel_height,width: "100%",flexDirection: 'column',backgroundColor:"white", height: 50, borderRadius:0,alignItems:"center", justifyContent:"flex-start"}} >
                            <View style={{ width: "100%",flexDirection: 'row',backgroundColor:"white", height: 50, borderRadius:0,alignItems:"center", justifyContent:"center"}} >
                                <View style={{width: "15%", backgroundColor:"white", height: 50, borderRadius:6, borderTopRightRadius:0,borderBottomRightRadius:0 , borderBottomLeftRadius:0,borderLeftWidth:0,borderTopWidth:0}} ><Button transparent style={{padding:0}}><Icon name="menu"/></Button></View>
                                <View style={{width: "65%", backgroundColor:"white", height: 50, borderRadius:0, borderTopWidth:0,alignItems:"center", justifyContent:"center"}} ><Text style={{fontSize:14, overflow:"hidden"}}>{(this.state.activity_type === 1) ? "Select help providers" : "Select help requesters"}</Text></View>
                                <View style={{width: "20%", backgroundColor:"white", height: 50, borderRadius:6, borderTopLeftRadius:0,borderBottomLeftRadius:0 ,borderBottomRightRadius:0, borderTopWidth:0,borderRightWidth:0,alignItems:"center", justifyContent: 'center'}} ><Button transparent style={{padding:0}} onPress={()=>{this.toggleBottomPanel()}}><Icon name={this.state.bottom_panel_icon}/></Button></View>                            
                            </View>
                            <HView hide={!this.state.bottom_panel_visible} style={{borderWidth:1,width:"100%", height:"300%"}}>
                                <ScrollView style={{borderWidth:1,width:"100%"}}>
                                    <View style={{ flex: 1, padding: 4 }}>              
                                        {this.state.activitySuggestionOfferResponse.map(singleData => {
                                        return (
                                            <MappingSuggestionResponseComponent
                                                activitySuggestionResponse={singleData}
                                            />
                                        )
                                        })}           
                                    </View>
                                </ScrollView>
                            </HView>
                            <View style={{ width: "100%",flexDirection: 'row',backgroundColor:"white", height: 120, borderRadius:0,alignItems:"center", justifyContent:"center"}} >
                                <View style={{width: "15%", backgroundColor:"white", height: 50, borderRadius:6, borderTopRightRadius:0,borderBottomRightRadius:0 , borderBottomLeftRadius:0,borderLeftWidth:0,borderTopWidth:0}} ><Button transparent style={{padding:0}}><Icon name="menu"/></Button></View>
                                <View style={{width: "20%", backgroundColor:"white", height: 50, borderRadius:6, borderTopLeftRadius:0,borderBottomLeftRadius:0 ,borderBottomRightRadius:0, borderTopWidth:0,borderRightWidth:0,alignItems:"center", justifyContent: 'center'}} ><Button transparent style={{padding:0}} onPress={()=>{this.toggleBottomPanel()}}><Icon name={this.state.bottom_panel_icon}/></Button></View>                            
                            </View>
                            <View style={{ width: "100%",flexDirection: 'row',backgroundColor:"white", height: 50, borderRadius:0,alignItems:"center", justifyContent:"center"}} >
                                <View style={{width: "15%", backgroundColor:"white", height: 50, borderRadius:6, borderTopRightRadius:0,borderBottomRightRadius:0 , borderBottomLeftRadius:0,borderLeftWidth:0,borderTopWidth:0}} ><Button transparent style={{padding:0}}><Icon name="menu"/></Button></View>
                                <View style={{width: "65%", backgroundColor:"white", height: 50, borderRadius:0, borderTopWidth:0,alignItems:"center", justifyContent:"center"}} ><Text style={{fontSize:14, overflow:"hidden"}}>{(this.state.activity_type === 1) ? "Select help providers" : "Select help requesters"}</Text></View>
                                <View style={{width: "20%", backgroundColor:"white", height: 50, borderRadius:6, borderTopLeftRadius:0,borderBottomLeftRadius:0 ,borderBottomRightRadius:0, borderTopWidth:0,borderRightWidth:0,alignItems:"center", justifyContent: 'center'}} ><Button transparent style={{padding:0}} onPress={()=>{this.toggleBottomPanel()}}><Icon name={this.state.bottom_panel_icon}/></Button></View>                            
                            </View>
                        </View>          
                                                                  
                                                
                    </Container>
           
        )
    }

}

export default SearchHelpProvidersRequesters;
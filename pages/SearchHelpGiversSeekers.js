import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, Platform, Switch, Image } from "react-native";
import { Container, View, Text, Button, Icon } from "native-base";

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

import { verticalScale, scale, moderateScale } from 'react-native-size-matters';


import { DrawerActions } from 'react-navigation-drawer';

//import { ifIphoneX } from 'react-native-iphone-x-helper'

import { StackActions, NavigationActions } from 'react-navigation'

var { width, height } = Dimensions.get('window')
var dimensions = Dimensions.get('window')

var tempCheckValues = [];

const getRouteParams = (propertyName, routeParams) => {
    if (routeParams.params && routeParams.params[propertyName]) {
        return routeParams.params[propertyName]
    } else if (routeParams.params && routeParams.params.params && routeParams.params.params[propertyName]) {
        return routeParams.params.params[propertyName]
    }
}

function SearchHelpGiversSeekers(props) {


    const navigation = props.navigation;
    const navigate = props.navigation.navigate;


    const [state, setState] = useState({
        region: getRouteParams('region', props.route),
        address: getRouteParams('address', props.route),
        activity_category: getRouteParams('activity_category', props.route),
        activity_type: getRouteParams('activity_type', props.route),
        activity_uuid: getRouteParams('activity_uuid', props.route),
        mapHeight: verticalScale(340),
        bottom_panel_icon: "ios-arrow-dropdown",
        bottom_panel_visible: true,
        bottom_panel_bottom: height / 2,
        activitySuggestionOfferResponse: [],
        checkBoxChecked: {},
        activity_data: [],
        bottom_panel_icon: "ios-arrow-dropdown",
        mapHeight: verticalScale(340),
        bottom_panel_bottom: height / 2,
        latlon: getRouteParams('latlon', props.route)
    });

    /*
    if(props.route.params.latlon){
        if(props.route.params.latlon.length > 0){
            setState( {...state, latlon:props.route.params.latlon})
            forceUpdate();
        }else{
            setState( {...state, latlon:""})
        }
    }else{
        setState( {...state, latlon:""})
    }
    */

    //(props.route.params.latlon != "") ? setState( {...state, latlon:props.route.params.latlon}) : setState( {...state, latlon:""})
    const isIphoneX = () => {
        const dimen = Dimensions.get('window');
        return (
            Platform.OS === 'ios' &&
            !Platform.isPad &&
            !Platform.isTVOS &&
            ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
        );
    }

    const toggleBottomPanel = () => {
        if (state.bottom_panel_visible) {
            setState({ ...state, bottom_panel_visible: false, bottom_panel_icon: "ios-arrow-dropup", mapHeight: verticalScale(680), bottom_panel_bottom: 10 })

        } else {
            setState({ ...state, bottom_panel_visible: true, bottom_panel_icon: "ios-arrow-dropdown", mapHeight: verticalScale(340), bottom_panel_bottom: height / 2 })
        }
    }

    let topBarPos = 20;
    if (isIphoneX()) {
        topBarPos = 40;
    }

    //   toggleBottomPanel()


    const helpOption = Utilities.getCategoryFromCode(props.activity_category);



    const checkBoxChanged = (id, value) => {
        state.checkBoxChecked[id] = value;
        setState({
            ...state,
            checkBoxChecked: state.checkBoxChecked
        })
        if (value) {
            state.activity_data.push({ activity_uuid: id })
        } else {
            var index = state.activity_data.indexOf(x => x.activity_uuid === id);
            if (index !== -1) state.activity_data.splice(index, 1);
        }
    }




    const callbackOnRegionChange = (rgn, mapState) => {

        setState({ ...state, region: rgn, address: mapState.address, boundries: mapState.boundries })
        getActivitySuggestions(mapState)
    }


    const getActivitySuggestions = (mapState) => {

        let restApi = new API();
        let reqObj = restApi.activitySuggestions(state.activity_type, state.activity_uuid, state.region.latitude + "," + state.region.longitude, "10.424", getDistance(mapState.boundries.northEast, mapState.boundries.southWest) / 2)
        reqObj.then((respObject) => {
            if (respObject.status === "1") {
                if (state.activity_type === 1) {
                    setState({ ...state, activitySuggestionOfferResponse: respObject.data.offers });
                } else {
                    setState({ ...state, activitySuggestionOfferResponse: respObject.data.requests });
                }
            }
        }).catch((err) => { console.log(err) })

    }


    const getDistanceBetween = (source, destination) => {
        return getDistance(source, destination)
    }

    const submitActivity = () => {
        let offerer = [];
        let requester = [];
        (state.activity_type === 2) ?
            requester = state.activity_data
            :
            offerer = state.activity_data


        let restApi = new API();
        let reqObj = restApi.activityMapping(state.activity_type, state.activity_uuid, offerer, requester)
        reqObj.then((response) => {
            if (response.status === "1") {
                if (state.activity_type === 1) {
                    navigate(AppConstant.APP_PAGE.MY_REQUEST_SENT_REQUEST_SCREEN, { request: response.data, created_activity: response.data })
                } else {
                    navigate(AppConstant.APP_PAGE.MY_OFFER_SENT_OFFER_SCREEN, { request: response.data, created_activity: response.data })
                }
            } else {

            }
        }).catch((err) => { console.log(err) })

    }


    useEffect(() => {

        setState({

            region: getRouteParams('region', props.route),
            address: getRouteParams('address', props.route),
            activity_category: getRouteParams('activity_category', props.route),
            activity_type: getRouteParams('activity_type', props.route),
            activity_uuid: getRouteParams('activity_uuid', props.route),
            mapHeight: verticalScale(340),
            bottom_panel_icon: "ios-arrow-dropdown",
            bottom_panel_visible: true,
            bottom_panel_bottom: height / 2,
            activitySuggestionOfferResponse: [],
            checkBoxChecked: {},
            activity_data: [],
            bottom_panel_icon: "ios-arrow-dropdown",
            mapHeight: verticalScale(340),
            bottom_panel_bottom: height / 2,
            latlon: getRouteParams('latlon', props.route)


        })

    }, []);


    const renderScreen = () => {
        var latlonval = "";
        if (state.region) {
            latlonval = state.region.latitude + "," + state.region.longitude
            //setState({...state, "latlon": latlonval});
        }

        
        return (
            <Container style={{ alignItems: "center" }}>

                <MapComponent mapLatLon={getRouteParams('latlon', props.route)} mapHeight={state.mapHeight} callbackOnRegionChange={callbackOnRegionChange} mapProps={props} ref={mapComponentRef}>
                </MapComponent>

                <View style={{ width: scale(330), flex: 0, flexDirection: 'row', top: topBarPos, borderRadius: 6, height: verticalScale(50), borderWidth: 0, borderColor: "#000000" }}>
                    <View style={{ width: scale(50), backgroundColor: "white", height: verticalScale(50), borderRadius: 6, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderLeftWidth: 1, borderTopWidth: 1, borderBottomWidth: 1, justifyContent: "center" }} ><Button transparent style={{ padding: 0 }} onPress={() => { props.navigation.toggleDrawer() }}><Icon name="menu" /></Button></View>
                    <View style={{ width: scale(200), backgroundColor: "white", height: verticalScale(50), borderRightWidth: 0, borderRadius: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderTopWidth: 1, borderBottomWidth: 1, alignItems: "center", justifyContent: 'center' }} >
                        <Text adjustsFontSizeToFit={true} minimumFontScale={.4} numberOfLines={1} style={{ fontSize: 10, overflow: "hidden", height: verticalScale(10), textAlign: "left", width: scale(200), color: "grey", paddingTop: 0, paddingBottom: 0 }}>You are here</Text>
                        <Text adjustsFontSizeToFit={true} minimumFontScale={.6} numberOfLines={2} style={{ fontSize: 12, overflow: "hidden", height: verticalScale(30), textAlign: "left", width: scale(200), paddingTop: 0 }}>{state.address}</Text>
                    </View>
                    <View style={{ width: scale(80), backgroundColor: "white", height: verticalScale(50), borderRadius: 6, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderTopWidth: 1, borderBottomWidth: 1, borderRightWidth: 1, alignItems: "center", justifyContent: 'center' }} ><Text style={{ fontFamily: "roboto-medium", fontSize: 14, color: "rgba(243,103,103,1)" }}>Change</Text></View>
                </View>

                <View style={{ position: "absolute", bottom: state.bottom_panel_bottom, height: verticalScale(50), justifyContent: "center" }}>
                    <View style={{ flex: 0, flexDirection: 'row', justifyContent: "center", top: 0, borderRadius: 6, height: verticalScale(38), width: scale(350), borderWidth: 0, borderColor: "#000000" }}>
                        <View style={{ width: scale(60), backgroundColor: "white", height: verticalScale(50), borderRadius: 6, borderWidth: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 0, borderLeftWidth: 0, borderTopWidth: 0, alignItems: "center", justifyContent: 'center' }} >
                            <Image
                                style={{ alignSelf: "center", width: scale(30), height: verticalScale(30) }}
                                source={StaticImage[Utilities.getCategoryFromCode(state.activity_category)]}
                                resizeMode='contain' />

                        </View>
                        <View style={{ width: scale(220), justifyContent: "center", backgroundColor: "white", height: verticalScale(50), borderWidth: 0, borderRadius: 0, borderTopWidth: 0, alignItems: "center", justifyContent: "center" }} ><Text style={{ fontSize: 18, overflow: "hidden", justifyContent: "center", fontFamily: "roboto-medium" }}>{(state.activity_type === 1) ? translate.t("select_help_provider") : translate.t("select_help_requester")}</Text></View>
                        <View style={{ width: scale(70), justifyContent: "center", backgroundColor: "white", height: verticalScale(50), borderRadius: 6, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderTopWidth: 0, borderRightWidth: 0, alignItems: "center", justifyContent: 'center' }} ><Button transparent style={{ padding: 0 }} onPress={() => { toggleBottomPanel() }}><Icon name={state.bottom_panel_icon} /></Button></View>
                    </View>
                </View>

                {(state.activitySuggestionOfferResponse.length > 0)


                    ?
                    <HView hide={!state.bottom_panel_visible} style={{ position: "absolute", bottom: 10, height: (height / 2), justifyContent: "center", alignItems: 'center', width: scale(340), borderWidth: 0 }}>
                        <ScrollView style={{ height: verticalScale(250), borderWidth: 0, marginTop: moderateScale(10) }}>
                            {state.activitySuggestionOfferResponse.map(singleData => {
                                return (
                                    <View style={styles.itemContainer}>
                                        <View style={styles.rect}>
                                            <View style={styles.rect2Row}>
                                                <View style={styles.rect2}><Text style={{ paddingLeft: 5, borderWidth: 0, fontFamily: 'Roboto-Medium' }}>{singleData.user_detail.first_name + " " + singleData.user_detail.last_name}</Text></View>

                                                <Switch
                                                    style={styles.rect3, { borderWidth: 0, marginTop: 0, transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
                                                    disabled={false}
                                                    activeText={'On'}
                                                    inActiveText={'Off'}
                                                    backgroundActive={'green'}
                                                    backgroundInactive={'gray'}
                                                    circleActiveColor={'#30a566'}
                                                    circleInActiveColor={'#000000'}
                                                    value={state.checkBoxChecked[singleData.activity_uuid] ? true : false}
                                                    onValueChange={(switchValue) => { checkBoxChanged(singleData.activity_uuid, switchValue) }}
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
                                                    //selectedStar={(rating) => onStarRatingPress(rating)}
                                                    />
                                                </View>
                                                <View style={styles.rect5}><Text style={{ paddingLeft: moderateScale(5), fontSize: 12, marginLeft: moderateScale(5) }}>{Utilities.timeSince(singleData.date_time)} ago  | {((getDistanceBetween({ latitude: state.region.latitude, longitude: state.region.longitude }, { latitude: singleData.geo_location.split(",")[0], longitude: singleData.geo_location.split(",")[1] })) / 1000).toFixed(2)} kms away</Text></View>
                                            </View>
                                            <View style={styles.rect6}><Text style={{ paddingLeft: moderateScale(5), fontSize: 10 }}>Can help with</Text></View>
                                            <View style={styles.rect7}>
                                                {(singleData.activity_detail && singleData.activity_detail.length > 0) ?
                                                    <>
                                                        {
                                                            singleData.activity_detail.map(singleActivityData => {
                                                                return (
                                                                    <Text style={{ paddingLeft: 5 }}>
                                                                        {singleActivityData.detail + "   (" + singleActivityData.quantity + ")"}
                                                                    </Text>
                                                                )
                                                            })
                                                        }
                                                    </>
                                                    :
                                                    <Text style={{ paddingLeft: 5 }}>{singleData.offer_condition}
                                                    </Text>
                                                }

                                            </View>
                                        </View>
                                    </View>
                                )
                            })}

                        </ScrollView>
                        <Text style={{ height: verticalScale(50), textAlign: "center", paddingLeft: moderateScale(15), paddingRight: moderateScale(15), paddingTop: moderateScale(10), color: "grey" }}>
                            {(state.activity_type === 1) ? translate.t("phone_number_will_be_send_to_provider") : translate.t("phone_number_will_be_send_to_requester")}
                        </Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => submitActivity()}>
                                <View style={state.activity_type === 1 ? styles.ContinueButtonContainer_red : styles.ContinueButtonContainer_grey}>
                                    <Text style={styles.ContinueButtonText}>{state.activity_type === 1 ? translate.t("send_request") : translate.t("send_offer")}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </HView>
                    :
                    <HView hide={!state.bottom_panel_visible} style={{ position: "absolute", bottom: verticalScale(10), height: verticalScale(340), justifyContent: "center", alignItems: 'center', width: scale(340) }}>

                        <View style={{ height: verticalScale(250), borderWidth: 0, marginTop: moderateScale(30) }}>
                            <Text>
                                {translate.t("no_help_requeter")}
                            </Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => { (state.activity_type === 1) ? navigate(AppConstant.APP_PAGE.MY_REQUEST_SENT_REQUEST_SCREEN, { request: {}, created_activity: {} }) : navigate(AppConstant.APP_PAGE.MY_OFFER_SENT_OFFER_SCREEN, { request: {}, created_activity: {} }) }}>
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


    return (

        renderScreen()
    )


}



const styles = StyleSheet.create({

    itemContainer: {



    },


    buttonContainer: {
        padding: moderateScale(10),
        flexDirection: "row",
        width: scale(300),
        justifyContent: 'center',
        alignItems: 'center',
        height: verticalScale(60),
        borderWidth: 0
    },







    rect: {
        width: scale(330),
        height: verticalScale(150),
        backgroundColor: "#FFFFFF",//"rgba(230, 230, 230,1)",
        //marginTop: moderateScale(5),
        alignSelf: "center",
        borderBottomWidth: 0,
        borderTopWidth: .25,
        borderRadius: 6,
        borderColor: '#4F5065CC',
        shadowColor: '#4F5065CC',
        shadowOffset: { width: 5, height: 6 },
        marginTop: moderateScale(5),
        marginBottom: moderateScale(5),
        marginLeft: moderateScale(5),
        marginRight: moderateScale(5),
    },
    rect2: {
        width: scale(270),
        height: verticalScale(24),
        backgroundColor: "#FFFFFF",//"rgba(230, 230, 230,1)",
        marginRight: moderateScale(10),
        borderWidth: 0,
        fontFamily: "roboto-bold",
        borderWidth: 0,
        justifyContent: "center"

    },
    rect3: {
        width: scale(50),
        height: verticalScale(20),
        backgroundColor: "#FFFFFF",//"rgba(230, 230, 230,1)",
        marginLeft: moderateScale(2),
        borderWidth: 0,
    },
    rect2Row: {
        width: scale(330),
        height: verticalScale(25),
        flexDirection: "row",
        marginTop: 7,
        marginLeft: 0,
        marginRight: 0,
        borderWidth: 0,
        justifyContent: "center"
    },
    rect4: {
        width: scale(105),
        height: verticalScale(20),
        backgroundColor: "#FFFFFF",//"rgba(230, 230, 230,1)",
        borderWidth: 0,
        paddingLeft: moderateScale(5)
    },
    rect5: {
        width: scale(210),
        height: 20,
        backgroundColor: "#FFFFFF",//"rgba(230, 230, 230,1)",
        marginLeft: "0%",
        borderWidth: 0,
    },
    rect4Row: {
        width: scale(330),
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
        borderWidth: 0,
        marginTop: 0,
        paddingLeft: 1
    },
    rect7: {
        width: scale(300),
        height: verticalScale(75),
        backgroundColor: "#FFFFFF",//"rgba(230, 230, 230,1)",
        marginTop: 2,
        marginLeft: 0,
        borderWidth: 0,
        paddingLeft: 3

    },


    ContinueButtonContainer_red: {
        backgroundColor: "rgba(243,103,103,1)",
        justifyContent: 'center',
        height: verticalScale(50),
        width: scale(310),
        alignItems: 'center',
        borderRadius: 6,
    },

    ContinueButtonContainer_grey: {
        backgroundColor: "rgba(109,115,130,1)",
        justifyContent: 'center',
        height: verticalScale(50),
        width: scale(310),
        alignItems: 'center',
        borderRadius: 6,
    },

    ContinueButtonText: {
        color: "rgba(245,245,245,1)",
        fontSize: 20,
        fontFamily: "roboto-regular",
        alignItems: 'center',
        justifyContent: 'center',
    }


})

export default SearchHelpGiversSeekers;
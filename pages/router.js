import React, { useContext, useState,  useEffect } from 'react';
import { View } from 'native-base';
import AppConstant from '../misc/AppConstant';




function router(props) {

    //console.log("Route : Params " + JSON.stringify(props))
    if(props.route.params.latlon){
        props.navigation.navigate(AppConstant.APP_PAGE.HOME, {latlon:props.route.params.latlon})
    }

    return(

        <View>


        </View>

    )


}

export default router;
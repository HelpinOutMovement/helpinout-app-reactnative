    import DeviceInfo from 'react-native-device-info';

    const startingDate = new Date()
    const date = startingDate.getFullYear()+"-"+startingDate.getMonth()+"-"+startingDate.getDate()+"T"+startingDate.getHours()+":"+startingDate.getMinutes()+":"+startingDate.getSeconds()+"."+startingDate.getMilliseconds()+"+"+startingDate.getTimezoneOffset();

    var APIData = {"app_id": '', "imei_no": DeviceInfo.getUniqueId(), "app_version": "0.1", 'date_time':  date  };
    class RequestObject{

//Struct = (...keys) => ((...v) => keys.reduce((o, k, i) => {o[k] = v[i]; return o} , {}))
    registerObject = (country_code, mobile_no, first_name,last_name, mobile_no_visibility, user_type, org_name, org_type, org_division)=>{
        let data = {
            "imei_no": DeviceInfo.getUniqueId(),
            "os_type": DeviceInfo.getSystemName(),
            "manufacturer_name": DeviceInfo.getBrand(),
            "os_version": DeviceInfo.getSystemVersion(),
            "firebase_token": "121212",
            "app_version": "0.1",
            "time_zone": Intl.DateTimeFormat().resolvedOptions().timeZone,
            "country_code": country_code,
            "mobile_no": mobile_no,
            "first_name": first_name,
            "last_name": last_name,
            "mobile_no_visibility": mobile_no_visibility,
            "user_type": user_type,
        }    
        
        if(user_type != "1"){
            data["org_name"] = org_name
            data["org_type"] =  org_type,
            data["org_division"] = org_division;
        }
        return this.addHeaders(data);
    }


    loginObject = (country_code, mobile_no)=>{        
        let data = {
            "imei_no": DeviceInfo.getUniqueId(),
            "os_type": DeviceInfo.getSystemName(),
            "manufacturer_name": DeviceInfo.getBrand(),
            "os_version": DeviceInfo.getSystemVersion(),
            "firebase_token": "121212",
            "app_version": "0.1",
            "time_zone": Intl.DateTimeFormat().resolvedOptions().timeZone,
            "country_code": country_code,
            "mobile_no": mobile_no                    
        }        
        return this.addHeaders(data);
    }

    locationSuggestionObject = (lat, lon, geo_accuracy, activity_type , activity_uuid)=>{
        let data = {
            "geo_location": lat + ","+lon ,
            "geo_accuracy": geo_accuracy,
            "activity_type": activity_type,
            "activity_uuid": activity_uuid,            
        }
        return this.addHeaders(data);
    }


    locationRequesterSummary = (lat, lon, geo_accuracy)=>{
        let data = {
            "geo_location": lat + ","+lon ,
            "geo_accuracy": geo_accuracy                  
        }
        return this.addHeaders(data);
    }

    userPastActivityObject = (activity_type) =>{
        let data = {            
            "activity_type": activity_type                  
        }
        return this.addHeaders(data);
    }

    activityAdd = () =>{
        let data = {

        }
        return this.addHeaders(data);
    }

    activitySuggestions = (activity_type, activity_uuid, offerer, requester) =>{
        let data = {
            "activity_type": activity_type,              
            "activity_uuid": activity_uuid,
            "offerer": offerer,
            "requester": requester,
        }
        return this.addHeaders(data);
    }


    activityMapping = (activity_type, activity_uuid, offerer, requester) =>{
        let data = {
            "activity_type": activity_type, 
            "activity_uuid": activity_uuid, 
            "offerer": offerer, 
            "requester": requester
        }
        return this.addHeaders(data);
    }

    activityDelete = (activity_uuid, activity_type) =>{
        let data = {
            "activity_uuid": activity_uuid, 
            "activity_type": activity_type
        }
        return this.addHeaders(data);
    }


    mappingDelete = (activity_uuid, activity_type, mapping_id) =>{
        let data = {
            "activity_uuid": activity_uuid, 
            "activity_type": activity_type, 
            "mapping_id": mapping_id
        }
        return this.addHeaders(data);        
    }


    mappingRating = (activity_uuid, mapping_id, rating, recommend_other) =>{
        let data = {
            "activity_uuid":activity_uuid, 
            "mapping_id":mapping_id, 
            "rating":rating, 
            "recommend_other":recommend_other
        }
        return this.addHeaders(data);
    }


    mappingCall = (activity_uuid, mapping_id) =>{        
        let data = {
            "activity_uuid":activity_uuid, 
            "mapping_id":mapping_id
        }
        return this.addHeaders(data);        
    }




    addHeaders = (data) =>{
        let reqData = APIData;
        reqData["data"] = data; 
        console.log(reqData)   
        return reqData;
    }


}

export default RequestObject;

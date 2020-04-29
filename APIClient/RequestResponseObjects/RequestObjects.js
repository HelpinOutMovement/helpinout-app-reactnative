    import DeviceInfo from 'react-native-device-info';
    import AppStorage from '../../storage/AppStorage';
    import AppConstant from '../../misc/AppConstant';

    const startingDate = new Date()
    const date = startingDate.getFullYear()+"-"+startingDate.getMonth()+"-"+startingDate.getDate()+"T"+startingDate.getHours()+":"+startingDate.getMinutes()+":"+startingDate.getSeconds()+"."+startingDate.getMilliseconds()+"+"+startingDate.getTimezoneOffset();

    class RequestObject{

        constructor(){

            this.APIData = {"app_id": 0, "imei_no": DeviceInfo.getUniqueId(), "app_version": "0.1", 'date_time':  date  };       
            

            //this.APIData = {"app_id": 137, "imei_no": DeviceInfo.getUniqueId(), "app_version": "0.1", 'date_time':  date  };
            //console.log(this.getUserDetails())
            //this.setAppId();
        }


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
            return new Promise((resolve, reject) => {
                let reqObject = this.stuffHeader(data, false);
                reqObject.then((val)=> {
                    resolve(val);
                })
                .catch(err => {reject(err)})
            });
        }

        updateUserObject = (first_name,last_name, mobile_no_visibility, user_type, org_name, org_type, org_division)=>{
            let data = {
                "imei_no": DeviceInfo.getUniqueId(),
                "os_type": DeviceInfo.getSystemName(),
                "manufacturer_name": DeviceInfo.getBrand(),
                "os_version": DeviceInfo.getSystemVersion(),
                "firebase_token": "121212",
                "app_version": "0.1",
                "time_zone": Intl.DateTimeFormat().resolvedOptions().timeZone,
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
            return new Promise((resolve, reject) => {
                let reqObject = this.stuffHeader(data, true);
                reqObject.then((val)=> {
                    resolve(val);
                })
                .catch(err => {reject(err)})
            });
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
            return new Promise((resolve, reject) => {
                let reqObject = this.stuffHeader(data, false);
                reqObject.then((val)=> {
                    resolve(val);
                })
                .catch(err => {reject(err)})
            });
        }


        locationSuggestionObject = (lat, lon, geo_accuracy, radius, activity_type , activity_uuid)=>{
            
                let data = {
                    "geo_location": lat + ","+lon ,
                    "geo_accuracy": geo_accuracy,
                    "radius": radius,
                    "activity_type": activity_type,
                    "activity_uuid": activity_uuid,            
                }
            return new Promise((resolve, reject) => {
                let reqObject = this.stuffHeader(data, true);
                reqObject.then((val)=> {
                    resolve(val);
                })
                .catch(err => {reject(err)})
            });   
        }


        locationRequesterSummary = (lat, lon, geo_accuracy)=>{
            let data = {
                "geo_location": lat + ","+lon ,
                "geo_accuracy": geo_accuracy                  
            }
            return new Promise((resolve, reject) => {
                let reqObject = this.stuffHeader(data, true);
                reqObject.then((val)=> {
                    resolve(val);
                })
                .catch(err => {reject(err)})
            });
        }

        userPastActivityObject = (activity_type) =>{
            let data = {            
                "activity_type": activity_type                  
            }
            return new Promise((resolve, reject) => {
                let reqObject = this.stuffHeader(data, true);
                reqObject.then((val)=> {
                    resolve(val);
                })
                .catch(err => {reject(err)})
            });
        }

        activitySuggestions = (activity_type, activity_uuid, geo_location, geo_accuracy, radius) =>{
            let data = {
                "activity_type": activity_type,              
                "activity_uuid": activity_uuid,
                "geo_location": geo_location,
                "geo_accuracy": geo_accuracy,
                "radius":radius,
            }
            return new Promise((resolve, reject) => {
                let reqObject = this.stuffHeader(data, true);
                reqObject.then((val)=> {
                    resolve(val);
                })
                .catch(err => {reject(err)})
            });
        }


        activityMapping = (activity_type, activity_uuid, offerer, requester) =>{
            let data = {
                "activity_type": activity_type, 
                "activity_uuid": activity_uuid, 
                "offerer": offerer, 
                "requester": requester
            }
            return new Promise((resolve, reject) => {
                let reqObject = this.stuffHeader(data, true);
                reqObject.then((val)=> {
                    resolve(val);
                })
                .catch(err => {reject(err)})
            });
        }

        activityAdd = (activity_uuid, activity_type, geo_location, geo_accuracy, address, activity_category, activity_count, activity_detail, offer_condition, pay) => {
            let data = {
                "activity_uuid": activity_uuid, 
                "activity_type": activity_type,
                "geo_location": geo_location,
                "geo_accuracy": geo_accuracy,
                "address": address,
                "activity_category": activity_category,
                "activity_count": activity_count,                
                "activity_detail": activity_detail,
                "offer_condition": offer_condition,
                "pay": pay,
            }
            return new Promise((resolve, reject) => {
                let reqObject = this.stuffHeader(data, true);
                reqObject.then((val)=> {
                    resolve(val);
                })
                .catch(err => {reject(err)})
            });
        }
        
        activityDelete = (activity_uuid, activity_type) =>{
            let data = {
                "activity_uuid": activity_uuid, 
                "activity_type": activity_type
            }
            return new Promise((resolve, reject) => {
                let reqObject = this.stuffHeader(data, true);
                reqObject.then((val)=> {
                    resolve(val);
                })
                .catch(err => {reject(err)})
            });
        }


        mappingDelete = (activity_uuid, activity_type,  mapping_initiator , uuid) =>{
            let data = {
                "activity_uuid": activity_uuid, 
                "activity_type": activity_type
            }
            /**
             Based on discussion with VIKAS
             within mapping there is a key "mapping_initiator", 
             possible values are 1 or 2., 1 
             means the mapping initiator is from "Requester" and 2 means mapping is from the offerer side.
             */
            if(mapping_initiator === 1) {
                data['offerer'] =[{
                    "activity_uuid": uuid
                }]
            } else if(mapping_initiator === 2) {
                data['requester'] = [{
                    "activity_uuid": uuid
                }]
            }

            return new Promise((resolve, reject) => {
                let reqObject = this.stuffHeader(data, true);
                reqObject.then((val)=> {
                    resolve(val);
                })
                .catch(err => {reject(err)})
            });   
        }


        mappingRating = (activity_uuid,activity_type, mapping_initiator , uuid, rating, recommend_other, comments) =>{
            let data = {
                "activity_uuid":activity_uuid,
                "activity_type": activity_type
            };
            let ratingInfo = {
                "rating":rating, 
                "recommend_other":recommend_other,
                "comments":comments
            }
            if(mapping_initiator === 1) {
                data['offerer'] =[{
                    "activity_uuid": uuid,
                    "rate_report":ratingInfo
                }]
            } else if(mapping_initiator === 2) {
                data['requester'] = [{
                    "activity_uuid": uuid,
                    "rate_report":ratingInfo
                }]
            }

            return new Promise((resolve, reject) => {
                let reqObject = this.stuffHeader(data, true);
                reqObject.then((val)=> {
                    resolve(val);
                })
                .catch(err => {reject(err)})
            });
        }


        mappingCall = (activity_uuid, mapping_id) =>{        
            let data = {
                "activity_uuid":activity_uuid, 
                "mapping_id":mapping_id
            }
            return new Promise((resolve, reject) => {
                let reqObject = this.stuffHeader(data, true);
                reqObject.then((val)=> {
                    resolve(val);
                })
                .catch(err => {reject(err)})
            });    
        }


        stuffHeader = (data, withAppId) =>{
            return new Promise((resolve, reject) => {
                let reqData = this.APIData;
                let userDetails = this.getUserDetails();
                userDetails.then((details) => {
                    console.log("stuffHeader    "+ details );
                    //console.log("details[app_id]    "+ JSON.parse(details).app_id );
                    details = JSON.parse(details);
                    if(withAppId){
                        reqData["app_id"] = details.app_id;  
                    }
                    reqData["data"] = data; 
                    //console.log("stuffHeader userDetails reqData   :  " + JSON.stringify(reqData))   
                    resolve(reqData);
                })   
            });                  
        }


        getUserDetails = () => {
            return new Promise((resolve, reject) => {
                let data = AppStorage.getAppInfo(AppConstant.APP_STORE_KEY.USER_REG_DETAILS);        
                data.then((data)=> {
                    console.log("getUserDetails    "+ data )
                    resolve(data);
                })
                .catch(err => {reject(err)})
            });           
        }

}

export default RequestObject;

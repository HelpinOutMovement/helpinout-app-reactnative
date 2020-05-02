9

import NetInfo from "@react-native-community/netinfo";
const axios = require('axios')
import AppConstants from "../misc/AppConstant";
import RequestObjects from '../APIClient/RequestResponseObjects/RequestObjects';
import AppStorage from '../storage/AppStorage';

function kebabCaseToCamel(str) {
      return str.replace( /(\-\w)/g, (matches) => matches[1].toUpperCase())
  }
class API{
  constructor(){
    this.url = AppConstants.API_SERVER.baseURL;
    this.endpoints = {}
    NetInfo.fetch().then(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
      });
    
  }
  /**
   * Create and store a single entity's endpoints
   * @param {A entity Object} entity
   */
  createEntity(apiEndpoint) {
    /**
     * If there is a - in the entity.name, then change it 
     * to camelCase. E.g 
     * ```
     * myApi.createEntity({ name : 'foo-bar'})
     * myApi.endpoints.fooBar.getAll(...)
     */
    return new Promise((resolve, reject) => {
        const name = kebabCaseToCamel(apiEndpoint)
        this.endpoints[name] = this.createBasicCRUDEndpoints(name)
        resolve(name);
    }).catch((err) => {reject(err)})
    
  }

  createEntities(arrayOfEntity) {
    arrayOfEntity.forEach(this.createEntity.bind(this))
  }
  /**
   * Create the basic endpoints handlers for CRUD operations
   * @param {A entity Object} entity
   */
  createBasicCRUDEndpoints( apiEndpoint ) {
    var endpoints = {}
    const resourceURL = this.url + "/" + apiEndpoint;
    console.log(resourceURL);
    endpoints.getAll = ({ params={}}, config={} ) => axios.get(resourceURL, { params }, config)
    endpoints.getOne = ({ id }, config={}) =>  axios.get(`${resourceURL}/${id}`, config)
    endpoints.post = (toCreate, config={}) =>  {
        return new Promise((resolve, reject) => {
            let response =  axios.post(resourceURL, toCreate, config)
            response.then((resp) => {
                //console.log("Post Success")
                resolve(resp);
            }).catch(error => {
                //console.log("Post Error")
                //console.log('onRejected function called: ' + JSON.stringify(error.response));
                reject(error);
            })
        });
       
      //return response
    }
    endpoints.pur = (toUpdate, config={}) => axios.put(`${resourceURL}/${toUpdate.id}`, toUpdate, config)
    endpoints.patch  = ({id}, toPatch, config={}) => axios.patch(`${resourceURL}/${id}`, toPatch, config)
    endpoints.delete = ({ id }, config={}) => axios.delete(`${resourceURL}/${id}`, config)
    return endpoints

  }



  geocode = (lat , lon) =>{
    return new Promise((resolve, reject) => {
        let addressData =  axios.get("https://nominatim.openstreetmap.org/reverse?format=json&lat="+lat+"&lon="+lon+"");
        //let addressData =  axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lon+"&key=AIzaSyDgaOp_orkTcVpcH6NfNE3XtOH6tdiXlsg"
        //let addressData =  axios.get("https://api.bigdatacloud.net/data/reverse-geocode-client?latitude="+lat+"&longitude="+lon+"&localityLanguage=en");
        addressData.then((addressDetails)=> {
            console.log("daddressDetails : " + JSON.stringify(addressDetails))
            resolve(addressDetails.data.display_name)
        }).catch(err => {reject(err)})
    });
  }
//https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=18.482630&longitude=73.892610
  //https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=18.482630&lon=73.892610


  login = (country_code, mobil_number) =>{
        return new Promise((resolve, reject) => {
            let  requestObjects = new RequestObjects();
            reqObj = requestObjects.loginObject(country_code, mobil_number);
            reqObj.then((val)=> {
                console.log("login request Object ")
                console.log(reqObj)
                let apicall = 'user/login';
                this.createEntity(apicall).then((call) => {
                    let data = this.endpoints[call].post(val);        
                    data.then(({data})=> {
                        resolve(data);
                    })
                    .catch(err => {reject(err)})
                })                
            })
            .catch(err => {reject(err)})
        });
  }


  register = (country_code, mobil_number, first_name, last_name, mobile_number_visible, user_type,org_name, org_type, org_division) => {
    return new Promise((resolve, reject) => {  
        let  requestObjects = new RequestObjects();
        reqObj = requestObjects.registerObject(country_code, mobil_number,first_name, last_name, mobile_number_visible, user_type,org_name, org_type, org_division);
        reqObj.then((val)=> {
            console.log("register request Object ")
            console.log(val)
            let apicall = 'user/register';
            this.createEntity(apicall).then((call) => {
                let data = this.endpoints[call].post(val);        
                data.then(({data})=> {
                    resolve(data);
                })
                .catch(err => {reject(err)})
            })  
        })
        .catch(err => {reject(err)})
      });
  }


  updateUser = (first_name, last_name, mobile_number_visible, user_type,org_name, org_type, org_division) => {
        return new Promise((resolve, reject) => {
            let  requestObjects = new RequestObjects();
            reqObj = requestObjects.updateUserObject(first_name, last_name, mobile_number_visible, user_type,org_name, org_type, org_division);
            reqObj.then((val)=> {
                console.log("update request Object ")
                console.log(val)
                let apicall = 'user/update';
                this.createEntity(apicall).then((call) => {
                    let data = this.endpoints[call].post(val);        
                    data.then(({data})=> {
                        resolve(data);
                    })
                    .catch(err => {reject(err)})
                })  
            })
            .catch(err => {reject(err)})
        });
    }



    locationSuggestion = (lat, lon, geo_accuracy, radius, activity_type , activity_uuid)=>{
        console.log("locationSuggestion")
        return new Promise((resolve, reject) => {
            let  requestObjects = new RequestObjects();
            reqObj = requestObjects.locationSuggestionObject(lat, lon, geo_accuracy, radius, activity_type , activity_uuid);          
            reqObj.then((val)=> {
                let apicall = 'user/locationsuggestion';
                              
                NetInfo.fetch().then(networkState => {
                    if(networkState.isConnected){
                        this.createEntity(apicall).then((call) => {
                            let data = this.endpoints[call].post(val);        
                            data.then(({data})=> {
                                console.log("Calling AppStorage")
                                AppStorage.storeAppInfo("API_CALL_CACHE_"+apicall, JSON.stringify(data))
                                resolve(data);
                            })
                            .catch(err => {reject(err)})
                        })
                    }else{
                        AppStorage.getAppInfo("API_CALL_CACHE_"+apicall).then((data) =>{
                            console.log("Cached Data " + data)
                            resolve(JSON.parse(data));
                        })
                    }
                })
                                
            })
            .catch(err => {reject(err)})
        });
    }

    locationRequesterSummary = (lat, lon, geo_accuracy)=>{
        return new Promise((resolve, reject) => {
            let  requestObjects = new RequestObjects();
            reqObj = requestObjects.locationRequesterSummary(lat, lon, geo_accuracy);
            reqObj.then((val)=> {
                console.log("locationRequesterSummary request Object ")
                let apicall = 'user/locationrequestersummary';
                NetInfo.fetch().then(networkState => {
                    if(networkState.isConnected){
                        this.createEntity(apicall).then((call) => {
                            let data = this.endpoints[call].post(val);        
                            data.then(({data})=> {
                                console.log("Calling AppStorage")
                                AppStorage.storeAppInfo("API_CALL_CACHE_"+apicall, JSON.stringify(data))
                                resolve(data);
                            })
                            .catch(err => {reject(err)})
                        })
                    }else{
                        AppStorage.getAppInfo("API_CALL_CACHE_"+apicall).then((data) =>{
                            console.log("Cached Data " + data)
                            resolve(JSON.parse(data));
                        })
                    }
                }) 
            })
             .catch(err => {reject(err)})
        });
    }

    userPastActivity = (activity_type) =>{
        return new Promise((resolve, reject) => {
            let  requestObjects = new RequestObjects();
            reqObj = requestObjects.userPastActivityObject(activity_type);
            reqObj.then((val)=> {
                console.log("pastactivity request Object ")
                console.log(val)           
                let apicall = 'user/pastactivity';
                NetInfo.fetch().then(networkState => {
                    if(networkState.isConnected){
                        this.createEntity(apicall).then((call) => {
                            let data = this.endpoints[call].post(val);        
                            data.then(({data})=> {
                                console.log("Calling AppStorage")
                                AppStorage.storeAppInfo("API_CALL_CACHE_"+apicall, JSON.stringify(data))
                                resolve(data);
                            })
                            .catch(err => {reject(err)})
                        })
                    }else{
                        AppStorage.getAppInfo("API_CALL_CACHE_"+apicall).then((data) =>{
                            console.log("Cached Data " + data)
                            resolve(JSON.parse(data));
                        })
                    }
                })
            })
            .catch(err => {reject(err)})
        });    
    }

    activityAdd = (activity_uuid, activity_type, geo_location, geo_accuracy, address, activity_category, activity_count, activity_detail, offer_condition, pay) =>{
        return new Promise((resolve, reject) => {
            let  requestObjects = new RequestObjects();
            reqObj = requestObjects.activityAdd(activity_uuid, activity_type, geo_location, geo_accuracy, address, activity_category, activity_count, activity_detail, offer_condition, pay);
            reqObj.then((val)=> {
                console.log("Add Activity request Object ")
                console.log(val)
                let apicall = 'activity/add';
                this.createEntity(apicall).then((call) => {
                    let data = this.endpoints[call].post(val);        
                    data.then(({data})=> {
                        resolve(data);
                    })
                    .catch(err => {reject(err)})
                })  
            })
            .catch(err => {console.log(err);reject(err)})
        });    
    }

    activitySuggestions = (activity_type, activity_uuid, geo_location, geo_accuracy, radius) =>{
        return new Promise((resolve, reject) => {
            let  requestObjects = new RequestObjects();
            reqObj = requestObjects.activitySuggestions(activity_type, activity_uuid, geo_location, geo_accuracy, radius);
            reqObj.then((val)=> {
                console.log("Activity mapping suggestion request Object ")
                console.log(val)
                let apicall = 'activity/suggestions';
                NetInfo.fetch().then(networkState => {
                    if(networkState.isConnected){
                        this.createEntity(apicall).then((call) => {
                            let data = this.endpoints[call].post(val);        
                            data.then(({data})=> {
                                console.log("Calling AppStorage")
                                AppStorage.storeAppInfo("API_CALL_CACHE_"+apicall, JSON.stringify(data))
                                resolve(data);
                            })
                            .catch(err => {reject(err)})
                        })
                    }else{
                        AppStorage.getAppInfo("API_CALL_CACHE_"+apicall).then((data) =>{
                            console.log("Cached Data " + data)
                            resolve(JSON.parse(data));
                        })
                    }
                }) 
            })
            .catch(err => {reject(err)})
        });    
    }


    activityMapping = (activity_type, activity_uuid, offerer, requester) =>{
        return new Promise((resolve, reject) => {
            let  requestObjects = new RequestObjects();
            reqObj = requestObjects.activityMapping(activity_type, activity_uuid, offerer, requester);
            reqObj.then((val)=> {
                console.log("Activity mapping suggestion request Object ")
                console.log(val)
                let apicall = 'activity/mapping';
                this.createEntity(apicall).then((call) => {
                    let data = this.endpoints[call].post(val);        
                    data.then(({data})=> {
                        resolve(data);
                    })
                    .catch(err => {reject(err)})
                })  
            })
            .catch(err => {reject(err)})
        }); 
    }



    activityAdd = (activity_uuid, activity_type, geo_location, geo_accuracy, address, activity_category, activity_count, activity_detail, offer_condition, pay) =>{
        return new Promise((resolve, reject) => {
            let  requestObjects = new RequestObjects();
            reqObj = requestObjects.activityAdd(activity_uuid, activity_type, geo_location, geo_accuracy, address, activity_category, activity_count, 
                activity_detail, offer_condition, pay);    
            reqObj.then((val)=> {
                console.log("Activity Add request Object ")
                console.log(val)
                let apicall = 'activity/add';
                this.createEntity(apicall).then((call) => {
                    let data = this.endpoints[call].post(val);        
                    data.then(({data})=> {
                        resolve(data);
                    })
                    .catch(err => {reject(err)})
                })  
            })
            .catch(err => {reject(err)})
        });     
    }


    activityDelete = (activity_uuid, activity_type) =>{
        return new Promise((resolve, reject) => {
            let  requestObjects = new RequestObjects();
            reqObj = requestObjects.activityDelete(activity_uuid, activity_type);    
            reqObj.then((val)=> {
                console.log("Activity delete request Object ")
                console.log(val)
                let apicall = 'activity/delete';
                this.createEntity(apicall).then((call) => {
                    let data = this.endpoints[call].post(val);        
                    data.then(({data})=> {
                        resolve(data);
                    })
                    .catch(err => {reject(err)})
                })  
        })
            .catch(err => {reject(err)})
        });     
    }


    mappingDelete = (activity_uuid, activity_type, mapping_initiator , uuid) =>{
        return new Promise((resolve, reject) => {
            let  requestObjects = new RequestObjects();
            reqObj = requestObjects.mappingDelete(activity_uuid, activity_type,   mapping_initiator , uuid);
            reqObj.then((val)=> {
                console.log("Mapping delete request Object ")
                console.log(val)
                let apicall = 'mapping/delete';
                this.createEntity(apicall).then((call) => {
                    let data = this.endpoints[call].post(val);        
                    data.then(({data})=> {
                        resolve(data);
                    })
                    .catch(err => {reject(err)})
                })  
            })
            .catch(err => {reject(err)})
        });     
    }



    mappingRating = (activity_uuid, activity_type, mapping_initiator , uuid, rating, recommend_other, comments) =>{
        return new Promise((resolve, reject) => {
            let  requestObjects = new RequestObjects();
            reqObj = requestObjects.mappingRating(activity_uuid,activity_type, mapping_initiator , uuid, rating, recommend_other, comments);
            reqObj.then((val)=> {
                console.log("Mapping rating request Object ")
                console.log(val)
                let apicall = 'mapping/rating';
                this.createEntity(apicall).then((call) => {
                    let data = this.endpoints[call].post(val);        
                    data.then(({data})=> {
                        resolve(data);
                    })
                    .catch(err => {reject(err)})
                })  
            })
            .catch(err => {reject(err)})
        });   
    }


    mappingCall = (activity_uuid, activity_type, mapping_initiator , uuid) =>{
        return new Promise((resolve, reject) => {
            let  requestObjects = new RequestObjects();
            reqObj = requestObjects.mappingCall(activity_uuid,activity_type, mapping_initiator , uuid);
            reqObj.then((val)=> {
                console.log("Mapping Call Initiate request Object ")
                console.log(val)
                let apicall = 'mapping/call';
                this.createEntity(apicall).then((call) => {
                    let data = this.endpoints[call].post(val);        
                    data.then(({data})=> {
                        resolve(data);
                    })
                    .catch(err => {reject(err)})
                })  
            })
            .catch(err => {reject(err)})
        });     
    }
  



}

const apiInstance = new API();
export {
    apiInstance 
}
export default API;


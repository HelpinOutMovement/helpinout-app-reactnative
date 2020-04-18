const axios = require('axios')
import AppConstants from "../misc/AppConstant";
import RequestObjects from '../APIClient/RequestResponseObjects/RequestObjects';

function kebabCaseToCamel(str) {
      return str.replace( /(\-\w)/g, (matches) => matches[1].toUpperCase())
  }
class API{
  constructor(){
    this.url = AppConstants.API_SERVER.baseURL;
    this.endpoints = {}
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

    const name = kebabCaseToCamel(apiEndpoint)
    this.endpoints[name] = this.createBasicCRUDEndpoints(name)
    return name;
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
      //console.log(toCreate) 
      return axios.post(resourceURL, toCreate, config)
    }
    endpoints.pur = (toUpdate, config={}) => axios.put(`${resourceURL}/${toUpdate.id}`, toUpdate, config)
    endpoints.patch  = ({id}, toPatch, config={}) => axios.patch(`${resourceURL}/${id}`, toPatch, config)
    endpoints.delete = ({ id }, config={}) => axios.delete(`${resourceURL}/${id}`, config)
    return endpoints

  }


  login = (country_code, mobil_number) =>{

      let  requestObjects = new RequestObjects();
      reqObj = requestObjects.loginObject(country_code, mobil_number);

      return new Promise((resolve, reject) => {
          let apicall = 'user/login';
          apicall = this.createEntity(apicall)
          let data = this.endpoints[apicall].post(reqObj);        
          data.then(({data})=> {
              resolve(data);
          })
          .catch(err => {reject(err)})
      });
  }


  register = (country_code, mobil_number, first_name, last_name, mobile_number_visible, user_type,org_name, org_type, org_division) => {
      let  requestObjects = new RequestObjects();
      reqObj = requestObjects.registerObject(country_code, mobil_number,first_name, last_name, mobile_number_visible, user_type,org_name, org_type, org_division);
      console.log("register request Object ")
      console.log(reqObj)
      return new Promise((resolve, reject) => {
          let apicall = 'user/register';
          apicall = this.createEntity(apicall)
          let data = this.endpoints[apicall].post(reqObj);        
          data.then(({data})=> {
              resolve(data);
          })
          .catch(err => {reject(err)})
      });
  }


  updateUser = (first_name, last_name, mobile_number_visible, user_type,org_name, org_type, org_division) => {
        let  requestObjects = new RequestObjects();
        reqObj = requestObjects.updateUserObject(first_name, last_name, mobile_number_visible, user_type,org_name, org_type, org_division);
        console.log("update request Object ")
        console.log(reqObj)
        return new Promise((resolve, reject) => {
            let apicall = 'user/update';
            apicall = this.createEntity(apicall)
            let data = this.endpoints[apicall].post(reqObj);        
            data.then(({data})=> {
                resolve(data);
            })
            .catch(err => {reject(err)})
        });
    }



    locationSuggestion = (lat, lon, geo_accuracy, activity_type , activity_uuid)=>{
        let  requestObjects = new RequestObjects();
        reqObj = requestObjects.locationSuggestionObject(lat, lon, geo_accuracy, activity_type , activity_uuid);
        console.log("locationsuggestion request Object ")
        console.log(reqObj)
        return new Promise((resolve, reject) => {
            let apicall = 'user/locationsuggestion';
            apicall = this.createEntity(apicall)
            let data = this.endpoints[apicall].post(reqObj);        
            data.then(({data})=> {
                resolve(data);
            })
            .catch(err => {reject(err)})
        });
    }


    locationRequesterSummary = (lat, lon, geo_accuracy)=>{
        let  requestObjects = new RequestObjects();
        reqObj = requestObjects.locationRequesterSummary(lat, lon, geo_accuracy);
        console.log("locationRequesterSummary request Object ")
        console.log(reqObj)
        return new Promise((resolve, reject) => {
            let apicall = 'user/locationrequestersummary';
            apicall = this.createEntity(apicall)
            let data = this.endpoints[apicall].post(reqObj);        
            data.then(({data})=> {
                resolve(data);
            })
            .catch(err => {reject(err)})
        });
    }

    userPastActivity = (activity_type) =>{
        let  requestObjects = new RequestObjects();
        reqObj = requestObjects.userPastActivity(activity_type);
        console.log("pastactivity request Object ")
        console.log(reqObj)
        return new Promise((resolve, reject) => {
            let apicall = 'user/pastactivity';
            apicall = this.createEntity(apicall)
            let data = this.endpoints[apicall].post(reqObj);        
            data.then(({data})=> {
                resolve(data);
            })
            .catch(err => {reject(err)})
        });    
    }

    activityAdd = (activity_uuid, activity_type, geo_location, geo_accuracy, address, activity_category, activity_count, activity_detail, offer_condition, pay) =>{
        let  requestObjects = new RequestObjects();
        reqObj = requestObjects.activityAdd(activity_uuid, activity_type, geo_location, geo_accuracy, address, activity_category, activity_count, activity_detail, offer_condition, pay);
        console.log("Add Activity request Object ")
        console.log(reqObj)
        return new Promise((resolve, reject) => {
            let apicall = 'activity/add';
            apicall = this.createEntity(apicall)
            let data = this.endpoints[apicall].post(reqObj);        
            data.then(({data})=> {
                resolve(data);
            })
            .catch(err => {reject(err)})
        });    
    }

    activitySuggestions = (activity_type, activity_uuid, offerer, requester) =>{
        let  requestObjects = new RequestObjects();
        reqObj = requestObjects.activitySuggestions(activity_type, activity_uuid, offerer, requester);
        console.log("Activity mapping suggestion request Object ")
        console.log(reqObj)
        return new Promise((resolve, reject) => {
            let apicall = 'activity/suggestions';
            apicall = this.createEntity(apicall)
            let data = this.endpoints[apicall].post(reqObj);        
            data.then(({data})=> {
                resolve(data);
            })
            .catch(err => {reject(err)})
        });    
    }


    activityMapping = (activity_type, activity_uuid, offerer, requester) =>{
        let  requestObjects = new RequestObjects();
        reqObj = requestObjects.activityMapping(activity_type, activity_uuid, offerer, requester);
        console.log("Activity mapping suggestion request Object ")
        console.log(reqObj)
        return new Promise((resolve, reject) => {
            let apicall = 'activity/mapping';
            apicall = this.createEntity(apicall)
            let data = this.endpoints[apicall].post(reqObj);        
            data.then(({data})=> {
                resolve(data);
            })
            .catch(err => {reject(err)})
        }); 
    }



    activityAdd = (activity_uuid, activity_type, geo_location, geo_accuracy, address, activity_category, activity_count, activity_detail, offer_condition, pay) =>{
        let  requestObjects = new RequestObjects();
        reqObj = requestObjects.activityAdd(activity_uuid, activity_type, geo_location, geo_accuracy, address, activity_category, activity_count, activity_detail, offer_condition, pay);    
        console.log("Activity Add request Object ")
        console.log(reqObj)
        return new Promise((resolve, reject) => {
            let apicall = 'activity/add';
            apicall = this.createEntity(apicall)
            let data = this.endpoints[apicall].post(reqObj);        
            data.then(({data})=> {
                resolve(data);
            })
            .catch(err => {reject(err)})
        });     
    }


    activityDelete = (activity_uuid, activity_type) =>{
        let  requestObjects = new RequestObjects();
        reqObj = requestObjects.activityDelete(activity_uuid, activity_type);    
        console.log("Activity delete request Object ")
        console.log(reqObj)
        return new Promise((resolve, reject) => {
            let apicall = 'activity/delete';
            apicall = this.createEntity(apicall)
            let data = this.endpoints[apicall].post(reqObj);        
            data.then(({data})=> {
                resolve(data);
            })
            .catch(err => {reject(err)})
        });     
    }


    mappingDelete = (activity_uuid, activity_type, mapping_id) =>{
        let  requestObjects = new RequestObjects();
        reqObj = requestObjects.mappingDelete(activity_uuid, activity_type, mapping_id);
        console.log("Mapping delete request Object ")
        console.log(reqObj)
        return new Promise((resolve, reject) => {
            let apicall = 'mapping/delete';
            apicall = this.createEntity(apicall)
            let data = this.endpoints[apicall].post(reqObj);        
            data.then(({data})=> {
                resolve(data);
            })
            .catch(err => {reject(err)})
        });     
    }



    mappingRating = (activity_uuid, mapping_id, rating, recommend_other) =>{
        let  requestObjects = new RequestObjects();
        reqObj = requestObjects.mappingRating(activity_uuid, mapping_id, rating, recommend_other);
        console.log("Mapping rating request Object ")
        console.log(reqObj)
        return new Promise((resolve, reject) => {
            let apicall = 'mapping/rating';
            apicall = this.createEntity(apicall)
            let data = this.endpoints[apicall].post(reqObj);        
            data.then(({data})=> {
                resolve(data);
            })
            .catch(err => {reject(err)})
        });   
    }


    mappingCall = (activity_uuid, mapping_id) =>{
        let  requestObjects = new RequestObjects();
        reqObj = requestObjects.mappingCall(activity_uuid, mapping_id);
        console.log("Mapping Call Initiate request Object ")
        console.log(reqObj)
        return new Promise((resolve, reject) => {
            let apicall = 'mapping/call';
            apicall = this.createEntity(apicall)
            let data = this.endpoints[apicall].post(reqObj);        
            data.then(({data})=> {
                resolve(data);
            })
            .catch(err => {reject(err)})
        });     
    }
  



}

export default API;


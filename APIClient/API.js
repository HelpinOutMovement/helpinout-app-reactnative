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


  register = (country_code, mobil_number, first_name, last_name, mobile_number_visible, user_type) => {

      let  requestObjects = new RequestObjects();
      reqObj = requestObjects.registerObject(country_code, mobil_number,first_name, last_name, mobile_number_visible, user_type);
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



}

export default API;


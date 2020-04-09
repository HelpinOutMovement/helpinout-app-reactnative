const axios = require('axios')
import AppConstants from "../misc/AppConstant";

function kebabCaseToCamel(str) {
      return str.replace( /(\-\w)/g, (matches) => matches[1].toUpperCase())
  }

class API {
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

    //const resourceURL = `${this.url}/${apiEndpoint}`
    const resourceURL = this.url + "/" + apiEndpoint;

    endpoints.getAll = ({ params={}}, config={} ) => axios.get(resourceURL, { params }, config)

    endpoints.getOne = ({ id }, config={}) =>  axios.get(`${resourceURL}/${id}`, config)

    endpoints.post = (toCreate, config={}) =>  axios.post(resourceURL, toCreate, config)

    endpoints.pur = (toUpdate, config={}) => axios.put(`${resourceURL}/${toUpdate.id}`, toUpdate, config)

    endpoints.patch  = ({id}, toPatch, config={}) => axios.patch(`${resourceURL}/${id}`, toPatch, config)

    endpoints.delete = ({ id }, config={}) => axios.delete(`${resourceURL}/${id}`, config)

    return endpoints

  }

}

export default API
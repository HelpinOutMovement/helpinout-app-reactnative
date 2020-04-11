import DeviceInfo from 'react-native-device-info';

  const startingDate = new Date()
  const date = startingDate.getFullYear()+"-"+startingDate.getMonth()+"-"+startingDate.getDate()+"T"+startingDate.getHours()+":"+startingDate.getMinutes()+":"+startingDate.getSeconds()+"."+startingDate.getMilliseconds()+"+"+startingDate.getTimezoneOffset();

var APIData = {"app_id": '', "imei_no": DeviceInfo.getUniqueId(), "app_version": "0.1", 'date_time':  date  };
class RequestObject{

//Struct = (...keys) => ((...v) => keys.reduce((o, k, i) => {o[k] = v[i]; return o} , {}))
    registerObject = (country_code, mobile_no, first_name,last_name, mobile_no_visibility, user_type, org_name, org_type, org_division)=>{
        let reqData = APIData;
        console.log(reqData);
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

        reqData["data"] = data; 
        console.log(reqData)   
        return reqData;
    }


    loginObject = (country_code, mobile_no)=>{
        let reqData = APIData;
        console.log(reqData);
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

        reqData["data"] = data; 
        console.log(reqData)   
        return reqData;
    }


}

export default RequestObject;

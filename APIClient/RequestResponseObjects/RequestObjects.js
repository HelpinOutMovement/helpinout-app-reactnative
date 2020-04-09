


class LoginObject {
    

    Struct = (...keys) => ((...v) => keys.reduce((o, k, i) => {o[k] = v[i]; return o} , {}))
    
    

    getRequestData(imei_no, os_type, manufacturer_name, os_version,
                        firebase_token, app_version, time_zone, country_code, mobile_no,
                        first_name,last_name, mobile_no_visibility, user_type, org_name, org_type, org_division){  

        setRequestData = this.Struct('imei_no', 'os_type', 'manufacturer_name', 'os_version',
                            'firebase_token', 'app_version', 'time_zone', 'country_code', 'mobile_no',
                            'first_name,last_name', 'mobile_no_visibility', 'user_type', 'org_name', 'org_type', 'org_division')

        data = setRequestData (imei_no, os_type, manufacturer_name, os_version,
                                firebase_token, app_version, time_zone, country_code, mobile_no,
                                first_name,last_name, mobile_no_visibility, user_type, org_name, org_type, org_division)   
        return JSON.stringify(data, (key, value) => {
            if (value !== null) return value
          })
    }



    getRequestData(imei_no, os_type, manufacturer_name, os_version,
                        firebase_token, app_version, time_zone, country_code, mobile_no,
                        first_name,last_name, mobile_no_visibility, user_type, org_name, org_type, org_division){  
              
        setRequestData = this.Struct('imei_no', 'os_type', 'manufacturer_name', 'os_version',
                            'firebase_token', 'app_version', 'time_zone', 'country_code', 'mobile_no',
                            'first_name,last_name', 'mobile_no_visibility', 'user_type', 'org_name', 'org_type', 'org_division')

        data = setRequestData (imei_no, os_type, manufacturer_name, os_version,
                                firebase_token, app_version, time_zone, country_code, mobile_no,
                                first_name,last_name, mobile_no_visibility, user_type, org_name, org_type, org_division)   
        return JSON.stringify(data, (key, value) => {
                if (value !== null) return value}
            )
        }
}


export default LoginObject;

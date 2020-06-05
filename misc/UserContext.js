import React from 'react'

const UserContext = React.createContext()

class UserContextProvider extends React.Component {
    // Context state
    state = {
      latlon:"", 
      region:{}
    }
  
    // Method to update state
    setLatLon = (latlon) => {
      this.setState({ latlon: latlon }, () =>{
        //console.log(this.state.latlon)
      })
    }

    getLatLon = () => {
      return this.state.latlon;
    }


    // Method to update state
    setRegion = (region) => {
      this.setState({ region: region }, () =>{
        //console.log(this.state.region)
      })
    }

    getRegion = () => {
      return this.state.region;
    }

    // Method to update state
    setAPIServer = (apiserver) => {
      this.setState({ apiserver: apiserver }, () =>{
        //console.log(this.state.region)
      })
    }

    getAPIServer = () => {
      return this.state.apiserver;
    }

    // Method to update state
    setDrawerNavigationOptions = (drawerNavigationOptions) => {
      this.setState({ drawerNavigationOptions: drawerNavigationOptions }, () =>{
        //console.log(this.state.region)
      })
    }

    getDrawerNavigationOptions = () => {
      return this.state.drawerNavigationOptions;
    }
    
    render() {
      const { children } = this.props;
      const {getLatLon, getRegion, getAPIServer, getDrawerNavigationOptions} = this;
      const { setLatLon, setRegion, setAPIServer, setDrawerNavigationOptions } = this;
  
      return (
        <UserContext.Provider
          value={{
            setLatLon,
            getLatLon, 
            setRegion,
            getRegion,
            setAPIServer,
            getAPIServer,
            setDrawerNavigationOptions,
            getDrawerNavigationOptions
          }}
        >
          {children}
        </UserContext.Provider>
      )
    }
}

export const UserProvider = UserContextProvider
export const UserConsumer = UserContext.Consumer

export default UserContext
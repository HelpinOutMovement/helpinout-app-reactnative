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
    
    render() {
      const { children } = this.props;
      const {getLatLon, getRegion} = this;
      const { setLatLon, setRegion  } = this;
  
      return (
        <UserContext.Provider
          value={{
            setLatLon,
            getLatLon, 
            setRegion,
            getRegion
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
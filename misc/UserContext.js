import React from 'react'

const UserContext = React.createContext()

class UserContextProvider extends React.Component {
    // Context state
    state = {
    }
  
    // Method to update state
    setLatLon = latlon => {
      this.setState({ latlon })
    }
    render() {
      const { children } = this.props;
      const {latlon} = this.state;
      const { setLatLon  } = this
  
      return (
        <UserContext.Provider
          value={{
            setLatLon,
            latlon
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
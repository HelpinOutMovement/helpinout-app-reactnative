import React from 'react'
import AppStrings from './AppStrings';

const AppStringContext = React.createContext()

// export const AppStringProvider = AppStringContext.Provider
export const AppStringConsumer = AppStringContext.Consumer

class AppStringProvider extends React.Component {
    // Context state
    state = {
      language: 'english',
    }
  
    // Method to update state
    setLanguage = language => {
      this.setState(prevState => ({ language }))
    }
    translate = (stringLabelKey, selectedLanguage)  => {
        const currentLang = selectedLanguage ?  selectedLanguage : this.state.language;
        return (AppStrings && AppStrings[currentLang] &&  AppStrings[currentLang][stringLabelKey] ) ? AppStrings[currentLang][stringLabelKey]: '_####_'
    }
  
    render() {
      const { children } = this.props
      const { language } = this.state
      const { setLanguage ,translate } = this
  
      return (
        <AppStringContext.Provider
          value={{
            language,
            setLanguage,
            translate
          }}
        >
          {children}
        </AppStringContext.Provider>
      )
    }
}

export {AppStringProvider};

export default AppStringContext


/*
import React from 'react';
import AppStrings from './AppStrings';

const i18nContext = React.createContext({
    translate: (stringLabelKey, selectedLanguage)  => {
        return (AppStrings && AppStrings[selectedLanguage] &&  AppStrings[selectedLanguage][stringLabelKey] ) ? AppStrings[selectedLanguage][stringLabelKey]: '_####_'
    }
})

// create context
export default i18nContext;
*/
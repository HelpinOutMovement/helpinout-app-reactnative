import React from 'react'
//import AppStrings from './AppStrings';

const AppStringContext = React.createContext()

// export const AppStringProvider = AppStringContext.Provider
export const AppStringConsumer = AppStringContext.Consumer
import I18n, { getLanguages } from 'react-native-i18n';

import AppStorage from '../storage/AppStorage';

I18n.fallbacks = true;

// Available languages

I18n.translations = {
  'en': require('../locale/en'),
  'ta': require('../locale/ta'),  
  'hi': require('../locale/hi'),
  'gu': require('../locale/gu'),
  'te': require('../locale/te'),
  'kn': require('../locale/kn'),
};

class AppStringProvider extends React.Component {
    // Context state
    state = {
      //language: 'en',
    }
  
    // Method to update state
    setLanguage = language => {
      AppStorage.storeAppInfo("locale", language);
      this.setState({ language })
      I18n.locale = language;
    }


    setLatLon = latlon => {
      this.setState({ latlon })
    }


    translate = (stringLabelKey, selectedLanguage)  => {
        const currentLang = selectedLanguage ?  selectedLanguage : this.state.language;
        I18n.locale = currentLang;
        //return (AppStrings && AppStrings[currentLang] &&  AppStrings[currentLang][stringLabelKey] ) ? AppStrings[currentLang][stringLabelKey]: '_####_'
        return I18n.t(stringLabelKey);
        
    }
  
    render() {
      const { children } = this.props
      const { language } = this.state
      const { latlon } = this.state
      const { setLanguage , setLatLon , translate } = this
  
      return (
        <AppStringContext.Provider
          value={{
            language,
            setLanguage,
            latlon, 
            setLatLon,
            translate
          }}
        >
          {children}
        </AppStringContext.Provider>
      )
    }
}

export {AppStringProvider, I18n};

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
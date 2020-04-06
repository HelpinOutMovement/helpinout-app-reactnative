import AsyncStorage from '@react-native-community/async-storage';

class AppStorage {
    static storageMap;
    static appStoragePrefix = 'helpinout_'

    static storeAppInfo = async (key, value) => {
        try {
            await AsyncStorage.setItem(AppStorage.appStoragePrefix+key, value)
        } catch (e) {
            // saving error
            console.error(e)
        }
    }

    static removeAppInfo = async (key) => {
        try {
            await AsyncStorage.removeItem(AppStorage.appStoragePrefix+key)
        } catch (e) {
            // saving error
            console.error(e)
        }
    }

    static getAppInfo = async (key) => {
        let returnedValue ;
        try {
            returnedValue = await AsyncStorage.getItem(AppStorage.appStoragePrefix+key)
        } catch (e) {
            // saving error
            console.error(e)
        }
        return returnedValue;
    }
}

export default AppStorage;
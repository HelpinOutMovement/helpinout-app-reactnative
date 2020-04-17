const AppConstant = {
    IS_LOGGED_IN : 'IS_LOGGED_IN',
    USER_REGISTRATION_DETAILS : 'user_registration_details',
    FIREBASE_USER_DETAILS: 'firebase_user_details', 
    
    APP_SITE:'www.google.com',
    APP_ACTION:{
        RATE_REPORT:'rate_report',
        DELETE:'delete'
    },
    APP_CONFIRMATION:{
        YES:'yes',
        NO:'no'
    },
    APP_STORE_KEY:{
        USER_REG_DETAILS:"userRegistrationDetails",
        IS_VEFIRIED : 'user_verified'
    },
    APP_STATE: {
        IS_LOADING: 'IS_LOADING',
        IS_AUTHENTICATED : 'IS_AUTHENTICATED',
        IS_NOT_AUTENTICATED : 'IS_NOT_AUTENTICATED'
    },
    APP_LANGUAGE:{
        ENGLISH: 'en',
        HINDI: 'hi',
        MARATHI : 'mr',
        KANNADA:'ka',
        GUJARATHI:'gu',
        TAMIL:'ta'
    },
    APP_PAGE:{
        SPLASH:'Splash',
        LOGIN: "login",
        VERIFY: "Verify",
        ON_BOARDING:'OnBoarding',
        ON_BOARDING_INFO:'OnBoardingInfo',
        REGISTER_MOBILE:'RegisterMobile',
        MAP_COMPONENT:'MapComponent',
        DASHBOARD:'Dashboard',
        SCREEN_WITH_SIDE_DRAWER:'Home',
        ASK_FOR_HELP:'Need Help With',
        OFFER_HELP_SCREEN:'Offer Help Screen',
        ASK_FOR_HELP_DETAILS:' Ask for Help Details',
        OFFER_HELP_SCREEN_DETAILS:"Offer Help Screen Details",
        MY_OFFERS_SCREEN:"My Offers",
        MY_REQUEST_SCREEN:"My Requests",
        LOGOUT_ACTION:"LOGOUT_ACTION"
    },

    APP_TEXT_INPUT : {
        MAX_LENGTH: 256
    },
    APP_LOCALE:{
        ENGLISH: 'en',
        HINDI: 'hi',
        MARATHI : 'mr',
        KANNADA:'ka',
        GUJARATHI:'gu',
        TAMIL:'ta'       
    },
    APP_OPTIONS : {
        FOOD: "FOOD",
        AMBULANCE: "AMBULANCE",
        MED_EQUIPMENT: "MED_EQUIPMENT",
        MEDICINE: "MEDICINE",
        MED_PPE: "MED_PPE",
        OTHER: "OTHER",
        PEOPLE: "PEOPLE",
        SHELTER: "SHELTER",
        TESTING: "TESTING"
    },

    API_SERVER: {
        baseURL:"http://3.7.52.176:8080/api/v1",
    }
}

export default AppConstant;
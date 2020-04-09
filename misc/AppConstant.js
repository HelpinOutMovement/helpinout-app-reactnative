const AppConstant = {
    IS_LOGGED_IN : 'IS_LOGGED_IN',
    APP_SITE:'www.google.com',
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
        ON_BOARDING:'OnBoarding',
        ON_BOARDING_INFO:'OnBoardingInfo',
        REGISTER_MOBILE:'RegisterMobile',
        MAP_COMPONENT:'MapComponent',
        DASHBOARD:'Dashboard',
        SCREEN_WITH_SIDE_DRAWER:'Home',
        ASK_FOR_HELP:'Need Help With',
        OFFER_HELP_SCREEN:'Offer Help Screen'
    },

    APP_LOCALE:{
        ENGLISH: 'en',
        HINDI: 'hi',
        MARATHI : 'mr',
        KANNADA:'ka',
        GUJARATHI:'gu',
        TAMIL:'ta'       
    },
    APP_IMAGE : {
        FOOD: "../images/food.png",
        AMBULANCE: "../images/ambulance.png",
        MED_EQUIPMENT: "../images/med-equipment.png",
        MEDICINE: "../images/medicine.png",
        MED_PPE: "../images/medppe.png",
        OTHER: "../images/other.png",
        PEOPLE: "../images/ppl.png",
        SHELTER: "../images/shelter.png",
        TESTING: "../images/testing.png"
    },

    API_SERVER: {
        baseURL:"http://dummy.restapiexample.com/api/v1",
    }
}

export default AppConstant;
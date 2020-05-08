const AppConstant = {
    IS_LOGGED_IN : 'IS_LOGGED_IN',
    IS_VEFIRIED : 'user_verified',
    USER_REGISTRATION_DETAILS : 'user_registration_details',
    FIREBASE_USER_DETAILS: 'firebase_user_details', 
    FIREBASE_CLOUD_MESSAGING_TOKEN: 'firebase_cloud_messaging_token',
    
    APP_SITE:'www.google.com',
    APP_PEOPLE_OPTIONS:{
        VOLUNTEERS:'VOLUNTEERS',
        TECT_PERSONNEL:'TECT_PERSONNEL'
    },
    APP_FOOTER_TABS:{
        HOME:'HOME',
        MY_REQUEST:'MY_REQUEST',
        MY_OFFER:'MY_OFFER',
    },
    APP_ACTION:{
        RATE_REPORT:'rate_report',
        CANCEL:'cancel',
        SEARCH_FOR_PROVIDERS:'SEARCH_FOR_PROVIDERS',
        SENT_REQUEST:'SENT_REQUEST',
        OFFERS_RCVD:'OFFERS_RCVD',
        VIEW_DETAILS:'VIEW_DETAILS',
        OFFERER_RCVD_REQUESTS:'OFFERER_RCVD_REQUESTS',
        OFFERER_SENT_OFFERS:'OFFERER_SENT_OFFERS',
        CALL_THEM:'CALL_THEM'
    },
    APP_MAPPING_INDICATOR:{
        'REQUESTER':1,
        'OFFERER':2
    },
    APP_DELET_ACTION:{
        DELETE_ACTIVITY:'DELETE_ACTIVITY',
        DELETE_MAPPING:'DELETE_MAPPING'
    },
    APP_MAPPING_INDICATOR_CODE:{
        1:'REQUESTER',
        2:'OFFERER'
    },
    APP_CONFIRMATION:{
        YES:'yes',
        NO:'no',
        WE_CAN_PAY:'WE_CAN_PAY',
        WE_CANNOT_PAY:'WE_CANNOT_PAY'
    },
    APP_STORE_KEY:{
        USER_REG_DETAILS:"userRegistrationDetails",
        IS_VEFIRIED : 'user_verified',
        USER_IS_REGISTERED : 'is_registered',
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
        LOGOUT_ACTION:"LOGOUT_ACTION",
        ADD_ACTIVITY_SCREEN:"AddActivityScreen",
        MY_REQUEST_SENT_REQUEST_SCREEN:"MyRequestSentRequestScreen",
        SEARCH_HELP_PROVIDERS_REQUESTERS:"SearchHelpProvidersRequesters",
        MY_OFFER_SENT_OFFER_SCREEN:"MyOfferSentOfferScreen",
        SIDE_DRAWER:"MyDrawer"
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
        MEDICINES: "MEDICINES",
        MED_PPE: "MED_PPE",
        OTHER: "OTHER",
        PEOPLE: "PEOPLE",
        SHELTER: "SHELTER",
        TESTING: "TESTING"
    },

    API_SERVER: {
        baseURL:"http://3.7.52.176:8080/api/v1",
    },

    API_REQUEST_CONSTANTS:{

        user_type:{
            Individual:1,
            Organization:2
        },
        mobile_no_visibility:{
            No:0,
            Yes:1
        },

        activity_type:{
            Both:0,
            Request:1,
            Offer:2
        },
        activity_category_code:{
            1:'FOOD',
            2:'PEOPLE',
            3:'SHELTER',
            4:'MED_PPE',
            5:'TESTING',
            6:'MEDICINES',
            7:'AMBULANCE',
            8:'MED_EQUIPMENT',
            0:'OTHER'
        },
        activity_category:{
            FOOD:1,
            PEOPLE:2,
            SHELTER:3,
            MED_PPE:4,
            TESTING:5,
            MEDICINES:6,
            AMBULANCE:7,
            MED_EQUIPMENT:8,
            OTHER:0
        },
        pay:{
            Willing_To_Pay:1,
            Not_Willing_To_Pay:0
        }
    }
}

export default AppConstant;
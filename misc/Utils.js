import { Dimensions , Platform} from "react-native";
import UUID from "uuid";
import AppConstant from './AppConstant';
import translate from 'react-native-i18n';
class Utilities {
    static getID = function () {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    static genUUID = function () {
        return UUID.v4();
    }
    static getDateTime = (datetime, format) => {
        if (!format) {
            let dt = new Date(datetime);
            let hours = dt.getHours(); // gives the value in 24 hours format
            let timePeriod = 'am';
            if (hours > 12) {
                timePeriod = 'pm';
                hours = hours - 12;
            }
            let day = dt.getDate() ;
            //let month = translate.t("Month_"+dt.getMonth());
            let month = dt.toLocaleString('default', { month: 'short' })
            /////console.log("MONTH NAME " + month)
            let year = dt.getFullYear();
            let minutes = dt.getMinutes();
            //let finalTime = day + " " + month + " "+ year+"," + hours + ":" + minutes + " " + translate.t("Period_"+timePeriod);
            let finalTime = day + " " + month + " "+ year+"," + hours + ":" + minutes + " " + timePeriod;
            return finalTime;
        }

    }

    static getCategoryFromCode = (activity_category) => {
        const helpOption = (activity_category && AppConstant.API_REQUEST_CONSTANTS.activity_category_code[activity_category]) ? AppConstant.API_REQUEST_CONSTANTS.activity_category_code[activity_category] : AppConstant.APP_OPTIONS.OTHER;
        return helpOption;
    }


    static DURATION_IN_SECONDS = {
        epochs: ['year', 'month', 'day', 'hour', 'minute'],
        year: 31536000,
        month: 2592000,
        day: 86400,
        hour: 3600,
        minute: 60
      };

    static getDuration(seconds) {
        var epoch, interval;
        //console.log(seconds)
        for (var i = 0; i < this.DURATION_IN_SECONDS.epochs.length; i++) {
          epoch = this.DURATION_IN_SECONDS.epochs[i];
          interval = Math.floor(seconds / this.DURATION_IN_SECONDS[epoch]);
          if (interval >= 1) {
            return {
              interval: interval,
              epoch: epoch
            };
          }
        }
     };
    
    static timeSince(date) {
        let activityDate = new Date(date);
        let currentDate = new Date()
        var seconds = Math.floor((currentDate - activityDate) / 1000);
        var duration = this.getDuration(seconds);
        var suffix = (duration.interval > 1 || duration.interval === 0) ? 's' : '';
        return duration.interval + ' ' + duration.epoch + suffix;
    };


    static getTimeZoneOffset(){

        var timezone_offset_min = new Date().getTimezoneOffset(),
            offset_hrs = parseInt(Math.abs(timezone_offset_min/60)),
            offset_min = Math.abs(timezone_offset_min%60),
            timezone_standard;

            if(offset_hrs < 10)
                offset_hrs = '0' + offset_hrs;

            if(offset_min < 10)
                offset_min = '0' + offset_min;

            // Add an opposite sign to the offset
            // If offset is 0, it means timezone is UTC
            if(timezone_offset_min < 0)
                timezone_standard = '+' + offset_hrs + ':' + offset_min;
            else if(timezone_offset_min > 0)
                timezone_standard = '-' + offset_hrs + ':' + offset_min;
            else if(timezone_offset_min == 0)
                timezone_standard = 'Z';

        return timezone_standard;        

    }


    static  isIphoneX = () => {
        const dimen = Dimensions.get('window');
        return (
            Platform.OS === 'ios' &&
            !Platform.isPad &&
            !Platform.isTVOS &&
            ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
        );
    }

    static isValidEmail = (email) => {
        return  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      }
}

export default Utilities;
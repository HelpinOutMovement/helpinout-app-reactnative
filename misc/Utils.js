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
            let day = dt.getDate() + 1;
            let month = translate.t("Month_"+dt.getMonth());
            let year = dt.getFullYear();
            let minutes = dt.getMinutes();
            let finalTime = day + " " + month + " "+ year+"," + hours + ":" + minutes + " " + translate.t("Period_"+timePeriod);
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
        var seconds = Math.floor((new Date() - new Date(date)) / 1000);
        var duration = this.getDuration(seconds);
        var suffix = (duration.interval > 1 || duration.interval === 0) ? 's' : '';
        return duration.interval + ' ' + duration.epoch + suffix;
    };
}

export default Utilities;
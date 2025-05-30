class AppController {
    constructor() {
        this.location;
    }

    async getLocationData(location) {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=5VAXRJV6HJN8XMXDJR8W98TRW`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(response.status)
            }
            const data = await response.json();
            return data;
        } catch(err) {
            console.log("Something went wrong: " + err)
            return err;
        }
    }

    setLocation(json) {
        this.location = json;
    }

    getLocation() {
        return this.location.resolvedAddress;
    }

    getDay(day) {
        return this.location.days[day];
    }

    getHour(day, hour) {
        return day.hours[hour];
    }

    getMaxTemp(day) {
        return day.tempmax;
    }

    getMinTemp(day) {
        return day.tempmin;
    }

    
    getSunrise(day) {
        return day.sunrise;
    }
    
    getSunset(day) {
        return day.sunset;
    }

    getPrecipProb(day) {
        return day.precipprob;
    }

    getIcon(dayOrHour) {

    }

    getLinkDisplayData() {

    }

}

export default AppController;
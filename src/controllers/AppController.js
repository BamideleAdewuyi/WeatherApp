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

    getDate(day) {
        return day.datetime;
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

    getTemp(hour) {
        return hour.temp;
    }

    getFeelsLikeTemp(hour) {
        return hour.feelslike;
    }

    getHumidity(hour) {
        return hour.humidity;
    }

    getIcon(dayOrHour) {
        return dayOrHour.icon;
    }
    
    getPrecipProb(hour) {
        return hour.precipprob;
    }

    getLinkDisplayData(day) {
        return {
            date: this.getDate(day),
            icon: this.getIcon(day),
            maxTemp: this.getMaxTemp(day),
            minTemp: this.getMinTemp(day)
        }
    }

    getDayTabDisplayData(day) {
        return {
            date: this.getDate(day),
            icon: this.getDate(day),
            maxTemp: this.getMaxTemp(day),
            minTemp: this.getMinTemp(day),
            sunrise: this.getSunrise(day),
            sunset: this.getSunset(day)
        }
    }

    getForecastContent(day, hours) {
        const date = this.getDate(this.getDay(day));
        const content = {}
        for (let i = 0; i < hours; i++) {
            const hour = this.getHour(this.getDay(day), i)
            content.i = {
                temp: this.getTemp(hour),
                feelsLikeTemp: this.getFeelsLikeTemp(hour),
                humidity: this.getHumidity(hour),
                icon: this.getIcon(hour),
                precipProb: this.getPrecipProb(hour)
            }
        }
        return content;
    };

}

export default AppController;
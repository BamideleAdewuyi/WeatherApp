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

    getCurrentHour() {
        const gmtDate = new Date().toGMTString();
        const gmtHour = Number(gmtDate.substring(17, 19));
        const offset = Number(this.location.tzoffset);
        let currentHour = gmtHour + offset;
        if (currentHour >= 24) {
            currentHour -= 24
        }
        return currentHour
    };

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

    getForecastContent(day, start, end) {
        const date = this.getDate(this.getDay(day));
        const content = {}
        for (let i = start; i < end; i++) {
            const hour = this.getHour(this.getDay(day), i)
            content[i] = {
                temp: this.getTemp(hour),
                feelsLikeTemp: this.getFeelsLikeTemp(hour),
                humidity: this.getHumidity(hour),
                icon: this.getIcon(hour),
                precipProb: this.getPrecipProb(hour),
                date: date
            }
        }
        return content;
    };
    
    getNextWeekData() {
        const nextWeekData = {}
        const today = this.getDay(0);
        const currentHour = this.getCurrentHour()
        const todayData = {
            linkDisplay: this.getLinkDisplayData(today),
            dayTabDisplay: this.getDayTabDisplayData(today),
            forecastContent: this.getForecastContent(0, currentHour, 24)
        }

        nextWeekData[0] = todayData;

        for (let i = 1; i < 7; i++) {
            const day = this.getDay(i)
            nextWeekData[i] = {
                linkDisplay: this.getLinkDisplayData(day),
                dayTabDisplay: this.getDayTabDisplayData(day),
                forecastContent: this.getForecastContent(i, 0, 24)
            }
        }
        return nextWeekData;
    }

}

export default AppController;
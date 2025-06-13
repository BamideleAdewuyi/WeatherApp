class AppModel {
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
            this.setLocation(data)
        } catch(err) {
            console.log("Something went wrong: " + err)
            return err;
        }
    }

    setLocation(json) {
        this.location = {}
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

    convertToCelsius(fahrenheit) {
        return (Math.round(((fahrenheit - 32)/(9/5)) * 10))/10
    }

    convertToFahrenheit(celsius) {
        return (Math.round((celsius * 9/5 + 32)*10))/10
    }

    getLinkDisplayData(day) {
        return {
            date: new Date(this.getDate(day)).toLocaleDateString('en-gb', {weekday: 'short', day: 'numeric', month: 'short'}).split(',').join(''),
            icon: this.getIcon(day),
            maxTemp: this.getMaxTemp(day),
            minTemp: this.getMinTemp(day)
        }
    }

    getDayTabDisplayData(day) {
        return {
            date: new Date(this.getDate(day)).toLocaleDateString('en-gb', {weekday: 'short', day: 'numeric', month: 'short'}).split(',').join(''),
            icon: this.getIcon(day),
            maxTemp: this.getMaxTemp(day),
            minTemp: this.getMinTemp(day),
            sunrise: this.getSunrise(day).slice(0, -3),
            sunset: this.getSunset(day).slice(0, -3)
        }
    }

    getForecastContent(day, start, end) {
        const date = this.getDate(this.getDay(day));
        const content = []
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
        const nextWeekData = []
        const currentHour = this.getCurrentHour()

        for (let i = 0; i < 7; i++) {
            const day = this.getDay(i)
            nextWeekData[i] = {
                linkDisplay: this.getLinkDisplayData(day),
                dayTabDisplay: this.getDayTabDisplayData(day),
                forecastContent: this.getForecastContent(i, i === 0 ? currentHour: 0, 24)
            }
        }
        return nextWeekData;
    }
}

export default AppModel;
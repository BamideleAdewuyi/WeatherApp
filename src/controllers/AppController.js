class AppController {
    constructor() {
        this.locations = [];
    }

    async getLocationData(location) {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=5VAXRJV6HJN8XMXDJR8W98TRW`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(response.status)
            }
            const data = await response.json();
            console.log(data);
            return data;
        } catch(err) {
            console.log(err)
        }
    }
}

export default AppController;
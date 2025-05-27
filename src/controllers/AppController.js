class AppController {
    constructor() {
        this.locations = [];
    }

    getLocationData(location) {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=5VAXRJV6HJN8XMXDJR8W98TRW`;
        fetch(url)
            .then(function(response) {
                return response.json()
            })
            .then(function(response) {
                console.log(response)
            })
    }
}

export default AppController;
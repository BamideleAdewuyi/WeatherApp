class AppController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.bindSearchLocation(this.handleSearchLocation)
    }

    handleSearchLocation = async (userInput) => {
        await this.model.getLocationData(userInput);
        const nextWeekData = this.model.getNextWeekData()
        this.view.displayLinks(nextWeekData);
        this.view.displayDayTab(nextWeekData, 0);
        this.view.displayForecastContent(nextWeekData[0]);
        this.view.bindSelectDay(this.handleSelectDay);
        if (this.view.selectCelsius.checked === true) {
            this.view.getAllTemps().forEach(temp => {
                const celsiusTemp = this.model.convertToCelsius(temp.textContent.substring(0, temp.textContent.length-1));
                this.view.replaceTemp(temp, celsiusTemp);
            })
        }
        this.view.input.value = this.model.getLocation()
    }

    handleSelectDay = (displayLink) => {
        const index = displayLink.id.slice(-1);
        const nextWeekData = this.model.getNextWeekData();
        this.view.displayLinks(nextWeekData);
        this.view.displayDayTab(nextWeekData, index)
        this.view.displayForecastContent(nextWeekData[index])
        this.view.bindSelectDay(this.handleSelectDay)
        if (this.view.selectCelsius.checked === true) {
            this.view.getAllTemps().forEach(temp => {
                const celsiusTemp = this.model.convertToCelsius(temp.textContent.substring(0, temp.textContent.length-1));
                this.view.replaceTemp(temp, celsiusTemp);
            })
        }
    }
}

export default AppController;
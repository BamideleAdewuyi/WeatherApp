class AppController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.bindSearchLocation(this.handleSearchLocation)
    }

    handleSearchLocation = async (userInput) => {
        await this.model.getLocationData(userInput);
        console.log(this.model.location)
        const nextWeekData = this.model.getNextWeekData()
        this.view.displayLinks(nextWeekData);
        this.view.displayDayTab(nextWeekData, 0);
        this.view.displayForecastContent(nextWeekData[0])
    }

    handleSelectDay = (displayLinkIndex) => {
        const nextWeekData = this.model.getNextWeekData();
        this.view.displayLinks(nextWeekData);
        this.view.displayDayTab(nextWeekData, displayLinkIndex)
        this.view.displayForecastContent(nextWeekData[displayLinkIndex])
    }
}

export default AppController;
class AppController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.bindSearchLocation(this.handleSearchLocation)
    }

    handleSearchLocation = async (userInput) => {
        await this.model.getLocationData(userInput);
    }
}

export default AppController;
class AppView {
    constructor() {
        this.container = this.getElement('.container');

        // Search section
        this.searchSection = this.createElement('section', 'locationSearch')
        this.form = this.createElement('form');
        this.input = this.createElement('input')
        this.input.type = 'text';
        this.input.placeholder = 'Search location';
        this.form.append(this.input);
        this.searchSection.append(this.form);

        // Day tabs
        this.dayTabsContainer = this.createElement('section', 'dayTabsContainer');
        this.dayTabs = this.createElement('ul', 'dayTabs');
        this.dayTabsContainer.append(this.dayTabs);

        // Viewport Container
        this.viewportContainer = this.createElement('div', 'viewportContainer');
        this.forecastContent = this.createElement('div', 'forecastContent');
        this.viewportContainer.append(this.forecastContent);


        this.container.append(this.searchSection, this.dayTabsContainer, this.viewportContainer)
    }

    getElement(selector) {
        return document.querySelector(selector);
    }

    createElement(tag, className) {
        const element = document.createElement(tag);
        
        if (className) element.classList.add(className);

        return element;
    }

    clearContainer() {
        this.container.innerHTML = ''
    };

    addListeners() {
        const form = document.querySelector('form');
        const searchBar = document.querySelector('input');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const locationData = await this.appController.getLocationData(searchBar.value)
            this.appController.setLocation(locationData);
            const nextWeekData = this.appController.getNextWeekData()
            console.log(nextWeekData);
        })
    }

    render(elements) {
        this.clearContainer();
        for (const element of elements) {
            this.container.append(element);
        }
        this.addListeners()
    }

    initialise() {
        const form = this.createForm();
        this.render([form]);
    }
}

export default AppView;
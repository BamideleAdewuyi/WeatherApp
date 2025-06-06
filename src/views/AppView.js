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

    displayLinks(nextWeekData) {
        while (this.dayTabs.firstChild) {
            this.dayTabs.removeChild(this.dayTabs.firstChild)
        }

        nextWeekData.forEach(day => {
            const li = this.createElement('li');
            li.id = `displayLink${nextWeekData.indexOf(day)}`

            const date = this.createElement('time');
            date.textContent = li.id === 'displayLink0' ? 'Today' : day.linkDisplay.date

            const maxTemp = this.createElement('span');
            maxTemp.textContent = day.linkDisplay.maxTemp;

            const minTemp = this.createElement('span');
            minTemp.textContent = day.linkDisplay.minTemp;

            li.append(date, maxTemp, minTemp);

            this.dayTabs.append(li)
        })

    };

}

export default AppView;
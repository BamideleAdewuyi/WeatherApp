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
            const li = this.createElement('li', 'displayLink');
            li.id = `displayLink${nextWeekData.indexOf(day)}`

            const tabDay = this.createElement('h3', 'tabDay');
            const date = this.createElement('time');
            date.textContent = li.id === 'displayLink0' ? 'Today' : day.linkDisplay.date;
            tabDay.append(date);
            // NEED TO ADD ICONS

            const linkWeatherDay = this.createElement('div', 'linkWeatherDay');
            const maxTemp = this.createElement('span', 'temp');
            maxTemp.classList.add('linkMaxTemp')
            maxTemp.textContent = day.linkDisplay.maxTemp + '°';

            const minTemp = this.createElement('span', 'temp');
            minTemp.classList.add('linkMinTemp')
            minTemp.textContent = day.linkDisplay.minTemp + '°';

            linkWeatherDay.append(maxTemp, minTemp);

            li.append(tabDay, linkWeatherDay);

            this.dayTabs.append(li)
        })

    };

    displayDayTab(nextWeekData, day) {
        const li = this.createElement('li');
        li.id = `dayTab${day}`;

        const date = this.createElement('time');
        date.textContent = day === 0? 'Today' : nextWeekData[day].dayTabDisplay.date;

        const maxTemp = this.createElement('span', 'temp');
        maxTemp.classList.add('dayTabMaxTemp')
        maxTemp.textContent = nextWeekData[day].dayTabDisplay.maxTemp + '°';

        const minTemp = this.createElement('span', 'temp');
        minTemp.classList.add('dayTabMinTemp')
        minTemp.textContent = nextWeekData[day].dayTabDisplay.minTemp + '°';

        const sunrise = this.createElement('span');
        sunrise.textContent = `Sunrise: ${nextWeekData[day].dayTabDisplay.sunrise}`;

        const sunset = this.createElement('span');
        sunset.textContent = `Sunset: ${nextWeekData[day].dayTabDisplay.sunset}`;

        li.append(date, maxTemp, minTemp, sunrise, sunset);

        const displayLink = this.getElement(`#displayLink${day}`);

        displayLink.replaceWith(li);

    }

}

export default AppView;
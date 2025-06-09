import { ImageMap } from "../assets/imageMap";
class AppView {
    constructor() {
        this.container = this.getElement('.container');

        // Search section
        this.searchSection = this.createElement('section', 'locationSearch')
        this.form = this.createElement('form');
        this.input = this.createElement('input')
        this.input.type = 'text';
        this.input.placeholder = 'Search location';
        this.submitButton = this.createElement('button', 'submitButton');
        this.submitButton.type = 'submit';
        this.submitButton.textContent = "Go"
        this.form.append(this.input, this.submitButton);
        this.searchSection.append(this.form);

        // Main area
        this.mainArea = this.createElement('div', 'mainArea');

        // Day tabs
        this.dayTabsContainer = this.createElement('section', 'dayTabsContainer');
        this.dayTabs = this.createElement('ul', 'dayTabs');
        this.dayTabsContainer.append(this.dayTabs);

        // Viewport Container
        this.viewportContainer = this.createElement('div', 'viewportContainer');
        this.forecastContent = this.createElement('div', 'forecastContent');
        this.viewportContainer.append(this.forecastContent);

        this.mainArea.append(this.dayTabsContainer, this.viewportContainer)
        this.container.append(this.searchSection, this.mainArea)
    }

    getElement(selector) {
        return document.querySelector(selector);
    }

    createElement(tag, className) {
        const element = document.createElement(tag);
        
        if (className) element.classList.add(className);

        return element;
    }

    getImage(iconName, container, iconClass) {
        const icon = this.createElement('img', iconClass);
        const iconSource = ImageMap[iconName];
        icon.src = iconSource;
        container.append(icon);
    }

    displayLinks(nextWeekData) {
        while (this.dayTabs.firstChild) {
            this.dayTabs.removeChild(this.dayTabs.firstChild)
        }

        nextWeekData.forEach(day => {
            const li = this.createElement('li', 'displayLink');
            li.id = `displayLink${nextWeekData.indexOf(day)}`;

            const tabDay = this.createElement('h3', 'tabDay');
            const date = this.createElement('time');
            date.textContent = li.id === 'displayLink0' ? 'Today' : day.linkDisplay.date;
            tabDay.append(date);

            const linkWeatherDay = this.createElement('div', 'linkWeatherDay');
            const maxTemp = this.createElement('span', 'temp');
            maxTemp.classList.add('linkMaxTemp');
            maxTemp.textContent = day.linkDisplay.maxTemp + '°';

            const minTemp = this.createElement('span', 'temp');
            minTemp.classList.add('linkMinTemp');
            minTemp.textContent = day.linkDisplay.minTemp + '°';

            
            linkWeatherDay.append(maxTemp, minTemp);
            this.getImage(day.linkDisplay.icon, linkWeatherDay, 'displayLinkIcon');

            li.append(tabDay, linkWeatherDay);

            this.dayTabs.append(li)
        })

    };

    displayDayTab(nextWeekData, day) {
        const li = this.createElement('li', 'dayTab');
        li.id = `dayTab${day}`;

        const dateArea = this.createElement('h3', 'dateArea')
        const date = this.createElement('time');
        date.textContent = li.id === 'dayTab0'? 'Today' : nextWeekData[day].dayTabDisplay.date;
        dateArea.append(date)

        const conditionsArea = this.createElement('div', 'conditionsArea')

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

        conditionsArea.append(maxTemp, minTemp, sunrise, sunset)
        this.getImage(nextWeekData[day].dayTabDisplay.icon, conditionsArea, 'dayTabIcon');
        li.append(dateArea, conditionsArea);

        const displayLink = this.getElement(`#displayLink${day}`);

        displayLink.replaceWith(li);

    }

    displayForecastContent(day) {
        this.forecastContent.innerHTML = ''
        const hoursContainer = this.createElement('div', 'hoursContainer');
        const detailedConditionsContainer = this.createElement('div', 'detailedConditionsContainer');

        const tempContainer = this.createElement('div', 'tempContainer');
        const tempHeaderContainer = this.createElement('div', 'tempHeaderContainer');
        const tempHeader = this.createElement('h4', 'tempHeader');
        const tempByHour = this.createElement('div', 'tempByHour')
        tempHeader.textContent = "Temperature";
        tempHeaderContainer.append(tempHeader)
        tempContainer.append(tempHeaderContainer, tempByHour)

        const feelsLikeTempContainer = this.createElement('div', 'feelsLikeTempContainer');
        const feelsLikeTempHeaderContainer = this.createElement('div', 'feelsLikeHeaderContainer')
        const feelsLikeTempHeader = this.createElement('h4', 'feelsLikeTempHeader');
        const feelsLikeTempByHour = this.createElement('div', 'feelsLikeTempByHour')
        feelsLikeTempHeader.textContent = 'Feels like';
        feelsLikeTempHeaderContainer.append(feelsLikeTempHeader)
        feelsLikeTempContainer.append(feelsLikeTempHeaderContainer, feelsLikeTempByHour)

        const humidityContainer = this.createElement('div', 'humidityContainer');
        const humidityHeaderContainer = this.createElement('div', 'humidityHeaderContainer')
        const humidityHeader = this.createElement('h4', 'humidityHeader');
        const humidityByHour = this.createElement('div', 'humidityByHour')
        humidityHeader.textContent = 'Humidity'
        humidityHeaderContainer.append(humidityHeader)
        humidityContainer.append(humidityHeaderContainer, humidityByHour);

        const precipContainer = this.createElement('div', 'precipContainer');
        const precipHeaderContainer = this.createElement('div', 'precipHeaderContainer');
        const precipHeader = this.createElement('h4', 'precipHeader');
        const precipByHour = this.createElement('div', 'precipByHour');
        precipHeader.textContent = 'Chance of precipitation'
        precipHeaderContainer.append(precipHeader)
        precipContainer.append(precipHeaderContainer, precipByHour)

        const iconContainer = this.createElement('div', 'iconContainer');
        const iconsByHour = this.createElement('div', 'iconsByHour');
        iconContainer.append(iconsByHour);

        day.forecastContent.forEach(hour => {
            const hourDiv = this.createElement('div', 'hour');
            hourDiv.textContent = `${day.forecastContent.indexOf(hour)}:00`;
            hoursContainer.append(hourDiv)

            const temp = this.createElement('div', 'temp');
            temp.classList.add('detailedTemp')
            temp.textContent = `${hour.temp}°`
            tempByHour.append(temp);

            const feelsLikeTemp = this.createElement('div', 'temp')
            feelsLikeTemp.classList.add('detailedFeelsLike')
            feelsLikeTemp.textContent = `${hour.feelsLikeTemp}°`;
            feelsLikeTempByHour.append(feelsLikeTemp)

            const humidity = this.createElement('div', 'humidity');
            humidity.textContent = `${hour.humidity}%`;
            humidityByHour.append(humidity);

            const precipitation = this.createElement('div', 'precipitation');
            precipitation.textContent = `${hour.precipProb}%`;
            precipByHour.append(precipitation)

            this.getImage(hour.icon, iconsByHour, 'iconByHour')
        })
        detailedConditionsContainer.append(tempContainer, feelsLikeTempContainer, humidityContainer, precipContainer, iconContainer)
        this.forecastContent.append(hoursContainer, detailedConditionsContainer);
    }

    bindSearchLocation(handler) {
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            handler(this.input.value)
        })
    }

    bindSelectDay(handler) {
        const displayLinks = document.querySelectorAll('.displayLink');
        displayLinks.forEach(link => {
            link.addEventListener('click', () => {
                handler(link);
            })
        })
    }

}

export default AppView;
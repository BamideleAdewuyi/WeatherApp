class AppView {
    constructor() {
        this.container = document.querySelector('.container');
    }

    clearContainer() {
        this.container.innerHTML = ''
    }

    createForm() {
        const form = document.createElement('form');
        const searchBarLabel = document.createElement('label');
        const searchBar = document.createElement('input');
        searchBar.id = 'searchBar'
        searchBar.setAttribute('type', 'text');
        searchBar.setAttribute('placeholder', 'Enter location');
        searchBarLabel.setAttribute('for', 'searchBar');
        searchBarLabel.textContent = 'Search';
        form.append(searchBarLabel, searchBar)
        return form;
    }

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
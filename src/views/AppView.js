import AppController from "../controllers/AppController";

class AppView {
    constructor() {
        this.appController = new AppController;
        this.container = document.querySelector('.container');
        this.nextWeekData = {}
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

    }

    render(elements) {
        for (const element of elements) {
            this.container.append(element);
        }
    }

    initialise() {

    }
}

export default AppView;
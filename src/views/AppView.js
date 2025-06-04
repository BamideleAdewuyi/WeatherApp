import AppController from "../controllers/AppController";

class AppView {
    constructor() {
        this.appController = new AppController;
        this.container = document.querySelector('.container');
        this.nextWeekData = {}
        this.initialise()
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

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log("Ok")
        })
    }

    render(elements) {
        for (const element of elements) {
            this.container.append(element);
        }
    }

    initialise() {
        const form = this.createForm();
        this.render([form]);
        this.addListeners()
    }
}

export default AppView;
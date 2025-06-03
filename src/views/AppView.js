import AppController from "../controllers/AppController";

class AppView {
    constructor() {
        this.appController = new AppController;
        this.container = document.querySelector('.container')
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
        this.container.append(form)
    }

    render() {
        
    }
}

export default AppView;
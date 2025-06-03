import AppController from "../controllers/AppController";

class AppView {
    constructor() {
        this.appController = new AppController;
        this.container = document.querySelector('.container')
    }

    createForm() {
        const form = document.createElement('form');
    }
}
import AppController from "./controllers/AppController";
import AppModel from "./models/AppModel";
import AppView from "./views/AppView";
import "./style.css";

const app = new AppController(new AppModel, new AppView);
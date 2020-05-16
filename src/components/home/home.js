import { Page } from '../../essentials';
import homeView from './home-view';
import './home.scss';

export default class Home extends Page {

    constructor() {
        super('home', homeView);
    }
}
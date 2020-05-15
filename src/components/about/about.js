import { Page } from '../../essentials';
import aboutView from './about-view';
//import './home.scss';

export default class About extends Page {

    constructor() {
        super('about', aboutView);
    }
}
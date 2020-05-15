import { Page } from '../../essentials';
import contactView from './contact-view';
//import './contact.scss';

export default class Contact extends Page {

    constructor() {
        super('contact', contactView);
    }
}
import { Page } from '../../essentials';
import contactView from './contact-view';
import './contact.scss';

export default class Contact extends Page {

    constructor() {
        super('contact', contactView, 'Inputs');

        this.text_inputs = {
            fname: '',
            lname: ''
        }

        this.button_inputs = {
            'submit-form': this.submitForm.bind(this)
        }
    }

    //triggers
    submitForm() {
        //let userLogged = localDB.get(['log_token']);
        console.log(this.text_inputs);

        // let request_init = {
        //     method: 'POST',
        //     body: JSON.stringify(body),
        //     headers: {
        //         'Content-Type': 'application/json; charset=UTF-8',
        //         'auth-token': userLogged.log_token
        //     }
        // };
        // this.accessServer(url, init).then(() => { }).catch(() => { });
    }
}
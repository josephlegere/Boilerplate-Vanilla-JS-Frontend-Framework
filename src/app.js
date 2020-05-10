import { SERVER_ATTR } from './configurations';
import { Instantiate, present, Page } from './essentials';
import './app.scss';
import App_Page from './app.html';

import { Inputs } from './essentials/objects/inputs';

let dashboardPage = class extends Page { //wrapper for the app itself, that would supposedly also jumpstart the app

    constructor(access) {
        super(access, 'dashboard');
        this.access = access;
        super.updateRender(App_Page, 'new');
        this.text_inputs = {
            fname: '',
            lname: ''
        }

        this.text_inputs = Inputs.set_input(this.text_inputs); //inputs
        Inputs.set_button(this.submitForm.bind(this)); //clicks
    }

    //methods

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
        // super.accessServer(url, init).then(() => { }).catch(() => { });
    }

}

//INIT App
Instantiate.runApp(dashboardPage);
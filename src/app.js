import { SERVER_ATTR } from './configurations';
import { AppBuild, RunApp, present } from './essentials';
import './app.scss';
import App_Page from './app.html.js';

import { Inputs } from './essentials/objects/inputs';
import routes from './routes';

let dashboardPage = class extends AppBuild { //wrapper for the app itself, that would supposedly also jumpstart the app
                                             //this app would act as module that will export for other apps

    constructor() {
        super('dashboard', App_Page);
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
RunApp(dashboardPage);

//router(routes);
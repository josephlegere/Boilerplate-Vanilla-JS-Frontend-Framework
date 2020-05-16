import { SERVER_ATTR } from './configurations';
import { AppBuild, RunApp, present } from './essentials';
import './app.scss';
import appView from './app-view.js';

import routes from './routes';

let dashboardPage = class extends AppBuild { //wrapper for the app itself, that would supposedly also jumpstart the app
                                             //this app would act as module that will export for other apps

    constructor() {
        super('dashboard', appView);

        this.router(routes);
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
        // this.accessServer(url, init).then(() => { }).catch(() => { });
    }

}

//INIT App
RunApp(dashboardPage);
import { SERVER_ATTR } from './configurations';
import { Instantiate, present, Page } from './essentials';
import './app.scss';
import App_Page from './app.html';

let dashboardPage = class extends Page { //wrapper for the app itself, that would supposedly also jumpstart the app

    constructor(access) {
        super(access, 'dashboard');
        this.access = access;
        super.updateRender(App_Page, 'replace');
    }

    //methods

    //triggers
    /*
    trigger() {
        let userLogged = localDB.get(['log_token']);
        let body = {
            password: 'password1'
        };
        let request_init = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'auth-token': userLogged.log_token
            }
        };
        super.accessServer(url, init).then(() => {}).catch(() => {});
    }
    */

}

//INIT App
Instantiate.runApp(dashboardPage);
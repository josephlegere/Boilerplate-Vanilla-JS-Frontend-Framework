'use strict';

import { add_html } from './library';

let access_point = 'app-run';

class AppRun extends HTMLElement { //initialize app
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `<h1>App Running!</h1>`;
    }
}
customElements.define(access_point, AppRun);

let Instantiate = (function() { //Instantiate Namespace
    let self = {};

    self.runApp = function(_instance) {
        this.app_instance = _instance;
        let app = new this.app_instance(access_point);
        console.log(app)

        // console.log(app)
        // add_html(access_point, 'hi');
    }

    self.startApp = function(_functions) {
        this.app_functions = _functions;
        let _initial_page = Object.values(this.app_functions)[0];
        let _initial_page_key = Object.keys(this.app_functions)[0];
        let _initial_page_class = _initial_page.construct;
        let _initial_page_params = _initial_page.params;
        history.pushState({
            page: this.name_to_title(_initial_page_key),
            code: '0'
        },
            this.name_to_title(_initial_page_key),
            `${window.location.origin}/${this.name_to_path(_initial_page_key)}`);

        return new _initial_page_class(_initial_page_params);
    }

    let name_to_path = function(val) {
        let i = '';
        let _arr = val.split(' ');
        _arr.forEach((elem, key) => {
            i += elem.toLowerCase() + (key + 1 < _arr.length ? '-' : '');
        });
        return i;
    }

    let name_to_title = function(val) {
        let i = '';
        let _arr = val.split(' ');

        _arr.forEach((elem, key) => {
            if (key == 0) i += elem.toLowerCase();
            else i += elem.charAt(0).toUpperCase() + elem.slice(1).toLowerCase();
        });

        return i;
    }

    return self;
}());

export { Instantiate };
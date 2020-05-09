'use strict';

import { add_html, append_html } from '../library';
import { Inputs } from './inputs';

export default class Page {
    constructor(access, title = null, ...args) {

        //properties
        this.access = access;
        this.page_title = title;
        this.page_container = `#${this.page_title}`;
        this.state = { //setting default or changing to new state
        }

        this.init();

        this.triggers();
    }

    init() {
        let _html = `
            <div class="page-container" id="${this.page_title}">
            </div>
        `;

        add_html(this.access, _html);
        Inputs.setRoot(this.page_container);
    }
    
    triggers() {
        let root_element = document.querySelector(this.page_container);

        let trigger_click_function = async (e) => {
            e.preventDefault();

            let button = e.target.closest('button');

            if (button) {
                console.log(this.inputs)
            }
        }
        let trigger_click = root_element.addEventListener('click', trigger_click_function);
    }

    updateRender(html, pos) { //pos => position
        if (pos == 'replace') {
            add_html(this.page_container, html);
        }
        else if (pos == 'before end') {
            append_html(this.page_container, html);
        }
    }

    //controllers
    async accessServer(url = null, init = null) {
        let _init = null
        const sendRequest = new Request((url !== null ? url : '/'),
            (init !== null ? init : {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }));

        let list = await fetch(sendRequest); //fetch returns a Promise
        let data = await list.json();

        return data;
    }
}
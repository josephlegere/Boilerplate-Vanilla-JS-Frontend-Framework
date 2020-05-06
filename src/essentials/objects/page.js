'use strict';

import { add_html, append_html } from '../library';

export default class Page {
    constructor(access, title = null) {

        //properties
        this.access = access;
        this.page_title = title;
        this.page_container = `#${this.page_title}`;
        this.trigger_elements = {};
        this.state = { //setting default or changing to new state

        }

        this.init();

    }

    triggers() {
        let root_element = document.querySelector(this.page_container);

        let trigger_click_function = async (e) => {
            let routerLink = e.target.closest('.router-link');

            if (routerLink) {
                let _body_offsetWidth = document.body.offsetWidth;
                //console.log(_body_offsetWidth);
                if (_body_offsetWidth < 993) {
                    this.trigger_elements['side navigation'].close();
                }
            }
        }

        let trigger_click = root_element.addEventListener('click', trigger_click_function);

        this.trigger_elements = {
            'trigger click': {
                event: 'click',
                action: trigger_click
            }
        }
    }

    init() {
        let _html = `
            <div class="page-container" id="${this.page_title}">
            </div>
        `;

        add_html(this.access, _html);

        this.triggers();
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
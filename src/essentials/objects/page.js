'use strict';

import { add_html, append_html } from '../library';
import Inputs from './inputs';
import { html, render } from 'lit-html';

//let container = 'page-container';

export default class Page {
    constructor(title, view, ...args) {

        //properties
        this.view = view;
        this.page_title = title;
        this.page_container = `#${this.page_title}`;
        this.access = 'body'; //access point
        this.args = args;
        this.state = { //setting default or changing to new state
        }

        this.init();
    }

    init() {
        this.text_inputs = {};
        this.button_inputs = {};
    }

    render(access = null) {
        this.access = (access !== null ? access : this.access);

        let wrapper = (props) => html`
            <page-container id="${this.page_title}">
            </page-container>
        `;

        render(wrapper(this.props), document.querySelector(this.access));
        if (this.args.includes('Inputs')) this.setInputs();

        render(this.view(this.props), document.querySelector(`${this.page_container}`));
    }

    //setters
    setProps(newProps) {
        this.props = newProps;
    }

    setInputs() {
        Inputs.setRoot(this.page_container);
        this.text_inputs = Inputs.set_input(this.text_inputs); //inputs
        Inputs.set_button(this.button_inputs); //clicks
    }

    updateRender(html, pos) { //pos => position
        if (pos == 'new') {
            add_html(this.page_container, html);
        }
        else if (pos == 'before end') {
            append_html(this.page_container, html);
        }
        else {
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
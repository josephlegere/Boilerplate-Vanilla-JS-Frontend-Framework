'use strict';

import { add_html, append_html } from '../library';
import { Inputs } from './inputs';
import { html, render } from 'lit-html';

//let container = 'page-container';

export default class Page {
    constructor(title, path, view, ...args) {

        //properties
        this.path = path;
        this.view = view;
        this.page_title = title;
        this.page_container = `#${this.page_title}`;
        this.access = 'body'; //access point
        this.state = { //setting default or changing to new state
        }
    }

    init() {
    }

    render(access = null) {
        this.access = (access !== null ? access : this.access);

        let wrapper = (props) => html`
            <page-container id="${this.page_title}">
            </page-container>
        `;

        render(wrapper(this.props), document.querySelector(this.access));
        Inputs.setRoot(this.page_container);
        render(this.view(this.props), document.querySelector(`${this.page_container}`));
    }

    setProps(newProps) {
        this.props = newProps;
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
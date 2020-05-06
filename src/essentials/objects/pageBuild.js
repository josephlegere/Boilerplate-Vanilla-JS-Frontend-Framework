'use strict';

class PageBuild extends HTMLElement { //initialize page with its "build" setup
    constructor() {
        this.page_title = '';
        this.page_container = `#${this.page_title}`;
        this.trigger_elements = {};
        this.state = {

        }

        this.render();
        this.triggers();
    }

    triggers () {

    }

    render() {

    }

    connectedCallback() {
        this.innerHTML = `<h1>Hello, World!</h1>`;
    }
}

customElements.define('page-build', PageBuild);
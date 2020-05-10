'use strict';

let Inputs = (function() { //namespace
    let self = {}; //this namespace

    self.elements = {}; //saved trigger elements
    self.root = null;
    
    self.getElements = function () {
        return self.elements;
    }

    self.setElements = function () {

    }
    
    self.setRoot = function (root) {
        self.root = document.querySelector(root);
    }

    self.set_click = function () {
        let trigger_click_function = async (e) => {
            e.preventDefault();
            let button = e.target.closest('button');

            if (button) {
                console.log('button pressed');
            }
        }

        self.root.addEventListener('click', trigger_click_function);

        self.elements['trigger click'] = {
            event: 'click',
            action: trigger_click_function
        }

        return self.elements;
    }

    self.set_input = function (data = null) {
        let input_data = { //external data is recorded, returns an object with the referenced link included, so the input data is saved globally
            inputs: (data !== null ? data : {}) //allow blank initial data, to accomodate inputs not initialized in JS
        };
        let input_attributes = ['page-input']; //allowed attributes in an element

        let trigger_input_function = async (e) => {
            e.preventDefault();
            let input_text = e.target.closest('input[type="text"], input[type="number"]');

            if (input_text) {
                input_attributes.forEach(elem => {
                    if (input_text.hasAttributes(elem) && input_text.getAttribute(elem) !== null) {
                        console.log(elem);

                        let _attr = input_text.getAttribute(elem);
                        input_data.inputs[_attr] = input_text.value;
                        console.log(input_data.inputs);
                    }
                });
            }
        }

        self.root.addEventListener('input', trigger_input_function);

        self.elements['trigger input'] = {
            event: 'input',
            action: trigger_input_function
        }

        return input_data;
    }

    self.set_submit = function (method = null, data = null) {
        if (method === null || typeof method !== 'function') {
            let err = Error('Params is not a function');
            console.error(err);
            return err;
        }

        let submit_elements = { // <= specifically for submit
            buttons: (data !== null ? data : {}) //allow blank initial data, to accomodate elements not initialized in JS
        };
        let submit_attributes = 'page-submit'; //allowed attributes in an element

        let trigger_submit_function = async (e) => {
            e.preventDefault();
            let submit_click = e.target.closest(`button[${submit_attributes}]`);
            
            if (submit_click) {
                if (submit_click.hasAttributes(submit_attributes) && submit_click.getAttribute(submit_attributes) !== null) {
                    
                    let _id = submit_click.getAttribute('id');
                    submit_elements.buttons[_id] = { call: method, elem: submit_click };
                    //method();
                    submit_elements.buttons[_id].call();

                    console.log(submit_elements.buttons);
                }
            }
        }

        self.root.addEventListener('click', trigger_submit_function);

        self.elements['trigger submit'] = {
            event: 'submit',
            action: trigger_submit_function
        }

        return submit_elements;
    }

    return self;
}());

export { Inputs };
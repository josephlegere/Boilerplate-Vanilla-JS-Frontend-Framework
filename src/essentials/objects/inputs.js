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

    self.set_button = function (method = null, data = null) {
        if (method === null || typeof method !== 'function') {
            let err = Error('Params is not a function');
            console.error(err);
            return err;
        }

        let button_elements = { // <= specifically for button
            buttons: (data !== null ? data : {}) //allow blank initial data, to accomodate elements not initialized in JS
        };
        let button_attributes = 'page-click'; //allowed attributes in an element

        let trigger_click_function = async (e) => {
            e.preventDefault();
            let button_click = e.target.closest(`button[${button_attributes}], input[type="button"][${button_attributes}]`);

            if (button_click) {
                if (button_click.getAttribute(button_attributes) !== null) {

                    let _id = button_click.getAttribute('id');
                    button_elements.buttons[_id] = { elem: button_click };
                    if (method !== null) button_elements.buttons[_id].call = method;
                    button_elements.buttons[_id].call();

                    console.log(button_elements.buttons);
                }
            }
        }

        self.root.addEventListener('click', trigger_click_function);

        self.elements['trigger click'] = {
            event: 'click',
            action: trigger_click_function
        }

        return button_elements;
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

    return self;
}());

export { Inputs };
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

    self.set_input = function (data) {
        let input_data = { inputs: data }; //external data is recorded, returns an object with the referenced link included, so the input data is saved globally
        let input_attributes = ['page-inputs']; //allowed attributes in an element

        let trigger_input_function = async (e) => {
            e.preventDefault();
            let input_text = e.target.closest('input[type="text"]');

            if (input_text) {
                input_attributes.forEach(elem => {
                    if (input_text.hasAttributes(elem) && input_text.getAttribute(elem) !== null) {
                        console.log(elem);
                        let _attr = input_text.getAttribute(elem);
                        input_data.inputs[_attr] = input_text.value
                        console.log(input_data.inputs)
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

    self.set_submit = function (data) {
    }

    return self;
}());

export { Inputs };
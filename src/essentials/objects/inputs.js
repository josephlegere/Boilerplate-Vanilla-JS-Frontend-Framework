'use strict';

import _ from 'lodash';

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
        console.log(root)
        self.root = document.querySelector(root);
        return document.querySelector(root);
    }

    self.set_button = function (data = null) {
        if (data === null || typeof data !== 'object') {
            let err = Error('Params is not an object');
            console.error(err);
            return err;
        }

        let _buttons = {};
        Object.entries(data).forEach(elem => {_buttons[elem[0]] = { call: elem[1] } });
        
        let button_elements = { // <= specifically for button
            buttons: _.cloneDeep(_buttons)
        };
        let button_attributes = 'page-click'; //allowed attributes in an element

        let trigger_click_function = async (e) => {
            e.preventDefault();
            let button_click = e.target.closest(`button[${button_attributes}], input[type="button"][${button_attributes}]`);

            if (button_click) {
                if (button_click.getAttribute(button_attributes) !== null) {

                    let props = {}; //"button" element props
                    let identifier = null;
                    let _cus_attr = button_click.getAttribute(button_attributes); //get value of this attribute, will act as identifier
                    let _id = button_click.getAttribute('id'); //get value of ID

                    props.c_attr = button_attributes; //keep record of the TYPE of attribute
                    if (_cus_attr !== '' && _cus_attr !== null) {
                        identifier = (identifier === null ? _cus_attr : identifier);
                        props[button_attributes] = _cus_attr; //keep record of the VALUE of this attribute
                    }
                    if (_id !== null && _id !== '') props.id = _id; //check if ID has value

                    if (identifier === null) { //A catch if there's no identifier
                        let err = Error(`Include a value in ${button_attributes}`);
                        console.error(err);
                        return err;
                    }

                    props.call = button_elements.buttons[identifier].call; //the function that is being called should be stored also
                    button_elements.buttons[identifier] = _.cloneDeep(props);
                    button_elements.buttons[identifier].elem = button_click; //the DOM element of button
                    button_elements.buttons[identifier].call();

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

                        let props = {}; //"input" element props
                        let identifier = null;
                        let _cus_attr = input_text.getAttribute(elem); //get value of this attribute, will act as identifier
                        let _id = input_text.getAttribute('id'); //get value of ID

                        if (_cus_attr !== '' && _cus_attr !== null) {
                            identifier = _cus_attr;
                            props[elem] = _cus_attr; //keep record of the VALUE of this attribute
                            props.c_attr = elem; //keep record of the TYPE of attribute
                        }
                        if (_id !== null && _id !== '') props.id = _id; //check if ID has value
                        
                        if (identifier === null) { //A catch if there's no identifier
                            let err = Error(`Include a value in ${elem}`);
                            console.error(err);
                            return err;
                        }
                        
                        input_data.inputs[identifier] = _.cloneDeep(props);
                        input_data.inputs[identifier].value = input_text.value; //the value of the inputted text
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

export default Inputs;
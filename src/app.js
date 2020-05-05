import { SERVER_ATTR, RENDER_SOURCE } from './configurations';
import { Instantiate } from './essentials/appinstantiate';
import { Router } from './essentials/router';
import { add_html, present } from './essentials/library';
import './app.scss';




let app_instance = new Instantiate();

let dashboardPage = class { //wrapper for the app itself, that would supposedly also jumpstart the app

    constructor() {

        this.page_container_title = 'dashboard';
        this.page_container = `#${this.page_container_title}`;

        //external elements

        //internal elements -> this includes properties that were converted from parameters
        this.trigger_elements = {};
        console.log(present.getDateTime('dd MM, yyyy w'))

        this.set_default(); // change to state
        this.state = {
            
        }

        this.render();
        this.triggers();
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

    set_default() {
    }

    render() {
        let _html = '';

        _html = `
            <div class="page-container" id="${this.page_container_title}">
                <div class="row">
                    <div class="col s12 right-align">
                        <b><span id="form-date">(date)</span></b>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col s12">
                        <h6>
                            <div>Form Number</div><br>
                            <span id="form-number" class="form-number">#####</span>
                        </h6>
                    </div>
                </div>

                <div class="row">
                    <form class="col s12 center">

                        <div class="row">
                            <div class="input-field col s6">
                            <input placeholder="" id="first_name" type="text" class="validate">
                            <label for="first_name">First Name</label>
                            </div>
                            <div class="input-field col s6">
                            <input id="last_name" type="text" class="validate">
                            <label for="last_name">Last Name</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                            <input disabled value="I am not editable" id="disabled" type="text" class="validate">
                            <label for="disabled">Disabled</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                            <input id="password" type="password" class="validate">
                            <label for="password">Password</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                            <input id="email" type="email" class="validate">
                            <label for="email">Email</label>
                            </div>
                        </div>

                    </form>
                </div>
                
                <footer class="page-footer">
                </footer>
            </div>
        `;

        add_html(RENDER_SOURCE, _html);

        //app_instance.instantiate(app_functions);

    }

    //methods

    //triggers

    //controllers

}

//INIT App
app_instance.runApp(dashboardPage);
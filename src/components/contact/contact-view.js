import { html } from "lit-html";

export default (props) => html`
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
                    <input placeholder="" id="first_name" type="text" class="validate" page-input="fname">
                    <label for="first_name">First Name</label>
                </div>
                <div class="input-field col s6">
                    <input id="last_name" type="text" class="validate" page-input="lname">
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

            <button id="submit-form" page-click="submit-form">
                Submitings
            </button>

        </form>
	</div>
	
    <footer class="page-footer">
    </footer>
`;
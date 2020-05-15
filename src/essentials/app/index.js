'use strict';

import AppBuild, {access_point} from './AppBuild';
import { render } from 'lit-html';

let RunApp = function (instance) {
    let app_instance = instance;
    let app = new app_instance();
}

export {
    AppBuild,
    access_point,
    RunApp
};
//Pages
import { Page } from './essentials';

import Home from './components/home/home';
import About from './components/about/about';

let routes = [
    {path: '/', component: Home},
    {path: '/about', component: About}
];

export default routes;

let app_functions = {
    /*"Invoicing": {
        "Recent Invoices": {
            "construct": RecentInvoicesPage
            //"params": { "view": "page" }
        },
        "Create Invoice": {
            "construct": CreateInvoicePage
        },
        "Archived Invoices": null
    }*/
};
//We could have a separate object for user specific app functions,
//and then an object that would function how a page would render
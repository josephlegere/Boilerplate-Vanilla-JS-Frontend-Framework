//Pages
import { Page } from './essentials';

import Home from './components/home/home';
import Contact from './components/contact/contact';
import Table from './components/table/table';

let routes = [
    { path: '/', component: Home },
    { path: '/contact', component: Contact },
    { path: '/table', component: Table }
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
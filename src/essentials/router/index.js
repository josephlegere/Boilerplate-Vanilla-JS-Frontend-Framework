import Router, {viewer} from './Router';

export const link = (path) => {
    const pushStateEvent = new CustomEvent('_pushstate', { detail: path });
    history.pushState({}, '', path);
    dispatchEvent(pushStateEvent);
};

export default (routes, root) => { //root => parent
    const router = new Router(routes, document.querySelector(`${root} ${viewer}`), ); //initialize the routers, initialize the app

    document.addEventListener('DOMContentLoaded', (e) => { //when nav buttons are clicked
        document.querySelectorAll('[route]').forEach((route) =>
            route.addEventListener('click', (e) => {
                    e.preventDefault();

                    /*------------ TRIAL ------------*/
                    let _previous_page = document.querySelectorAll('.router-link.active');
                    _previous_page.forEach(elem => {
                        elem.classList.remove('active');
                    });
                    e.target.classList.add('active');
                    /*------------ TRIAL ------------*/

                    router.navigate(e.target.getAttribute('route'));
            }, false)
        );
    });

    window.addEventListener('_pushstate', (e) => { //when a link is clicked
        router.navigate(e.detail)
    }); // -------------------------------- TRY USING THE ONPOPSTATE AS ALTERNATIVE --------------------------------------
};
import { render } from 'lit-html';

let viewer = 'router-viewer';

export default class Router {
    constructor(routes = [], renderNode) {
        this.routes = routes;
        this.active_routes = {};
        this.renderNode = renderNode;
        this.navigate(location.pathname + location.hash);
    }

    addRoutes(routes) {
        this.routes = [...this.routes, ...routes];
    }

    match(route, requestPath) {
        let paramNames = []; //keeps all the parameter names defined in the routes name
        let regexPath =
            route.path.replace(/([:*])(\w+)/g, (full, colon, name) => { //more catered to retrieving params e.g. /home/:param. Returns /hello/([^/]+)(?:/|$), /about(?:/|$)
                paramNames.push(name); //name => is for parameters defined in the routes name
                return '([^/]+)';
            }) + '(?:/|$)';

        let params = {}; //stores the parameter from the url and its equivalent
        let routeMatch = requestPath.match(new RegExp(regexPath)); //contains an array of the found match string,
                                                                   //and an additional properties which won't be read by the reduce function below
        if (routeMatch !== null) {
            params = routeMatch.slice(1).reduce((params, value, index) => {
                //slice would just get the elements starting from index 1, would also leave out the associative array from the slice
                //params => accumulates value, value => value of current iteration, index => index of current iteration
                if (params === null) params = {};
                params[paramNames[index]] = value;
                return params;
            }, null);
        }

        //route.setProps(params);
        route.props = params;

        return routeMatch;
    }

    navigate(path) {
        const route = this.routes.filter((route) => this.match(route, path))[0];
        console.log(route)

        if (!route) this.renderNode.innerHTML = '404! Page not found';
        else {
            history.pushState({}, '', path);
            console.log(this.routes)
            if (this.active_routes.hasOwnProperty === 'active') delete this.active_routes.active; //record the active page, then delete when navigating to another one

            this.active_routes.active = new route.component();
            this.active_routes.active.setProps(route.props);
            this.active_routes.active.render(viewer);
        }
    }
}

export {
    viewer
}
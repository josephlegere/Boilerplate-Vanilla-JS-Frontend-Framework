import Page from '../objects/page';
import router from '../router';

let access_point = 'app-run';

export default class AppBuild extends Page { //wrapper for the app itself, that would supposedly also jumpstart the app
    //this app would act as module that will export for other apps

    constructor(title, view) {
        super(title, view);
        this.render(access_point); //this is also updates the access
    }

    //methods
    router (routes) {
        router(routes, this.page_container);
    }

    //triggers

}

export {
    access_point
}
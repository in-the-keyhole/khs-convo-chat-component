import { LocalProvider } from './localprovider';
import { RemoteProvider } from './remoteprovider';

class AjaxClass {

    constructor() {
       this.provider = process.env.REACT_APP_API_URL ? RemoteProvider : LocalProvider;
    }

    getResponse() {
        return this.provider.getResponse();
    }

    postFreeText(payload) {
        return this.provider.postFreeText(payload);
    }

}

export const Ajax = new AjaxClass();

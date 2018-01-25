import axios from 'axios';

class RemoteProviderClass {

    constructor() {
        this._axios = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            headers: {
                token: process.env.REACT_APP_API_KEY,
            },
        });
    }

    getResponse() {
        throw new Error('unimplemented!');
    }

    postFreeText(payload) {
        return this._axios.post('/api/convo', payload);
    }

}

export const RemoteProvider = new RemoteProviderClass();

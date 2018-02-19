import React from 'react';

export default class RemoteAjaxProvider extends React.Component {

    constructor(props) {
        super(props);
        this.getResponse = this.getResponse.bind(this);
        this.postFreeText = this.postFreeText.bind(this);
    }

    render() {
        return null;
    }

    getResponse() {
        throw new Error('unimplemented!');
    }

    postFreeText(payload) {
        return fetch(`${this.props.apiUrl}/api/convo`, {
            body: JSON.stringify(payload),
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                token: this.props.apiKey,
            },
            method: 'POST',
            mode: 'cors',
        });
    }

}

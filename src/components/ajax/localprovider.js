import React from 'react';

const createResponse = payload => {
    return new Response(payload, {
        headers: {
            'Content-Type': 'application/xml',
        },
        status: 200,
        statusText: 'OK',
    });
};

const createXml = str => {
    const domParser = new DOMParser();
    const data = '<Response><Message>' + str + '</Message></Response>';
    const xml = domParser.parseFromString(data, 'application/xml');
    const xmlSerializer = new XMLSerializer();
    const toString = xmlSerializer.serializeToString(xml);
    return toString;
};

export default class LocalAjaxProviderClass extends React.Component {

    constructor(props) {
        super(props);
        this.getResponse = this.getResponse.bind(this);
        this.postFreeText = this.postFreeText.bind(this);
    }

    render() {
        return null;
    }

    getResponse() {
        return new Promise(resolve => {
            const text = 'Mock asynchronous response.';
            const xml = createXml(text);
            resolve(createResponse(xml));
        });
    }

    postFreeText(payload) {
        return new Promise(resolve => {
            const xml = createXml(`echoing: ${payload.Body}`);
            resolve(createResponse(xml));
        });
    }

}

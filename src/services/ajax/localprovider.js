import Chance from 'chance';

const chance = Chance();

const createAxiosResponse = payload => ({
    config: {},
    data: payload,
    headers: {
        'Content-Type': 'application/xml',
    },
    request: {},
    status: 200,
    statusText: 'OK',
});

const createXml = str => {
    const domParser = new DOMParser();
    const data = '<Response><Message>' + str + '</Message></Response>';
    const xml = domParser.parseFromString(data, 'application/xml');
    return xml;
};

class LocalProviderClass {

    getResponse() {
        return new Promise(resolve => {
            const text = chance.sentence();
            const xml = createXml(text);
            resolve(createAxiosResponse(xml));
        });
    }

    postFreeText(payload) {
        return new Promise(resolve => {
            const xml = createXml(payload.Body);
            resolve(createAxiosResponse(xml));
        });
    }

}

export const LocalProvider = new LocalProviderClass();

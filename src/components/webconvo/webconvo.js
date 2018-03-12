/*
Copyright 2017 Keyhole Software LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import 'whatwg-fetch';
import React from 'react';
import PropTypes from 'prop-types';
import MessageBoard from '../messageboard/messageboard';
import MessageBox from '../messagebox/messagebox';
import PhoneNumbersModal from '../phonenumbersmodal/phonenumbersmodal';
import LocalAjaxProvider from '../ajax/localprovider';
import RemoteAjaxProvider from '../ajax/remoteprovider';
import './webconvo.css';

let counter = 1;

export default class WebConvo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiKey: this.props.apiKey,
            apiUrl: this.props.apiUrl,
            displayPhoneNumbersModal: false,
            messages: [],
            myPhoneNumber: this.props.myPhoneNumber || 'Me',
            theirPhoneNumber: this.props.theirPhoneNumber || 'Your Title',
        };
        this.addPhoneNumberButtonPressed = this.addPhoneNumberButtonPressed.bind(this);
        this.closePhoneNumbersModal = this.closePhoneNumbersModal.bind(this);
        this.displayMessage = this.displayMessage.bind(this);
        this.postMessage = this.postMessage.bind(this);
    }

    addPhoneNumberButtonPressed() {
        this.setState({ displayPhoneNumbersModal: true });
    }

    closePhoneNumbersModal() {
        this.setState({ displayPhoneNumbersModal: false });
    }

    displayMessage(message, cb) {
        this.state.messages.push(message);
        this.setState({ messages: this.state.messages }, () => {
            if (cb) {
                cb();
            }
        });
    }

    postMessage(message, cb) {
        const payload = {
            Body: message,
            From: this.state.myPhoneNumber,
            key: counter++,
            timestamp: Date.now(),
            To: this.state.theirPhoneNumber,
        };
        this.displayMessage(payload);
        this.ajaxProvider.type.prototype.postFreeText(payload)
            .then(res => {
                if (!res.ok) {
                    throw new Error();
                }
                return res.text();
            })
            .then(text => {
                const domParser = new DOMParser();
                const xml = domParser.parseFromString(text, 'application/xml');
                const m = xml.documentElement.childNodes[0].childNodes[0].nodeValue;
                const newMessage = {
                    Body: m,
                    From: this.state.theirPhoneNumber,
                    key: counter++,
                    timestamp: Date.now(),
                    To: this.state.myPhoneNumber,
                };
                this.displayMessage(newMessage, () => {
                    cb(true);
                });
            })
            .catch(_ => {
                cb(false);
            });
    }

    componentDidMount() {
        if (this.state.apiUrl && this.state.apiUrl !== '') {
            this.ajaxProvider = <RemoteAjaxProvider
                apiKey={this.state.apiKey}
                apiUrl={this.state.apiUrl}
            />;
        } else {
            this.ajaxProvider = <LocalAjaxProvider />;
        }
    }

    render() {
        return (
            <div className="webconvo" style={{ width: this.props.containerWidth }}>
                {this.ajaxProvider}
                <div className="webconvoheader">
                    <div className="webconvoheadersidecont"></div>
                    <h3 className="webconvoheadername">{this.state.theirPhoneNumber}</h3>
                    <div className="webconvoheadersidecont webconvoheaderbuttoncont">
                        {/*<button type="button" className="webconvoheaderbutton" onClick={this.addPhoneNumberButtonPressed}>+</button>*/}
                    </div>
                </div>
                <div className="messagescont" style={{ position: 'relative' }}>
                    <MessageBoard messages={this.state.messages} myPhoneNumber={this.state.myPhoneNumber} />
                    <PhoneNumbersModal isVisible={this.state.displayPhoneNumbersModal}
                                       closeMe={this.closePhoneNumbersModal} />
                </div>
                <div>
                    <MessageBox postMessage={this.postMessage} />
                </div>
            </div>
        );
    }
}

WebConvo.propTypes = {
    apiKey: PropTypes.string,
    apiUrl: PropTypes.string,
    containerWidth: PropTypes.string,
    myPhoneNumber: PropTypes.string,
    theirPhoneNumber: PropTypes.string,
};

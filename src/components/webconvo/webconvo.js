/*
Copyright 2018 Keyhole Software LLC

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

import PropTypes from 'prop-types';
import React from 'react';
import Message from '../../message';
import MessageBoard from '../messageboard/messageboard';
import MessageBox from '../messagebox/messagebox';
import './webconvo.css';

export default class WebConvo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			brandingTitle: this.props.brandingTitle || 'Branding Title',
			messages: [],
			sender: this.props.sender || 'Me',
		};
		this.displayMessage = this.displayMessage.bind(this);
		this.postMessage = this.postMessage.bind(this);
		this._sendErrorCb = this._sendErrorCb.bind(this);
		this._sendSuccessCb = this._sendSuccessCb.bind(this);
	}

	displayMessage(json, cb) {
		const newMessage = new Message(json.text, json.sender);
		this.state.messages.push(newMessage);
		this.setState({ messages: this.state.messages }, () => {
			if (cb) {
				cb();
			}
		});
	}

	postMessage(message, cb) {
		const json = {
			sender: this.state.sender,
			text: message,
		};
		if (typeof this.props.sendHandler === 'function') {
			this.props.sendHandler(json, this._sendSuccessCb(cb), this._sendErrorCb());
		} else {
			this.displayMessage(json, () => {
				cb(true);
			});
			new Promise(resolve => {
				const id = setTimeout(() => {
					const receiveJson = {
						sender: 'Contact',
						text: `echoing: ${json.text}`,
					};
					resolve(receiveJson);
					clearTimeout(id);
				}, 500);
			})
				.then(this.displayMessage);
		}
	}

	_sendErrorCb(messageBoxCb) {
		return errorMessage => {
			messageBoxCb(false);
		};
	}

	_sendSuccessCb(messageBoxCb) {
		return json => {
			this.displayMessage(json, () => {
				messageBoxCb(true);
			});
		};
	}

	componentDidMount() {
		if (typeof this.props.receiveHandler === 'function') {
			this.props.receiveHandler(this.displayMessage);
		}
	}

	render() {
		return (<div className="webconvo" style={{ width: this.props.containerWidth }}>
			<div className="webconvoheader">
				<h3 className="webconvoheadername">{this.state.brandingTitle}</h3>
				<div className="webconvoheadersidecont webconvoheaderbuttoncont">
				</div>
			</div>
			<div className="messagescont" style={{ position: 'relative' }}>
				<MessageBoard messages={this.state.messages} me={this.state.sender} />
			</div>
			<div>
				<MessageBox postMessage={this.postMessage} />
			</div>
		</div>);
	}
}

WebConvo.propTypes = {
	brandingTitle: PropTypes.string,
	containerWidth: PropTypes.string,
	receiveHandler: PropTypes.func,
	sender: PropTypes.string,
	sendHandler: PropTypes.func
};

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

const global = (() => {}).constructor('return this')();

export default class WebConvo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			brandingTitle: this.props.brandingTitle || 'Branding Title',
			messages: [],
			sender: this.props.sender || 'Me',
		};
		this.displayMessage = this.displayMessage.bind(this);
		this.displayReply = this.displayReply.bind(this);
		this.postMessage = this.postMessage.bind(this);
	}

	displayMessage(message, cb) {
		this.state.messages.push(message);
		this.setState({ messages: this.state.messages }, () => {
			if (cb) {
				cb();
			}
		});
	}

	displayReply(json) {
		const newMessage = new Message(json.text, json.sender);
		this.displayMessage(newMessage);
	}

	postMessage(message, cb) {
		const myMessage = new Message(message, this.state.sender);
		if (typeof global.sendKhsConvoMessage === 'undefined') {
			this.displayMessage(myMessage, () => {
				cb(true);
			});
			new Promise(resolve => {
				const id = setTimeout(() => {
					const json = {
						sender: 'Contact',
						text: `echoing: ${myMessage.text}`,
					};
					resolve(json);
					clearTimeout(id);
				}, 500);
			})
				.then(this.displayReply);
		} else {
			const m = {
				sender: this.state.sender,
				text: message
			};
			global.sendKhsConvoMessage(m, () => {
				this.displayMessage(myMessage, () => {
					cb(true);
				})
			}, _ => {
				cb(false);
			});
		}
	}

	componentDidMount() {
		if (typeof global.sendKhsConvoMessage === 'undefined' && typeof global.registerKhsConvoMessageReceive !== 'undefined') {
			global.registerKhsConvoMessageReceive(this.displayReply);
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
	sender: PropTypes.string,
};

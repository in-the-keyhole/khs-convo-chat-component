import React from 'react';
import MessageBoard from './messageboard';
import MessageBox from './messagebox';
import './webconvo.css';
import axios from 'axios';

export default class WebConvo extends React.Component {
	constructor(props) {
		super(props);
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		this.state = {
			messages: []
		};

		this.requestMessage = this.requestMessage.bind(this);
		this.displayMessage = this.displayMessage.bind(this);
	}

	displayMessage(message) {
		this.state.messages.push(message);

		this.setState({ messages: this.state.messages });
	}

	requestMessage(message) {
		this.displayMessage(message);
		var obj = {
			method: 'post',
			url: this.props.url,
			data: {
				"Body": message.message,
				"From": '',
				"Status": "admin",
				"To": ""
			}
		};
		var self = this;
		axios(obj)
			.then(function (response) {
				var resp = response.data.replace('<?xml version="1.0" encoding="UTF-8"?>', '');
				resp = resp.replace('<Response>', '');
				resp = resp.replace('</Response>', '');
				resp = resp.replace('<Message>', '');
				resp = resp.replace('</Message>', '');
				var date = new Date();

				var dateString = Math.abs(date.getHours() - 12) + ":" + date.getMinutes();
				if (date.getHours() > 12) {
					dateString += " pm";
				} else {
					dateString += " am";
				}
				self.displayMessage({ message: resp, type: 'server', time: dateString });

			})
			.catch(function (error) {
			});
	}

	render() {
		return (
			<div className="webconvo">
				<div>
					<span className="webconvo-title">WebConvo</span><br></br>
					<span className="keyhole">by Keyhole Software</span>
					<hr></hr>
				</div>
				<div>
					<MessageBoard messages={this.state.messages} />
				</div>
				<hr></hr>
				<div>
					<MessageBox requestMessage={this.requestMessage} />
				</div>
			</div>
		);
	}
}



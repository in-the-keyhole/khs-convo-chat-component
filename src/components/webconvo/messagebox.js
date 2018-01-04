import React from 'react';

export default class MessageBox extends React.Component {

	sendMessage() {
		console.log('Hello World');
	}

	render() {
		return (
			<div>
				<input type="test" className="message-box-text"/>
				<button onClick={this.sendMessage} className="message-box-button">Send</button>
			</div>
		);
	}
}
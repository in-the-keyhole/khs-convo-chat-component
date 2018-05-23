import React from 'react';
import './messagebox.css';

export default class MessageBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputMessage: '',
			errorClass: 'messageboxinput'
		};
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
		this.updateInputValue = this.updateInputValue.bind(this);
	}

	componentDidMount() {
		this.messageInput.focus();
	}

	sendMessage() {
		const self = this;
		if (this.state.inputMessage.trim().length === 0) {
			return;
		}
		this.messageInput.disabled = true;
		this.messageButton.disabled = true;
		const cb = shouldClearInput => {
			if (shouldClearInput) {
				self.setState({ inputMessage: '' });
			}
			self.messageInput.disabled = false;
			this.messageButton.disabled = false;
			self.messageInput.focus();
		};
		this.props.postMessage(this.state.inputMessage, cb);
	}
	
	handleKeyPress(e) {
		if (e.key === 'Enter') {
			this.sendMessage();
		}
	}

	updateInputValue(evt) {
		this.setState({
			inputMessage: evt.target.value,
		});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({errorClass: 'messageboxinput ' + nextProps.errorClass});
	}

	render() {
		return (
			<div className="messageboxcont">
				<input type="text" className={this.state.errorClass} ref={(i) => { this.messageInput = i; }} onKeyPress={this.handleKeyPress} onChange={this.updateInputValue} value={this.state.inputMessage} />
				<button type="button" className="messageboxbutton" ref={(i) => { this.messageButton = i; }} onClick={this.sendMessage}>Send</button>
			</div>
		);
	}
}

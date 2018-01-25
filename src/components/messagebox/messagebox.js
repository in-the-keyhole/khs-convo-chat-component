import React from 'react';
import './messagebox.css';

export default class MessageBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputMessage: '',
		};
	}

	componentDidMount() {
		this.messageInput.focus();
	}

	sendMessage = () => {
		if (this.state.inputMessage.trim().length === 0) {
			return;
		}
		this.messageInput.disabled = true;
		const cb = shouldClearInput => {
			if (shouldClearInput) {
				this.setState({ inputMessage: '' });
			}
			this.messageInput.disabled = false;
			this.messageInput.focus();
		};
		this.props.postMessage(this.state.inputMessage, cb);
	};

	handleKeyPress = e => {
		if (e.key === 'Enter') {
			this.sendMessage();
		}
	};

	updateInputValue = evt => {
		this.setState({
			inputMessage: evt.target.value,
		});
	};

	render() {
		return (
			<div className="messageboxcont">
				<input type="text" className="messageboxinput" ref={(i) => { this.messageInput = i; }} onKeyPress={this.handleKeyPress} onChange={this.updateInputValue} value={this.state.inputMessage} />
				<button type="button" className="messageboxbutton" onClick={this.sendMessage}>Send</button>
			</div>
		);
	}
}

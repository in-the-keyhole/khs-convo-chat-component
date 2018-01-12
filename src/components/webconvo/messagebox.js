import React from 'react';

export default class MessageBox extends React.Component {
	constructor(props) {

		super(props);

		this.state = {
			requestMessage: props.requestMessage,
			inputMessage: ''

		};

		this.sendMessage = this.sendMessage.bind(this);
		this._handleKeyPress = this._handleKeyPress.bind(this);
		this._updateInputValue = this._updateInputValue.bind(this);
	}

	componentDidMount() {
		this.messageInput.focus();
	}

	sendMessage() {
		var date = new Date();

		var dateString = Math.abs(date.getHours() - 12) + ":" + date.getMinutes();
		if (date.getHours() > 12) {
			dateString += " pm";
		} else {
			dateString += " am";
		}
		this.props.requestMessage({ message: this.state.inputMessage, type: "msg", time: dateString });
	}

	_handleKeyPress(e) {
		if (e.key === 'Enter') {
			this.sendMessage();
			this.setState({ inputMessage: '' });
		}
	}

	_updateInputValue(evt) {
		this.setState({
			inputMessage: evt.target.value
		});
	}

	render() {
		return (
			<div>
				<input type="test" ref={(i) => { this.messageInput = i; }} className="message-box-text" onKeyPress={this._handleKeyPress} onChange={this._updateInputValue} value={this.state.inputMessage} />
				<button onClick={this.sendMessage} className="message-box-button">Send</button>
			</div>
		);
	}
}
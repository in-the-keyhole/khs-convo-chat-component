import React from 'react';
import Message from './message';

export default class MessageBoard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: props.messages
		};

	}

	componentDidUpdate() {	
		this.messageBoard.scrollTop = this.messageBoard.scrollHeight;
	}

	render() {
		const messagesRows = this.state.messages.map((msg, index) => {
			return (<Message key={index} message={msg.message} type={msg.type} time={msg.time} />);
		});

		return (
			<div className="message-board">
				<span className="message-board-title">Messages</span>
				<div ref={(d) => { this.messageBoard = d }} className="message-board-mid">
					{messagesRows}
				</div>
			</div>
		);
	}
}
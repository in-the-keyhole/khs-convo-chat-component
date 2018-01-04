import React from 'react';
import Message from './message';
import store from './messageStore';

export default class MessageBoard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: []
		};
		
		console.log(store);
		this.state.messages.push({ time: '2:34 pm', message: 'hello', type: 'msg' });
		this.state.messages.push({ time: '2:35 pm', message: 'hello greg', type: 'server' });
	}

	render() {
		// var messagesRows = [];
		// for(var i = 0; i < this.state.messages.length; i++){			
		// 	messagesRows.push(<Message message={this.state.messages[i].message} type={this.state.messages[i].type} time={this.state.messages[i].time}/>);
		// }
		const messagesRows = this.state.messages.map((msg,index) => {
			return <Message key={index} message={msg.message} type={msg.type} time={msg.time} />
		});
		return (
			<div className="message-board">
				<span className="message-board-title">Messages</span>
				<div className="message-board-mid">
					{messagesRows}

				</div>
			</div>
		);
	}
}
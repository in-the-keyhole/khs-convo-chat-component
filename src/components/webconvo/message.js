import React from 'react';

export default class Messsage extends React.Component {
	constructor(props) {
		super(props);
	}

	static defaultProps = {
		time: '12:00 am',
		message: 'error',
		type: 'msg'
	};

	getClassNameByMessageType(type) {
		if(type === 'msg'){
			return "message-msg-right";
		}else{
			return "message-msg-left";
		}
		
	}

	render() {

		return (
			<div className="message-msg">
				<span className={this.getClassNameByMessageType(this.props.type)}>{this.props.message}</span>

				<span className="message-time">{this.props.time}</span>
			</div>
		);
	}
}
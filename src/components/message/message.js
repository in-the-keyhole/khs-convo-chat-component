import React from 'react';
import './message.css';

export default class Message extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contClasses: `messagecont`,
			fauxContClasses: `messagetextfauxcont ${this.isFromMe() ? 'fromme' : 'fromyou'}`,
			fauxSmallTextContClasses: `messageshorttextfauxcont ${this.isFromMe() ? 'fromme' : 'fromyou'}`,
			textClasses: `messagetextcont ${this.isFromMe() ? 'frommetext' : 'fromyoutext'}`,
		};
		this.getTime = this.getTime.bind(this);
		this.isFromMe = this.isFromMe.bind(this);
	}

	getTime() {
		const date = new Date(this.props.timestamp);
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const amOrPm = hours > 11 ? 'PM' : 'AM';
		const timeStr =`${hours < 13 ? hours : hours - 12}:${minutes < 10 ? '0' + minutes : minutes} ${amOrPm}`;
		const startOfToday = new Date();
		startOfToday.setHours(0, 0, 0, 0);
		if ((date - startOfToday) >= 0) {
			return timeStr;
		} else {
			const dateClone = new Date(this.props.timestamp);
			dateClone.getMonth();
			const month = dateClone.getMonth() + 1;
			const date = dateClone.getDate();
			const dateStr = `${month}/${date}`;
			return `${dateStr} ${timeStr}`;
		}
	}

	isFromMe() {
		return this.props.from === this.props.myPhoneNumber;
	}

	render() {
		return (
			<div className={this.state.contClasses}>
				<div className={this.props.body.length > 3 ? this.state.fauxContClasses : this.state.fauxSmallTextContClasses }>
                    <div className="messagetimestamp">{this.getTime()}</div>
					<div className={this.state.textClasses}>
						<p className="messagetext">{this.props.body}</p>
					</div>
				</div>
			</div>
		);
	}
}

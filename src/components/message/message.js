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
		this.isFromMe = this.isFromMe.bind(this);
	}

	isFromMe() {
		return this.props.from === this.props.myPhoneNumber;
	}

	render() {
		return (
			<div className={this.state.contClasses}>
				<div className={this.props.body.length > 3 ? this.state.fauxContClasses : this.state.fauxSmallTextContClasses }>
					<div className={this.state.textClasses}>
						<p className="messagetext">{this.props.body}</p>
					</div>
				</div>
			</div>
		);
	}
}

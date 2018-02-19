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
		return this.props.message.From === this.props.myPhoneNumber;
	}

	render() {
		return (
			<div className={this.state.contClasses}>
				<div className={this.props.message.Body.length > 3 ? this.state.fauxContClasses : this.state.fauxSmallTextContClasses }>
					<div className={this.state.textClasses}>
						<p className="messagetext">{this.props.message.Body}</p>
					</div>
				</div>
			</div>
		);
	}
}

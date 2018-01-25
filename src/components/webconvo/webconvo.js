import React from 'react';
import { Ajax } from '../../services/ajax/ajax';
import MessageBoard from '../messageboard/messageboard';
import MessageBox from '../messagebox/messagebox';
import PhoneNumbersModal from '../phonenumbersmodal/phonenumbersmodal';
import './webconvo.css';

export default class WebConvo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayPhoneNumbersModal: false,
			messages: [],
            myPhoneNumber: this.props.myPhoneNumber || '800-555-1234',
			theirPhoneNumber: this.props.theirPhoneNumber || 'Keyhole Software',
        };
	}

	addPhoneNumberButtonPressed = () => {
		this.setState({ displayPhoneNumbersModal: true });
	};

	closePhoneNumbersModal = () => {
		this.setState({ displayPhoneNumbersModal: false });
	};

	displayMessage = message => {
		this.state.messages.push(message);
		this.setState({ messages: this.state.messages });
	};

	postMessage = (message, cb) => {
		const payload = {
			Body: message,
			From: this.state.myPhoneNumber,
			To: this.state.theirPhoneNumber,
		};
	  	Ajax.postFreeText(payload)
			.then(res => {
				const m = res.data.documentElement.childNodes[0].childNodes[0].nodeValue;
				const newMessage = {
					Body: m,
					From: this.state.myPhoneNumber,
					To: this.state.theirPhoneNumber,
				};
				this.state.messages.push(newMessage);
				this.setState({ messages: this.state.messages });
				cb(true);
			})
			.catch(_ => {
				cb(false);
			});
	};

	render() {
		return (
			<div className="webconvo" style={{ width: this.props.containerWidth }}>
				<div className="webconvoheader">
					<div className="webconvoheadersidecont"></div>
					<h3 className="webconvoheadername">{this.state.theirPhoneNumber}</h3>
					<div className="webconvoheadersidecont webconvoheaderbuttoncont">
						{/*<button type="button" className="webconvoheaderbutton" onClick={this.addPhoneNumberButtonPressed}>+</button>*/}
					</div>
				</div>
				<div className="messagescont" style={{ position: 'relative' }}>
					<MessageBoard messages={this.state.messages} myPhoneNumber={this.state.myPhoneNumber} />
					<PhoneNumbersModal isVisible={this.state.displayPhoneNumbersModal} closeMe={this.closePhoneNumbersModal} />
				</div>
				<div>
					<MessageBox postMessage={this.postMessage} />
				</div>
			</div>
		);
	}
}



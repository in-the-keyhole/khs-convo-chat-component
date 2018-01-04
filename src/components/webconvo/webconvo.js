import React from 'react';
import MessageBoard from './messageboard';
import MessageBox from './messagebox';
import store from './messageStore';
import './webconvo.css';


export default class WebConvo extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="webconvo">
				<div>
					<span className="webconvo-title">WebConvo</span><br></br>
					<span className="keyhole">by Keyhole Software</span>
					<hr></hr>
				</div>
				<div>
					<MessageBoard />
				</div>
				<div>
					<MessageBox />
				</div>
			</div>
		);
	}
}

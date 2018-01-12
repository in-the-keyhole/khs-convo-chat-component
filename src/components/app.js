import React from 'react';
import WebConvo from './webconvo/webconvo';
import axios from 'axios';

export default class App extends React.Component {
	render() {
		return (
			<div style={{ height: "400px", width: "300px", margin: "auto" }} >
				{/* <WebConvo url="https://khs-convo.herokuapp.com/api/convo" /> */}
				<WebConvo url="https://khs-convo-dev.herokuapp.com/api/convo" />
				
			</div>
		);
	}
}
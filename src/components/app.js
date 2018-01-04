import React from 'react';
import WebConvo from './webconvo/webconvo';

export default class App extends React.Component {
	render() {
		return (
			<div style={{ height: "400px", width: "300px", margin: "auto" }} >
				<WebConvo />
			</div>
		);
	}
}
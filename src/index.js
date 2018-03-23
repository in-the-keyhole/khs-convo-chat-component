import React from 'react';
import ReactDOM from 'react-dom';
import WebConvo from './components/webconvo/webconvo';

// trivial implementation of receive handler
const receiveHandler = cb => {
	let counter = 0;
	const id = setInterval(() => {
		const newMessage = {
			sender: 'Global User',
			text: `Message ${++counter}`
		};
		cb(newMessage);
		if (counter === 5) {
			clearInterval(id);
		}
	}, 5000);
};

// trivial implementation of send handler
const sendHandler = (json, success, error) => {
	const id = setTimeout(function () {
		clearTimeout(id);
		success(json);
	}, 500);
};

ReactDOM.render(
	<WebConvo
		brandingTitle={''}
		containerWidth={'50%'}
		receiveHandler={null}
		sender={''}
		sendHandler={null}
	/>,
	document.getElementById('root')
);

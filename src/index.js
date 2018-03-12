import React from 'react';
import ReactDOM from 'react-dom';
import WebConvo from './components/webconvo/webconvo';

ReactDOM.render(
    <WebConvo
        apiKey={""}
        apiUrl={""}
        containerWidth={"50%"}
        myPhoneNumber={""}
        theirPhoneNumber={""}
    />,
    document.getElementById("root")
);

let counter = 1;

export default class Message {

	constructor(text, sender) {
		this.key = counter++;
		this.sender = sender;
		this.text = text;
		this.timestamp = Date.now();
	}

}

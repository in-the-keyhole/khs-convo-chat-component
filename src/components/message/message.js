import * as domPurifyLib from 'dompurify';
import * as _escapeRegExpLib from 'lodash.escaperegexp';
import React from 'react';
import './message.css';

const DOMPurify = domPurifyLib.default;
const escapeRegex = _escapeRegExpLib.default;

// CREDIT https://gist.github.com/dperini/729294
const urlRegex = /((?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u{00A1}-\u{FFFF}0-9]-*)*[a-z\u{00A1}-\u{FFFF}0-9]+)(?:\.(?:[a-z\u{00A1}-\u{FFFF}0-9]-*)*[a-z\u{00A1}-\u{FFFF}0-9]+)*(?:\.(?:[a-z\u{00A1}-\u{FFFF}]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?)/gui;
const protocolRegex = /^(?:(?:https?|ftp):\/\/)/;
const endsWithQuestionMark = /\?$/;
// CREDIT https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript#comment15817351_9204568, with modifications
const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+[^\s!-#%-*,-/\\:;?@\[-\]_{}\u{00A1}\u{00A7}\u{00AB}\u{00B6}\u{00B7}\u{00BB}\u{00BF}\u{037E}\u{0387}\u{055A}-\u{055F}\u{0589}\u{058A}\u{05BE}\u{05C0}\u{05C3}\u{05C6}\u{05F3}\u{05F4}\u{0609}\u{060A}\u{060C}\u{060D}\u{061B}\u{061E}\u{061F}\u{066A}-\u{066D}\u{06D4}\u{0700}-\u{070D}\u{07F7}-\u{07F9}\u{0830}-\u{083E}\u{085E}\u{0964}\u{0965}\u{0970}\u{0AF0}\u{0DF4}\u{0E4F}\u{0E5A}\u{0E5B}\u{0F04}-\u{0F12}\u{0F14}\u{0F3A}-\u{0F3D}\u{0F85}\u{0FD0}-\u{0FD4}\u{0FD9}\u{0FDA}\u{104A}-\u{104F}\u{10FB}\u{1360}-\u{1368}\u{1400}\u{166D}\u{166E}\u{169B}\u{169C}\u{16EB}-\u{16ED}\u{1735}\u{1736}\u{17D4}-\u{17D6}\u{17D8}-\u{17DA}\u{1800}-\u{180A}\u{1944}\u{1945}\u{1A1E}\u{1A1F}\u{1AA0}-\u{1AA6}\u{1AA8}-\u{1AAD}\u{1B5A}-\u{1B60}\u{1BFC}-\u{1BFF}\u{1C3B}-\u{1C3F}\u{1C7E}\u{1C7F}\u{1CC0}-\u{1CC7}\u{1CD3}\u{2010}-\u{2027}\u{2030}-\u{2043}\u{2045}-\u{2051}\u{2053}-\u{205E}\u{207D}\u{207E}\u{208D}\u{208E}\u{2308}-\u{230B}\u{2329}\u{232A}\u{2768}-\u{2775}\u{27C5}\u{27C6}\u{27E6}-\u{27EF}\u{2983}-\u{2998}\u{29D8}-\u{29DB}\u{29FC}\u{29FD}\u{2CF9}-\u{2CFC}\u{2CFE}\u{2CFF}\u{2D70}\u{2E00}-\u{2E2E}\u{2E30}-\u{2E42}\u{3001}-\u{3003}\u{3008}-\u{3011}\u{3014}-\u{301F}\u{3030}\u{303D}\u{30A0}\u{30FB}\u{A4FE}\u{A4FF}\u{A60D}-\u{A60F}\u{A673}\u{A67E}\u{A6F2}-\u{A6F7}\u{A874}-\u{A877}\u{A8CE}\u{A8CF}\u{A8F8}-\u{A8FA}\u{A8FC}\u{A92E}\u{A92F}\u{A95F}\u{A9C1}-\u{A9CD}\u{A9DE}\u{A9DF}\u{AA5C}-\u{AA5F}\u{AADE}\u{AADF}\u{AAF0}\u{AAF1}\u{ABEB}\u{FD3E}\u{FD3F}\u{FE10}-\u{FE19}\u{FE30}-\u{FE52}\u{FE54}-\u{FE61}\u{FE63}\u{FE68}\u{FE6A}\u{FE6B}\u{FF01}-\u{FF03}\u{FF05}-\u{FF0A}\u{FF0C}-\u{FF0F}\u{FF1A}\u{FF1B}\u{FF1F}\u{FF20}\u{FF3B}-\u{FF3D}\u{FF3F}\u{FF5B}\u{FF5D}\u{FF5F}-\u{FF65}]/gui;

export default class Message extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contClasses: `messagecont`,
			fauxContClasses: `messagetextfauxcont ${this.isFromMe() ? 'fromme' : 'fromyou'}`,
			fauxSmallTextContClasses: `messageshorttextfauxcont ${this.isFromMe() ? 'fromme' : 'fromyou'}`,
			textClasses: `messagetextcont ${this.isFromMe() ? 'frommetext' : 'fromyoutext'}`,
		};
		this.containsAUrl = this.containsAUrl.bind(this);
		this.containsAnEmailAddress = this.containsAnEmailAddress.bind(this);
		this.createHttpAnchor = this.createHttpAnchor.bind(this);
		this.createMailToAnchor = this.createMailToAnchor.bind(this);
		this.getEmailAddressMatches = this.getEmailAddressMatches.bind(this);
		this.getSender = this.getSender.bind(this);
		this.getText = this.getText.bind(this);
		this.getTime = this.getTime.bind(this);
		this.getUrlMatches = this.getUrlMatches.bind(this);
		this.isFromMe = this.isFromMe.bind(this);
		this.replaceTextWithMailToMarkup = this.replaceTextWithMailToMarkup.bind(this);
		this.replaceTextWithUrlMarkup = this.replaceTextWithUrlMarkup.bind(this);
		this.sanitize = this.sanitize.bind(this);
	}

	containsAUrl(text) {
		return urlRegex.test(text);
	}

	containsAnEmailAddress(text) {
		return emailRegex.test(text);
	}

	createHttpAnchor(match) {
		const maybeMassagedUrl = endsWithQuestionMark.test(match) ? match.substr(0, match.length - 1) : match;
		const maybePrependedProtocolLink = protocolRegex.test(maybeMassagedUrl) ? maybeMassagedUrl : `\/\/${maybeMassagedUrl}`;
		return `<a href="${maybePrependedProtocolLink}" target="_blank">${maybeMassagedUrl}</a>`;
	}

	createMailToAnchor(match) {
		return `<a href="mailto:${match}">${match}</a>`;
	}

	getEmailAddressMatches(text) {
		return text.match(emailRegex);
	}

	getSender() {
		return this.props.sender || '';
	}

	getText() {
		const sanitizedText = this.sanitize(this.props.text);
		if (!sanitizedText) {
			return sanitizedText;
		}
		let maybeMarkedUpText = sanitizedText;
		if (this.containsAnEmailAddress(maybeMarkedUpText)) {
			const matches = this.getEmailAddressMatches(maybeMarkedUpText);
			const anchors = matches.map(m => this.createMailToAnchor(m));
			for (let i = 0, j = matches.length; i < j; ++i) {
				maybeMarkedUpText = this.replaceTextWithMailToMarkup(maybeMarkedUpText, matches[i], anchors[i]);
			}
		}
		if (this.containsAUrl(maybeMarkedUpText)) {
			const matches = this.getUrlMatches(maybeMarkedUpText);
			const anchors = matches.map(m => this.createHttpAnchor(m));
			for (let i = 0, j = matches.length; i < j; ++i) {
				maybeMarkedUpText = this.replaceTextWithUrlMarkup(maybeMarkedUpText, matches[i], anchors[i]);
			}
		}
		return maybeMarkedUpText;
	}

	getTime() {
		const date = new Date(this.props.timestamp);
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const amOrPm = hours > 11 ? 'PM' : 'AM';
		const timeStr = `${hours < 13 ? hours : hours - 12}:${minutes < 10 ? '0' + minutes : minutes} ${amOrPm}`;
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

	getUrlMatches(text) {
		const matches = text.match(urlRegex);
		return matches.filter(m => m.indexOf('href="mailto:') === -1);
	}

	isFromMe() {
		return this.getSender() === this.props.me;
	}

	replaceTextWithMailToMarkup(text, match, markup) {
		const localRegex = new RegExp('(^|$|\\s)' + escapeRegex(match), 'gui');
		return text.replace(localRegex, '$1' + markup);
	}

	replaceTextWithUrlMarkup(text, match, markup) {
		const localRegex = new RegExp('(^|$|\\s)' + escapeRegex(endsWithQuestionMark.test(match) ? match.substr(0, match.length - 1) : match), 'gi');
		return text.replace(localRegex, '$1' + markup);
	}

	sanitize(text) {
		return DOMPurify.sanitize(text);
	}

	render() {
		return (<div className={this.state.contClasses}>
				<div
					className={this.props.text.length > 3 ? this.state.fauxContClasses : this.state.fauxSmallTextContClasses}>
					<div className="messagetimestamp">{this.getSender() + ', ' + this.getTime()}</div>
					<div className={this.state.textClasses}>
						<p className="messagetext" dangerouslySetInnerHTML={{ __html: this.getText() }}></p>
					</div>
				</div>
			</div>);
	}

}

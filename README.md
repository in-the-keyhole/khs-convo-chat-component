# khs-convo-chat-component

A reusable React Chat UI Component for textual communication between endpoints, for use with `npm`-based projects.

This component abstracts away its data transport middleware and, in the absence of a consumer-provided implementation, emulates its own asynchronous reply.

![](chat-bot-image.png)

## Adding To your React Application

`./src/components/webconvo/webconvo.js` is the main component.

`import WebConvo from 'khs-convo-chat-component';`

```jsx
<WebConvo
	brandingTitle={"<some_title_branding_that_will_show_up_in_the_widget_title_or_blank>"}
	containerWidth={"<some_width_or_blank>"}
	receiveHandler={<a_function_or_null>} // see details below
	sender={"<some_string_identifying_you_the_sender_or_blank>"}
	sendHandler={<a_function_or_null>} // see details below
/>
```

All of the properties are **optional** and have "null" defaults.

### Callback Functions

The second part, also **optional**, is to provide property functions with these contracts:

#### sendHandler

The `sendHandler` is a function that takes messages **from** the component. It looks like this:

```js
// note: function name is variable
function sendFunctionName(message, success, error) {
	// do something with the incoming Message (see JSON representation below)...
	// return the message to success() or
	// return the string error to error()
}
```

And a look at the callbacks passed to this function:

```js
function success(message) {
	// message is the same one passed to the sendHandler (see JSON representation below)...
}
```

```js
function error(errorText) {
	// errorText is a string
}
```

#### receiveHandler

To facilitate asynchronous communication, **all** responses from the remote endpoint **must** come from this property function:

```js
// note: function name is variable
function receiveFunctionName(cb) {
	// construct the outgoing Message (see JSON representation below)...
	// and send to the cb()
}
```

The response callback looks like this:

```js
function cb(newMessage) {
	// newMessage is a Message (see JSON representation below)...
}
```

#### Message JSON

The Message (used as an argument in the sendHandler, success callback, and receiveHandler callback) looks like this:

```js
{
	sender: "<string_identifier_of_the_message_sender>",
	text: "<the_message_text>"
}
```

## Building

[yarn](https://yarnpkg.com/lang/en/docs/install/) is used to manage the project.

Note that building is not required to utilize the component in your project. It is ready for consumption after declaring the project as a dependency.

e.g.

```json
{
	"dependencies": {
		"khs-convo-chat-component": "2.1.0"
	}
}
```

### Production

To build a production version:

```
$ yarn build
```

... which builds into `./dist`.

### Development

To build a development version:

```
$ yarn dev
```

... which builds into `./public` for the static server.

Note that you may change the declared React properties *prior* to building dev in `./src/index.js`

You may also provide the implementations of the handler functions there, as well. Stubs have been commented-out.

## Running the Server

`$ yarn start` will start a static server at `localhost:3000`. It serves out of `./public`.

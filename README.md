# khs-convo-chat-component

A reusable React Chat UI Component for textual communication between endpoints.

This component abstracts away its data transport middleware and, in the absence of a consumer-provided implementations, emulates its own asynchronous reply.

![](chat-bot-image.png)

## Adding To your Application

`./src/components/webconvo/webconvo.js` is the main component.

`import WebConvo from 'khs-convo-chat-component';`

```jsx
<WebConvo
	brandingTitle={"<some_title_branding_that_will_show_up_in_the_widget_title_or_blank>"}
	containerWidth={"<some_width_or_blank>"}
	sender={"<some_string_identifying_you_the_sender_or_blank>"}
/>
```

All of the properties are **optional** and have empty defaults.

### Global Callback Functions

The second part, also **optional**, is to provide **global** functions with these contracts:

#### Sending Messages

```js
function sendKhsConvoMessage(message, success, error) {
	// do something with the Message (see JSON representation below)...
	// invoke the no-arg success() or
	// return the string error to error()
}
```

And a look at the callbacks passed to this function:

```js
function success() {
	// no-arg
}
```

```js
function error(errorText) {
	// errorText is a string
}
```

#### Receiving Messages

To facilitate asynchronous communication, **all** responses from the remote endpoint **must** come through this global function:

```js
function registerKhsConvoMessageReceive(cb) {
	// call the cb() with the new Message (see JSON representation below)...
}
```

The response callback looks like this:

```js
function cb(newMessage) {
	// newMessage is a Message
}
```

This component looks for the global `registerKhsConvoMessageReceive` after being mounted. If exists, the component will register its callback once.

#### Message JSON

The Message (used as an argument in the global send function and receive callback) looks like this:

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
		"khs-convo-chat-component": "2.0.0"
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

You may also provide the global functions in `./public/index.html`. Examples have been commented-out.

## Running the Server

`$ yarn start` will start a static server. It serves out of `./public`.

# khs-convo-chat-component

A reusable React Chat UI Component that can be embedded or used in a standalone manner.

In the absence of a hosted `khs-convo` backend (that is, with React properties set to default -- blank), this component will emulate sending messages, locally. This is the default behavior.

![](chat-bot-image.png)

## Adding To your Application

`./src/components/webconvo/webconvo.js` is the main component.

`import WebConvo from 'khs-convo-chat-component';`

```jsx
<WebConvo
	apiKey={"<some_khs_convo_api_key_or_blank"}
	apiUrl={"<some_khs_convo_api_url_or_blank"}
	containerWidth={"<some_width_or_blank>"}
	myPhoneNumber={"<your_phone_number_or_blank>"}
	theirPhoneNumber={"<recipient_phone_number_or_blank>"}
/>
```

All of the properties are optional and have empty defaults.

## Building

[yarn](https://yarnpkg.com/lang/en/docs/install/) is used to build the project.

Note that building is not required to utilize the component in your project. It is ready for consumption after declaring the project as a dependency.

e.g.

```json
{
	"dependencies": {
		"khs-convo-chat-component": "1.0.0"
	}
}
```

To build a production version:

```
$ yarn build
```

... which builds into `./dist`.

To build a development version:

```
$ yarn dev
```

... which builds into `./public` for the static server.

## Running the Server

`$ yarn start` will start a static server. It serves out of `./public`.

# khs-convo-emulator

A React Component meant to be inserted in a React application, that honors the API contracts and functionality of [khs-convo](https://github.com/in-the-keyhole/khs-convo), an open-source communications platform.

In the absence of a hosted `khs-convo` backend, this component will emulate sending messages, locally.

## Building

The `./.env` file has all the build-time environment variables, with comments. Values are, by default, empty. Leave these unpopulated for demo builds; otherwise, populate with a real API URL, data, etc.

You also have the option of creating a `./.env*.local` file (which are `git ignore`d) with populated values, in case you want to fork and avoid diff noise.

See this section in React Scripts for more details on overriding files and for which build phases they are applicable: 

[https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#what-other-env-files-can-be-used](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#what-other-env-files-can-be-used)

To build:

```
$ npm run build
``` 

## Developing and Testing

`$ npm start` will start a dev server serving a dev build.

## Adding To your Application

`./src/components/webconvo/webconvo.js` is the entry-point.

```jsx
<WebConvo 
	containerWidth={"<some_width_or_blank>"} 
	myPhoneNumber={"<your_phone_number_or_blank>"} 
	theirPhoneNumber={"<recipient_phone_number_or_blank>"} 
/>
```

All of the properties are optional and have empty defaults.
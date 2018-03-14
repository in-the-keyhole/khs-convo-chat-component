# Changelog

## 2.1.0 (2018-03-14)

Global handler functions are now replaced with React properties. Shim implementations provided in `src/index.js` (removed from `public/index.html`) for development. README updated.


## 2.0.0 (2018-03-13)

Release 2.0 broadens this component’s utility. Instead of being a synchronous `khs-convo` SMS UI provider, it is now a general-purpose, asynchronous messaging client.

**Changes**:

* Removal of Ajax providers, since the data-interchange layer is now left to the consumer.
* Thus, removal of `whatwg-fetch` peer dependency.
* Restructuring of `WebConvo` React props to reflect new design: branding title, generic sender string, and message text. Gone are “SMS” like props and Ajax config.
* Thus, dev `index.js` is updated with new props.
* New `Message` class to encapsulate JSON messages.
* Thus, all message-related fields in components have been updated to reflect this new `Message` class.
* Disabling of `MessageBox` send button along with its text input, until successful send.
* Removal of phone numbers modal as that design was never officially set.

There are now two global functions for consumer overriding, one for sending messages, one for receiving.`WebConvo` looks for these at start-up, otherwise defaults to emulation.
---
id: gettingStarted
title: Getting Started
slug: /
---

To get started, you'll need both the AstraX extension and the API needed to integrate with it.

### Install the AstraX extension.

You'll want a local version of the extension to test with.

- Head over to the [Chrome extension store](https://chrome.google.com/webstore/category/extensions?hl=en) and install AstraX into your browser.

### Install AstraX API

Now we need a way to communicate with the extension. To facilitate this, we create a Javascript library called AstraX-API that will let you send and receives messages from the extension.

#### For Node.js applications

- Install the module using npm: `npm install @bajetech/astrax-api`

or

- Install the module using yarn: `yarn add @bajetech/astrax-api`

#### For browser-based applications

- Install the packaged library via script tag using cdnjs, swapping in the desired version number for `{version}`:

_NOTE:_ You must use version `1.1.2` or above

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/astrax-api/{version}/index.min.js"></script>
```

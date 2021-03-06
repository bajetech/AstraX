# AstraX

This repo is constructed using yarn workspaces and consists of the following 3 sections:

- the browser extension (`/extension`)
- the client-facing SDK (`/@bajetech/astrax-api`)
- some shared files that the above use (`/@shared/*`)

## Prerequisites

You will need

- Node (v14.11.0 or newer): https://nodejs.org/en/download/
- Yarn (v1.22.5 or newer): https://classic.yarnpkg.com/en/docs/install

## Build the extension

To simply build a production version of the extension, install the prerequisites then navigate to this root folder in your command line and run these 2 steps:

```
yarn
```

followed by

```
yarn build:extension:production
```

This will generate the files that make up the extension in `extension/build`

## Starting a dev environment

```
yarn
yarn start
```

This will start up multiple watching builds in parallel:

- The `@bajetech/astrax-api` npm module
- A dev server with the webapp running in the extension, serving on
  `localhost:9000`
- The actual built extension, able to be installed in Chrome, in `build/`

Each of these will build in response to editing their source.

These can be started individually with `yarn start:\<workspace name\>` where
`\<workspace name\>` is one of:

- `astrax-api`
- `extension`

```
yarn build
```

This will produce final output for the `@bajetech/astrax-api` npm module, and
the extension.

`yarn build:\<workspace name\>`, like the equivalent start commands, will build
an individual workspace.

### Useful URLs:

[The popup webapp](http://localhost:9000/#/)

[The AstraX Documentation website](https://astrax-api-docs.netlify.app)

### Importing a workspace

In some cases, you will want to import a workspace into another. For example, in
`extension` we need to import `@shared/constants`. To do this, simply add
`@shared/constants` to the dependencies list in package.json in `extension`. Yarn
symlinks all the workspaces, so doing so will allow you to import files from the
`@shared/constants` workspace as if it were a published npm package.

### Dependencies

Many dev dependencies (such as Typescript, linters, Webpack, etc.) have been moved to the root `package.json` to allow devs to upgrade these libraries all in one place.

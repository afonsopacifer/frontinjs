# frontin.js

[![npm](https://img.shields.io/npm/v/frontinjs.svg)](https://www.npmjs.com/package/frontinjs)

## What is?

A javascript library for create Functional Stateless Components and render with Virtual DOM. Ideal for creating ultra light and fast applications with [Redux](http://redux.js.org/).

## Features

- Functional **Components**.
- **Custom Props** for manage unidirectional data flow.
- **Virtual DOM** Render.
- Easy select real DOM nodes with global **Refs**.
- Compatible with **JSX**.
- Easy integration with **Redux**.

## How to use?

### Install

**Tip:** Verify if you have [node](http://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

```sh
$ npm install frontinjs --save-dev
```

### Setup

#### ES6/ECMAScript 2015 module:

**Tip:** Use [Webpack](https://webpack.github.io/) (or similar module bundler) to manage the components.

```js
import frontin from 'frontinjs';
```

#### CommonJS module:

**Tip:** Use [Browserify](http://browserify.org/) (or similar module bundler) to manage the components.

```js
const frontin = require('frontinjs');
```

### Create stateless components

```js
import frontin from 'frontinjs';

function Hello() {

  return (
    frontin.component(
      'h1',
      { className: 'foo' },
      'Hello World'
    )
  )

}
```

**Tip:** Use [JSX](https://jsx.github.io/) to write your component declaratively.

```js
import frontin from 'frontinjs';

function Hello() {

  return (
    <h1 className = "foo">
      Hello World
    </h1>
  )

}
```

### Render with Virtual DOM

```js
import frontin from 'frontinjs';

function Hello() {
  // Markup
}

frontin.render(<Hello />, document.getElementById('root'));
```

<hr>

## Development

### Getting started

Clone this repository and install its dependencies:

```sh
$ git clone https://github.com/afonsopacifer/frontinjs.git
$ cd frontinjs
$ npm install
```
### Build

Builds the library to dist:

```sh
$ npm run build
```

### Tests

*Run all unit tests:*

```sh
$ npm test
```

<hr>

## Versioning

To keep better organization of releases we follow the [Semantic Versioning 2.0.0](http://semver.org/) guidelines.

## Contributing

Want to contribute? [Follow these recommendations](https://github.com/afonsopacifer/frontinjs/blob/main/CONTRIBUTING.md).

## History

See [Releases](https://github.com/afonsopacifer/frontinjs/releases) for detailed changelog.

## License

[MIT License](https://github.com/afonsopacifer/frontinjs/blob/main/LICENSE.md) © [Afonso Pacifer](https://github.com/afonsopacifer)

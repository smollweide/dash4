
<div align="center">
<h1>Dash4 config</h1>
Set of configurations and scripts for creating a `Dash4 Plugin`.
<br />
<br />

[![NPM version](https://badge.fury.io/js/%40dash4%2Fconfig.svg)](https://www.npmjs.com/package/@dash4/client)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)

<br />
</div>

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)

## <a name="installation">Installation</a>
`npm i -D @dash4/config @types/jest jest ts-jest react-testing-library`

## <a name="usage">Usage</a>

*package.json*
```json
{
  "scripts": {
    "analyze-bundle-size": "dash4-analyze-bundle-size",
    "prebuild": "dash4-prebuild",
    "build": "dash4-npm-run-all build:*",
    "build:client": "dash4-build-client",
    "build:server": "dash4-build-server",
    "prepublishOnly": "dash4-npm-run-all build",
    "start": "dash4-start",
    "static": "dash4-static",
    "test": "dash4-npm-run-all test:*",
    "test:client": "dash4-test-client",
    "test:server": "dash4-test-server",
    "watch-build": "dash4-watch-build",
    "watch-dist": "dash4-watch-dist",
    "watch-test-client": "dash4-watch-test-client",
    "watch-test-server": "dash4-watch-test-server"
  }
}
```

*tsconfig.json*

```json
{
  "extends": "@dash4/config/tsconfig.json",
  "exclude": ["dist", "build", "node_modules", "__tests__", "src/server"]
}
```

*tsconfig.test.json*

```json
{
  "extends": "@dash4/config/tsconfig.test.json",
  "exclude": ["dist", "build", "node_modules", "__tests__", "src/server"]
}
```

*tsconfig.server.json*

```json
{
  "extends": "@dash4/config/tsconfig.server.json",
  "exclude": ["dist", "build", "node_modules", "__tests__", "src/client"]
}
```

*jest.config.js*

```js
module.exports = require('@dash4/config/jest.config');
```

*jest.server.config.js*

```js
module.exports = require('@dash4/config/jest.server.config');
```

*webpack.config.js*

```js
module.exports = require('@dash4/config/webpack.config.js')('###PLUGIN_NAME###');
```

## <a name="license">License</a>

The dash4 config is [MIT licensed](./LICENSE)


<div align="center">
<h1>Dash4 config</h1>
Set of configurations and scripts for creating a `Dash4 Plugin`.
<br />
<br />

[![NPM version](https://badge.fury.io/js/%40dash4%2Fconfig.svg)](https://www.npmjs.com/package/@dash4/client)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)

<br />
</div>

The following documentation is just relevant for dash4 plugin development. For informations on how to use Dash4 please read this: [Dash4 documentation](https://github.com/smollweide/dash4/blob/master/README.md)

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)

## <a name="installation">Installation</a>
`npm i -D @dash4/server @dash4/config cross-env nodemon rimraf typescript webpack @types/jest jest ts-jest @testing-library/react`

## <a name="usage">Usage</a>

*package.json*
```json
{
  "scripts": {
    "analyze-bundle-size": "cross-env NODE_ENV=production ANALYZE_ENV=bundle webpack --mode production",
    "prebuild": "rimraf build dist",
    "build": "npm-run-all build:*",
    "build:client": "cross-env NODE_ENV=production webpack --mode production",
    "build:server": "tsc --outDir build --project tsconfig.server.json",
    "prepublishOnly": "npm-run-all test build",
    "start": "cross-env NODE_ENV=development nodemon ./node_modules/@dash4/server/bin --watch ./build --watch ./dash4.config.js",
    "static": "node ./node_modules/@dash4/server/bin",
    "test": "npm-run-all test:*",
    "test:client": "jest --coverage --config=jest.config.js",
    "test:server": "jest --coverage --config=jest.server.config.js",
    "watch-build": "tsc --watch --outDir build --project tsconfig.server.json",
    "watch-dist": "cross-env NODE_ENV=development webpack --mode production --watch",
    "watch-test-client": "jest --coverage --watchAll --config=jest.config.js",
    "watch-test-server": "jest --coverage --watchAll --config=jest.server.config.js"
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

The @dash4/config is [MIT licensed](./LICENSE)

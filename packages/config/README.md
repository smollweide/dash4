
<div align="center">
<br />

[![NPM version](https://badge.fury.io/js/@dash4/client.svg)](https://www.npmjs.com/package/@dash4/client)

[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier) <!--IF(ts)-->![TypeScript-ready](https://img.shields.io/npm/types/@dash4/client.svg)<!--/IF-->

<h1>Dash4 config</h1>
<br />
Set of configurations and scripts for creating a `Dash4 Plugin`.
<br />
<br />
</div>

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)

## <a name="installation">Installation</a>
`npm i -D @dash4/config`

## <a name="usage">Usage</a>

*package.json*
```json
{
	"scripts": {
		"prepublishOnly": "dash4-prepublish-only",
		"prebuild": "dash4-prebuild",
		"build": "dash4-run-s build:*",
		"build:client": "dash4-build-client",
		"build:server": "dash4-build-server",
		"static": "dash4-static",
		"start": "dash4-start",
		"analyze-bundle-size": "dash4-analyze-bundle-size",
		"watch-build": "dash4-watch-build",
		"watch-dist": "dash4-watch-dist"
	}
}
```

*tsconfig.json*

```json
{
	"extends": "./node_modules/@dash4/config/tsconfig.json",
	"exclude": ["dist", "build", "node_modules", "__tests__", "src/server"]
}
```

*tsconfig.server.json*

```json
{
	"extends": "./node_modules/@dash4/config/tsconfig.server.json",
	"exclude": ["dist", "build", "node_modules", "__tests__", "src/client"]
}
```

*webpack.config.js*

```js
module.exports = require('@dash4/config/webpack.config.js')('###PLUGIN_NAME###');
```

## <a name="license">License</a>

The client is [MIT licensed](./LICENSE)

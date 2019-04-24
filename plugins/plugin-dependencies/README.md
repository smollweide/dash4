
<div align="center">
<h1>Dash4 Plugin Dependencies</h1>
List of all dependencies and their version
<br />
<br />

[![NPM version](https://badge.fury.io/js/%40dash4%2Fplugin-dependencies.svg)](https://www.npmjs.com/package/@dash4/plugin-dependencies)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)

<br />
<img src="https://user-images.githubusercontent.com/2912007/56676308-4ccf8a80-66be-11e9-9dfc-85884760bce2.gif" style="max-width:400px; width:100%" alt="Dash4 Plugin Dependencies screencast" />

<br />
<br />
</div>

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)

## <a name="installation">Installation</a>

```shell
npm i -D @dash4/plugin-dependencies
```

## <a name="usage">Usage</a>

*dash4.config.js*

```js
const { PluginDependencies } = require('@dash4/plugin-dependencies');

async function getConfig() {
  return {
    tabs: [
      {
        title: 'Root',
        rows: [
          [
            new PluginDependencies(),
          ],
        ],
      },
    ],
  };
}

module.exports = getConfig;
```

*options:*

```ts
// custom title (default=Dependencies)
title?: string;
// current working directory (default = process.cwd())
cwd?: string;
// grid with per breakpoint
// [12,6,3] means 100% width on small viewports, 50% on medium viewports and 33.3% on largeviewports
width?: number[];
// enable / disable dark mode
dark?: boolean;
// path to lerna.json mode which will collect all dependencies in the project
lerna?: string;
// exlude dependencies by their dependencyName
exclude?: RegExp[];
// define install process
installProcess?: {
  // custom title for installation process (default=npm run install)
	title?: string;
  // current working directory of the child process. (default = process.cwd())
  cwd?: string;
  // command which should be executed (default = 'npm run install')
  cmd?: string;
};
```

## <a name="license">License</a>

The @dash4/plugin-dependencies is [MIT licensed](./LICENSE)

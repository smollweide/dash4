
<div align="center">
<h1>Dash4 Plugin Code Coverage</h1>
Displays current code coverage
<br />
<br />

[![NPM version](https://badge.fury.io/js/%40dash4%2Fplugin-code-coverage.svg)](https://www.npmjs.com/package/@dash4/plugin-code-coverage)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)

<br />
<img src="https://user-images.githubusercontent.com/2912007/54909721-24037c00-4eeb-11e9-8ed2-038f2d0cc976.gif" style="max-width:400px; width:100%" alt="Dash4 Plugin Code Coverage screencast" />

<br />
<br />
</div>

## Table of Contents

* [Prerequisite](#prerequisite)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)

## <a name="prerequisite">Prerequisite</a>

For this Plugin a kind of test framework with coverage (lcov) reporter is needed.

## <a name="installation">Installation</a>

```shell
npm i -D @dash4/plugin-code-coverage
```

## <a name="usage">Usage</a>

*dash4.config.js*

```js
const { PluginCodeCoverage } = require('@dash4/plugin-code-coverage');

async function getConfig() {
  return {
    tabs: [
      {
        title: 'Root',
        rows: [
          [
            new PluginCodeCoverage(),
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
// current working directory of the child process.
cwd?: string;
// directory of coverage json file (default=coverage/lcov-report/index.html)
lcovHtmlPath?: string;
// define threshold level for [error, warning]
// default:
// branches: [60, 80];
// functions: [60, 80];
// lines: [60, 80];
// statements: [60, 80];
threshold?: {
  branches?: [number, number];
  functions?: [number, number];
  lines?: [number, number];
  statements?: [number, number];
};
// grid with per breakpoint
// [12,6,3] means 100% width on small viewports, 50% on medium viewports and 33.3% on large viewports
width?: number[];
// enable / disable dark mode
dark?: boolean;
```

## <a name="license">License</a>

The @dash4/plugin-code-coverage is [MIT licensed](./LICENSE)


<div align="center">

<h1>Dash4 Plugin Readme</h1>
Show readme files on your Dash4 Dashboard

<br />
<br />

[![NPM version](https://badge.fury.io/js/%40dash4%2Fplugin-readme.svg)](https://www.npmjs.com/package/@dash4/plugin-readme)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)

<br />
<img src="https://user-images.githubusercontent.com/2912007/54718716-70e9fa00-4b5b-11e9-9c76-da9a41b3a177.gif" style="max-width:400px; width:100%" alt="Dash4 Plugin Readme screencast" />

<br />
<br />
</div>

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
  * [Readme](#usage-readme)
  * [Readme list](#usage-readme-list)
* [License](#license)

## <a name="installation">Installation</a>

```shell
npm i -D @dash4/plugin-readme
```

## <a name="usage">Usage</a>

### <a name="usage-readme">Readme</a>

> By using the PluginReadme you can add single Readme file to your Dash4 Dashboard

*dash4.config.js*

```js
const { PluginReadme } = require('@dash4/plugin-readme');

async function getConfig() {
  return {
    tabs: [
      {
        title: 'Root',
        rows: [
          [
            new PluginReadme({
              file: 'README.md',
            }),
          ],
        ],
      },
    ],
  };
}

module.exports = getConfig;
```

*PluginReadme options:*

```ts
// relative path to the README file
file: string;
// grid with per breakpoint
// [12,6,3] means 100% width on small viewports, 50% on medium viewports and 33.3% on large viewports
width?: number[];
// height of readme window in pixels, percent or viewheight (vh)
height?: number | string;
```

### <a name="usage-readme-list">Readme list</a>

> By using the PluginReadmeList you can add multiple Readme files on one card to your Dash4 Dashboard

*dash4.config.js*

```js
const { PluginReadmeList } = require('@dash4/plugin-readme');

async function getConfig() {
  return {
    tabs: [
      {
        title: 'Root',
        rows: [
          [
            new PluginReadmeList({
              files: [
                {
                  title: 'Dash4',
                  file: '../../README.md',
                },
                {
                  title: 'Dash4 - PluginTerminal',
                  file: '../plugin-terminal/README.md',
                },
                {
                  title: 'Dash4 - PluginNpmScripts',
                  file: '../plugin-npm-scripts/README.md',
                },
              ],
            }),
          ],
        ],
      },
    ],
  };
}

module.exports = getConfig;
```

*PluginReadme options:*

```ts
// title of readme list
title?: string;
files: Array<{
  // title of readme file which is displayed under the file preview
  title: string;
  // relative path to the README file
  file: string;
}>;
// grid with per breakpoint
// [12,6,3] means 100% width on small viewports, 50% on medium viewports and 33.3% on large viewports
width?: number[];
```

## <a name="license">License</a>

The @dash4/plugin-readme is [MIT licensed](./LICENSE)


<div align="center">
<h1>Dash4 Plugin NpmScripts</h1>
Execute npm scripts directly from the `Dash4` interface
<br />
<br />

[![NPM version](https://badge.fury.io/js/%40dash4%2Fplugin-npm-scripts.svg)](https://www.npmjs.com/package/@dash4/plugin-npm-scripts)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)

<br />
<img src="https://user-images.githubusercontent.com/2912007/54719185-90cded80-4b5c-11e9-974d-0f2067d45a3f.gif" style="max-width:400px; width:100%" alt="Dash4 Plugin Npm Scripts screencast" />

<br />
<br />
</div>

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)

## <a name="installation">Installation</a>

```shell
npm i -D @dash4/plugin-npm-scripts
```

## <a name="usage">Usage</a>

*dash4.config.js*

```js
const { PluginNpmScripts } = require('@dash4/plugin-npm-scripts');

async function getConfig() {
  return {
    tabs: [
      {
        title: 'Root',
        rows: [
          [
            new PluginNpmScripts({
              dark: true,
              scripts: [
                {
                  title: 'chalk',
                  cmd: 'node chalk.js',
                  cwd: './bin',
                },
                {
                  title: 'ora',
                  cmd: 'node ./bin/ora.js',
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

*options:*

```ts
// enable/disable dark mode
dark?: boolean;
// grid with per breakpoint
// [12,6,3] means 100% width on small viewports, 50% on medium viewports and 33.3% on large viewports
width?: number[];
scripts: Array<{
  // title which should be displayed above the scripts
  title?: string;
  // command which should be executed
  cmd: string;
  // current working directory of the child process
  cwd?: string;
  // bootstrap button variant https://react-bootstrap.github.io/components/buttons/
  buttonVariant?: TButtonVariant;
}>;
```

## <a name="license">License</a>

The @dash4/plugin-npm-scripts is [MIT licensed](./LICENSE)


<div align="center">
<h1>Dash4 Plugin Terminal</h1>
Emulates a terminal instance in the `Dash4` interface. Allowes you to autostart / stop / start commands.
<br />
<br />

[![NPM version](https://badge.fury.io/js/%40dash4%2Fplugin-terminal.svg)](https://www.npmjs.com/package/@dash4/plugin-terminal)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)

<br />
<img src="https://user-images.githubusercontent.com/2912007/57100344-02ce5080-6d1f-11e9-8809-7a5b16de2314.gif" style="max-width:400px; width:100%" alt="Dash4 Plugin Terminal screencast" />

<br />
<br />
</div>

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)

## <a name="installation">Installation</a>

```shell
npm i -D @dash4/plugin-terminal
```

## <a name="usage">Usage</a>

*dash4.config.js*

```js
const { PluginTerminal } = require('@dash4/plugin-terminal');

async function getConfig() {
  return {
    tabs: [
      {
        title: 'Root',
        rows: [
          [
            new PluginTerminal({
              cmd: 'node ./bin/chalk.js',
              dark: true,
              autostart: true,
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
// command which should be executed
cmd: string;
// current working directory of the child process.
cwd?: string;
// define a custom title for the window
title?: string;
// define a custom subtitle for the window
subtitle?: string;
// define commands (keycodes) which are allowed to enter
allowedCommands?: Array<{
  // keycode could be "a" or 13 (enter)
  keyCode: number | string;
  // translated keyCode for terminal
  // for example if keyCode = 13 the terminalOutput is "\r"
  terminalOutput?: string;
  // title will be displayed in button
  title: string;
  // allows you to modifie (validate) the entered input before execution
  input?: (value: string) => string;
}>;
// enable/disable dark mode
dark?: boolean;
// if true the given command will be executed on start
autostart?: boolean;
// grid with per breakpoint
// [12,6,3] means 100% width on small viewports, 50% on medium viewports and 33.3% on large viewports
width?: number[];
// define fixed height
height?: number;
```

## <a name="license">License</a>

The @dash4/plugin-terminal is [MIT licensed](./LICENSE)

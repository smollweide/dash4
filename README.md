
<div align="center">
<br />
  <h1>
    <img src="/packages/client/src/components/Header/dash4_256.png" alt="Dash4 Logo" width="196" />
  </h1>
The dashboard for developers
<br />
<br />
<br />

[![Travis](https://img.shields.io/travis/dash4/master.svg)](https://travis-ci.org/smollweide/dash4) [![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier) <!--IF(ts)-->![TypeScript-ready](https://img.shields.io/npm/types/dash4.svg)<!--/IF-->


<br />
<br />
</div>

## Table of Contents

* [Usage](#usage)
* [Contributing](#contributing)
* [Thanks](#thanks)
* [License](#license)

## <a name="usage">Usage</a>

### [WIP] Installation by using the CLI

```shell
npx @dash4/cli
```

### Manual installation

```shell
npm i -D @dash4/server @dash4/plugin-terminal @dash4/plugin-npm-scripts
```

*package.json*
```json
  ...
  scripts: {
    "start": "dash4",
    ...
  }
```

*dash4.config.js*

```js
const { PluginNpmScripts } = require('@dash4/plugin-npm-scripts');
const { PluginTerminal } = require('@dash4/plugin-terminal');

async function getConfig() {
  return {
    tabs: [
      {
        title: 'Root',
        rows: [
          [
            new PluginTerminal({
              cmd: 'npm run build',
              autostart: false,
              width: [12, 6, 8],
            }),
            new PluginNpmScripts({
              dark: false,
              scripts: [
                {
                  title: 'bootstrap',
                  cmd: 'npm run bootstrap',
                },
              ],
              width: [12, 6, 4],
            }),
          ],
        ],
      },
    ],
  };
}

module.exports = getConfig;
```

### Start the dashboard

run `npm start`

## <a name="contributing">Contributing</a>

TBD

## <a name="thanks">Thanks</a>

- [Microsoft - node-pty](https://github.com/Microsoft/node-pty) for `node-pty` the pseudoterminal in Node.Js
- [Xterm](https://github.com/xtermjs/xterm.js) for bringing the terminal to the frontend
- [Zeit - hyper](https://github.com/zeit/hyper) for the implementation of xterm in react
- [JoubranJad - webdash](https://github.com/jadjoubran/webdash) for the inspiration

## <a name="license">License</a>

Dash4 is [MIT licensed](./LICENSE)

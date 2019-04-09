
<div align="center">
<br />
  <h1>
    <img src="/packages/client/src/components/Header/dash4_256.png" alt="Dash4 Logo" width="196" />
  </h1>
The dashboard for developers
<br />
<br />
<br />

[![Travis](https://img.shields.io/travis/dash4/master.svg)](https://travis-ci.org/smollweide/dash4) [![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)


<br />
<br />
</div>

## Table of Contents

* [Usage](#usage)
* [Plugins](#plugins)
* [Motivation](#motivation)
* [Contributing](#contributing)
* [Thanks](#thanks)
* [Troubleshooting](#troubleshooting)
* [License](#license)

## <a name="usage">Usage</a>

### Installation by using the CLI

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

## <a name="plugins">Plugins</a>

### Official plugins

| Name          | Version       |
| ------------- |-------------|
| [PluginTerminal](https://github.com/smollweide/dash4/blob/master/plugins/plugin-terminal/README.md) | [![NPM version](https://badge.fury.io/js/%40dash4%2Fplugin-terminal.svg)](https://www.npmjs.com/package/@dash4/plugin-terminal) |
| [PluginNpmScripts](https://github.com/smollweide/dash4/blob/master/plugins/plugin-npm-scripts/README.md) | [![NPM version](https://badge.fury.io/js/%40dash4%2Fplugin-npm-scripts.svg)](https://www.npmjs.com/package/@dash4/plugin-npm-scripts) |
| [PluginReadme](https://github.com/smollweide/dash4/blob/master/plugins/plugin-readme/README.md) | [![NPM version](https://badge.fury.io/js/%40dash4%2Fplugin-readme.svg)](https://www.npmjs.com/package/@dash4/plugin-readme) |
| [PluginCodeCoverage](https://github.com/smollweide/dash4/blob/master/plugins/plugin-code-coverage/README.md) | [![NPM version](https://badge.fury.io/js/%40dash4%2Fplugin-code-coverage.svg)](https://www.npmjs.com/package/@dash4/plugin-code-coverage) |

### Community plugins

> Your wrote a plugin for Dash4? Feel free to add PR with your plugin in this list.

### Planned plugins

| Name          |        |
| ------------- |-------------|
| PluginDependencies | ⌛Coming soon |
| PluginAction | ⌛Coming soon |
| PluginBundleSize | ⌛Coming soon |
| PluginEmbed | ⌛Coming soon |
| PluginTodos | ⌛Coming soon |
| PluginNote | ⌛Coming soon |
| PluginGitBranch | 💡Idea |
| PluginLighthouse | 💡Idea |
| PluginTypescriptCoverage | 💡Idea |
| PluginCommitizen | 💡Idea |

## <a name="motivation">Motivation</a>

You are right there are a lot of web dashboards out there. So why is another one needed now?
When a new larger project starts, it's usually a mono repository nowadays. Which is great, but has the disadvantage that each package has its own scripts, which makes the project slightly confusing. Dash4 claims to solve this problem because it was designed for mono repositories from the scratch. Another important aspect is extensibility. Dash4 is implemented with and for plugins. Almost everything is a plugin which is why it allows you to add any feature you desire. Dash4 was heavily inspired by [webdash](https://github.com/jadjoubran/webdash) and [hyper](https://github.com/zeit/hyper). From technical point of view, the most important technologies which are used in Dash4 are [react](https://reactjs.org/), [websockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API), [node-pty](https://github.com/Microsoft/node-pty) and [Xterm](https://github.com/xtermjs/xterm.js).

## <a name="contributing">Contributing</a>

TBD

## <a name="thanks">Thanks</a>

- [Microsoft - node-pty](https://github.com/Microsoft/node-pty) for `node-pty` the pseudoterminal in Node.Js
- [Xterm](https://github.com/xtermjs/xterm.js) for bringing the terminal to the frontend
- [Zeit - hyper](https://github.com/zeit/hyper) for the implementation of xterm in react
- [JoubranJad - webdash](https://github.com/jadjoubran/webdash) for the inspiration

## <a name="troubleshooting">Troubleshooting</a>

`Can't find Python executable "python"` on windows
[window-build-tools/issues/56](https://github.com/felixrieseberg/windows-build-tools/issues/56)

## <a name="license">License</a>

Dash4 is [MIT licensed](./LICENSE)

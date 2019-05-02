
<div align="center">
<br />
  <h1>
    <img src="/packages/client/src/components/Header/dash4_256.png" alt="Dash4 Logo" width="156" />
  </h1>
The dashboard for developers
<br />
<br />
<br />

[![Travis](https://img.shields.io/travis/dash4/master.svg)](https://travis-ci.org/smollweide/dash4) [![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)


<br />
<br />

<img src="https://user-images.githubusercontent.com/2912007/57101809-4bd3d400-6d22-11e9-95af-0a146d039777.png" alt="dash4 screenshot" width="1000" />

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

> For security reason please make sure you are in a secure network.

### Installation

```shell
npx @dash4/cli
```

[manual installation](./docs/manual-installation.md)

### Start the dashboard

run `npm dash4`

## <a name="plugins">Plugins</a>

### Official plugins

| Name          | Version       |
| ------------- |-------------|
| [PluginTerminal](https://github.com/smollweide/dash4/blob/master/plugins/plugin-terminal/README.md) | [![NPM version](https://badge.fury.io/js/%40dash4%2Fplugin-terminal.svg)](https://www.npmjs.com/package/@dash4/plugin-terminal) |
| [PluginNpmScripts](https://github.com/smollweide/dash4/blob/master/plugins/plugin-npm-scripts/README.md) | [![NPM version](https://badge.fury.io/js/%40dash4%2Fplugin-npm-scripts.svg)](https://www.npmjs.com/package/@dash4/plugin-npm-scripts) |
| [PluginReadme](https://github.com/smollweide/dash4/blob/master/plugins/plugin-readme/README.md) | [![NPM version](https://badge.fury.io/js/%40dash4%2Fplugin-readme.svg)](https://www.npmjs.com/package/@dash4/plugin-readme) |
| [PluginCodeCoverage](https://github.com/smollweide/dash4/blob/master/plugins/plugin-code-coverage/README.md) | [![NPM version](https://badge.fury.io/js/%40dash4%2Fplugin-code-coverage.svg)](https://www.npmjs.com/package/@dash4/plugin-code-coverage) |
| [PluginDependencies](https://github.com/smollweide/dash4/blob/master/plugins/plugin-dependencies/README.md) | [![NPM version](https://badge.fury.io/js/%40dash4%2Fplugin-dependencies.svg)](https://www.npmjs.com/package/@dash4/plugin-dependencies) |

### Community plugins

> Your wrote a plugin for Dash4? Feel free to add PR with your plugin in this list.

### Planned plugins

| Name          |        |
| ------------- |-------------|
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

Contributions to Dash4 are welcome!

* Read our [contributing guide](https://github.com/smollweide/dash4/blob/master/CONTRIBUTING.md) to get started.
* Stars :star: and Pull requests :pencil: are always welcome.

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

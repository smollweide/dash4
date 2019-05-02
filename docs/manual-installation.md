# Manual installation

```shell
npm i -D @dash4/server @dash4/plugin-terminal @dash4/plugin-npm-scripts
```

*package.json*
```json
  ...
  scripts: {
    "dash4": "dash4",
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

<div align="center">
<h1>Dash4 Plugin Actions</h1>
Create actions as teaser or simple links
<br />
<br />

[![NPM version](https://badge.fury.io/js/%40dash4%2Fplugin-actions.svg)](https://www.npmjs.com/package/@dash4/plugin-actions)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)

<br />
<img src="https://user-images.githubusercontent.com/2912007/57986275-24477000-7a73-11e9-8378-342c21388ac5.png" style="max-width:400px; width:100%" alt="Dash4 Plugin Actions screenshot" />

<br />
<br />
</div>

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)

## <a name="installation">Installation</a>

```shell
npm i -D @dash4/plugin-actions
```

## <a name="usage">Usage</a>

*dash4.config.js*

```js
const { PluginActions } = require('@dash4/plugin-actions');

async function getConfig() {
  return {
    tabs: [
      {
        title: 'Root',
        rows: [
          [
            new PluginActions({
              title: 'Links',
              actions: [
                {
                  type: 'link',
                  href: 'http://localhost:6006',
                  title: 'Ui',
                  image: 'http://localhost:6006/assets/logo.png',
                },
              ],
            }),
            new PluginActions({
              actions: [
                {
                  type: 'teaser',
                  title: 'Ui',
                  subtitle: 'React ui kit using storybook',
                  image: 'http://localhost:6006/assets/logo.png',
                  links: [
                    {
                      type: 'link',
                      href: 'http://localhost:6006',
                      title: 'Ui',
                    },
                  ],
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
interface IActionLink {
	type: 'link';
	title: string;
	href: string;
	image?: string;
	icon?: string;
}
```

```ts
interface IActionTeaser {
	type: 'teaser';
	title: string;
	subtitle?: string;
	link?: IActionLink | IActionLink[];
	image?: string;
	icon?: string;
}
```

```ts
// custom title (default=Code coverage)
title?: string;
// grid with per breakpoint
// [12,6,3] means 100% width on small viewports, 50% on medium viewports and 33.3% on largeviewports
width?: number[];
// enable / disable dark mode
dark?: boolean;
// Array of actions (displayed as list)
// an action could be a link or a teaser
actions?: IActionLink[] | IActionTeaser[];
```

## <a name="license">License</a>

The @dash4/plugin-actions is [MIT licensed](./LICENSE)

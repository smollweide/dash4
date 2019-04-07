
<div align="center">
<h1>Dash4 CLI</h1>
The Dash4 command line interface
<br />
<br />

[![NPM version](https://badge.fury.io/js/%40dash4%2Fserver.svg)](https://www.npmjs.com/package/@dash4/cli)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier) ![TypeScript-ready](https://img.shields.io/npm/types/@dash4/cli.svg)

<br />
</div>

## Usage

```shell
npx @dash4/cli
```

## API

```ts
import path from 'path';
import { init } from '@dash4/cli';

(async () => {
  await init(process.cwd(), {
    port: 8888,
    config: path.join(process.cwd(), 'dash4.config.js'),
    force: true,
  });
})();
```

## License

The @dash4/cli is [MIT licensed](./LICENSE)

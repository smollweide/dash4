
<div align="center">
<h1>Dash4 terminal emulator</h1>
Terminal emulator using node-pty
<br />
<br />

[![NPM version](https://badge.fury.io/js/%40dash4%2Fterminal-emulator.svg)](https://www.npmjs.com/package/@dash4/terminal-emulator)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier) ![TypeScript-ready](https://img.shields.io/npm/types/@dash4/terminal-emulator.svg)

<br />
</div>

The following documentation is just relevant for dash4 plugin development. For informations on how to use Dash4 please read this: [Dash4 documentation](https://github.com/smollweide/dash4/blob/master/README.md)

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)

## <a name="installation">Installation</a>

```shell
npm i @dash4/terminal-emulator
```

## <a name="usage">Usage</a>

```ts
import { terminalEmulator } from '@dash4/terminal-emulator';

const term = terminalEmulator({
  cwd: process.cwd(),
  onData: (data) => {
    process.stdin.write(data);
  },
  onStopProcessing: () => {
    // do something
  },
});

term.write('npm run test\r');
```

## License

The @dash4/terminal-emulator is [MIT licensed](./LICENSE)

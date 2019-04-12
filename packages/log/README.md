
<div align="center">
<h1>Dash4 log</h1>
pretty log for dash4
<br />
<br />

[![NPM version](https://badge.fury.io/js/%40dash4%2Flog.svg)](https://www.npmjs.com/package/@dash4/log)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier) ![TypeScript-ready](https://img.shields.io/npm/types/@dash4/log.svg)

<br />
</div>

The following documentation is just relevant for dash4 plugin development. For informations on how to use Dash4 please read this: [Dash4 documentation](https://github.com/smollweide/dash4/blob/master/README.md)

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
  * [server-side](#server-side)
  * [client-side](#client-side)
* [License](#license)

## <a name="installation">Installation</a>

```shell
npm i -D @dash4/log
```

## <a name="usage">Usage</a>

### <a name="server-side">server-side</a>

<img src="https://user-images.githubusercontent.com/2912007/55966764-4f22f500-5c79-11e9-804c-ab26067789bb.gif" style="max-width:320px; width:100%" alt="Dash4 server logger" />
<br/>
<br/>


```ts
import { log, info, success, error, warn, spinner } from '@dash4/log';

log('terminal', 'place text here');
info('readme', 'place text here');
success('npm-scripts', 'place text here');
error('dependencies', 'place text here');
warn('ui', 'place text here');

const spin = spinner('terminal', 'load config');
spin.start();
await wait(1000);
spin.type('warn');
spin.text('needs longer than usual');
await wait(1000);
spin.succeed('config loaded');
```

*types*

```ts
type TPackageName = 'server' | 'terminal-emulator' | 'cli' | string;
type TMessage = string | number | object | any[];
type TType = 'log' | 'info' | 'success' | 'error' | 'warn';

export const log = (packageName: TPackageName, message: TMessage) => void;
export const info = (packageName: TPackageName, message: TMessage) => void;
export const success = (packageName: TPackageName, message: TMessage) => void;
export const error = (packageName: TPackageName, message: TMessage) => void;
export const warn = (packageName: TPackageName, message: TMessage) => void;

export function spinner(packageName: TPackageName, message: TMessage, type?: TType): {
  start(): void;
  succeed(_message: string): void;
  fail(_message: string): void;
  warn(_message: string): void;
  info(_message: string): void;
  text(_message: string): void;
  type(_message: string): void;
  stop(): void;
  stopAndPersist(): void;
  clear: (): void;
  isSpinning: boolean;
  indent: number;
}
```

### <a name="client-side">client-side</a>

<img src="https://user-images.githubusercontent.com/2912007/55966495-d1f78000-5c78-11e9-988b-47e11aaac3bf.png" style="max-width:320px; width:100%" alt="Dash4 client logger" />
<br/>
<br/>

```ts
import { log, info, success, error, warn } from '@dash4/log/build/browser';

log('terminal', 'place some text here');
info('readme', 'place some text here');
success('npm-scripts', 'place some text here');
error('dependencies', 'place some text here');
warn('ui', 'place some text here');
```

*types*

```ts
export type TPackageName = 'client' | 'react-xterm' | 'ui' | string;
export type TMessage = string | number | object | any[];

export const log = (packageName: TPackageName, message: TMessage, ...args: TMessage[]) => void;
export const info = (packageName: TPackageName, message: TMessage, ...args: TMessage[]) => void;
export const success = (packageName: TPackageName, message: TMessage, ...args: TMessage[]) => void;
export const error = (packageName: TPackageName, message: TMessage, ...args: TMessage[]) => void;
export const warn = (packageName: TPackageName, message: TMessage, ...args: TMessage[]) => void;
```


## License

The @dash4/log is [MIT licensed](./LICENSE)

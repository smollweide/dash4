
<div align="center">
<h1>Dash4 Client</h1>
Dash4 webapp client application
<br />
<br />

[![NPM version](https://badge.fury.io/js/%40dash4%2Fclient.svg)](https://www.npmjs.com/package/@dash4/client)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)

<br />
</div>

The following documentation is just relevant for dash4 plugin development. For informations on how to use Dash4 please read this: [Dash4 documentation](https://github.com/smollweide/dash4/blob/master/README.md)

## Table of Contents

* [Installation](#installation)
* [Utils](#utils)
  * [registerPlugin](#util-register-plugin)
  * [socket](#util-socket)
  * [useEffectAsync](#util-use-effect-async)
* [Components](#components)
* [License](#license)

## <a name="installation">Installation</a>

```shell
npm i @dash4/client
```

## <a name="utils">Utils</a>

### <a name="util-register-plugin">registerPlugin</a>

> register your Plugin to make it accessible for the Dash4 client application

```tsx
import React from 'react';
import { registerPlugin } from '@dash4/client/build/register-plugin';

export const Plugin = () => {
  return (
    <div>Your Plugin</div>
  );
};

registerPlugin('PluginName', Plugin);
```

*arguments:*

```ts
name: string;
PluginComponent: JSX.Element;
```

### <a name="util-socket">socket</a>

> use (web) sockets to communicate with the Dash4 server application

* [Read here how to implement the socket on serverside](https://github.com/smollweide/dash4/blob/master/packages/server/README.md)

* add subscribe function

```tsx
async function subscribe(id: string, onChange: (data: string) => void) {
  const socketData = await socket();
  const on = (name: string, callback: (data: string) => void) => {
    socketData.on(`plugin-name-${id}_${name}`, callback);
  };
  const send = (name: string, data?: string) => {
    socketData.send(`plugin-name-${id}_${name}`, data);
  };

  send('connected');
  on('data', (data: string) => {
    onChange(data);
  });

  return send;
}
```

* add unsubscribe function

```tsx
async function unsubscribe(id: string) {
  const socketData = await socket();
  const off = (name: string) => {
    socketData.off(`plugin-name-${id}_${name}`);
  };

  off('connected');
  off('data');
}
```

* Usage example with react hooks (works of cause also with lifecycle methods)

```tsx
import React, { useState } from 'react';
import { useEffectAsync } from '@dash4/client/build/react-hooks';

export function useSocket(id: string) {
  const [data, setData] = useState('');
  const handleRecieveData = (_data: string) => setData(_data);

  useEffectAsync(async () => {
    await subscribe(id, handleRecieveData);
    return () => unsubscribe(id);
  }, []);

  return data;
}

function YourPlugin({ id }: IProps) {
  const data = useSocket(id);
  return (
    <div>{data}</div>
  );
}
```

### <a name="util-use-effect-async">useEffectAsync</a>

> React hook for async version of useEffect

```tsx
import React, { useState } from 'react';
import { useEffectAsync } from '@dash4/client/build/react-hooks';

export function useSocket(id: string) {
  const [data, setData] = useState('');
  const handleRecieveData = (_data: string) => setData(_data);

  useEffectAsync(async () => {
    await subscribe(id, handleRecieveData);
    return () => unsubscribe(id);
  }, []);

  return data;
}
```


## <a name="components">Components</a>
[@dash4/ui](https://github.com/smollweide/dash4/blob/master/packages/ui/README.md)

### <a name="component-xterm">Xterm</a>
[@dash4/react-xterm](https://github.com/smollweide/dash4/blob/master/packages/react-xterm/README.md)

## <a name="license">License</a>

The @dash4/client is [MIT licensed](./LICENSE)

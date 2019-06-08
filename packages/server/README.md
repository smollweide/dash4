
<div align="center">
<h1>Dash4 Server</h1>
Dash4 webapp server application
<br />
<br />

[![NPM version](https://badge.fury.io/js/%40dash4%2Fserver.svg)](https://www.npmjs.com/package/@dash4/server)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier) ![TypeScript-ready](https://img.shields.io/npm/types/@dash4/server.svg)

<br />
</div>

The following documentation is just relevant for dash4 plugin development. For informations on how to use Dash4 please read this: [Dash4 documentation](https://github.com/smollweide/dash4/blob/master/README.md)

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)

## <a name="installation">Installation</a>

```shell
npm i @dash4/server
```

## <a name="usage">Usage</a>

```ts
import { Dash4Plugin, IDash4Plugin } from '@dash4/server';
import { IncomingMessage, ServerResponse } from 'http';

interface IClientConfig {
  something: string;
}

interface IOptions {
  something: string;
  // enable/disable dark mode
  dark?: boolean;
  // grid with per breakpoint
  // [12,6,3] means 100% width on small viewports, 50% on medium viewports and 33.3% on large viewports
  width?: number[];
}

class PluginName extends Dash4Plugin implements IDash4Plugin<IClientConfig> {
  
  private _something: string;

  constructor({ dark, width, something }: IOptions) {
    super({
      dark,
      width,
      name: 'PluginName',
      lowerCaseName: 'plugin-name',
    });

    this._something = something;
  }

  /**
   * clientConfig object will be accessible in client via Plugin component props 
   */
  public get clientConfig() {
    return {
      something: this._something,
    };
  }

  /**
   * add files as script/style tag to the index.html and make them available
   * it's also possible to define them like this:
   * {
   *   pathName: string;
     *   scriptTag?: boolean;
   * }
   * this is needed for dynamic imports
   */
  public get clientFiles() {
    return [path.join(__dirname, '../../dist/plugins/plugin-name/main.js')];
  }

  /**
   * method connected will be executed after a connection via sockets is established
   * super class provides a `on` and `send` method
   */
  public connected = async (on: TOn, send: TSend) => {
    this.on('connected', () => {
      this.send('data', 'some conntent');
    });
  };

  /**
   * method severRequest allowes to provide rest endpoints (for example images)
   */
  public serverRequest = async (req: IncomingMessage, res: ServerResponse) => {
    if (req.url === imagePublicPath) {
      res.writeHead(200, {
        'Content-Type': 'image/png',
      });
      res.end(await fs.readFile(imageDiskPath));
      return true;
    }
    return false;
  };
}
```

## License

The @dash4/server is [MIT licensed](./LICENSE)

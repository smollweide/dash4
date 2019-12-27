import { Dash4Plugin, IDash4Plugin } from '@dash4/server';
import fs from 'fs-extra';
import { IncomingMessage, ServerResponse } from 'http';
import { contentType as getContentType } from 'mime-types';
import path from 'path';
import { IReadmeClientConfig } from '../shared-types';
import { transformEmojis } from './transform-emojis';

export interface IReadmeOptions {
	// relative path to the README file
	file: string;
	// grid with per breakpoint
	// [12,6,3] means 100% width on small viewports, 50% on medium viewports and 33.3% on large viewports
	width?: number[];
	// height of readme window in pixels, percent or viewheight (vh)
	height?: number | string;
}

const processCwd = fs.realpathSync(process.cwd());

export class PluginReadme extends Dash4Plugin implements IDash4Plugin<IReadmeClientConfig> {
	private _file: string;
	private _height?: number | string;

	public constructor({ file, width, height }: IReadmeOptions) {
		super({
			dark: false,
			width,
			name: 'PluginReadme',
			lowerCaseName: 'plugin-readme',
		});

		this._file = path.join(processCwd, file);
		this._height = height;
	}

	public get clientConfig() {
		return {
			file: this._file,
			height: this._height,
		};
	}

	public get clientFiles() {
		return [
			path.join(__dirname, '../../dist/plugins/plugin-readme/main.js'),
			path.join(__dirname, '../../dist/plugins/plugin-readme/main.css'),
		];
	}

	public connected = async () => {
		this.on('connected', this.sendFile);
	};

	public serverRequest = async (req: IncomingMessage, res: ServerResponse) => {
		const data = await this.fetchFile();
		const reg = /src="(\.)?\/[^"]*"/g;
		let result: any;
		// eslint-disable-next-line
		while ((result = reg.exec(data))) {
			const imagePublicPath = result[0]
				.toString()
				.replace(/^src="\./, '')
				.replace(/^src="/, '')
				.replace(/"$/, '');
			const imageDiskPath = path.join(path.dirname(this._file), imagePublicPath);

			if (req.url === imagePublicPath) {
				res.writeHead(200, {
					'Content-Type': getContentType(path.extname(imagePublicPath)) || '',
				});
				// eslint-disable-next-line
				res.end(await fs.readFile(imageDiskPath));
				return true;
			}
		}

		return false;
	};

	private sendFile = async () => {
		this.send('data', await this.fetchFile());
	};

	private fetchFile = async () => {
		const markdown = await fs.readFile(this._file, 'utf8');
		// fix not supported tsx https://github.com/highlightjs/highlight.js/issues/1155
		return transformEmojis(markdown.replace(/```tsx/g, '```jsx'));
	};
}

import { Dash4Plugin, IDash4Plugin, TServerRequest } from '@dash4/server';
import { TOn, TSend } from '@dash4/server/src';
import path from 'path';
import { IReadmeListClientConfig } from '../shared-types';
import { PluginReadme } from './readme';

interface IFile {
	title: string;
	file: string;
}

export interface IReadmeListOptions {
	title?: string;
	files: IFile[];
	width?: number[];
}

export class PluginReadmeList extends Dash4Plugin implements IDash4Plugin<IReadmeListClientConfig> {
	public serverRequests: TServerRequest[] = [];
	private _instances: PluginReadme[] = [];
	private _title?: string;
	private _files: IFile[];

	constructor({ title, files, width }: IReadmeListOptions) {
		super({
			dark: false,
			width,
			name: 'PluginReadmeList',
			lowerCaseName: 'plugin-readme-list',
		});

		this._title = title;
		this._files = files;

		files.forEach(({ file }) => {
			const instance = new PluginReadme({ file });
			this._instances.push(instance);
			this.serverRequests.push(instance.serverRequest);
		});
	}

	public get clientConfig() {
		return {
			title: this._title,
			files: this._instances.map((instance, index) => {
				return {
					...instance.clientConfig,
					id: instance.id,
					title: this._files[index].title,
				};
			}),
		};
	}

	public get clientFiles() {
		return [path.join(__dirname, '../../dist/plugins/plugin-readme/main.js')];
	}

	public connected = (on: TOn, send: TSend) => {
		this._instances.forEach((instance) => instance.connect(on, send));
	};
}

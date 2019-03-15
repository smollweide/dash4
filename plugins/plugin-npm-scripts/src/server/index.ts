import { Dash4Plugin, IDash4Plugin, TOn, TSend } from '@dash4/server';
import fs from 'fs';
import path from 'path';
import { IClientConfig, IScript, IScriptWithId } from '../shared-types';
import { PluginNpmScript } from './plugin-npm-script';

export interface IOptions {
	id: string;
	dark?: boolean;
	width?: number[];
	scripts: IScript[];
}

const processCwd = fs.realpathSync(process.cwd());

export class PluginNpmScripts extends Dash4Plugin implements IDash4Plugin<IClientConfig> {
	public id: string;
	public dark: boolean;
	public width: number[];
	private scripts: IScriptWithId[];
	private instances: PluginNpmScript[];

	constructor({ id, scripts, width, dark = false }: IOptions) {
		super({
			id,
			width,
			dark,
			name: 'PluginNpmScripts',
			lowerCaseName: 'plugin-npm-scripts',
		});
		this.scripts = scripts.map((script, index) => ({
			...script,
			id: index.toString(),
			cwd: script.cwd ? path.join(processCwd, script.cwd) : processCwd,
		}));
		this.instances = this.scripts.map((script) => {
			return new PluginNpmScript({
				id,
				script,
			});
		});
	}

	public get clientConfig() {
		return {
			scripts: this.scripts,
		};
	}

	public get clientFiles() {
		return [path.join(__dirname, '../../dist/plugins/plugin-npm-scripts/main.js')];
	}

	public connect = (on: TOn, send: TSend) => {
		this.instances.forEach((instance) => instance.connect(on, send));
	};
}

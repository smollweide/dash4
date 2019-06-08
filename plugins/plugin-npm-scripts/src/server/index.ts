import { Dash4Plugin, IDash4Plugin, TOn, TSend } from '@dash4/server';
import fs from 'fs';
import path from 'path';
import { IClientConfig, IScript, IScriptWithId } from '../shared-types';
import { PluginNpmScript } from './plugin-npm-script';

export interface IOptions {
	// enable/disable dark mode
	dark?: boolean;
	// grid with per breakpoint
	// [12,6,3] means 100% width on small viewports, 50% on medium viewports and 33.3% on large viewports
	width?: number[];
	scripts: IScript[];
}

const processCwd = fs.realpathSync(process.cwd());

export class PluginNpmScripts extends Dash4Plugin implements IDash4Plugin<IClientConfig> {
	public dark: boolean;
	public width: number[];
	private scripts: IScriptWithId[];
	private instances: PluginNpmScript[];

	constructor({ scripts, width, dark = false }: IOptions) {
		super({
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
				id: this.id,
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

	public connected = (on: TOn, send: TSend) => {
		this.instances.forEach((instance) => instance.connect(on, send));
	};
}

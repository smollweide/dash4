import prettierConfig from '@namics/prettier-config';
import { format, Options as IPrettierOptions } from 'prettier';
import { chunk } from '../chunk';
import tmpl from './template';

export const pluginNameMap = {
	PluginTerminal: 'PluginTerminal',
	PluginNpmScripts: 'PluginNpmScripts',
	PluginReadme: 'PluginReadme',
	PluginCodeCoverage: 'PluginCodeCoverage',
} as const;

export type TPluginName = keyof typeof pluginNameMap;

const pluginMap = {
	PluginTerminal: {
		url: () => `https://github.com/smollweide/dash4/tree/master/plugins/plugin-terminal`,
		import: () => `const { PluginTerminal } = require('@dash4/plugin-terminal');`,
		content: (options: any) => `<DASH4>new PluginTerminal(${JSON.stringify(options)})</DASH4>`,
	},
	PluginNpmScripts: {
		url: () => `https://github.com/smollweide/dash4/tree/master/plugins/plugin-npm-scripts`,
		import: () => `const { PluginNpmScripts } = require('@dash4/plugin-npm-scripts');`,
		content: (options: any) => `<DASH4>new PluginNpmScripts(${JSON.stringify(options)})</DASH4>`,
	},
	PluginReadme: {
		url: () => `https://github.com/smollweide/dash4/tree/master/plugins/plugin-readme`,
		import: () => `const { PluginReadme } = require('@dash4/plugin-readme');`,
		content: (options: any) => `<DASH4>new PluginReadme(${JSON.stringify(options)})</DASH4>`,
	},
	PluginCodeCoverage: {
		url: () => `https://github.com/smollweide/dash4/tree/master/plugins/plugin-code-coverage`,
		import: () => `const { PluginCodeCoverage } = require('@dash4/plugin-code-coverage');`,
		content: (options?: any) => `<DASH4>new PluginCodeCoverage(${options ? JSON.stringify(options) : ''})</DASH4>`,
	},
};

export class Config {
	private _imports: { [key: string]: string } = {};
	private _tabs: { [key: string]: string[] } = {};
	private _port: number;

	constructor({ port }: { port: number }) {
		this._port = port;
	}

	public addPlugin = <O = any>(tabName: string, name: TPluginName, options?: O) => {
		this._imports[name] = `// ${pluginMap[name].url()}\n${pluginMap[name].import()}`;
		if (!this._tabs[tabName]) {
			this._tabs[tabName] = [];
		}
		this._tabs[tabName].push(pluginMap[name].content(options) as string);
	};

	public get tabs() {
		const tabs: Array<{
			title: string;
			rows: string[][];
		}> = [];
		Object.keys(this._tabs).forEach((tabName) => {
			tabs.push({
				title: tabName,
				rows: chunk(this._tabs[tabName], 2),
			});
		});
		return tabs;
	}

	public get tabsString() {
		return JSON.stringify(this.tabs, null, 2)
			.replace(/"<DASH4>/g, '')
			.replace(/<\/DASH4>"/g, '')
			.replace(/\\"/g, '"');
	}

	public get imports() {
		return Object.keys(this._imports)
			.map((key) => this._imports[key])
			.join(`\n`);
	}

	public toString() {
		return format(
			tmpl({
				imports: this.imports,
				port: this._port,
				tabs: this.tabsString,
			}),
			prettierConfig as IPrettierOptions
		);
	}
}

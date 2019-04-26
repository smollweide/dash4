/// <reference types="@types/jest" />
import fs from 'fs-extra';
import path from 'path';
import { Config } from './Config';

describe('Config', () => {
	test('is function', async () => {
		expect(typeof Config).toBe('function');
	});
	test('add plugin', async () => {
		const config = new Config({ port: 8080 });
		config.addPlugin('Root', 'PluginCodeCoverage');
		expect(config.tabs).toEqual([
			{
				title: 'Root',
				rows: [['<DASH4>new PluginCodeCoverage()</DASH4>']],
			},
		]);
		expect(config.imports).toBe(
			`// https://github.com/smollweide/dash4/tree/master/plugins/plugin-code-coverage\nconst { PluginCodeCoverage } = require('@dash4/plugin-code-coverage');`
		);
	});
	test('add multiple plugins', async () => {
		const config = new Config({ port: 8080 });
		config.addPlugin('Root', 'PluginTerminal', { cmd: 'npm run test' });
		config.addPlugin('Root', 'PluginCodeCoverage');
		config.addPlugin('Root', 'PluginReadme', { file: 'README.md' });
		config.addPlugin('Root', 'PluginNpmScripts', {
			scripts: [
				{
					title: 'build',
					cmd: 'npm run build',
				},
			],
		});
		config.addPlugin('Root', 'PluginDependencies', { lerna: './lerna.json' });

		expect(config.tabs).toEqual([
			{
				title: 'Root',
				rows: [
					[
						'<DASH4>new PluginTerminal({"cmd":"npm run test"})</DASH4>',
						'<DASH4>new PluginCodeCoverage()</DASH4>',
					],
					[
						'<DASH4>new PluginReadme({"file":"README.md"})</DASH4>',
						'<DASH4>new PluginNpmScripts({"scripts":[{"title":"build","cmd":"npm run build"}]})</DASH4>',
					],
					['<DASH4>new PluginDependencies({"lerna":"./lerna.json"})</DASH4>'],
				],
			},
		]);
		expect(config.imports).toBe(
			[
				`// https://github.com/smollweide/dash4/tree/master/plugins/plugin-terminal`,
				`const { PluginTerminal } = require('@dash4/plugin-terminal');`,
				`// https://github.com/smollweide/dash4/tree/master/plugins/plugin-code-coverage`,
				`const { PluginCodeCoverage } = require('@dash4/plugin-code-coverage');`,
				`// https://github.com/smollweide/dash4/tree/master/plugins/plugin-readme`,
				`const { PluginReadme } = require('@dash4/plugin-readme');`,
				`// https://github.com/smollweide/dash4/tree/master/plugins/plugin-npm-scripts`,
				`const { PluginNpmScripts } = require('@dash4/plugin-npm-scripts');`,
				`// https://github.com/smollweide/dash4/tree/master/plugins/plugin-dependencies`,
				`const { PluginDependencies } = require('@dash4/plugin-dependencies');`,
			].join('\n')
		);
		expect(config.toString()).toMatchSnapshot();
	});
	test('add plugins in mutiple tabs', async () => {
		const config = new Config({ port: 8080 });
		config.addPlugin('Root', 'PluginTerminal', { cmd: 'npm run test' });
		config.addPlugin('Cli', 'PluginCodeCoverage');
		config.addPlugin('Client', 'PluginReadme', { file: 'README.md' });
		config.addPlugin('Client', 'PluginNpmScripts', {
			scripts: [
				{
					title: 'build',
					cmd: 'npm run build',
				},
			],
		});
		expect(config.tabs).toEqual([
			{
				title: 'Root',
				rows: [['<DASH4>new PluginTerminal({"cmd":"npm run test"})</DASH4>']],
			},
			{
				title: 'Cli',
				rows: [['<DASH4>new PluginCodeCoverage()</DASH4>']],
			},
			{
				title: 'Client',
				rows: [
					[
						'<DASH4>new PluginReadme({"file":"README.md"})</DASH4>',
						'<DASH4>new PluginNpmScripts({"scripts":[{"title":"build","cmd":"npm run build"}]})</DASH4>',
					],
				],
			},
		]);
		expect(config.imports).toBe(
			[
				`// https://github.com/smollweide/dash4/tree/master/plugins/plugin-terminal`,
				`const { PluginTerminal } = require('@dash4/plugin-terminal');`,
				`// https://github.com/smollweide/dash4/tree/master/plugins/plugin-code-coverage`,
				`const { PluginCodeCoverage } = require('@dash4/plugin-code-coverage');`,
				`// https://github.com/smollweide/dash4/tree/master/plugins/plugin-readme`,
				`const { PluginReadme } = require('@dash4/plugin-readme');`,
				`// https://github.com/smollweide/dash4/tree/master/plugins/plugin-npm-scripts`,
				`const { PluginNpmScripts } = require('@dash4/plugin-npm-scripts');`,
			].join('\n')
		);
		expect(config.toString()).toBe(
			await fs.readFile(path.join(process.cwd(), 'src/__mocks__/config/_lerna-dash4.config.js'), 'utf8')
		);
	});
});

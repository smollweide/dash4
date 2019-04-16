/**
 *
 * 	DASH4 configuration
 *  https://github.com/smollweide/dash4
 *
 */
// https://github.com/smollweide/dash4/tree/master/plugins/plugin-readme
const { PluginReadme } = require('@dash4/plugin-readme');
// https://github.com/smollweide/dash4/tree/master/plugins/plugin-code-coverage
const { PluginCodeCoverage } = require('@dash4/plugin-code-coverage');
// https://github.com/smollweide/dash4/tree/master/plugins/plugin-npm-scripts
const { PluginNpmScripts } = require('@dash4/plugin-npm-scripts');
// https://github.com/smollweide/dash4/tree/master/plugins/plugin-terminal
const { PluginTerminal } = require('@dash4/plugin-terminal');

async function getConfig() {
	return {
		port: 8080,
		tabs: [
			{
				title: 'Root',
				rows: [
					[new PluginReadme({ file: 'README.md' }), new PluginCodeCoverage()],
					[
						new PluginNpmScripts({
							scripts: [
								{ title: 'bootstrap', cmd: 'npm run bootstrap' },
								{ title: 'build', cmd: 'npm run build' },
								{ title: 'test', cmd: 'npm run test' },
								{ title: 'lint', cmd: 'npm run lint' },
							],
						}),
					],
				],
			},
			{
				title: 'all-scripts',
				rows: [
					[
						new PluginTerminal({ cmd: 'npm start', cwd: 'packages/all-scripts', autostart: true }),
						new PluginTerminal({ cmd: 'npm run storybook', cwd: 'packages/all-scripts' }),
					],
					[
						new PluginReadme({ file: 'packages/all-scripts/README.md' }),
						new PluginTerminal({ cmd: 'npm run watch-test', cwd: 'packages/all-scripts' }),
					],
					[
						new PluginCodeCoverage({ cwd: 'packages/all-scripts' }),
						new PluginNpmScripts({
							scripts: [
								{ title: 'bootstrap', cmd: 'npm run bootstrap', cwd: 'packages/all-scripts' },
								{ title: 'build', cmd: 'npm run build', cwd: 'packages/all-scripts' },
								{ title: 'watch', cmd: 'npm run watch', cwd: 'packages/all-scripts' },
								{ title: 'test', cmd: 'npm run test', cwd: 'packages/all-scripts' },
								{ title: 'lint', cmd: 'npm run lint', cwd: 'packages/all-scripts' },
								{ title: 'clean', cmd: 'npm run clean', cwd: 'packages/all-scripts' },
								{ title: 'flow', cmd: 'npm run flow', cwd: 'packages/all-scripts' },
								{ title: 'compile', cmd: 'npm run compile', cwd: 'packages/all-scripts' },
								{ title: 'format', cmd: 'npm run format', cwd: 'packages/all-scripts' },
								{ title: 'prettier', cmd: 'npm run prettier', cwd: 'packages/all-scripts' },
								{ title: 'coverage', cmd: 'npm run coverage', cwd: 'packages/all-scripts' },
								{ title: 'prepare', cmd: 'npm run prepare', cwd: 'packages/all-scripts' },
								{ title: 'validate', cmd: 'npm run validate', cwd: 'packages/all-scripts' },
								{ title: 'deploy', cmd: 'npm run deploy', cwd: 'packages/all-scripts' },
								{ title: 'docs', cmd: 'npm run docs', cwd: 'packages/all-scripts' },
								{
									title: 'build-storybook',
									cmd: 'npm run build-storybook',
									cwd: 'packages/all-scripts',
								},
							],
						}),
					],
				],
			},
			{
				title: 'readme',
				rows: [[new PluginReadme({ file: 'packages/readme/README.md' })]],
			},
			{
				title: 'readme-low',
				rows: [[new PluginReadme({ file: 'packages/readme-low/README.md' })]],
			},
			{
				title: 'script-start',
				rows: [[new PluginTerminal({ cmd: 'npm start', cwd: 'packages/script-start', autostart: true })]],
			},
			{
				title: 'script-storybook',
				rows: [[new PluginTerminal({ cmd: 'npm run storybook', cwd: 'packages/script-storybook' })]],
			},
			{
				title: 'script-test',
				rows: [
					[
						new PluginCodeCoverage({ cwd: 'packages/script-test' }),
						new PluginNpmScripts({
							scripts: [{ title: 'test', cmd: 'npm run test', cwd: 'packages/script-test' }],
						}),
					],
				],
			},
			{
				title: 'script-watch-test',
				rows: [
					[
						new PluginTerminal({ cmd: 'npm run watch-test', cwd: 'packages/script-watch-test' }),
						new PluginCodeCoverage({ cwd: 'packages/script-watch-test' }),
					],
				],
			},
		],
	};
}

module.exports = getConfig;

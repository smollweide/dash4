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
						new PluginTerminal({ cmd: 'npm start', autostart: true }),
						new PluginTerminal({ cmd: 'npm run storybook' }),
					],
					[new PluginReadme({ file: 'README.md' }), new PluginTerminal({ cmd: 'npm run watch-test' })],
					[
						new PluginCodeCoverage(),
						new PluginNpmScripts({
							scripts: [
								{ title: 'bootstrap', cmd: 'npm run bootstrap' },
								{ title: 'build', cmd: 'npm run build' },
								{ title: 'watch', cmd: 'npm run watch' },
								{ title: 'test', cmd: 'npm run test' },
								{ title: 'lint', cmd: 'npm run lint' },
								{ title: 'clean', cmd: 'npm run clean' },
								{ title: 'flow', cmd: 'npm run flow' },
								{ title: 'compile', cmd: 'npm run compile' },
								{ title: 'format', cmd: 'npm run format' },
								{ title: 'prettier', cmd: 'npm run prettier' },
								{ title: 'coverage', cmd: 'npm run coverage' },
								{ title: 'prepare', cmd: 'npm run prepare' },
								{ title: 'validate', cmd: 'npm run validate' },
								{ title: 'deploy', cmd: 'npm run deploy' },
								{ title: 'docs', cmd: 'npm run docs' },
								{ title: 'build-storybook', cmd: 'npm run build-storybook' },
							],
						}),
					],
				],
			},
			{
				title: 'readme',
				rows: [[new PluginReadme({ file: 'README.md' })]],
			},
			{
				title: 'readme-low',
				rows: [[new PluginReadme({ file: 'README.md' })]],
			},
			{
				title: 'script-start',
				rows: [[new PluginTerminal({ cmd: 'npm start', autostart: true })]],
			},
			{
				title: 'script-storybook',
				rows: [[new PluginTerminal({ cmd: 'npm run storybook' })]],
			},
			{
				title: 'script-test',
				rows: [
					[
						new PluginCodeCoverage(),
						new PluginNpmScripts({ scripts: [{ title: 'test', cmd: 'npm run test' }] }),
					],
				],
			},
			{
				title: 'script-watch-test',
				rows: [[new PluginTerminal({ cmd: 'npm run watch-test' }), new PluginCodeCoverage()]],
			},
		],
	};
}

module.exports = getConfig;

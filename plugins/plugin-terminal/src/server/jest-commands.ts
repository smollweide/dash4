import { IAllowedCommand } from '../shared-types';
export const jestCommands: IAllowedCommand[] = [
	{
		keyCode: 'a',
		title: 'run all tests',
	},
	{
		keyCode: 'f',
		title: 'run only failed tests',
	},
	{
		keyCode: 'p',
		title: 'filter by a filename regex pattern',
		input: (value: string) => value,
	},
	{
		keyCode: 't',
		title: 'filter by a test name regex pattern',
		input: (value: string) => value,
	},
	{
		keyCode: 'u',
		title: 'update failing snapshots',
	},
	{
		keyCode: 'o',
		title: 'run tests related to changed files',
	},
	{
		keyCode: 'w',
		title: 'show more',
	},
	{
		keyCode: 13,
		title: 'trigger a test run',
		terminalOutput: '\r',
	},
];

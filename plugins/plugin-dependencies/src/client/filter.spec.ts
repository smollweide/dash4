/// <reference types="@types/jest" />
import { filter } from './filter';

const input = {
	react: {
		version: '16.8.4',
		latestVersion: '16.8.4',
		isUpToDate: true,
		pathes: [],
		packages: [],
	},
	'react-dom': {
		version: '16.8.4',
		latestVersion: '16.8.4',
		isUpToDate: true,
		pathes: [],
		packages: [],
	},
	'@types/react': {
		version: '16.8.3',
		latestVersion: '16.8.4',
		isUpToDate: false,
		pathes: [],
		packages: [],
	},
	'@types/node': {
		version: '10.0.0',
		latestVersion: '10.0.1',
		isUpToDate: false,
		pathes: [],
		packages: [],
	},
};

describe('filter', () => {
	test('exist', () => {
		expect(typeof filter).toBe('function');
	});
	test('with error object', () => {
		expect(
			filter(
				{
					error: true,
					message: '',
				},
				false,
				''
			)
		).toEqual({});
	});
	test('while loading', () => {
		expect(filter(undefined, false, '')).toEqual({});
	});
	test('whithout filter', () => {
		expect(filter(input, false, '')).toEqual(input);
	});
	test('filter by available update', () => {
		const output = { ...input };
		delete output.react;
		delete output['react-dom'];
		expect(filter(input, true, '')).toEqual(output);
	});
	test('filter by query', () => {
		const output = { ...input };
		delete output.react;
		delete output['react-dom'];
		expect(filter(input, false, '@types')).toEqual(output);
	});
	test('filter by query and available update', () => {
		const output = { ...input };
		delete output.react;
		delete output['react-dom'];
		delete output['@types/react'];
		expect(filter(input, false, 'node')).toEqual(output);
	});
});

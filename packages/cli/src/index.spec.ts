/// <reference types="@types/jest" />
const execaMock = jest.fn();
jest.mock('execa', () => ({
	__esModule: true,
	default: execaMock,
}));
const oraFailMock = jest.fn();
jest.mock('ora', () => ({
	__esModule: true,
	default: () => ({
		start: () => ({
			fail: oraFailMock,
			succeed: jest.fn(),
			text: '',
		}),
	}),
}));
jest.mock('chalk', () => ({
	__esModule: true,
	default: {
		white: (text: string) => text,
		red: (text: string) => text,
		bold: (text: string) => text,
	},
}));

import cpy from 'cpy';
import del from 'del';
import fs from 'fs-extra';
import makeDir from 'make-dir';
import path from 'path';
import readPkg from 'read-pkg';
import { hasFile, init } from '.';

const tempDir = path.join(process.cwd(), '__tmp__');
const getTempFile = async (testId: string, fileName: string) =>
	await fs.readFile(path.join(tempDir, testId, fileName), 'utf8');
const mockDir = path.join(process.cwd(), 'src/__mocks__');
const getMockFile = async (testId: string, fileName: string) =>
	await fs.readFile(path.join(mockDir, testId, fileName), 'utf8');
const processKill = process.kill;
// tslint:disable-next-line
const consoleLog = console.log;

process.kill = jest.fn();
// tslint:disable-next-line
console.log = jest.fn();

const getOptions = (cwd: string, force: boolean = true) => ({
	port: 8080,
	config: path.join(cwd, 'dash4.config.js'),
	force,
});

async function runSnapshotTest(testId: string, dependencies: string) {
	const cwd = path.join(tempDir, testId);
	await makeDir(cwd);
	await cpy([`src/__mocks__/${testId}/_package.json`], `__tmp__/${testId}`, {
		rename: () => `package.json`,
	});
	if (await hasFile(mockDir, testId, `README.md`)) {
		await cpy([`src/__mocks__/${testId}/README.md`], `__tmp__/${testId}`);
	}
	if (await hasFile(mockDir, testId, `readme.md`)) {
		await cpy([`src/__mocks__/${testId}/readme.md`], `__tmp__/${testId}`);
	}
	await init(cwd, getOptions(cwd));
	expect(execaMock).toHaveBeenCalledWith('npm', `i -D @dash4/server ${dependencies}`.split(' '));
	expect((((await readPkg({ cwd })) || {}) as any).scripts.dash4).toBe('dash4');
	expect(await getTempFile(testId, 'dash4.config.js')).toBe(await getMockFile(testId, '_dash4.config.js'));
}

describe('cli', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	beforeAll(async () => {
		// create needed directories and files
		await makeDir(tempDir);
	});

	afterAll(async () => {
		// tslint:disable-next-line
		console.log = consoleLog;
		process.kill = processKill;
		await del(tempDir);
	});

	test('is function', async () => {
		expect(typeof init).toBe('function');
	});
	test('execute in empty directory should fail with error', async () => {
		const cwd = path.join(tempDir, 'empty');
		await makeDir(cwd);

		const spyProcess = jest.spyOn(process, 'kill');
		await init(cwd, getOptions(cwd));
		expect(oraFailMock).toHaveBeenCalledWith('package.json not found!');
		expect(spyProcess).toHaveBeenCalledWith(1);
	});
	test('execute in directory where config exist', async () => {
		const cwd = path.join(tempDir, 'config-exist');
		await makeDir(cwd);
		await fs.writeFile(path.join(cwd, 'package.json'), '{ "scripts": { "start": "dash4" } }');
		await fs.writeFile(path.join(cwd, 'dash4.config.js'), '');

		const spyProcess = jest.spyOn(process, 'kill');
		await init(cwd, getOptions(cwd, false));
		expect(oraFailMock).toHaveBeenCalledWith('Dash4 is already installed!');
		expect(spyProcess).toHaveBeenCalledWith(1);
	});
	test('execute in directory where config exist but with force mode', async () => {
		const cwd = path.join(tempDir, 'config-exist');
		await makeDir(cwd);
		await fs.writeFile(path.join(cwd, 'package.json'), '{ "scripts": { "start": "dash4" } }');
		await fs.writeFile(path.join(cwd, 'dash4.config.js'), '');
		await init(cwd, getOptions(cwd, true));
		expect((((await readPkg({ cwd })) || {}) as any).scripts.dash4).toBe('dash4');
	});
	test('execute with script "start"', async () => {
		await runSnapshotTest('script-start', '@dash4/plugin-terminal');
	});
	test('execute with "README.md" file', async () => {
		expect(await hasFile(mockDir, 'readme', `README.md`)).toBe(true);
		await runSnapshotTest('readme', '@dash4/plugin-readme');
	});
	test.skip('execute with "readme.md" file', async () => {
		/* TODO fs.stat is not sensitive */
		expect(await hasFile(mockDir, 'readme-low', `README.md`)).toBe(false);
		expect(await hasFile(mockDir, 'readme-low', `readme.md`)).toBe(true);
		await runSnapshotTest('readme-low', '@dash4/plugin-readme');
	});
	test('execute with script "test"', async () => {
		await runSnapshotTest('script-test', '@dash4/plugin-code-coverage @dash4/plugin-npm-scripts');
	});
	test('execute with script "watch-test"', async () => {
		await runSnapshotTest('script-watch-test', '@dash4/plugin-terminal @dash4/plugin-code-coverage');
	});
	test('execute with script "storybook"', async () => {
		await runSnapshotTest('script-storybook', '@dash4/plugin-terminal');
	});
	test('execute with all possible scripts', async () => {
		await runSnapshotTest(
			'all-scripts',
			'@dash4/plugin-terminal @dash4/plugin-readme @dash4/plugin-code-coverage @dash4/plugin-npm-scripts'
		);
	});
	test('execute in lerna repo', async () => {
		const testId = 'lerna';
		const cwd = path.join(tempDir, testId);
		await makeDir(cwd);

		await cpy([`src/__mocks__/${testId}/_package.json`], `__tmp__/${testId}`, {
			rename: () => `package.json`,
		});
		await cpy([`src/__mocks__/${testId}/README.md`], `__tmp__/${testId}`);
		await cpy([`src/__mocks__/${testId}/_lerna.json`], `__tmp__/${testId}`, {
			rename: () => `lerna.json`,
		});

		// create packages
		const options = {
			cwd: path.join(process.cwd(), 'src/__mocks__'),
			parents: true,
		};
		const dest = `../../__tmp__/${testId}/packages`;
		await cpy([`**/_package.json`, '!lerna/_package.json'], dest, {
			...options,
			rename: () => `package.json`,
		});
		await cpy([`**/readme.md`, '!lerna/readme.md'], dest, options);
		await cpy([`**/README.md`, '!lerna/README.md'], dest, options);
		await init(cwd, getOptions(cwd));
		expect(await getTempFile(testId, 'dash4.config.js')).toBe(await getMockFile(testId, '_dash4.config.js'));
		expect(execaMock).toHaveBeenCalledWith(
			'npm',
			`i -D @dash4/server @dash4/plugin-readme @dash4/plugin-code-coverage @dash4/plugin-npm-scripts @dash4/plugin-terminal`.split(
				' '
			)
		);
	});
});

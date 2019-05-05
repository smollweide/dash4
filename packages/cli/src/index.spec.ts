/// <reference types="@types/jest" />
const execaMock = jest.fn();
jest.mock('execa', () => ({
	__esModule: true,
	default: execaMock,
}));
const spinnerFailMock = jest.fn();
jest.mock('@dash4/log', () => ({
	__esModule: true,
	spinner: () => {
		return {
			start: jest.fn(),
			succeed: jest.fn(),
			fail: spinnerFailMock,
			text: jest.fn(),
		};
	},
}));
jest.mock('chalk', () => ({
	__esModule: true,
	default: {
		hex: (vaui: string) => (text: string) => text,
		bgBlack: (text: string) => text,
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
import { init } from '.';
import { hasFile } from './utils';

const tempDir = path.join(__dirname, '../__tmp__');
const getTempFile = async (testId: string, fileName: string) =>
	await fs.readFile(path.join(tempDir, testId, fileName), 'utf8');
const mockDir = path.join(__dirname, '../src/__mocks__');

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
	expect(await getTempFile(testId, 'dash4.config.js')).toMatchSnapshot();
}

describe('cli', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	beforeAll(async () => {
		await del(tempDir);
		// create needed directories and files
		await makeDir(tempDir);
	});

	afterAll(async () => {
		// tslint:disable-next-line
		console.log = consoleLog;
		process.kill = processKill;
		// await del(tempDir);
	});

	test('is function', async () => {
		expect(typeof init).toBe('function');
	});
	test('execute in empty directory should fail with error', async () => {
		const cwd = path.join(tempDir, 'empty');
		await makeDir(cwd);

		const spyProcess = jest.spyOn(process, 'kill');
		await init(cwd, getOptions(cwd));
		expect(spinnerFailMock).toHaveBeenCalledWith('package.json not found!');
		expect(spyProcess).toHaveBeenCalledWith(1);
	});
	test('execute in directory where config exist', async () => {
		const cwd = path.join(tempDir, 'config-exist');
		await makeDir(cwd);
		await fs.writeFile(path.join(cwd, 'package.json'), '{ "scripts": { "start": "dash4" } }');
		await fs.writeFile(path.join(cwd, 'dash4.config.js'), '');

		const spyProcess = jest.spyOn(process, 'kill');
		await init(cwd, getOptions(cwd, false));
		expect(spinnerFailMock).toHaveBeenCalledWith('Dash4 is already installed!');
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
		await runSnapshotTest('script-start', '@dash4/plugin-dependencies @dash4/plugin-terminal');
	});
	test('execute with "README.md" file', async () => {
		expect(await hasFile(mockDir, 'readme', `README.md`)).toBe(true);
		await runSnapshotTest('readme', '@dash4/plugin-dependencies @dash4/plugin-readme');
	});
	test('execute with script "test"', async () => {
		await runSnapshotTest(
			'script-test',
			'@dash4/plugin-dependencies @dash4/plugin-code-coverage @dash4/plugin-npm-scripts'
		);
	});
	test('execute with script "watch-test"', async () => {
		await runSnapshotTest(
			'script-watch-test',
			'@dash4/plugin-dependencies @dash4/plugin-terminal @dash4/plugin-code-coverage'
		);
	});
	test('execute with script "watch-test-jest"', async () => {
		await runSnapshotTest(
			'script-watch-test-jest',
			'@dash4/plugin-dependencies @dash4/plugin-terminal @dash4/plugin-code-coverage'
		);
	});
	test('execute in create-react-app setup', async () => {
		await runSnapshotTest(
			'script-cra',
			'@dash4/plugin-dependencies @dash4/plugin-terminal @dash4/plugin-code-coverage @dash4/plugin-npm-scripts'
		);
	});
	test('execute with script "storybook"', async () => {
		await runSnapshotTest('script-storybook', '@dash4/plugin-dependencies @dash4/plugin-terminal');
	});
	test('execute with all possible scripts', async () => {
		await runSnapshotTest(
			'all-scripts',
			'@dash4/plugin-dependencies @dash4/plugin-terminal @dash4/plugin-readme @dash4/plugin-code-coverage @dash4/plugin-npm-scripts'
		);
	});

	const ignorePackages = ['!lerna/_package.json', '!script-cra/_package.json', '!yarn-workspaces/_package.json'];
	const ignoreReadme = ['!lerna/README.md', '!script-cra/README.md', '!yarn-workspaces/README.md'];

	test('execute in lerna repo', async () => {
		const testId = 'lerna';
		const cwd = path.join(tempDir, testId);
		await makeDir(cwd);

		// add empty dir
		await makeDir(path.join(cwd, 'packages/empty'));
		await cpy([`src/__mocks__/${testId}/_package.json`], `__tmp__/${testId}`, {
			cwd: path.join(__dirname, '..'),
			rename: () => `package.json`,
		});
		await cpy([`src/__mocks__/${testId}/README.md`], `__tmp__/${testId}`, {
			cwd: path.join(__dirname, '..'),
		});
		await cpy([`src/__mocks__/${testId}/_lerna.json`], `__tmp__/${testId}`, {
			cwd: path.join(__dirname, '..'),
			rename: () => `lerna.json`,
		});

		// create configs directory
		await makeDir(path.join(cwd, 'configs'));
		await cpy([`*/_package.json`], `../../../../__tmp__/${testId}/configs/`, {
			cwd: path.join(__dirname, `__mocks__/${testId}/configs`),
			parents: true,
			rename: () => `package.json`,
		});
		await cpy([`*/README.md`], `../../../../__tmp__/${testId}/configs/`, {
			cwd: path.join(__dirname, `__mocks__/${testId}/configs`),
			parents: true,
		});

		// create packages directory
		await makeDir(path.join(cwd, 'packages'));
		await cpy([`*/_package.json`], `../../../../__tmp__/${testId}/packages/`, {
			cwd: path.join(__dirname, `__mocks__/${testId}/packages`),
			parents: true,
			rename: () => `package.json`,
		});
		await cpy([`*/README.md`], `../../../../__tmp__/${testId}/packages/`, {
			cwd: path.join(__dirname, `__mocks__/${testId}/packages`),
			parents: true,
		});

		await init(cwd, getOptions(cwd));
		expect(await getTempFile(testId, 'dash4.config.js')).toMatchSnapshot();
		expect(execaMock).toHaveBeenCalledWith(
			'npm',
			`i -D @dash4/server @dash4/plugin-dependencies @dash4/plugin-readme @dash4/plugin-code-coverage @dash4/plugin-npm-scripts @dash4/plugin-terminal`.split(
				' '
			)
		);
	});
	test('execute in yarn workspaces repo', async () => {
		const testId = 'yarn-workspaces';
		const cwd = path.join(tempDir, testId);
		await makeDir(cwd);

		// add empty dir
		await makeDir(path.join(cwd, 'packages/empty'));
		await cpy([`src/__mocks__/${testId}/_package.json`], `__tmp__/${testId}`, {
			cwd: path.join(__dirname, '..'),
			rename: () => `package.json`,
		});
		await cpy([`src/__mocks__/${testId}/README.md`], `__tmp__/${testId}`, {
			cwd: path.join(__dirname, '..'),
		});
		await cpy([`src/__mocks__/${testId}/_lerna.json`], `__tmp__/${testId}`, {
			cwd: path.join(__dirname, '..'),
			rename: () => `lerna.json`,
		});

		// create configs directory
		await makeDir(path.join(cwd, 'configs'));
		await cpy([`*/_package.json`], `../../../../__tmp__/${testId}/configs/`, {
			cwd: path.join(__dirname, `__mocks__/${testId}/configs`),
			parents: true,
			rename: () => `package.json`,
		});
		await cpy([`*/README.md`], `../../../../__tmp__/${testId}/configs/`, {
			cwd: path.join(__dirname, `__mocks__/${testId}/configs`),
			parents: true,
		});

		// create packages directory
		await makeDir(path.join(cwd, 'packages'));
		await cpy([`*/_package.json`], `../../../../__tmp__/${testId}/packages/`, {
			cwd: path.join(__dirname, `__mocks__/${testId}/packages`),
			parents: true,
			rename: () => `package.json`,
		});
		await cpy([`*/README.md`], `../../../../__tmp__/${testId}/packages/`, {
			cwd: path.join(__dirname, `__mocks__/${testId}/packages`),
			parents: true,
		});

		await init(cwd, getOptions(cwd));
		expect(await getTempFile(testId, 'dash4.config.js')).toMatchSnapshot();
		expect(execaMock).toHaveBeenCalledWith(
			'yarn',
			`add -D -W @dash4/server @dash4/plugin-dependencies @dash4/plugin-terminal @dash4/plugin-readme @dash4/plugin-code-coverage @dash4/plugin-npm-scripts`.split(
				' '
			)
		);
	});
});

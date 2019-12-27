/// <reference types="@types/jest" />
import { PluginCodeCoverage } from '.';

const consoleLog = console.log;
console.log = () => undefined;

describe('PluginCodeCoverage', () => {
	afterAll(() => {
		console.log = consoleLog;
	});

	test('exists', () => {
		expect(typeof PluginCodeCoverage).toBe('function');
	});
	test('create instance', async () => {
		const inst = new PluginCodeCoverage();
		inst.connected();
		expect(inst.name).toBe('PluginCodeCoverage');
		expect(inst.lowerCaseName).toBe('plugin-code-coverage');
		expect(typeof inst.clientConfig.cwd).toBe('string');
		expect(inst.clientConfig.threshold).toEqual({
			branches: [60, 80],
			functions: [60, 80],
			lines: [60, 80],
			statements: [60, 80],
		});
		expect(Array.isArray(inst.clientFiles)).toBe(true);

		const coverage = await (inst as any).fetchCoverage();
		expect(typeof coverage).toBe('object');
	});
	test('create instance with custom cwd', async () => {
		const inst = new PluginCodeCoverage({
			cwd: 'hallo',
		});
		expect(typeof inst.clientConfig.cwd).toBe('string');
	});
	test('create instance with mock file', async () => {
		const inst = new PluginCodeCoverage({
			lcovHtmlPath: 'src/__mocks__/index.html',
		});

		const coverage = await (inst as any).fetchCoverage();
		expect(coverage).toEqual({
			branches: { counter: 22, coverage: 0, covered: 0, name: 'Branches' },
			functions: { counter: 14, coverage: 7.14, covered: 1, name: 'Functions' },
			lines: { counter: 66, coverage: 24.24, covered: 16, name: 'Lines' },
			statements: { counter: 83, coverage: 21.69, covered: 18, name: 'Statements' },
		});
	});
	test('create instance with not existing file', async () => {
		const inst = new PluginCodeCoverage({
			lcovHtmlPath: 'src/__mocks__/index2.html',
		});

		const coverage = await (inst as any).fetchCoverage();
		expect(typeof coverage).toBe('object');
	});
	test('handleFileChanged current one', async () => {
		const inst = new PluginCodeCoverage({
			lcovHtmlPath: 'src/__mocks__/index.html',
		});

		expect(await (inst as any).handleFileChanged((inst as any)._lcovHtmlPath)).toBe(undefined);
	});
	test('handleFileChanged other one', async () => {
		const inst = new PluginCodeCoverage({
			lcovHtmlPath: 'src/__mocks__/index.html',
		});

		expect(await (inst as any).handleFileChanged('')).toBe(undefined);
	});
});

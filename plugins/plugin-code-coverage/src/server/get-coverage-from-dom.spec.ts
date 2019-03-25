/// <reference types="@types/jest" />
import fs from 'fs-extra';
import path from 'path';
import { getCoverageFromDom } from './get-coverage-from-dom';
import { htmlToDom } from './html-to-dom';

describe('getCoverageFromDom', () => {
	test('is function', async () => {
		expect(typeof getCoverageFromDom).toBe('function');
	});
	test('find coverage in dom', async () => {
		const fileData = await fs.readFile(path.join(__dirname, '../__mocks__/index.html'), 'utf8');
		const dom = await htmlToDom(fileData);
		const coverage = getCoverageFromDom(dom);
		expect(coverage).toEqual({
			branches: { counter: 22, coverage: 0, covered: 0, name: 'Branches' },
			functions: { counter: 14, coverage: 7.14, covered: 1, name: 'Functions' },
			lines: { counter: 66, coverage: 24.24, covered: 16, name: 'Lines' },
			statements: { counter: 83, coverage: 21.69, covered: 18, name: 'Statements' },
		});
	});
});

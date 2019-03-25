/// <reference types="@types/jest" />
import fs from 'fs-extra';
import path from 'path';
import { htmlToDom } from './html-to-dom';

describe('htmlToDom', () => {
	test('is function', async () => {
		// await fs.readFile(this._lcovHtmlPath, 'utf8');
		expect(typeof htmlToDom).toBe('function');
	});
	test('read index.html and should have children', async () => {
		const fileData = await fs.readFile(path.join(__dirname, '../__mocks__/index.html'), 'utf8');
		const dom = await htmlToDom(fileData);
		expect(Array.isArray(dom)).toBe(true);
		expect(Array.isArray(dom[2].children)).toBe(true);
	});
});

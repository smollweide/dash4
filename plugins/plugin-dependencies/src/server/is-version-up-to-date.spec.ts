/// <reference types="@types/jest" />
import { isVersionUpToDate } from './is-version-up-to-date';

/*

In the simplest terms, the tilde matches the most recent minor version (the middle number).
~1.2.3 will match all 1.2.x versions but will miss 1.3.0.

The caret, on the other hand, is more relaxed. 
It will update you to the most recent major version (the first number). 
^1.2.3 will match any 1.x.x release including 1.3.0, but will hold off on 2.0.0.

*/

describe('isVersionUpToDate', () => {
	test('exists', () => {
		expect(typeof isVersionUpToDate).toBe('function');
	});
	test('exact match 7.0.0 (7.0.0) = true', () => {
		expect(isVersionUpToDate('7.0.0', '7.0.0')).toBe(true);
	});
	test('exact match 7.0.0 (7.1.0) = false', () => {
		expect(isVersionUpToDate('7.0.0', '7.1.0')).toBe(false);
	});
	test('should fail because of missing latest version', () => {
		expect(isVersionUpToDate('7.1')).toBe(false);
		expect(isVersionUpToDate('^7.1')).toBe(false);
		expect(isVersionUpToDate('~7.1')).toBe(false);
	});
	test('should fail because of invalid version number (7.1) = null', () => {
		expect(isVersionUpToDate('7.1', '7.1.0')).toBe(null);
		expect(isVersionUpToDate('^7.1', '7.1.0')).toBe(null);
		expect(isVersionUpToDate('~7.1', '7.1.0')).toBe(null);
	});
	test('should fail because of invalid version number (7.1,0) = null', () => {
		expect(isVersionUpToDate('7.1,0', '7.1.0')).toBe(null);
		expect(isVersionUpToDate('^7.1,0', '7.1.0')).toBe(null);
		expect(isVersionUpToDate('~7.1,0', '7.1.0')).toBe(null);
	});

	test('caret allowes fixes and features ^7.0.0 (7.0.1) = true', () => {
		expect(isVersionUpToDate('^7.0.0', '7.0.1')).toBe(true);
	});
	test('caret allowes fixes and features ^7.0.0 (7.1.0) = true', () => {
		expect(isVersionUpToDate('^7.0.0', '7.1.0')).toBe(true);
	});
	test('caret allowes fixes and features ^7.0.0 (8.0.0) = false', () => {
		expect(isVersionUpToDate('^7.0.0', '8.0.0')).toBe(false);
	});

	test('tilde allowes fixes ~7.0.0 (7.0.1) = true', () => {
		expect(isVersionUpToDate('~7.0.0', '7.0.1')).toBe(true);
	});
	test('tilde allowes fixes ~7.0.0 (7.1.0) = false', () => {
		expect(isVersionUpToDate('~7.0.0', '7.1.0')).toBe(false);
	});
	test('tilde allowes fixes ~7.0.0 (8.0.0) = false', () => {
		expect(isVersionUpToDate('~7.0.0', '8.0.0')).toBe(false);
	});

	test('alpha versions are allowed 1.0.0-alpha.8 (1.0.0-alpha.8) = true', () => {
		expect(isVersionUpToDate('1.0.0-beta.8', '1.0.0-beta.8')).toBe(true);
	});
	test('alpha versions are allowed 1.0.0-alpha.8 (1.0.0-alpha.10) = false', () => {
		expect(isVersionUpToDate('1.0.0-alpha.8', '1.0.0-alpha.10')).toBe(false);
	});
	test('alpha versions are allowed 1.0.0-alpha.8 (0.8.0) = true', () => {
		expect(isVersionUpToDate('1.0.0-alpha.8', '0.8.0')).toBe(true);
	});

	test('beta versions are allowed 1.0.0-beta.8 (1.0.0-beta.8) = true', () => {
		expect(isVersionUpToDate('1.0.0-beta.8', '1.0.0-beta.8')).toBe(true);
	});
	test('beta versions are allowed 1.0.0-beta.8 (1.0.0-beta.10) = false', () => {
		expect(isVersionUpToDate('1.0.0-beta.8', '1.0.0-beta.10')).toBe(false);
	});
	test('beta versions are allowed 1.0.0-beta.8 (0.8.0) = true', () => {
		expect(isVersionUpToDate('1.0.0-beta.8', '0.8.0')).toBe(true);
	});
});

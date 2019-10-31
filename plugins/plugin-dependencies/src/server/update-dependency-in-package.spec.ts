/// <reference types="@types/jest" />
import { updateDependencyInPackage } from './update-dependency-in-package';

const mockPackage = {
	dependencies: {
		'@dash4/server': '0.5.2',
	},
	devDependencies: {
		'cross-env': '6.0.0',
	},
};

describe('updateVersionInPackage', () => {
	test('exists', () => {
		expect(typeof updateDependencyInPackage).toBe('function');
	});
	test('update dependency', () => {
		const result = updateDependencyInPackage(mockPackage, '@dash4/server', '0.5.3');
		if (!result || !result.dependencies) {
			return;
		}
		expect(result.dependencies['@dash4/server']).toBe('0.5.3');
	});
	test('update devDependency', () => {
		const result = updateDependencyInPackage(mockPackage, 'cross-env', '6.0.1');
		if (!result || !result.devDependency) {
			return;
		}
		expect(result.devDependency['cross-env']).toBe('6.0.1');
	});
});

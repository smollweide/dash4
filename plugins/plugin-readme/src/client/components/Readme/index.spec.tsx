/// <reference types="@types/jest" />
const useFullScreenMock = jest.fn().mockImplementation(() => ({
	fullscreen: false,
	enableFullscreen: jest.fn(),
	disableFullscreen: jest.fn(),
}));
jest.mock('../../hooks', () => ({
	__esModule: true, // this property makes it work
	// default: 'mockedDefaultExport',
	useMarkdownData: jest.fn().mockImplementation(() => '<div>markdown</div>'),
	useFullscreen: useFullScreenMock,
}));

import { render } from '@testing-library/react';
import React from 'react';
import { Readme } from '.';

describe('PluginReadme', () => {
	describe('Readme', () => {
		test('exist', () => {
			expect(typeof Readme).toBe('function');
		});
		test('render default', () => {
			const { container } = render(
				<Readme
					id={'i1-root'}
					name={'PluginReadme'}
					lowerCaseName={'plugin-readme'}
					clientConfig={{
						file: '/path-to-file',
					}}
				/>
			);

			// const { container } = render(<div>Hallo</div>);
			expect(container.firstChild).toMatchSnapshot();
		});
		test('render fullscreen', () => {
			useFullScreenMock.mockReturnValue({
				fullscreen: true,
				enableFullscreen: jest.fn(),
				disableFullscreen: jest.fn(),
			});
			const { container } = render(
				<Readme
					id={'i1-root'}
					name={'PluginReadme'}
					lowerCaseName={'plugin-readme'}
					clientConfig={{
						file: '/path-to-file',
					}}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
			jest.restoreAllMocks();
		});
	});
});

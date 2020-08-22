/* eslint-disable @typescript-eslint/ban-ts-comment */
/// <reference types="@types/jest" />
jest.mock('fs-extra', () => ({
	__esModule: true, // this property makes it work
	default: {
		realpathSync: (pathName: string) => pathName,
		readFile: jest.fn().mockResolvedValue('# Test'),
	},
}));

import { PluginReadme } from '.';

describe('PluginReadme', () => {
	test('exists', () => {
		expect(typeof PluginReadme).toBe('function');
	});
	test('create instance', async () => {
		const inst = new PluginReadme({
			file: 'README.md',
		});
		inst.connect(
			() => undefined,
			() => undefined
		);
		expect(inst.name).toBe('PluginReadme');
		expect(inst.lowerCaseName).toBe('plugin-readme');
		expect(typeof inst.clientConfig.file).toBe('string');
		expect(inst.clientConfig.height).toBe(undefined);
		expect(Array.isArray(inst.clientFiles)).toBe(true);
	});

	test('create instance with defined height', async () => {
		const inst = new PluginReadme({
			file: 'README.md',
			height: 200,
		});
		inst.connect(
			() => undefined,
			() => undefined
		);
		expect(inst.name).toBe('PluginReadme');
		expect(inst.lowerCaseName).toBe('plugin-readme');
		expect(typeof inst.clientConfig.file).toBe('string');
		expect(inst.clientConfig.height).toBe(200);
	});

	test('fetchFile', async () => {
		const inst = new PluginReadme({
			file: 'README.md',
		});
		// @ts-ignore
		expect(await inst._fetchFile()).toBe('# Test');
	});
	test('method sendFile should send data to socket', async () => {
		const inst = new PluginReadme({
			file: 'README.md',
		});
		// @ts-ignore
		const spy = jest.spyOn(inst, 'send');
		// @ts-ignore
		await inst._sendFile();
		expect(spy).toBeCalledWith('data', '# Test');
	});
	describe('server requests with images from markdown where added', () => {
		test('local path "/localpath/image.jpg"', async () => {
			const inst = new PluginReadme({
				file: 'README.md',
			});
			const imagePublicPath = '/localpath/image.jpg';
			// @ts-ignore
			inst._fetchFile = async () => Promise.resolve(`# Test <img src="${imagePublicPath}" />`);
			const resWriteHeaderMock = jest.fn();
			const resEndMock = jest.fn();
			await inst.serverRequest(
				{
					url: imagePublicPath,
				} as any,
				{
					writeHead: resWriteHeaderMock,
					end: resEndMock,
				} as any
			);
			expect(resWriteHeaderMock).toBeCalledWith(200, { 'Content-Type': 'image/jpeg' });
			// because fs.readFile is mocked usually it's the image data
			expect(resEndMock).toBeCalledWith('# Test');
		});
		test('local path "/localpath/image.png"', async () => {
			const inst = new PluginReadme({
				file: 'README.md',
			});
			const imagePublicPath = '/localpath/image.png';
			// @ts-ignore
			inst._fetchFile = async () => Promise.resolve(`# Test <img src="${imagePublicPath}" />`);
			const resWriteHeaderMock = jest.fn();
			const resEndMock = jest.fn();
			await inst.serverRequest(
				{
					url: imagePublicPath,
				} as any,
				{
					writeHead: resWriteHeaderMock,
					end: resEndMock,
				} as any
			);
			expect(resWriteHeaderMock).toBeCalledWith(200, { 'Content-Type': 'image/png' });
			// because fs.readFile is mocked usually it's the image data
			expect(resEndMock).toBeCalledWith('# Test');
		});
		test('local path "./localpath/image.jpg"', async () => {
			const inst = new PluginReadme({
				file: 'README.md',
			});
			const imagePublicPath = '/localpath/image.jpg';
			// @ts-ignore
			inst._fetchFile = async () => Promise.resolve(`# Test <img src="${imagePublicPath}" />`);
			const resWriteHeaderMock = jest.fn();
			const resEndMock = jest.fn();
			await inst.serverRequest(
				{
					url: imagePublicPath,
				} as any,
				{
					writeHead: resWriteHeaderMock,
					end: resEndMock,
				} as any
			);
			expect(resWriteHeaderMock).toBeCalledWith(200, { 'Content-Type': 'image/jpeg' });
			// because fs.readFile is mocked usually it's the image data
			expect(resEndMock).toBeCalledWith('# Test');
		});
		test('local path without extname "/localpath/image"', async () => {
			const inst = new PluginReadme({
				file: 'README.md',
			});
			const imagePublicPath = '/localpath/image';
			// @ts-ignore
			inst._fetchFile = async () => Promise.resolve(`# Test <img src="${imagePublicPath}" />`);
			const resWriteHeaderMock = jest.fn();
			const resEndMock = jest.fn();
			await inst.serverRequest(
				{
					url: imagePublicPath,
				} as any,
				{
					writeHead: resWriteHeaderMock,
					end: resEndMock,
				} as any
			);
			expect(resWriteHeaderMock).toBeCalledWith(200, { 'Content-Type': '' });
			// because fs.readFile is mocked usually it's the image data
			expect(resEndMock).toBeCalledWith('# Test');
		});
		test('request is not an relevant image', async () => {
			const inst = new PluginReadme({
				file: 'README.md',
			});
			const imagePublicPath = '/localpath/image';
			// @ts-ignore
			inst._data = `# Test <img src=".${imagePublicPath}" />`;
			const resWriteHeaderMock = jest.fn();
			const resEndMock = jest.fn();
			expect(
				await inst.serverRequest(
					{
						url: '/something',
					} as any,
					{
						writeHead: resWriteHeaderMock,
						end: resEndMock,
					} as any
				)
			).toBe(false);
		});
	});
});

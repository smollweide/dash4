import * as ReactXterm from '@dash4/react-xterm';
import '@dash4/react-xterm/lib/ReactXterm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactContainerQuery from 'react-container-query';
import ReactDOM from 'react-dom';
import * as ReactJSS from 'react-jss';
import * as tslib from 'tslib';
import { App } from './components/App';
import './polyfill';

// public available libraries
(window as any).ReactBootstrap = ReactBootstrap;
(window as any).ReactJSS = ReactJSS;
(window as any).tslib = tslib;
(window as any).ReactXterm = ReactXterm;
(window as any).ReactContainerQuery = ReactContainerQuery;

export interface IWidgetConfig<IClientConfig = {}> {
	id: string;
	name: string;
	lowerCaseName: string;
	dark?: boolean;
	width?: number[];
	clientConfig: IClientConfig;
}

export interface IConfigTab {
	title: string;
	rows: IWidgetConfig[][];
}

export interface IConfig {
	tabs: IConfigTab[];
}

if (process.env.MOCK_ENV === 'true') {
	// tslint:disable-next-line
	console.log('[webpack]: mode develop');
	// tslint:disable-next-line
	require('./mock/Plugin');
}

ReactDOM.render(<App />, document.getElementById('root'));

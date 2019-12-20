/** @jsx EmotionCore.jsx */
import * as Dash4Log from '@dash4/log/build/browser';
import * as Dash4Ui from '@dash4/ui';
import * as EmotionCore from '@emotion/core';
import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactContainerQuery from 'react-container-query';
import ReactDOM from 'react-dom';
import * as ReactJSS from 'react-jss';
import * as tslib from 'tslib';
import { App } from './components/App';
import './polyfill';

// public available libraries
(window as any).React = React;
(window as any).ReactDOM = ReactDOM;
(window as any).ReactBootstrap = ReactBootstrap;
(window as any).ReactJSS = ReactJSS;
(window as any).EmotionCore = EmotionCore;
(window as any).tslib = tslib;
(window as any).ReactContainerQuery = ReactContainerQuery;
(window as any).Dash4Log = Dash4Log;
(window as any).Dash4Ui = Dash4Ui;

// because of external dependencies
import * as ReactXterm from '@dash4/react-xterm/lib/ReactXterm';
import '@dash4/react-xterm/lib/ReactXterm.css';
(window as any).ReactXterm = ReactXterm;

const { log } = Dash4Log;

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
	version: string;
	tabs: IConfigTab[];
}

if (process.env.MOCK_ENV === 'true') {
	// tslint:disable-next-line
	log('client', 'mode develop');
	// tslint:disable-next-line
	require('./mock/Plugin');
}

ReactDOM.render(<App />, document.getElementById('root'));

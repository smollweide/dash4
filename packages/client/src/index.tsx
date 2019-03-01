import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import './polyfill';

export interface IWidgetConfig<IAdditionals = {}> {
	id: string;
	name: string;
	lowerCaseName: string;
	dark?: boolean;
	additionals: IAdditionals;
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

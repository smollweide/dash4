import { Dash4Plugin, IDash4Plugin } from '@dash4/server';
import path from 'path';
import uuid from 'uuid/v1';
import { IActionLink, IClientConfig } from '../shared-types';

export interface IOptions {
	// custom title (default=Code coverage)
	title?: string;
	// grid with per breakpoint
	// [12,6,3] means 100% width on small viewports, 50% on medium viewports and 33.3% on large viewports
	width?: number[];
	// enable / disable dark mode
	dark?: boolean;
	// Array of actions (displayed as list)
	// an action could be a link or a teaser
	actions?: IActionLink[];
}

export class PluginActions extends Dash4Plugin implements IDash4Plugin<IClientConfig> {
	private _title?: string;
	private _actions?: IActionLink[];

	constructor(options: IOptions | undefined = {}) {
		super({
			dark: options.dark,
			width: options.width,
			name: 'PluginActions',
			lowerCaseName: 'plugin-actions',
		});

		this._title = options.title;
		this._actions = options.actions;
	}

	public get clientConfig() {
		return {
			title: this._title,
			actions: (this._actions || []).map((action) => ({
				...action,
				id: uuid(),
			})),
		};
	}

	public get clientFiles() {
		return [path.join(__dirname, '../../dist/plugins/plugin-actions/main.js')];
	}
}

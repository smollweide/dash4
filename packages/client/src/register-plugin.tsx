import React from 'react';
import { IWidgetConfig } from '.';

// export type TPluginComponent = (config: IWidgetConfig) => JSX.Element | React.Component<IWidgetConfig, any>;
export type TPluginComponent = any;

const win = window as any;

win.dash4 = win.dash4 || {};
win.dash4.plugins = win.dash4.plugins || {};

export function registerPlugin(name: string, PluginComponent: TPluginComponent) {
	// tslint:disable-next-line
	console.log(`[plugin]: ${name} registered`);

	win.dash4.plugins[name] = PluginComponent;
}

export async function getArePluginsRegistered(): Promise<boolean> {
	const pluginsAvailable = () => win.dash4 && win.dash4.plugins && Object.keys(win.dash4.plugins).length > 0;

	function check(resolve: (registered: boolean) => void) {
		if (pluginsAvailable()) {
			resolve(true);
		}
		setTimeout(() => check(resolve), 10);
	}

	return new Promise((resolve) => {
		check(resolve);
	});
}

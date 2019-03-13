import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { IConfig } from '../..';
import { useEffectAsync } from '../../react-hooks';
import { getArePluginsRegistered } from '../../register-plugin';
import { getConfig } from '../../services/config';
import { Header } from '../Header';
import { Page } from '../Page';
import { Widgets } from '../Widgets';

const wait = (duration: number = 100) => new Promise((resolve) => setTimeout(resolve, duration));

export function App() {
	const [config, setConfig] = useState<undefined | IConfig>(undefined);
	useEffectAsync(async () => {
		setConfig(await getConfig());
	}, []);

	const [arePluginsRegistered, setArePluginsRegistered] = useState(false);
	useEffectAsync(async () => {
		const areAvailable = await getArePluginsRegistered();
		await wait(100);
		setArePluginsRegistered(areAvailable);
	}, []);

	return (
		<Router>
			<>
				<Header tabs={config ? config.tabs.map((tab) => tab.title) : []} />
				<Page>
					{config &&
						arePluginsRegistered &&
						config.tabs.map((tab, index) => {
							let pathName = `/${tab.title.toLowerCase()}`;
							if (index === 0) {
								pathName = '/';
							}
							return (
								<Route
									exact={index === 0}
									key={pathName}
									path={pathName}
									component={() => <Widgets tab={tab} />}
								/>
							);
						})}
				</Page>
			</>
		</Router>
	);
}

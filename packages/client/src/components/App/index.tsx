import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AppLoader } from '../AppLoader';
import { Header } from '../Header';
import { Page } from '../Page';
import { Widgets } from '../Widgets';
import { useConfig, useLoading, usePluginsRegistered } from './hooks';

export function App() {
	const config = useConfig();
	const arePluginsRegistered = usePluginsRegistered();
	const isLoading = useLoading({ config, arePluginsRegistered });

	return (
		<Router>
			<>
				{!isLoading && (
					<>
						<Header
							version={config ? config.version : undefined}
							tabs={config ? config.tabs.map((tab) => tab.title) : []}
						/>
						<Page>
							{config &&
								config.tabs.map((tab, index) => {
									let pathName = `/${tab.title.toLowerCase()}`;
									if (index === 0) {
										pathName = '/';
									}
									return (
										<Route
											key={pathName}
											exact={index === 0}
											path={pathName}
											component={() => <Widgets tab={tab} />}
										/>
									);
								})}
						</Page>
					</>
				)}
				<AppLoader visible={isLoading} />
			</>
		</Router>
	);
}

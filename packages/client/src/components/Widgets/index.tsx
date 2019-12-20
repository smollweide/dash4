import { ErrorBoundary } from '@dash4/ui';
import React from 'react';
import { IConfigTab } from '../..';
import { Cell, Grid } from '../Grid';

interface IProps {
	tab: IConfigTab;
}

interface ICouldNotLoadProps {
	name: string;
	className?: string;
}

const CouldNotLoad = ({ name, className }: ICouldNotLoadProps) => (
	<div className={className || ''}>{`Could not load Plugin ${name}`}</div>
);

export function Widgets({ tab }: IProps) {
	return (
		<ErrorBoundary>
			{tab.rows.map((row, rowIndex) => {
				return (
					<Grid key={`${tab.title}-${rowIndex}`}>
						{row.map((config) => {
							const { id, name, lowerCaseName } = config;
							if (!(window as any).dash4 || !(window as any).dash4.plugins) {
								return (
									<Cell width={config.width} key={`${tab.title}-${rowIndex}-${lowerCaseName}-${id}`}>
										<CouldNotLoad name={name} />
									</Cell>
								);
							}
							try {
								const Plugin = (window as any).dash4.plugins[name];

								if (!Plugin) {
									return (
										<Cell
											width={config.width}
											key={`${tab.title}-${rowIndex}-${lowerCaseName}-${id}`}
										>
											<CouldNotLoad name={name} />
										</Cell>
									);
								}
								return (
									<Cell width={config.width} key={`${tab.title}-${rowIndex}-${lowerCaseName}-${id}`}>
										<ErrorBoundary>
											<Plugin {...config} />
										</ErrorBoundary>
									</Cell>
								);
							} catch (err) {
								// tslint:disable-next-line
								console.error(err);
								return (
									<Cell width={config.width} key={`${tab.title}-${rowIndex}-${lowerCaseName}-${id}`}>
										<CouldNotLoad name={name} />
									</Cell>
								);
							}
						})}
					</Grid>
				);
			})}
		</ErrorBoundary>
	);
}

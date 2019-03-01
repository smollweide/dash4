import React from 'react';
import withStyles, { WithStyles } from 'react-jss';
import { IConfigTab } from '../..';
import { Cell, Grid } from '../Grid';

const styles = {};

interface IProps extends WithStyles<typeof styles> {
	tab: IConfigTab;
}

export const Widgets = withStyles(styles)(({ classes, tab }: IProps) => {
	return (
		<>
			{tab.rows.map((row, rowIndex) => {
				return (
					<Grid key={`${tab.title}-${rowIndex}`}>
						{row.map((config) => {
							const { id, name, lowerCaseName } = config;

							if (!(window as any).dash4 || !(window as any).dash4.plugins) {
								return (
									<Cell key={`${tab.title}-${rowIndex}-${lowerCaseName}-${id}`}>
										{`Could not load Plugin ${name}`}
									</Cell>
								);
							}

							try {
								const Plugin = (window as any).dash4.plugins[name];
								return (
									<Cell key={`${tab.title}-${rowIndex}-${lowerCaseName}-${id}`}>
										<Plugin {...config} />
									</Cell>
								);
							} catch (err) {
								// tslint:disable-next-line
								console.error(err);
								return (
									<Cell key={`${tab.title}-${rowIndex}-${lowerCaseName}-${id}`}>
										{`Could not load Plugin ${name}`}
									</Cell>
								);
							}
						})}
					</Grid>
				);
			})}
		</>
	);
});

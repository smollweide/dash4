import React, { ReactElement } from 'react';
import withStyles, { WithStyles } from 'react-jss';
import { Cell as _Cell } from './Cell';

const styles = {
	root: {
		display: 'flex',
		alignItems: 'flex-start',
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginLeft: -30,
	},
};

export interface IGridProps extends WithStyles<typeof styles> {
	children: ReactElement[];
}

export const Grid = withStyles(styles)(({ classes, children }: IGridProps) => (
	<div className={classes.root}>
		{React.Children.map(children, (child) =>
			React.cloneElement(child, {
				amountOfCells: children.length,
			})
		)}
	</div>
));

export const Cell = _Cell;

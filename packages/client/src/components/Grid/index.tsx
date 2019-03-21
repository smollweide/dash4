import React, { ReactElement } from 'react';
import withStyles, { WithStyles } from 'react-jss';
import { Cell as _Cell } from './Cell';

const styles = {
	root: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginLeft: -15,
		justifyContent: 'center',
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

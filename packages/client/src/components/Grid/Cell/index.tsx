import React from 'react';
import withStyles, { WithStyles } from 'react-jss';

const styles = {
	cell: ({ amountOfCells = 1 }: ICellProps) => {
		const defWidth = (amount: number) => ({
			flexBasis: `calc(${100 / amount}% - 15px)`,
			maxWidth: `calc(${100 / amount}% - 15px)`,
			minWidth: `calc(${100 / amount}% - 15px)`,
		});

		let mediaQueries = {};

		if (amountOfCells >= 4) {
			mediaQueries = {
				...mediaQueries,
				'@media screen and (max-width: 900px)': {
					...defWidth(2),
				},
			};
		}

		if (amountOfCells === 3) {
			mediaQueries = {
				...mediaQueries,
				'@media screen and (max-width: 700px)': {
					...defWidth(2),
					'&:first-child': {
						...defWidth(1),
					},
				},
			};
		}

		mediaQueries = {
			...mediaQueries,
			'@media screen and (max-width: 550px)': {
				...defWidth(1),
			},
		};

		return {
			...mediaQueries,
			...defWidth(amountOfCells),
			flexWrap: 'wrap',
			marginLeft: 15,
			flexGrow: 0,
			flexShrink: 1,
			position: 'relative',
			overflow: 'hidden',
			marginBottom: 15,
		};
	},
};

export interface ICellProps extends WithStyles<typeof styles> {
	children: React.ReactNode;
	amountOfCells?: number;
}

export const Cell = withStyles(styles)(({ classes, children }: ICellProps) => {
	return <div className={`${classes.cell}`}>{children}</div>;
});

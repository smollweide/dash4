/** @jsx jsx */
import { jsx } from '@emotion/core';
import { ReactElement } from 'react';

const getPercentFromGridWidth = (width: number) => {
	if (width === 12) {
		return 100;
	}
	return (100 * width) / 12;
};

const defWidth = (width: number) => ({
	flexBasis: `calc(${width}% - 15px)`,
	maxWidth: `calc(${width}% - 15px)`,
	minWidth: `calc(${width}% - 15px)`,
});

export interface ICellProps {
	children: ReactElement;
	amountOfCells?: number;
	width?: number[];
}

function getStyles(amountOfCells: number, width?: number[]) {
	const baseStyles = {
		'flex-wrap': 'wrap',
		marginLeft: 15,
		flexGrow: 0,
		flexShrink: 1,
		marginBottom: 15,
	};

	let mediaQueries = {};

	if (Array.isArray(width)) {
		mediaQueries = {
			...defWidth(getPercentFromGridWidth(width[0])),
		};

		if (width[1]) {
			mediaQueries = {
				...mediaQueries,
				'@media (min-width: 768px)': {
					...defWidth(getPercentFromGridWidth(width[1])),
				},
			};
		}

		if (width[2]) {
			mediaQueries = {
				...mediaQueries,
				'@media (min-width: 992px)': {
					...defWidth(getPercentFromGridWidth(width[2])),
				},
			};
		}

		if (width[3]) {
			mediaQueries = {
				...mediaQueries,
				'@media (min-width: 1200px)': {
					...defWidth(getPercentFromGridWidth(width[3])),
				},
			};
		}

		return {
			...mediaQueries,
			...baseStyles,
		};
	}

	if (amountOfCells >= 4) {
		mediaQueries = {
			...mediaQueries,
			'@media screen and (max-width: 900px)': {
				...defWidth(100 / 2),
			},
		};
	}

	if (amountOfCells === 3) {
		mediaQueries = {
			...mediaQueries,
			'@media screen and (max-width: 700px)': {
				...defWidth(100 / 2),
				'&:first-child': {
					...defWidth(100 / 1),
				},
			},
		};
	}

	mediaQueries = {
		...mediaQueries,
		'@media screen and (max-width: 550px)': {
			...defWidth(100 / 1),
		},
	};

	return {
		...mediaQueries,
		...defWidth(100 / amountOfCells),
		...baseStyles,
	};
}

export const Cell = ({ amountOfCells = 1, width, children }: ICellProps) => {
	return <div css={getStyles(amountOfCells, width)}>{children}</div>;
};

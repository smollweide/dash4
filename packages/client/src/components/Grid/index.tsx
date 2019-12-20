/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { ReactElement } from 'react';

export interface IGridProps {
	children: ReactElement[];
}

export const Grid = ({ children }: IGridProps) => (
	<div
		css={css`
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			margin-left: -15px;
			justify-content: center;
		`}
	>
		{React.Children.map(children, (child) =>
			React.cloneElement(child, {
				amountOfCells: children.length,
			})
		)}
	</div>
);

export * from './Cell';

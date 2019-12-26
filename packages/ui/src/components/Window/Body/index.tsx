/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';

interface IWindowBodyProps {
	children: React.ReactNode;
	className?: string;
}

export const WindowBody = ({ children, className = '' }: IWindowBodyProps) => {
	return (
		<div
			className={className}
			css={css`
				padding: 5px;
				white-space: normal;
				flex-grow: 1;
			`}
		>
			{children && children}
		</div>
	);
};

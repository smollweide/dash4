/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Children, cloneElement } from 'react';

interface IKeyboardProps {
	children: JSX.Element | JSX.Element[];
	className?: string;
}

export const Keyboard = ({ className = '', children }: IKeyboardProps) => {
	return (
		<ul
			className={className}
			css={css`
				position: relative;
				display: inline;
				padding: 3px 4px 6px;
				background: #cbccd2;
				width: auto;
				border-radius: 6px;
				margin: 0;
			`}
		>
			{Children.map(children, (child) => cloneElement(child, { tagName: 'li' }))}
		</ul>
	);
};

export * from './Key';

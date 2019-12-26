/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';

interface IKeyProps {
	children: string | JSX.Element;
	className?: string;
	tagName?: 'span' | 'li' | 'div' | 'p';
}

export const Key = ({ className = '', children, tagName = 'span' }: IKeyProps) => {
	let childOut: string | JSX.Element = '';

	if (typeof children === 'string') {
		childOut = children;
	} else {
		childOut = (React.Children.map(children, (child) =>
			React.cloneElement(child, {
				inline: true,
			})
		) as any) as JSX.Element;
	}

	const CustomTag = `${tagName}` as any;
	return (
		<CustomTag
			className={className}
			css={css`
				position: relative;
				display: inline;
				padding: 2px 5px;
				background-image: linear-gradient(rgb(223, 224, 231), rgb(248, 249, 255));
				border-radius: 4px;
				box-shadow: 0px 0px 1px 1px rgba(112, 113, 117, 0.8);
				font-size: 12px;
				line-height: 12px;
				color: rgb(152, 153, 157);
				& + & {
					margin-left: 18px;
					&:before {
						content: '+';
						position: absolute;
						left: -18px;
						top: 0;
						padding: 2px 4px;
						color: rgb(112, 113, 117);
						font-size: 16px;
					}
				}
			`}
		>
			{childOut}
		</CustomTag>
	);
};

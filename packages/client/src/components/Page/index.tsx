/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';

interface IProps {
	children: React.ReactNode;
}

export function Page({ children }: IProps) {
	return (
		<main
			css={css`
				@global {
					body: {
						background: #fafafa;
					}
				}
				padding: 15px;
			`}
		>
			{children}
		</main>
	);
}

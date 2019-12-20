/** @jsx jsx */
import { Icon } from '@dash4/ui';
import { css, jsx } from '@emotion/core';
import React from 'react';
import { Button } from 'react-bootstrap';

export interface ILinkProps {
	dark?: boolean;
	href: string;
	image?: string;
	imageAlt?: string;
	icon?: string;
	children: React.ReactNode;
}

export const Link = ({ dark, href, children, icon, image, imageAlt }: ILinkProps) => (
	<Button
		as="a"
		css={css`
			display: flex;
			color: ${dark ? 'var(--white)' : 'var(--dark)'};
			transition: background 0.3s ease-in-out;
			&:hover,
			&:focus,
			&:active {
				color: ${dark ? 'var(--white)' : 'var(--dark)'};
				text-decoration: none;
				background: ${dark ? 'var(--gray-dark)' : 'rgba(108, 117, 125, 0.1)'};
			}
		`}
		href={href}
		target="_blank"
		rel="noreferrer noopener"
		variant="link"
	>
		{icon && (
			<Icon
				css={css`
					margin: 3px 10px 4px 0;
				`}
				name={icon}
				size="m"
			/>
		)}
		{image && (
			<img
				css={css`
					margin: 3px 10px 4px 0;
					max-width: 18px;
					max-height: 18px;
				`}
				alt={imageAlt}
				src={image}
			/>
		)}
		{children}
	</Button>
);

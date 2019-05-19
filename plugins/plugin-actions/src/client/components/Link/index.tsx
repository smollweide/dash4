import { Icon } from '@dash4/ui';
import React, { CSSProperties } from 'react';
import { Button } from 'react-bootstrap';
import withStyles, { WithStyles } from 'react-jss';

const styles = {
	link: ({ dark }: IProps) =>
		({
			display: 'flex',
			color: dark ? 'var(--white)' : 'var(--dark)',
			transition: 'background .3s ease-in-out',
			'&:hover, &:focus, &:active': {
				color: dark ? 'var(--white)' : 'var(--dark)',
				textDecoration: 'none',
				background: dark ? 'var(--gray-dark)' : 'rgba(108, 117, 125, 0.1)',
			} as CSSProperties,
		} as CSSProperties),
	icon: {
		margin: '3px 10px 4px 0',
	} as CSSProperties,
	image: {
		margin: '3px 10px 4px 0',
		maxWidth: 18,
		maxHeight: 18,
	} as CSSProperties,
};

export interface IProps extends WithStyles<typeof styles> {
	dark?: boolean;
	href: string;
	image?: string;
	imageAlt?: string;
	icon?: string;
	children: React.ReactNode;
}

export const Link = withStyles(styles)(({ classes, href, children, icon, image, imageAlt }: IProps) => (
	<Button as="a" className={classes.link} href={href} target="_blank" rel="noreferrer noopener" variant="link">
		{icon && <Icon className={classes.icon} name={icon} size="m" />}
		{image && <img className={classes.image} alt={imageAlt} src={image} />}
		{children}
	</Button>
));

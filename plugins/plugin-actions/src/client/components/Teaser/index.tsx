import { Icon } from '@dash4/ui';
import React, { CSSProperties } from 'react';
import { Button, Card } from 'react-bootstrap';
import withStyles, { WithStyles } from 'react-jss';
import { IActionLink, TButtonVariant } from '../../../shared-types';
import { Link } from '../Link';

const styles = {
	card: {
		background: 'transparent',
		border: 0,
	} as CSSProperties,
	cardImageWrap: {
		padding: '12px 0 20px 0',
		textAlign: 'center',
	} as CSSProperties,
	cardIconWrap: {
		padding: '12px 0 20px 0',
		display: 'flex',
		justifyContent: 'center',
	} as CSSProperties,
	cardImage: {
		maxWidth: 100,
		maxHeight: 100,
	} as CSSProperties,
	cardBody: {
		padding: '12px 0',
	} as CSSProperties,
	cardTitle: {
		padding: '0 12px',
	} as CSSProperties,
	cardText: {
		padding: '0 12px',
	} as CSSProperties,
	link: {
		position: 'absolute',
		display: 'block',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	} as CSSProperties,
};

// export interface ILink {
// 	title: string;
// 	href: string;
// 	buttonVariant?: TButtonVariant;
// }
export interface IProps extends WithStyles<typeof styles> {
	id: string;
	title: string;
	subtitle?: string;
	link?: IActionLink | IActionLink[];
	dark?: boolean;
	image?: string;
	imageAlt?: string;
	icon?: string;
}

export const Teaser = withStyles(styles)(
	({ classes, id, dark, title, subtitle, icon, image, imageAlt, link }: IProps) => (
		<Card className={classes.card}>
			{image && (
				<div className={classes.cardImageWrap}>
					<Card.Img className={classes.cardImage} variant="top" src={image} alt={imageAlt} />
				</div>
			)}
			{icon && !image && (
				<div className={classes.cardIconWrap}>
					<Icon name={icon} size="l" />
				</div>
			)}
			<Card.Body className={classes.cardBody}>
				<Card.Title className={classes.cardTitle}>{title}</Card.Title>
				{subtitle && <Card.Text className={classes.cardText}>{subtitle}</Card.Text>}
				{Array.isArray(link) &&
					link.map((linkItem) => (
						<Link
							key={`${id}-${linkItem.href}`}
							dark={dark}
							href={linkItem.href}
							icon={linkItem.icon}
							image={linkItem.image}
							imageAlt={linkItem.title}
						>
							{linkItem.title}
						</Link>
					))}
				{/* <Link variant="primary">Go somewhere</Button> */}
			</Card.Body>
			{link && !Array.isArray(link) && (
				<a className={classes.link} href={link.href} target="_blank" rel="noreferrer noopener" />
			)}
		</Card>
	)
);

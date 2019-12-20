/** @jsx jsx */
import { Icon } from '@dash4/ui';
import { css, jsx } from '@emotion/core';
import { Card } from 'react-bootstrap';
import { IActionLink } from '../../../shared-types';
import { Link } from '../Link';

export interface ITeaserProps {
	id: string;
	title: string;
	subtitle?: string;
	link?: IActionLink | IActionLink[];
	dark?: boolean;
	image?: string;
	imageAlt?: string;
	icon?: string;
}

export const Teaser = ({ id, dark, title, subtitle, icon, image, imageAlt, link }: ITeaserProps) => (
	<Card
		css={css`
			background: transparent;
			border: 0;
		`}
	>
		{image && (
			<div
				css={css`
					padding: 12px 0 20px 0;
					text-align: center;
				`}
			>
				<Card.Img
					css={css`
						max-width: 100px;
						max-height: 100px;
					`}
					variant="top"
					src={image}
					alt={imageAlt}
				/>
			</div>
		)}
		{icon && !image && (
			<div
				css={css`
					padding: 12px 0 20px 0;
					display: flex;
					justify-content: center;
				`}
			>
				<Icon name={icon} size="l" />
			</div>
		)}
		<Card.Body
			css={css`
				padding: 12px 0;
			`}
		>
			<Card.Title
				css={css`
					padding: 0 12px;
				`}
			>
				{title}
			</Card.Title>
			{subtitle && (
				<Card.Text
					css={css`
						padding: 0 12px;
					`}
				>
					{subtitle}
				</Card.Text>
			)}
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
		</Card.Body>
		{link && !Array.isArray(link) && (
			<a
				css={css`
					position: absolute;
					display: block;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
				`}
				href={link.href}
				target="_blank"
				rel="noreferrer noopener"
			/>
		)}
	</Card>
);

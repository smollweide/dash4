/** @jsx jsx */
import { css, jsx, keyframes } from '@emotion/core';
import React, { Fragment } from 'react';

interface IWindowHeaderProps {
	title: string;
	subTitle?: string;
	className?: string;
	children?: React.ReactNode;
	onDoubleClick?: (event: React.SyntheticEvent<HTMLDivElement>) => void;
	// enable / disable processing mode (default=false)
	progressing?: boolean;
}

const progress = keyframes`
	0% {
		left: 0%;
		width: 0%;
	}
	50% {
		left: 40%;
		width: 50%;
	}
	90% {
		left: 90%;
		width: 10%;
	}
	91% {
		left: auto;
		right: 0%;
		width: 10%;
	}
	100% {
		left: auto;
		right: 0%;
		width: 0%;
	}
`;

export const WindowHeader = ({
	className = '',
	title,
	subTitle,
	children,
	onDoubleClick,
	progressing,
}: IWindowHeaderProps) => {
	return (
		<div
			className={className}
			css={css`
				position: relative;
				padding: 15px;
				text-align: center;
				display: flex;
				align-items: flex-start;
				justify-content: space-between;
			`}
			onDoubleClick={onDoubleClick}
		>
			<p
				css={css`
					width: 100%;
					white-space: normal;
					font-size: 14px;
					font-weight: 400;
					line-height: 1.2;
					margin-bottom: 0;
					overflow: hidden;
					word-break: break-word;
					hyphens: auto;
				`}
			>
				{title.replace(/^Plugin/, '')}
				{subTitle && (
					<Fragment>
						<br />
						<small
							css={css`
								color: #6c757d;
								font-size: 80%;
								font-weight: 400;
							`}
						>
							&nbsp;{subTitle}
						</small>
					</Fragment>
				)}
			</p>
			{children && (
				<div
					css={css`
						margin-left: 15px;
					`}
				>
					{children}
				</div>
			)}
			{progressing && (
				<div
					css={css`
						position: absolute;
						width: 100%;
						bottom: 0;
						left: 0;
						border-radius: 0;
						height: 1px;
						border: 0;
						&:after {
							content: ' ';
							position: absolute;
							top: 0;
							height: 1px;
							background-color: var(--primary);
							animation: ${progress} 1.5s infinite ease-in-out;
						}
					`}
				/>
			)}
		</div>
	);
};

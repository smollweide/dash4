/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { Icon } from '@dash4/ui';
import React, { Fragment, MouseEvent } from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';

interface IDependencyRawProps {
	name: string;
	version: string;
	latestVersion?: string;
	isUpToDate: boolean | null;
	onClick: (event: React.SyntheticEvent<HTMLButtonElement>, name: string) => void;
	packages?: string[];
}

export function Dependency({ name, version, latestVersion, isUpToDate, onClick, packages }: IDependencyRawProps) {
	function handleClick(event: MouseEvent<HTMLButtonElement>) {
		onClick(event, name);
	}

	return (
		<li
			css={css`
				list-style: none;
				width: 220px;
				margin: 10px;
				position: relative;
				text-align: center;
			`}
		>
			<a
				css={css`
					color: #000;
					&:hover,
					&:active,
					&:focus {
						color: #000;
					}
				`}
				target="_blank"
				href={`https://www.npmjs.com/package/${name}`}
			>
				<div
					css={css`
						width: 100%;
						overflow: hidden;
						word-break: break-word;
						hyphens: auto;
						font-size: 14px;
					`}
				>
					{name}
				</div>
				<div
					css={css`
						width: 100%;
						overflow: hidden;
						word-break: break-word;
						hyphens: auto;
						font-size: 24px;
					`}
				>
					<span
						css={[
							isUpToDate && css``,
							isUpToDate === false &&
								css`
									color: var(--red);
								`,
						]}
					>
						{version}
					</span>
					{isUpToDate === false && (
						<OverlayTrigger
							key={`latest-version-popover-${name}`}
							trigger="hover"
							placement="auto"
							overlay={
								<Popover id={`latest-version-popover-${name}`}>
									Update to <strong>{latestVersion}</strong>
									{packages && packages.length > 0 && packages[0] !== 'root' && (
										<Fragment>
											&nbsp;in the following packages:&nbsp;
											{packages.join(', ')}
										</Fragment>
									)}
								</Popover>
							}
						>
							<Button
								css={css`
									font-size: 12px;
									padding: 0;
									margin-left: 10px;
									margin-top: -4px;
								`}
								variant="danger"
								size="sm"
								onClick={handleClick}
							>
								<Icon name="arrow_upward" size="m" />
							</Button>
						</OverlayTrigger>
					)}
				</div>
			</a>
		</li>
	);
}

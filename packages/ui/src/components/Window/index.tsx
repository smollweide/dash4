/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';
import useKey from '@rooks/use-key';
import React, { Fragment, useEffect, useState } from 'react';

interface IWindowProps {
	children: React.ReactNode;
	className?: string;
	// enable / disable dark mode (default=false)
	dark?: boolean;
	// automatical stretches to height of neighbour window (default=true)
	autoStretch?: boolean;
	// enable / disable fullscreen mode (default=false)
	fullscreen?: boolean;
	onWillLeaveFullscreen?: () => void;
	onFocus?: () => void;
	onBlur?: () => void;
}

export function useFullscreen() {
	const [fullscreen, setFullscreen] = useState(false);
	const enableFullscreen = () => setFullscreen(true);
	const disableFullscreen = () => setFullscreen(false);
	const toggleFullscreen = () => setFullscreen(!fullscreen);
	return { fullscreen, enableFullscreen, disableFullscreen, toggleFullscreen };
}

const fullScreenOffset = 5;

export * from './Header';
export * from './Body';
export const Window = ({
	className,
	children,
	dark = false,
	autoStretch = true,
	fullscreen = false,
	onWillLeaveFullscreen = () => undefined,
	onFocus = () => undefined,
	onBlur = () => undefined,
}: IWindowProps) => {
	useEffect(() => {
		const body = document.getElementsByTagName('body')[0];
		if (fullscreen) {
			body.className += ' prevent-body-scroll';
		} else {
			body.className = body.className.replace('prevent-body-scroll', '');
		}
	}, [fullscreen]);

	useKey([27], onWillLeaveFullscreen, {
		eventTypes: ['keydown'],
		when: fullscreen,
	});

	return (
		<Fragment>
			<Global
				styles={css`
					body.prevent-body-scroll {
						overflow: hidden;
					}
				`}
			/>
			<div
				className={className}
				tabIndex={1}
				css={[
					css`
						display: flex;
						flex-direction: column;
						position: relative;
						&:focus {
							border: 1px solid var(--primary);
							outline: none;
						}
					`,
					dark &&
						css`
							color: #fff;
							white-space: pre;
							background: #000;
							border: 1px solid rgb(51, 51, 51);
							box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 50px 0px;
							border-radius: 5px;
						`,
					!dark &&
						css`
							color: #000;
							white-space: pre;
							background: #fff;
							border: 1px solid #fff;
							box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 4px;
							border-radius: 6px;
						`,
					autoStretch &&
						css`
							height: 100%;
						`,
					fullscreen &&
						css`
							position: fixed;
							width: calc(100vw - ${fullScreenOffset * 2}px);
							height: calc(100vh - ${fullScreenOffset * 2}px);
							left: ${fullScreenOffset}px;
							top: ${fullScreenOffset}px;
							z-index: 99;
						`,
				]}
				onFocus={onFocus}
				onBlur={onBlur}
			>
				{children}
			</div>
		</Fragment>
	);
};

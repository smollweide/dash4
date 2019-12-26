/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import logo from '../Header/dash4_512.png';
import { DURATION_HIDE_ANIMATION } from './constants';
import { useHidden, useMinimalWait } from './hooks';

interface IProps {
	visible: boolean;
	minWait?: number;
}

export const AppLoader = ({ visible, minWait = 1000 }: IProps) => {
	const isMinimalWaitReached = useMinimalWait({
		visible,
		minWait,
	});
	const isHidden = useHidden({
		visible,
		isMinimalWaitReached,
	});
	const isHidding = !visible && isMinimalWaitReached;
	return (
		<div
			css={css`
				position: fixed;
				top: 0;
				left: 0;
				width: 100vw;
				height: 100vh;
				zindex: 9999;
				background: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				transition: opacity ${DURATION_HIDE_ANIMATION / 1000}s;
				opacity: ${(isHidding || isHidden) && '0'};
				display: ${isHidden && 'none'};
			`}
		>
			<div
				css={css`
					text-align: center;
				`}
			>
				<img
					css={css`
						@keyframes blur {
							0%: {
								opacity: 0.8;
							}
							50%: {
								opacity: 0.3;
							}
							100%: {
								opacity: 0.8;
							}
						}
						animation: blur 2s infinite ease-in;
						width: 128px;
						margin: 13px 15px;
					`}
					src={logo}
					alt="Dash4 Logo"
				/>
			</div>
		</div>
	);
};

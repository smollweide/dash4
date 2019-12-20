/** @jsx jsx */
import { css, jsx, keyframes } from '@emotion/core';
import { TAlign, TAnimation, TColor, TDisplay, TSize } from './const';

interface IProps {
	// icon name defined by [material ui icons](https://material.io/tools/icons/?style=baseline)
	name: string;
	className?: string;
	// type TSize = "s" | "m" | "l"
	size?: TSize;
	// type TColor = "dark" | "bright"
	color?: TColor;
	// type TAnimation = "rotation-clockwise" | "rotation-counter-clockwise"
	animation?: TAnimation;
	// type TAlign = "center-in-content"
	align?: TAlign;
	// true = display inline
	inline?: boolean;
}

function getSize(size: TSize) {
	if (size === 'l') {
		return 24;
	}
	if (size === 'm') {
		return 18;
	}
	return 14;
}

const rotationClockwise = keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(359deg);
	}
`;
const rotationCounterClockwise = keyframes`
	from {
		transform: rotate(359deg);
	}
	to {
		transform: rotate(0deg);
	}
`;

export const Icon = ({ className = '', color, name, size, animation, align, inline }: IProps) => {
	return (
		<span
			className={className}
			css={[
				css`
					position: relative;
					display: ${inline ? 'inline' : 'block'};
				`,
				color === 'bright' &&
					css`
						color: #fff;
					`,
				color === 'dark' &&
					css`
						color: #000;
					`,
				size &&
					css`
						width: ${getSize(size)}px;
						height: ${getSize(size)}px;
					`,
				align === 'center-in-content' &&
					css`
						position: absolute;
						top: 0;
						left: 0;
						height: 100%;
						width: 100%;
						display: flex;
						justify-content: center;
						align-items: center;
						&::before {
							content: ' ';
							display: block;
							padding-top: 100% /* initial ratio of 1:1*/;
						}
					`,
			]}
		>
			<i
				className="material-icons"
				css={[
					size &&
						css`
							font-size: ${getSize(size)}px;
						`,
					!size &&
						css`
							font-size: inherit;
						`,
					animation === 'rotation-clockwise' &&
						css`
							animation: ${rotationClockwise} 1.5s infinite linear;
						`,
					animation === 'rotation-counter-clockwise' &&
						css`
							animation: ${rotationCounterClockwise} 1.5s infinite linear;
						`,
				]}
			>
				{name}
			</i>
		</span>
	);
};

export * from './const';

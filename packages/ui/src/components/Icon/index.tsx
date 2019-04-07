import React from 'react';
import withStyles, { WithStyles } from 'react-jss';

const styles = {
	root: {
		position: 'relative',
		display: 'block',
	},
	'size-s': {
		width: 14,
		height: 14,
	},
	'size-m': {
		width: 18,
		height: 18,
	},
	'size-l': {
		width: 24,
		height: 24,
	},
	'size-i-s': {
		fontSize: 14,
	},
	'size-i-m': {
		fontSize: 18,
	},
	'size-i-l': {
		fontSize: 24,
	},
	'color-dark': {
		color: '#000',
	},
	'color-bright': {
		color: '#fff',
	},
	'@keyframes rotation-clockwise': {
		from: {
			transform: 'rotate(0deg)',
		},
		to: {
			transform: 'rotate(359deg)',
		},
	},
	'anim-rotation-clockwise': {
		animation: '$rotation-clockwise 1.5s infinite linear',
	},
	'@keyframes rotation-counter-clockwise': {
		from: {
			transform: 'rotate(359deg)',
		},
		to: {
			transform: 'rotate(0deg)',
		},
	},
	'anim-rotation-counter-clockwise': {
		animation: '$rotation-counter-clockwise 1.5s infinite linear',
	},
	'align-center-in-content': {
		position: 'absolute',
		top: 0,
		left: 0,
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		'&::before': {
			content: `' '`,
			display: 'block',
			paddingTop: '100%' /* initial ratio of 1:1*/,
		},
	},
};

export const sizeMap = {
	s: 's' as 's',
	m: 'm' as 'm',
	l: 'l' as 'l',
};

export type TSize = keyof typeof sizeMap;

export const colorMap = {
	dark: 'dark' as 'dark',
	bright: 'bright' as 'bright',
};

export type TColor = keyof typeof colorMap;

export const alignMap = {
	'center-in-content': 'center-in-content' as 'center-in-content',
};

export type TAlign = keyof typeof alignMap;

export const animationMap = {
	'rotation-clockwise': 'rotation-clockwise' as 'rotation-clockwise',
	'rotation-counter-clockwise': 'rotation-counter-clockwise' as 'rotation-counter-clockwise',
};

export type TAnimation = keyof typeof animationMap;

interface IProps extends WithStyles<typeof styles> {
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
}

export const Icon = withStyles(styles)(({ className, classes, color, name, size, animation, align }: IProps) => {
	const classNames: string[] = [classes.root];
	const classNamesI: string[] = ['material-icons'];
	if (size) {
		classNames.push(classes[`size-${size}`]);
		classNamesI.push(classes[`size-i-${size}`]);
	}
	if (color) {
		classNames.push(classes[`color-${color}`]);
	}
	if (animation) {
		classNamesI.push(classes[`anim-${animation}`]);
	}
	if (align) {
		classNames.push(classes[`align-${align}`]);
	}
	return (
		<span className={`${className} ${classNames.join(' ')}`}>
			<i className={classNamesI.join(' ')}>{name}</i>
		</span>
	);
});

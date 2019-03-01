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
};

export const sizeMap = {
	s: 's' as 's',
	m: 'm' as 'm',
	l: 'l' as 'l',
};

export type TSize = keyof typeof sizeMap;

export const colorMap = {
	dark: 'dark' as 'dark',
	light: 'light' as 'light',
};

export type TColor = keyof typeof colorMap;

interface IProps extends WithStyles<typeof styles> {
	name: string;
	size?: TSize;
	color?: TColor;
}

export const Icon = withStyles(styles)(({ classes, name, size }: IProps) => {
	const classNames: string[] = [classes.root];
	const classNamesI: string[] = ['material-icons'];
	if (size) {
		classNames.push(classes[`size-${size}`]);
		classNamesI.push(classes[`size-i-${size}`]);
	}
	return (
		<span className={classNames.join(' ')}>
			<i className={classNamesI.join(' ')}>{name}</i>
		</span>
	);
});

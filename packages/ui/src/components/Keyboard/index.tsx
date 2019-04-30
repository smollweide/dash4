import React from 'react';
import withStyles, { WithStyles } from 'react-jss';

const styles = {
	root: {
		position: 'relative',
		display: 'inline',
		padding: '3px 4px 6px',
		background: '#cbccd2',
		width: 'auto',
		borderRadius: 6,
		margin: 0,
	},
};

interface IProps extends WithStyles<typeof styles> {
	children: JSX.Element | JSX.Element[];
	className?: string;
}

export const Keyboard = withStyles(styles)(({ className = '', classes, children }: IProps) => {
	return (
		<ul className={`${className} ${classes.root}`}>
			{React.Children.map(children, (child) => React.cloneElement(child, { tagName: 'li' }))}
		</ul>
	);
});

export * from './Key';

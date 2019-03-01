import React from 'react';
import withStyles, { WithStyles } from 'react-jss';

const styles = {
	widget: {
		minHeight: 100,
		position: 'relative',
	},
	widgetLight: {
		color: '#000',
		whiteSpace: 'pre',
		background: '#fff',
		boxShadow: 'rgba(0, 0, 0, 0.16) 0px 2px 4px',
		borderRadius: 6,
	},
	widgetDark: {
		color: '#fff',
		whiteSpace: 'pre',
		background: '#000',
		border: '1px solid rgb(51, 51, 51)',
		boxShadow: 'rgba(0, 0, 0, 0.2) 0px 20px 50px 0px',
		borderRadius: 5,
	},
};

interface IProps extends WithStyles<typeof styles> {
	header?: React.ReactNode;
	children: React.ReactNode;
	dark?: boolean;
}

export * from './Header';
export const Window = withStyles(styles)(({ classes, header, children, dark = false }: IProps) => {
	return (
		<div className={`${classes.widget} ${dark ? classes.widgetDark : classes.widgetLight}`}>
			{header && header}
			{children}
		</div>
	);
});

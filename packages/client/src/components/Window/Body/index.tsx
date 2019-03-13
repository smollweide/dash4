import React from 'react';
import withStyles, { WithStyles } from 'react-jss';

const styles = {
	body: {
		padding: 5,
		whiteSpace: 'normal',
		flexGrow: 1,
	},
};

interface IProps extends WithStyles<typeof styles> {
	children: React.ReactNode;
	className?: string;
}

export const WindowBody = withStyles(styles)(({ classes, children, className }: IProps) => {
	return <div className={`${className || ''} ${classes.body}`}>{children && children}</div>;
});

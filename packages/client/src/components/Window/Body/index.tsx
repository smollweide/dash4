import React from 'react';
import withStyles, { WithStyles } from 'react-jss';

const styles = {
	body: {
		padding: 5,
	},
};

interface IProps extends WithStyles<typeof styles> {
	children: React.ReactNode;
}

export const WindowBody = withStyles(styles)(({ classes, children }: IProps) => {
	return <div className={classes.body}>{children && children}</div>;
});

import React from 'react';
import withStyles, { WithStyles } from 'react-jss';

const styles = {
	'@global': {
		body: {
			background: '#fafafa',
		},
	},
	main: {
		padding: 15,
	},
};

interface IProps extends WithStyles<typeof styles> {
	children: React.ReactNode;
}

export const Page = withStyles(styles)(({ classes, children }: IProps) => {
	return <main className={classes.main}>{children}</main>;
});

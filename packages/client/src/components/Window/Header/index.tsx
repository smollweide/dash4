import React from 'react';
import withStyles, { WithStyles } from 'react-jss';

const styles = {
	header: {
		padding: '15px',
		textAlign: 'center',
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
	},
	button: {
		marginLeft: 15,
	},
	title: {
		width: '100%',
		whiteSpace: 'normal',
		fontSize: 14,
		fontWeight: 400,
		lineHeight: 1.2,
		marginBottom: 0,
		overflow: 'hidden',
		wordBreak: 'break-word',
		hyphens: 'auto',
	},
};

interface IProps extends WithStyles<typeof styles> {
	title: string;
	subTitle?: string;
	children?: React.ReactNode;
}

export const WindowHeader = withStyles(styles)(({ classes, title, subTitle, children }: IProps) => {
	return (
		<div className={classes.header}>
			<p className={`${classes.title}`}>
				{title.replace(/^Plugin/, '')}
				{subTitle && (
					<>
						<br />
						<small className="text-muted">&nbsp;{subTitle}</small>
					</>
				)}
			</p>
			{children && <div className={classes.button}>{children}</div>}
		</div>
	);
});

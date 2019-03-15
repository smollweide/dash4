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
	className?: string;
	children?: React.ReactNode;
	onDoubleClick?: (event: React.SyntheticEvent<HTMLDivElement>) => void;
}

export const WindowHeader = withStyles(styles)(
	({ className, classes, title, subTitle, children, onDoubleClick }: IProps) => {
		return (
			<div onDoubleClick={onDoubleClick} className={`${className || ''} ${classes.header}`}>
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
	}
);

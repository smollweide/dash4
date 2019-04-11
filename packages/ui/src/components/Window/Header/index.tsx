import React from 'react';
import withStyles, { WithStyles } from 'react-jss';
import { styles } from './styles';

interface IProps extends WithStyles<typeof styles> {
	title: string;
	subTitle?: string;
	className?: string;
	children?: React.ReactNode;
	onDoubleClick?: (event: React.SyntheticEvent<HTMLDivElement>) => void;
	// enable / disable processing mode (default=false)
	progressing?: boolean;
}

export const WindowHeader = withStyles(styles)(
	({ className, classes, title, subTitle, children, onDoubleClick, progressing }: IProps) => {
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
				{progressing && <div className={classes.progressBar} />}
			</div>
		);
	}
);

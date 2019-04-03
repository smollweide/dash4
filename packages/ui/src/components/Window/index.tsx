import React, { useEffect } from 'react';
import withStyles, { WithStyles } from 'react-jss';
import { styles } from './styles';

interface IProps extends WithStyles<typeof styles> {
	children: React.ReactNode;
	className?: string;
	// enable / disable dark mode (default=false)
	dark?: boolean;
	// automatical stretches to height of neighbour window (default=true)
	autoStretch?: boolean;
	// enable / disable fullscreen mode (default=false)
	fullscreen?: boolean;
}

export * from './Header';
export * from './Body';
export const Window = withStyles(styles)(
	({ className, classes, children, dark = false, autoStretch = true, fullscreen = false }: IProps) => {
		useEffect(() => {
			const body = document.getElementsByTagName('body')[0];
			if (fullscreen) {
				body.className += 'prevent-body-scroll';
			} else {
				body.className = body.className.replace('prevent-body-scroll', '');
			}
		}, [fullscreen]);

		const classNames: string[] = [classes.window];

		classNames.push(dark ? classes.windowDark : classes.windowBright);

		if (className) {
			classNames.push(className);
		}
		if (autoStretch) {
			classNames.push(classes.windowAutoStretch);
		}
		if (fullscreen) {
			classNames.push(classes.windowFullscreen);
		}

		return <div className={classNames.join(' ')}>{children}</div>;
	}
);

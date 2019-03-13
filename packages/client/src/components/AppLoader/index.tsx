import React from 'react';
import withStyles, { WithStyles } from 'react-jss';
import logo from '../Header/dash4_512.png';
import { useHidden, useMinimalWait } from './hooks';
import { styles } from './styles';

interface IProps extends WithStyles<typeof styles> {
	visible: boolean;
	minWait?: number;
}

export const AppLoader = withStyles(styles)(({ classes, visible, minWait = 1000 }: IProps) => {
	const isMinimalWaitReached = useMinimalWait({ visible, minWait });
	const isHidden = useHidden({ visible, isMinimalWaitReached });
	const isHidding = !visible && isMinimalWaitReached;

	return (
		<div className={`${isHidding && classes.hidding} ${isHidden && classes.hidden} ${classes.wrapper}`}>
			<div className={`${classes.box}`}>
				<img className={`${classes.logo}`} src={logo} alt="Dash4 Logo" />
			</div>
		</div>
	);
});

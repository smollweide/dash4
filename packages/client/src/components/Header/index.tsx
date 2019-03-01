import React from 'react';
import withStyles, { WithStyles } from 'react-jss';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import logo from './dash4.png';

const styles = {
	header: {
		position: 'relative',
		background: '#fff',
		borderBottom: '1px solid #eaeaea',
	},
	logo: {
		position: 'absolute',
		width: 45,
		margin: 15,
	},
	menuWrap: {
		position: 'relative',
		marginLeft: 75,
		marginRight: 75,
		padding: '20px 0 10px 0',
		textAlign: 'left',
	},
	menu: {
		position: 'relative',
		padding: 0,
	},
	menuItem: {
		listStyle: 'none',
	},
	menuLink: {
		transition: 'color 0.5s, text-decoration 0.5s',
		border: 0,
		fontSize: 12,
		padding: '4px 0',
		margin: '6px 10px',
		color: '#999',
		textTransform: 'uppercase',
		'&:hover': {
			color: '#000',
			textDecoration: 'none',
		},
	},
	menuLinkActive: {
		color: '#000',
		textDecoration: 'none',
		borderBottom: '1px solid #000',
	},
};

interface IProps extends WithStyles<typeof styles>, RouteComponentProps<{}> {
	children?: React.ReactNode;
	tabs: string[];
}

const RawHeader = ({ classes, location, tabs }: IProps) => {
	return (
		<header className={classes.header}>
			<Link to={'/'}>
				<img className={classes.logo} src={logo} alt="Dash4 Logo" />
			</Link>
			<div className={classes.menuWrap}>
				<ul className={classes.menu}>
					<li className={classes.menuItem}>
						{tabs.map((tab, index) => {
							const classNames = [classes.menuLink];
							if (
								location.pathname === `/${tab}` ||
								location.pathname.indexOf(`/${tab}/`) === 0 ||
								(location.pathname === '/' && index === 0)
							) {
								classNames.push(classes.menuLinkActive);
							}
							return (
								<Link key={tab} className={classNames.join(' ')} to={index === 0 ? '/' : `/${tab}`}>
									{tab}
								</Link>
							);
						})}
					</li>
				</ul>
			</div>
		</header>
	);
};

const StyledHeader = withStyles(styles)(RawHeader);

export const Header = withRouter(StyledHeader);

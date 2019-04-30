import { Icon } from '@dash4/ui';
import React, { CSSProperties, useState } from 'react';
import { Button } from 'react-bootstrap';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import withStyles, { WithStyles } from 'react-jss';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import logo from './dash4_512.png';

const styles = {
	header: {
		position: 'relative',
		background: '#fff',
		borderBottom: '1px solid #eaeaea',
	} as CSSProperties,
	logo: {
		position: 'absolute',
		width: 45,
		margin: '13px 15px',
	} as CSSProperties,
	menuWrap: {
		position: 'relative',
		marginLeft: 75,
		marginRight: 15,
		padding: '18px 0 18px 0',
		textAlign: 'left',
		'& .menu-item-wrapper': {
			padding: '5px 0',
		} as CSSProperties,
	} as CSSProperties,
	menu: {
		position: 'relative',
		padding: 0,
	} as CSSProperties,
	menuItem: {
		listStyle: 'none',
	} as CSSProperties,
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
		} as CSSProperties,
	} as CSSProperties,
	menuLinkActive: {
		color: '#000',
		textDecoration: 'none',
		borderBottom: '1px solid #000',
	} as CSSProperties,
	arrow: {
		marginTop: 3,
		'&,&:hover,&:active,&:focus': {
			color: 'var(--gray-dark)',
		} as CSSProperties,
	} as CSSProperties,
};

interface IProps extends WithStyles<typeof styles>, RouteComponentProps<{}> {
	children?: React.ReactNode;
	tabs: string[];
}

function getInitialSelected({ tabs, location }: IProps) {
	let selected = tabs[0];
	tabs.forEach((tab, index) => {
		if (
			location.pathname === `/${tab}` ||
			location.pathname.indexOf(`/${tab}/`) === 0 ||
			(location.pathname === '/' && index === 0)
		) {
			selected = tabs[index];
		}
	});
	return selected;
}

const RawHeader = (props: IProps) => {
	const { classes, location, tabs } = props;
	const [selected, setSelected] = useState(getInitialSelected(props));

	function handleSelect(key: string) {
		setSelected(key);
	}

	return (
		<header className={classes.header}>
			<Link to={'/'}>
				<img className={classes.logo} src={logo} alt="Dash4 Logo" />
			</Link>
			<div className={classes.menuWrap}>
				<ScrollMenu
					alignOnResize
					arrowLeft={
						<Button className={classes.arrow} variant="link" size="sm">
							<Icon name="keyboard_arrow_left" size="m" />
						</Button>
					}
					arrowRight={
						<Button className={classes.arrow} variant="link" size="sm">
							<Icon name="keyboard_arrow_right" size="m" />
						</Button>
					}
					scrollToSelected
					selected={selected}
					data={tabs.map((tab, index) => {
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
					onSelect={handleSelect}
				/>
			</div>
		</header>
	);
};

const StyledHeader = withStyles(styles)(RawHeader);

export const Header = withRouter(StyledHeader);

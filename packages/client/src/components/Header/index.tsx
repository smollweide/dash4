import React, { SyntheticEvent, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import withStyles, { WithStyles } from 'react-jss';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import logo from './dash4_512.png';
import { styles } from './styles';

interface IPropsRaw {
	children?: React.ReactNode;
	tabs: string[];
	version?: string;
}

export interface IProps extends WithStyles<typeof styles>, RouteComponentProps, IPropsRaw {}

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
	const { classes, location, tabs, history } = props;
	const [selected, setSelected] = useState(getInitialSelected(props));
	const [showInfoModal, setShowInfoModal] = useState(false);

	function handleHideInfoModal(event?: SyntheticEvent<HTMLElement>) {
		if (event) {
			event.preventDefault();
		}
		setShowInfoModal(false);
	}
	function handleShowInfoModal(event: SyntheticEvent<HTMLAnchorElement>) {
		event.preventDefault();
		setShowInfoModal(true);
	}

	return (
		<header className={classes.header}>
			<a href="/" onClick={handleShowInfoModal}>
				<img className={classes.logo} src={logo} alt="Dash4 Logo" />
			</a>
			<Modal show={showInfoModal} onHide={handleHideInfoModal}>
				<Modal.Header className={classes.infoModalHeader} closeButton />
				<Modal.Body className={classes.infoModalBody}>
					<img width="84" src={logo} alt="Dash4 Logo" />
					<ul className={classes.infoModalList1}>
						{props.version && (
							<li>
								<strong>version</strong> {props.version}
							</li>
						)}
						<li>
							<strong>github</strong>{' '}
							<a
								target="_blank"
								rel="noreferrer noopener"
								href="https://github.com/smollweide/dash4/blob/master/README.md#------"
							>
								dash4 on github
							</a>
						</li>
						<li>
							<strong>cli</strong>{' '}
							<a
								target="_blank"
								rel="noreferrer noopener"
								href="https://github.com/smollweide/dash4/blob/master/packages/cli/README.md#dash4-cli"
							>
								dash4 cli on github
							</a>
						</li>
					</ul>
					<ul>
						<li>
							<Button
								as="a"
								size="sm"
								target="_blank"
								variant="outline-primary"
								href="https://github.com/smollweide/dash4#plugins"
							>
								add plugin
							</Button>
						</li>
						<li>
							<Button
								as="a"
								size="sm"
								target="_blank"
								variant="outline-secondary"
								href="https://github.com/smollweide/dash4/issues/new"
							>
								report issue
							</Button>
						</li>
					</ul>
				</Modal.Body>
				<Modal.Footer className={classes.infoModalFooter}>
					Dash4 is{' '}
					<a
						target="_blank"
						rel="noreferrer noopener"
						href="https://github.com/smollweide/dash4/blob/master/LICENSE"
					>
						MIT licensed
					</a>
				</Modal.Footer>
			</Modal>
			<ul className={classes.menu}>
				{tabs.map((tab, index) => {
					const classNames = [classes.menuLink];
					let isActive = false;
					if (
						location.pathname === `/${tab}` ||
						location.pathname.indexOf(`/${tab}/`) === 0 ||
						(location.pathname === '/' && index === 0)
					) {
						isActive = true;
						classNames.push(classes.menuLinkActive);
					}
					return (
						<li style={{ width: `${100 / tabs.length}%` }} className={classes.menuLi} key={tab}>
							{isActive && (
								<>
									<span className={classes.menuLiLeft} />
									<span className={classes.menuLiCenter} />
									<span className={classes.menuLiRight} />
								</>
							)}
							<Link title={tab} className={classNames.join(' ')} to={index === 0 ? '/' : `/${tab}`}>
								{tab}
							</Link>
						</li>
					);
				})}
			</ul>
			<div className={classes.menuMobile}>
				<div className={classes.menuMobileTitle}>{selected}</div>
				<div className={classes.menuBurger} />
				<select
					value={selected}
					onChange={(event) => {
						const value = event.currentTarget.value;
						setSelected(value);
						history.push(value === tabs[0] ? '/' : `/${value}`);
					}}
					className={classes.menuSelect}
				>
					{tabs.map((tab) => {
						return (
							<option value={tab} key={tab}>
								{tab}
							</option>
						);
					})}
				</select>
			</div>
		</header>
	);
};

const StyledHeader = withStyles(styles)(RawHeader);

// TODO fix issue since typescript 3.6.x
export const Header = (withRouter(StyledHeader as any) as any) as (props: IPropsRaw) => JSX.Element;

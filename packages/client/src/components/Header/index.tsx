import { Icon } from '@dash4/ui';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import withStyles, { WithStyles } from 'react-jss';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import logo from './dash4_512.png';
import { styles } from './styles';

interface IProps extends WithStyles<typeof styles>, RouteComponentProps<{}> {
	children?: React.ReactNode;
	tabs: string[];
	version?: string;
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
	const [showInfoModal, setShowInfoModal] = useState(false);

	function handleSelect(key: string) {
		setSelected(key);
	}

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

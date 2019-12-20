/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { Fragment, SyntheticEvent, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import logo from './dash4_512.png';

interface IPropsRaw {
	children?: React.ReactNode;
	tabs: string[];
	version?: string;
}

export interface IProps extends RouteComponentProps, IPropsRaw {}

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

const linkStyles = `
	& a {
		color: var(--gray);
		text-decoration: none;
		border-bottom: 1px solid var(--gray);
		&:hover {
			color: var(--gray-dark);
			border-color: var(--gray-dark);
		}
	}
`;

const RawHeader = (props: IProps) => {
	const { location, tabs, history } = props;
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
		<header
			css={css`
				position: relative;
				background: #fff;
				border-bottom: 1px solid #eaeaea;
			`}
		>
			<a href="/" onClick={handleShowInfoModal}>
				<img
					css={css`
						position: absolute;
						width: 35px;
						margin: 5px 15px;
					`}
					src={logo}
					alt="Dash4 Logo"
				/>
			</a>
			<Modal show={showInfoModal} onHide={handleHideInfoModal}>
				<Modal.Header
					css={css`
						border: 0;
						padding: 10px 12px 0 0;
						& .close span {
							font-weight: 200;
						}
					`}
					closeButton
				/>
				<Modal.Body
					css={css`
						padding-top: 0;
						text-align: center;
						& img {
							margin-left: 14px;
							margin-bottom: 1.5rem;
						}
						& ul {
							list-style: none;
							padding: 0;
							margin-bottom: 0;
						}
						& ul + ul {
							margin-top: 0.5rem;
						}
						& .btn {
							padding: 0.1rem 1.5rem;
							min-width: 200px;
							margin-top: 10px;
						}
					`}
				>
					<img width="84" src={logo} alt="Dash4 Logo" />
					<ul
						css={css`
							& li {
								font-size: 14px;
								color: var(--gray);
								${linkStyles}
							}
							& strong {
								font-weight: 500;
							}
						`}
					>
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
				<Modal.Footer
					css={css`
						border: 0;
						text-align: center;
						font-size: 12px;
						display: inline;
						color: var(--gray);
						${linkStyles}
					`}
				>
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
			<ul
				css={css`
					position: relative;
					display: none;
					flex-wrap: nowrap;
					justify-content: center;
					align-content: center;
					padding: 15px 0 0 0;
					margin: 0 15px 0 65px;
					@media screen and (min-width: ${props.tabs.length * 70}px) {
						display: flex;
					}
				`}
			>
				{tabs.map((tab, index) => {
					const classNames = [
						`
							display: block;
							text-align: left;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							width: 100%;
							transition: color 0.5s, text-decoration 0.5s;
							border: 1px solid transparent;
							border-bottom: 0;
							font-size: 12px;
							padding: 6px 12px;
							margin: 0;
							color: #999;
							&:hover {
								color: #000;
								text-decoration: none;
							}
						`,
					];
					let isActive = false;
					if (
						location.pathname === `/${tab}` ||
						location.pathname.indexOf(`/${tab}/`) === 0 ||
						(location.pathname === '/' && index === 0)
					) {
						isActive = true;
						classNames.push(`
							background: #fafafa;
							border-color: #eaeaea;
							border-bottom: 0;
							border-top-left-radius: 8px;
							border-top-right-radius: 8px;
							color: #000;
						`);
					}
					return (
						<li
							style={{ width: `${100 / tabs.length}%` }}
							css={css`
								position: relative;
								list-style: none;
								margin-right: -1px;
								max-width: 100px;
								& + &:before {
									content: ' ';
									position: absolute;
									left: 0;
									width: 1px;
									top: 8px;
									bottom: 8px;
									background: #eaeaea;
								}
							`}
							key={tab}
						>
							{isActive && (
								<Fragment>
									<span
										css={css`
											width: 8px;
											height: 8px;
											display: block;
											overflow: hidden;
											position: absolute;
											bottom: -1px;
											left: -7px;
											&:before {
												content: ' ';
												display: block;
												width: 16px;
												height: 16px;
												background: radial-gradient(
													circle 8px at top left,
													transparent 0,
													transparent 7px,
													#eaeaea 8px,
													#fafafa 8px
												);
											}
										`}
									/>
									<span
										css={css`
											position: absolute;
											background: #fafafa;
											height: 3px;
											bottom: -1px;
											left: 0;
											right: 0;
										`}
									/>
									<span
										css={css`
											width: 8px;
											right: -7px;
											height: 8px;
											bottom: -1px;
											display: block;
											overflow: hidden;
											position: absolute;
											&:before {
												content: ' ';
												position: absolute;
												right: 0;
												top: 0;
												display: block;
												width: 16px;
												height: 16px;
												background: radial-gradient(
													circle 8px at top right,
													transparent 0,
													transparent 7px,
													#eaeaea 8px,
													#fafafa 8px
												);
											}
										`}
									/>
								</Fragment>
							)}
							<Link title={tab} css={css(classNames.join(' '))} to={index === 0 ? '/' : `/${tab}`}>
								{tab}
							</Link>
						</li>
					);
				})}
			</ul>
			<div
				css={css`
					display: flex;
					justify-content: center;
					@media screen and (min-width: ${props.tabs.length * 70}px) {
						display: none;
					}
				`}
			>
				<div
					css={css`
						text-align: center;
						padding: 11px 0;
					`}
				>
					{selected}
				</div>
				<div
					css={css`
						position: absolute;
						width: 24px;
						height: 18px;
						right: 20px;
						top: 14px;
						border-top: 2px solid #000;
						border-bottom: 2px solid #000;
						&:before {
							content: ' ';
							position: absolute;
							top: 6px;
							left: 0;
							width: 100%;
							border-top: 2px solid #000;
						}
					`}
				/>
				<select
					value={selected}
					onChange={(event) => {
						const value = event.currentTarget.value;
						setSelected(value);
						history.push(value === tabs[0] ? '/' : `/${value}`);
					}}
					css={css`
						cursor: pointer;
						background: transparent;
						border: 0;
						outline: 0;
						font-size: 0;
						color: #fff;
						text-align: center;
						appearance: none;
						height: 40px;
						position: absolute;
						right: 15px;
						width: calc(100% - 65px - 15px);
						top: 3px;
					`}
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

// TODO fix issue since typescript 3.6.x
export const Header = (withRouter(RawHeader as any) as any) as (props: IPropsRaw) => JSX.Element;

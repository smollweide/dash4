/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { Term } from '@dash4/react-xterm';
import { ErrorBoundary, Icon, WindowHeader } from '@dash4/ui';
import React, { Fragment, SyntheticEvent } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { IScriptWithId } from '../../../shared-types';
import { subscribeToNpmScriptDataChanges, unsubscribeToNpmScriptDataChanges } from './services';

type ITerm = Term;

interface IState {
	overlayOpening: boolean;
	overlayOpened: boolean;
	term?: ITerm;
	executing: boolean;
	dataBuffer: string;
	send?: (name: string, data?: number) => void;
}

export interface INpmScriptProps {
	id: string;
	script: IScriptWithId;
}

export const wait = (duration: number = 100) => new Promise((resolve) => setTimeout(resolve, duration));

export class NpmScript extends React.Component<INpmScriptProps, IState> {
	constructor(props: INpmScriptProps) {
		super(props);
		this.state = {
			executing: false,
			overlayOpening: false,
			overlayOpened: false,
			dataBuffer: '',
		};
	}

	public componentDidMount() {
		(async () => {
			this.setState({
				send: await subscribeToNpmScriptDataChanges(
					this.props.id,
					this.props.script.id,
					this.handleTerminalDataChange,
					this.handleStopped
				),
			});
		})();
	}

	public componentWillUnmount() {
		unsubscribeToNpmScriptDataChanges(this.props.id, this.props.script.id);
	}

	public render() {
		const script = this.props.script;
		return (
			<Fragment>
				<Button
					size="sm"
					onClick={this.handleOpenOverlay}
					css={css`
						position: relative;
						width: 100%;
					`}
					variant={script.buttonVariant || 'outline-primary'}
				>
					{this.state.executing && (
						<Icon align="center-in-content" name="refresh" animation="rotation-clockwise" />
					)}
					{script.title || script.cmd}
				</Button>
				<Modal
					css={css`
						& .modal-dialog {
							max-width: calc(100vw - 30px);
						}
						& .modal-content {
							border: 0;
						}
					`}
					size="lg"
					show={this.state.overlayOpening}
					onHide={this.handleCloseOverlay}
				>
					<Modal.Header
						closeButton
						css={css`
							background: #000;
							color: #fff;
							border-bottom: 0;
							& .close {
								color: #fff;
								text-shadow: none;
								opacity: 1;
								font-size: 18px;
							}
						`}
					>
						<WindowHeader
							css={css`
								padding: 0;
								padding-bottom: 10px;
								width: 100%;
							`}
							progressing={this.state.executing}
							title="Terminal"
							subTitle={script.title || script.cmd}
						/>
					</Modal.Header>
					<Modal.Body
						css={css`
							background: #000;
							padding-top: 0;
							padding-bottom: 0;
							padding-right: 0;
						`}
					>
						{this.state.overlayOpened && (
							<ErrorBoundary>
								<Term
									ref_={(id: string, term: ITerm) => {
										this.setState(
											{
												term,
											},
											() => {
												if (!this.state.term) {
													return;
												}
												this.state.term.write(this.state.dataBuffer);
											}
										);
									}}
									uid={`npm-scripts-${this.props.id}-${this.props.script.id}`}
								/>
							</ErrorBoundary>
						)}
					</Modal.Body>
					<Modal.Footer
						css={css`
							background: #000;
							border: 0;
						`}
					>
						<Button size="sm" variant="outline-secondary" onClick={this.handleClickClean}>
							Clean
						</Button>
						{this.state.executing ? (
							<Button size="sm" variant="outline-secondary" onClick={this.handleClickStop}>
								Stop
							</Button>
						) : (
							<Button size="sm" variant="outline-primary" onClick={this.handleClickStart}>
								Restart
							</Button>
						)}
					</Modal.Footer>
				</Modal>
			</Fragment>
		);
	}

	private handleCloseOverlay = () => {
		this.setState({
			overlayOpened: false,
			overlayOpening: false,
		});
	};

	private setStateAsync = (data: object) => new Promise((resolve) => this.setState(data, resolve));

	private handleOpenOverlay = async () => {
		await this.setStateAsync({
			overlayOpening: true,
		});
		await wait(100);
		await this.setStateAsync({
			overlayOpened: true,
		});

		if (!this.state.send) {
			return;
		}

		if (this.state.executing) {
			this.state.send('request-terminal-data');
			return;
		}

		this.clean();
		this.start();
	};

	private recieve = (data: string) => {
		if (!this.state.term) {
			return;
		}
		this.state.term.write(data);
	};

	private start = () => {
		if (!this.state.send) {
			return;
		}
		this.state.send('start');
		this.setState({
			executing: true,
		});
	};

	private stop = () => {
		if (!this.state.send) {
			return;
		}
		this.state.send('stop');
		this.setState({
			executing: false,
		});
	};

	private clean = () => {
		if (!this.state.send || !this.state.term) {
			return;
		}
		this.state.term.write('\x1Bc');
		this.state.send('clean');
	};

	private handleTerminalDataChange = (data: string, initial?: boolean) => {
		if (initial && data !== '') {
			this.setState({
				executing: true,
			});
		}
		this.recieve(data);
	};

	private handleClickStart = (event: SyntheticEvent<HTMLButtonElement>) => {
		event.preventDefault();
		this.start();
	};

	private handleClickStop = (event: SyntheticEvent<HTMLButtonElement>) => {
		event.preventDefault();
		this.stop();
	};

	private handleClickClean = (event: SyntheticEvent<HTMLButtonElement>) => {
		event.preventDefault();
		this.clean();
	};

	private handleStopped = () => {
		this.setState({
			executing: false,
		});
	};
}

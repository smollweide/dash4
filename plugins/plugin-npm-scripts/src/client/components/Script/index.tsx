// tslint:disable-next-line
// /* global fetch, WebSocket, location */
import { ErrorBoundary } from '@dash4/client/build/components/ErrorBoundary';
import { Icon } from '@dash4/client/build/components/Icon';
import { WindowHeader } from '@dash4/client/build/components/Window';
import { socket } from '@dash4/client/build/socket';
import { Term } from '@dash4/react-xterm';
import React, { SyntheticEvent } from 'react';
import { Button, Modal } from 'react-bootstrap';
import withStyles, { WithStyles } from 'react-jss';
import { IScriptWithId } from '../../../shared-types';

type ITerm = Term;

const styles = {
	button: {
		position: 'relative',
		width: '100%',
	},
	modal: {
		'& .modal-dialog': {
			maxWidth: 'calc(100vw - 30px)',
		},
		'& .modal-content': {
			border: 0,
		},
	},
	modalBody: {
		background: '#000',
		paddingTop: 0,
		paddingBottom: 0,
		paddingRight: 0,
	},
	modalHeader: {
		background: '#000',
		color: '#fff',
		borderBottom: 0,
		'& .close': {
			color: '#fff',
			textShadow: 'none',
			opacity: 1,
			fontSize: 18,
		},
	},
	modalFooter: {
		background: '#000',
		border: 0,
	},
	modalWindowHeader: {
		padding: 0,
		width: '100%',
	},
};

interface IState {
	alreadyStarted: boolean;
	overlayOpening: boolean;
	overlayOpened: boolean;
	term?: ITerm;
	stopped: boolean;
	dataBuffer: string;
	send?: (name: string, data?: number) => void;
}

export interface IProps extends WithStyles<typeof styles> {
	id: string;
	script: IScriptWithId;
}

async function subscribeToNpmScriptDataChanges(
	id: string,
	scriptId: string,
	onChange: (data: string, initial?: boolean) => void,
	onStopped: () => void
) {
	const socketData = await socket();
	const on = (name: string, callback: (data: string) => void) => {
		socketData.on(`plugin-npm-scripts-${id}-${scriptId}_${name}`, callback);
	};
	const send = (name: string, data?: number) => {
		socketData.send(`plugin-npm-scripts-${id}-${scriptId}_${name}`, data);
	};

	send('conntected');
	on('conntected', (data: string) => {
		onChange(data, true);
	});
	on('recieve', (data: string) => {
		onChange(data);
	});
	on('stopped', onStopped);

	return send;
}

async function unsubscribeToNpmScriptDataChanges(id: string, scriptId: string) {
	const socketData = await socket();
	const off = (name: string) => {
		socketData.off(`plugin-npm-scripts-${id}-${scriptId}_${name}`);
	};

	off('conntected');
	off('recieve');
	off('stopped');
}

const wait = (duration: number = 100) => new Promise((resolve) => setTimeout(resolve, duration));

export class NpmScriptRaw extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			alreadyStarted: false,
			stopped: true,
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
			<>
				<Button
					size="sm"
					onClick={this.handleOpenOverlay}
					className={this.props.classes.button}
					variant={script.buttonVariant || 'outline-primary'}
				>
					{!this.state.stopped && (
						<Icon align="center-in-content" name="refresh" animation="rotation-clockwise" />
					)}
					{script.title || script.cmd}
				</Button>
				<Modal
					className={this.props.classes.modal}
					size="lg"
					show={this.state.overlayOpening}
					onHide={this.handleCloseOverlay}
				>
					<Modal.Header className={this.props.classes.modalHeader} closeButton>
						<WindowHeader
							className={this.props.classes.modalWindowHeader}
							title={script.title || script.cmd}
							subTitle={script.cwd}
						/>
					</Modal.Header>
					<Modal.Body className={this.props.classes.modalBody}>
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
					<Modal.Footer className={this.props.classes.modalFooter}>
						<Button size="sm" variant="outline-secondary" onClick={this.handleClickClean}>
							Clean
						</Button>
						{this.state.stopped ? (
							<Button size="sm" variant="outline-primary" onClick={this.handleClickStart}>
								Restart
							</Button>
						) : (
							<Button size="sm" variant="outline-secondary" onClick={this.handleClickStop}>
								Stop
							</Button>
						)}
					</Modal.Footer>
				</Modal>
			</>
		);
	}

	private handleCloseOverlay = () => {
		this.setState({
			overlayOpened: false,
			overlayOpening: false,
		});
	};

	private setStateA = (data: object) => new Promise((resolve) => this.setState(data, resolve));

	private handleOpenOverlay = async () => {
		await this.setStateA({
			overlayOpening: true,
		});
		await wait(100);
		await this.setStateA({
			overlayOpened: true,
		});

		if (!this.state.send) {
			return;
		}

		if (!this.state.alreadyStarted) {
			this.state.send('start');
			this.setState({
				alreadyStarted: true,
				stopped: false,
			});
			return;
		}

		this.state.send('request-terminal-data');
	};

	private handleTerminalDataChange = (data: string, initial?: boolean) => {
		if (initial && data !== '') {
			this.setState({
				alreadyStarted: true,
				stopped: false,
			});
		}
		if (this.state.term) {
			this.state.term.write(data);
		}
	};

	private handleClickStart = (event: SyntheticEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (!this.state.send) {
			return;
		}
		this.state.send('start');
		this.setState({
			stopped: false,
		});
	};

	private handleClickStop = (event: SyntheticEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (!this.state.send) {
			return;
		}
		this.state.send('stop');
		this.setState({
			stopped: true,
		});
	};

	private handleClickClean = (event: SyntheticEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (!this.state.send || !this.state.term) {
			return;
		}
		this.state.term.write('\x1Bc');
		this.state.send('clean');
	};

	private handleStopped = () => {
		this.setState({
			stopped: true,
		});
	};
}

export const NpmScript = withStyles(styles)(NpmScriptRaw);

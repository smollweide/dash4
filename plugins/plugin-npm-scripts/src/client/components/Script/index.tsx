import { Term } from '@dash4/react-xterm';
import { ErrorBoundary, Icon, WindowHeader } from '@dash4/ui';
import React, { SyntheticEvent } from 'react';
import { Button, Modal } from 'react-bootstrap';
import withStyles, { WithStyles } from 'react-jss';
import { IScriptWithId } from '../../../shared-types';
import { subscribeToNpmScriptDataChanges, unsubscribeToNpmScriptDataChanges } from './services';
import { styles } from './styles';

type ITerm = Term;

interface IState {
	overlayOpening: boolean;
	overlayOpened: boolean;
	term?: ITerm;
	executing: boolean;
	dataBuffer: string;
	send?: (name: string, data?: number) => void;
}

export interface IProps extends WithStyles<typeof styles> {
	id: string;
	script: IScriptWithId;
}

export const wait = (duration: number = 100) => new Promise((resolve) => setTimeout(resolve, duration));

export class NpmScriptRaw extends React.Component<IProps, IState> {
	constructor(props: IProps) {
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
			<>
				<Button
					size="sm"
					onClick={this.handleOpenOverlay}
					className={this.props.classes.button}
					variant={script.buttonVariant || 'outline-primary'}
				>
					{this.state.executing && (
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
							progressing={this.state.executing}
							className={this.props.classes.modalWindowHeader}
							title="Terminal"
							subTitle={script.title || script.cmd}
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
			</>
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

export const NpmScript = withStyles(styles)(NpmScriptRaw);

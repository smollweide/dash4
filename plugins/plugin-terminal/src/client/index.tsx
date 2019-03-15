// tslint:disable-next-line
// /* global fetch, WebSocket, location */
import { IWidgetConfig } from '@dash4/client/build';
import { ErrorBoundary } from '@dash4/client/build/components/ErrorBoundary';
import { Icon } from '@dash4/client/build/components/Icon';
import { Window, WindowBody, WindowHeader } from '@dash4/client/build/components/Window';
import { registerPlugin } from '@dash4/client/build/register-plugin';
import { socket } from '@dash4/client/build/socket';
import { Term } from '@dash4/react-xterm';
import React, { SyntheticEvent } from 'react';
import { Button, ButtonGroup, ListGroup, OverlayTrigger, Popover } from 'react-bootstrap';
import withStyles, { WithStyles } from 'react-jss';
import { IClientConfig } from '../shared-types';

type ITerm = Term;

interface IState {
	term?: ITerm;
	stopped: boolean;
	send?: (name: string, data?: string) => void;
	fullscreen: boolean;
}

const styles = {
	windowBody: {
		height: 250,
	},
};

type IProps = WithStyles<typeof styles> & IWidgetConfig<IClientConfig>;

async function subscribeToTerminalDataChanges(id: string, onChange: (data: string) => void, onStopped: () => void) {
	const socketData = await socket();
	const on = (name: string, callback: (data: string) => void) => {
		socketData.on(`plugin-terminal-${id}_${name}`, callback);
	};
	const send = (name: string, data?: string) => {
		socketData.send(`plugin-terminal-${id}_${name}`, data);
	};

	send('conntected');
	on('conntected', (data: string) => {
		onChange(data);
	});
	on('recieve', (data: string) => {
		onChange(data);
	});
	on('stopped', onStopped);

	return send;
}

async function unsubscribeToTerminalDataChanges(id: string) {
	const socketData = await socket();
	const off = (name: string) => {
		socketData.off(`plugin-terminal-${id}_${name}`);
	};

	off('conntected');
	off('recieve');
	off('stopped');
}

class Terminal extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			stopped: false,
			fullscreen: false,
		};
	}

	public componentDidMount() {
		(async () => {
			this.setState({
				send: await subscribeToTerminalDataChanges(
					this.props.id,
					this.handleTerminalDataChange,
					this.handleStopped
				),
			});
		})();
	}

	public componentWillUnmount() {
		unsubscribeToTerminalDataChanges(this.props.id);
	}

	public render() {
		return (
			<Window fullscreen={this.state.fullscreen} dark={this.props.dark}>
				<WindowHeader
					onDoubleClick={this.handleHeaderDoubleClick}
					title={this.props.name}
					subTitle={this.props.clientConfig.cmd}
				>
					<ButtonGroup aria-label="Basic example">
						{this.state.stopped ? (
							<Button onClick={this.handleClickStart} variant="outline-primary" size="sm">
								<Icon name="play_arrow" size="m" />
							</Button>
						) : (
							<Button onClick={this.handleClickStop} variant="outline-primary" size="sm">
								<Icon name="stop" size="m" />
							</Button>
						)}
						<OverlayTrigger trigger="click" placement="bottom-end" overlay={this.popover}>
							<Button variant="outline-primary" size="sm">
								<Icon name="more_vert" size="m" />
							</Button>
						</OverlayTrigger>
					</ButtonGroup>
				</WindowHeader>
				<WindowBody className={this.props.classes.windowBody}>
					<ErrorBoundary>
						<Term
							ref_={(id: string, term: ITerm) => {
								this.setState({
									term,
								});
							}}
							uid={this.props.id}
						/>
					</ErrorBoundary>
				</WindowBody>
			</Window>
		);
	}

	private handleHeaderDoubleClick = () => {
		this.toggleFullscreen();
	};

	private toggleFullscreen() {
		this.setState({
			fullscreen: !this.state.fullscreen,
		});
	}

	private get popover() {
		return <Popover id="popover-basic">{this.contextMenu}</Popover>;
	}

	private get contextMenu() {
		return (
			<ListGroup variant="flush">
				<ListGroup.Item action onClick={this.handleClickClean}>
					Clean
				</ListGroup.Item>
			</ListGroup>
		);
	}

	private handleTerminalDataChange = (data: string) => {
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
		if (!this.state.send || !this.state.term) {
			return;
		}
		this.state.term.write('\x1Bc');
		this.state.send('stop');
		this.setState({
			stopped: true,
		});
	};

	private handleClickClean = (event: SyntheticEvent<HTMLAnchorElement>) => {
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

registerPlugin('PluginTerminal', withStyles(styles)(Terminal));

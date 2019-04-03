// tslint:disable-next-line
// /* global fetch, WebSocket, location */
import { IWidgetConfig } from '@dash4/client/build';
import { registerPlugin } from '@dash4/client/build/register-plugin';
import { Term } from '@dash4/react-xterm';
import { ErrorBoundary, Icon, Window, WindowBody, WindowHeader } from '@dash4/ui';
import React, { Component, SyntheticEvent } from 'react';
import { Button, ButtonGroup, ListGroup, OverlayTrigger, Popover } from 'react-bootstrap';
import withStyles, { WithStyles } from 'react-jss';
import { IClientConfig } from '../shared-types';
import { subscribeToTerminalDataChanges, unsubscribeToTerminalDataChanges } from './services';
import { styles } from './styles';

type ITerm = Term;

interface IState {
	term?: ITerm;
	stopped: boolean;
	send?: (name: string, data?: string) => void;
	fullscreen: boolean;
}

type IProps = WithStyles<typeof styles> & IWidgetConfig<IClientConfig>;

class PluginTerminalRaw extends Component<IProps, IState> {
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
					<ButtonGroup>
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

export const PluginTerminal = withStyles(styles)(PluginTerminalRaw);

registerPlugin('PluginTerminal', PluginTerminal);

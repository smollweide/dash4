/* global fetch, WebSocket, location */
import { IWidgetConfig } from '@dash4/client/build';
import { Icon } from '@dash4/client/build/components/Icon';
import { Window, WindowHeader } from '@dash4/client/build/components/Window';
import { registerPlugin } from '@dash4/client/build/register-plugin';
import { socket } from '@dash4/client/build/socket';
import React, { SyntheticEvent } from 'react';
import { Button, ButtonGroup, ListGroup, OverlayTrigger, Popover } from 'react-bootstrap';
import { IAdditionals } from '../shared-types';
import { Term } from './components/Xterm';
import './index.scss';

interface IState {
	term?: Term;
	stopped: boolean;
	send?: (name: string, data?: string) => void;
}

type IProps = IWidgetConfig<IAdditionals>;

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

class Terminal extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			stopped: false,
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

	public render() {
		return (
			<Window dark={this.props.dark}>
				<WindowHeader title={this.props.name} subTitle={this.props.additionals.cmd}>
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
				<Term
					ref_={(id: string, term: Term) => {
						this.setState({
							term,
						});
					}}
					uid={this.props.id}
				/>
			</Window>
		);
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

registerPlugin('PluginTerminal', Terminal);

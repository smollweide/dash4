// tslint:disable-next-line
// /* global fetch, WebSocket, location */
import { IWidgetConfig } from '@dash4/client/build';
import { registerPlugin } from '@dash4/client/build/register-plugin';
import { Term } from '@dash4/react-xterm';
import { ErrorBoundary, Icon, Key, Keyboard, useFullscreen, Window, WindowBody, WindowHeader } from '@dash4/ui';
import useKey from '@rooks/use-key';
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { Button, ButtonGroup, Form, ListGroup, Modal, OverlayTrigger, Popover } from 'react-bootstrap';
import withStyles, { WithStyles } from 'react-jss';
import { IClientConfig, ISendToServer } from '../shared-types';
import { subscribeToTerminalDataChanges, unsubscribeToTerminalDataChanges } from './services';
import { styles } from './styles';

type ITerm = Term;

type IProps = WithStyles<typeof styles> & IWidgetConfig<IClientConfig>;

function getKeyCodeSymbol(keyCode: string | number) {
	const keyCodeS = String(keyCode);

	switch (keyCodeS) {
		case '13':
			return '↵';
		default:
			return keyCodeS.toUpperCase();
	}
}

const sendMap: { [key: string]: ISendToServer } = {};
const termMap: { [key: string]: ITerm } = {};

function useFocused() {
	const [focused, setFocused] = useState(false);

	const handleFocus = () => setFocused(true);
	const handleBlur = () => setFocused(false);

	return { focused, handleFocus, handleBlur };
}

const PluginTerminalRaw = ({ id, dark, name, clientConfig, classes }: IProps) => {
	const { fullscreen, toggleFullscreen } = useFullscreen();
	const { focused, handleFocus, handleBlur } = useFocused();
	const [processing, setProcessing] = useState(false);
	const [cmdPressed, setCmdPressed] = useState(false);
	const [inputValue, setInputValue] = useState<string | undefined>(undefined);
	const [inputCommandId, setInputCommandId] = useState<string | undefined>(undefined);
	const inputRef = useRef(null);

	function handleTerminalDataChange(data: string) {
		if (!termMap[id]) {
			return;
		}
		termMap[id].write(data);
		if (!processing && data !== '') {
			setProcessing(true);
		}
	}

	function handleClickStart(event: SyntheticEvent<HTMLButtonElement>) {
		event.preventDefault();
		if (!sendMap[id]) {
			return;
		}
		sendMap[id]('start');
		setProcessing(true);
	}

	function handleClickStop(event: SyntheticEvent<HTMLButtonElement>) {
		event.preventDefault();
		setProcessing(false);
		if (!sendMap[id] || !termMap[id]) {
			return;
		}
		termMap[id].write('\x1Bc');
		sendMap[id]('stop');
	}

	function handleClickClean(event?: SyntheticEvent<HTMLAnchorElement>) {
		if (event) {
			event.preventDefault();
		}
		if (!sendMap[id] || !termMap[id]) {
			return;
		}
		termMap[id].write('\x1Bc');
		sendMap[id]('clean');
	}

	function handleStopped() {
		setProcessing(false);
	}

	function handleClickCommand(commandId: string, event: SyntheticEvent<HTMLButtonElement>) {
		event.preventDefault();
		if (!sendMap[id]) {
			return;
		}
		proceedWithCommand(commandId);
	}

	function getCommandIdByKeyboardEvent(event: KeyboardEvent) {
		if (!clientConfig.allowedCommands) {
			return;
		}
		return Object.keys(clientConfig.allowedCommands || {}).filter((commandId) => {
			const keyCode = (clientConfig.allowedCommands || {})[commandId].keyCode;
			return event.key === keyCode || event.keyCode === keyCode;
		})[0];
	}

	function getCommandById(commandId: string) {
		if (!clientConfig.allowedCommands) {
			return;
		}
		return clientConfig.allowedCommands[commandId];
	}

	function handleKeyDownCommand(event: KeyboardEvent) {
		const commandId = getCommandIdByKeyboardEvent(event);
		if (commandId) {
			proceedWithCommand(commandId);
		}
	}

	function handleSentCommand() {
		if (!inputCommandId) {
			return;
		}
		sendMap[id]('command-input', {
			value: inputValue || '',
			commandId: inputCommandId,
		});
		setInputCommandId(undefined);
		setInputValue(undefined);
	}

	function proceedWithCommand(commandId: string) {
		const command = getCommandById(commandId);
		if (!command) {
			return;
		}
		if (command.hasInput) {
			setInputCommandId(commandId);
		}
		sendMap[id]('command', commandId);
	}

	function handleCloseInputModal() {
		setInputCommandId(undefined);
	}

	function handleInputChange(event: SyntheticEvent<any>) {
		setInputValue(event.currentTarget.value);
	}

	function ContextMenu() {
		const allowedCommands = clientConfig.allowedCommands || [];

		return (
			<ListGroup variant="flush">
				<ListGroup.Item className={classes.contextMenuItem} action onMouseDown={handleClickClean}>
					clean
					<div className={classes.keyboard}>
						<Keyboard>
							<Key>⌘</Key>
							<Key>K</Key>
						</Keyboard>
					</div>
				</ListGroup.Item>
				{Object.keys(allowedCommands).map((commandId) => (
					<ListGroup.Item
						className={classes.contextMenuItem}
						key={allowedCommands[commandId].keyCode}
						action
						onMouseDown={handleClickCommand.bind(this, commandId)}
					>
						{allowedCommands[commandId].title}
						<div className={classes.keyboard}>
							<Keyboard>
								<Key>{getKeyCodeSymbol(allowedCommands[commandId].keyCode)}</Key>
							</Keyboard>
						</div>
					</ListGroup.Item>
				))}
			</ListGroup>
		);
	}

	useEffect(() => {
		(async () => {
			sendMap[id] = await subscribeToTerminalDataChanges(id, handleTerminalDataChange, handleStopped);
		})();
		return () => {
			unsubscribeToTerminalDataChanges(id);
		};
	}, []);

	useEffect(() => {
		if (inputCommandId === undefined) {
			return;
		}
		setTimeout(() => {
			try {
				// @ts-ignore
				(inputRef || {}).current.focus();
			} catch (err) {
				// tslint:disable-next-line
			}
		}, 100);
	}, [inputCommandId]);

	// is cmd or ctlr pressed
	useKey([17, 91], (event: KeyboardEvent) => setCmdPressed(event.type === 'keydown'), {
		eventTypes: ['keydown', 'keyup'],
		when: (focused || fullscreen) && inputCommandId === undefined,
	});

	useKey(['k'], () => handleClickClean(), {
		eventTypes: ['keydown'],
		when: (focused || fullscreen) && cmdPressed && inputCommandId === undefined,
	});

	useKey(
		Object.keys(clientConfig.allowedCommands || {}).map(
			(commandId) => (clientConfig.allowedCommands || {})[commandId].keyCode
		),
		handleKeyDownCommand,
		{
			eventTypes: ['keydown'],
			when: (focused || fullscreen) && inputCommandId === undefined,
		}
	);

	useKey([13], handleSentCommand, {
		target: inputRef,
		eventTypes: ['keypress'],
		when: true,
	});

	return (
		<>
			<Window
				onFocus={handleFocus}
				onBlur={handleBlur}
				onWillLeaveFullscreen={toggleFullscreen}
				fullscreen={fullscreen}
				dark={dark}
			>
				<WindowHeader
					onDoubleClick={toggleFullscreen}
					title={clientConfig.title || name}
					subTitle={clientConfig.subtitle || clientConfig.cmd}
				>
					<ButtonGroup>
						{!processing ? (
							<Button onClick={handleClickStart} variant="outline-primary" size="sm">
								<Icon name="play_arrow" size="m" />
							</Button>
						) : (
							<Button onClick={handleClickStop} variant="outline-primary" size="sm">
								<Icon name="stop" size="m" />
							</Button>
						)}
						<OverlayTrigger
							trigger="click"
							placement="bottom-end"
							overlay={
								<Popover id="popover-basic">
									<ContextMenu />
								</Popover>
							}
						>
							<Button variant="outline-primary" size="sm">
								<Icon name="more_vert" size="m" />
							</Button>
						</OverlayTrigger>
					</ButtonGroup>
				</WindowHeader>
				<WindowBody className={classes.windowBody}>
					<ErrorBoundary>
						<Term
							ref_={(_id: string, term: ITerm) => {
								termMap[id] = term;
							}}
							uid={id}
						/>
					</ErrorBoundary>
				</WindowBody>
			</Window>
			<Modal show={inputCommandId !== undefined} onHide={handleCloseInputModal}>
				<Modal.Body>
					<Form.Control
						autoFocus
						ref={inputRef}
						value={inputValue}
						onChange={handleInputChange}
						type="text"
						placeholder="Enter command"
					/>
				</Modal.Body>
			</Modal>
		</>
	);
};

export const PluginTerminal = withStyles(styles)(PluginTerminalRaw);

registerPlugin('PluginTerminal', PluginTerminal);

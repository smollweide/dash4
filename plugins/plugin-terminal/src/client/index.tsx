/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { IWidgetConfig } from '@dash4/client/build';
import { registerPlugin } from '@dash4/client/build/register-plugin';
import { Term } from '@dash4/react-xterm';
import { ErrorBoundary, Icon, Key, Keyboard, useFullscreen, Window, WindowBody, WindowHeader } from '@dash4/ui';
import useKey from '@rooks/use-key';
import { Fragment, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { Button, ButtonGroup, Form, ListGroup, Modal, OverlayTrigger, Popover } from 'react-bootstrap';
import { IClientConfig, ISendToServer } from '../shared-types';
import { subscribeToTerminalDataChanges, unsubscribeToTerminalDataChanges } from './services';

type ITerm = Term;

type IProps = IWidgetConfig<IClientConfig>;

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

export const PluginTerminal = ({ id, dark, name, clientConfig }: IProps) => {
	const { fullscreen, toggleFullscreen } = useFullscreen();
	const { focused, handleFocus, handleBlur } = useFocused();
	const [processing, setProcessing] = useState(false);
	const [cmdPressed, setCmdPressed] = useState(false);
	const [inputValue, setInputValue] = useState<string | undefined>(undefined);
	const [inputCommandId, setInputCommandId] = useState<string | undefined>(undefined);
	const inputRef = useRef(null);
	const keyboardWrapperStyles = css`
		position: absolute;
		right: 0;
		top: 11px;
	`;
	const contextMenuItemStyles = css`
		min-width: 200px;
		padding-left: 0;
		padding-right: 40px;
	`;

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

	function getCommandById(commandId: string) {
		if (!clientConfig?.allowedCommands) {
			return;
		}
		return clientConfig?.allowedCommands[commandId];
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

	function handleClickCommand(commandId: string, event: SyntheticEvent<HTMLButtonElement>) {
		event.preventDefault();
		if (!sendMap[id]) {
			return;
		}
		proceedWithCommand(commandId);
	}

	function getCommandIdByKeyboardEvent(event: KeyboardEvent) {
		if (!clientConfig?.allowedCommands) {
			return;
		}
		return Object.keys(clientConfig?.allowedCommands || {}).filter((commandId) => {
			const keyCode = (clientConfig?.allowedCommands || {})[commandId].keyCode;
			return event.key === keyCode || event.keyCode === keyCode;
		})[0];
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

	function handleCloseInputModal() {
		setInputCommandId(undefined);
	}

	function handleInputChange(event: SyntheticEvent<any>) {
		setInputValue(event.currentTarget.value);
	}

	function ContextMenu() {
		const allowedCommands = clientConfig?.allowedCommands || {};

		return (
			<ListGroup variant="flush">
				<ListGroup.Item action css={contextMenuItemStyles} onMouseDown={handleClickClean}>
					clean
					<div css={keyboardWrapperStyles}>
						<Keyboard>
							<Key>⌘</Key>
							<Key>K</Key>
						</Keyboard>
					</div>
				</ListGroup.Item>
				{Object.keys(allowedCommands).map((commandId) => (
					<ListGroup.Item
						key={allowedCommands[commandId].keyCode}
						action
						css={contextMenuItemStyles}
						// eslint-disable-next-line
						onMouseDown={handleClickCommand.bind(this, commandId)}
					>
						{allowedCommands[commandId].title}
						<div css={keyboardWrapperStyles}>
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
				// eslint-disable-next-line
				// @ts-ignore
				(inputRef || {}).current.focus();
			} catch (err) {
				// eslint-disable-next-line
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
		Object.keys(clientConfig?.allowedCommands || {}).map(
			(commandId) => (clientConfig?.allowedCommands || {})[commandId].keyCode
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
		<Fragment>
			<Window
				fullscreen={fullscreen}
				dark={dark}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onWillLeaveFullscreen={toggleFullscreen}
			>
				<WindowHeader
					title={clientConfig?.title || name}
					subTitle={clientConfig?.subtitle || clientConfig?.cmd}
					onDoubleClick={toggleFullscreen}
				>
					<ButtonGroup>
						{!processing ? (
							<Button variant="outline-primary" size="sm" onClick={handleClickStart}>
								<Icon name="play_arrow" size="m" />
							</Button>
						) : (
							<Button variant="outline-primary" size="sm" onClick={handleClickStop}>
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
				<WindowBody
					css={css`
						height: ${clientConfig?.height || 250}px;
					`}
				>
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
						ref={inputRef}
						autoFocus
						value={inputValue}
						type="text"
						placeholder="Enter command"
						onChange={handleInputChange}
					/>
				</Modal.Body>
			</Modal>
		</Fragment>
	);
};

registerPlugin('PluginTerminal', PluginTerminal);

/* global Blob,URL,requestAnimationFrame,ResizeObserver */
import React, { SyntheticEvent } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { Terminal } from 'xterm';
import 'xterm/dist/xterm.css';
import * as fit from 'xterm/lib/addons/fit/fit';
import * as webLinks from 'xterm/lib/addons/webLinks/webLinks';
import * as winptyCompat from 'xterm/lib/addons/winptyCompat/winptyCompat';
import defaultConfig from './default-config';
import './xterm.css';

Terminal.applyAddon(fit);
Terminal.applyAddon(webLinks);
Terminal.applyAddon(winptyCompat);

const WebGL2RenderingContext = (window as any).WebGL2RenderingContext;

// map old hterm constants to xterm.js
const CURSOR_STYLES = {
	BEAM: 'bar',
	UNDERLINE: 'underline',
	BLOCK: 'block',
};
export type TCursorStyles = keyof typeof CURSOR_STYLES;

const isWebgl2Supported = (() => {
	let isSupported = WebGL2RenderingContext ? undefined : false;
	return () => {
		if (isSupported === undefined) {
			const canvas = document.createElement('canvas');
			const gl = canvas.getContext('webgl2', { depth: false, antialias: false });
			isSupported = gl instanceof WebGL2RenderingContext;
		}
		return isSupported;
	};
})();

interface IProps {
	uid: string | number;
	ref_: (id: string | number, term: Term | null) => void;
	isTermActive?: boolean;
	padding?: number | string;
	cleared?: boolean;
	rows?: number;
	cols?: number;
	term?: Term;
	customChildrenBefore?: React.ReactNode;
	customChildren?: React.ReactNode;
	backgroundColor?: string;
	webGLRenderer?: any;
	scrollback?: boolean;
	cursorShape?: TCursorStyles;
	cursorBlink?: boolean;
	fontFamily?: string;
	fontSize?: string | number;
	fontWeight?: string | number;
	fontWeightBold?: string | number;
	lineHeight?: string | number;
	letterSpacing?: string | number;
	foregroundColor?: string | number;
	cursorColor?: string | number;
	cursorAccentColor?: string | number;
	selectionColor?: string | number;
	macOptionSelectionMode?: string;
	modifierKeys?: {
		altIsMeta?: boolean;
	};
	colors?: {
		black?: string | number;
		red?: string | number;
		green?: string | number;
		yellow?: string | number;
		blue?: string | number;
		magenta?: string | number;
		cyan?: string | number;
		white?: string | number;
		lightBlack?: string | number;
		lightRed?: string | number;
		lightGreen?: string | number;
		lightYellow?: string | number;
		lightBlue?: string | number;
		lightMagenta?: string | number;
		lightCyan?: string | number;
		lightWhite?: string | number;
	};
	onTitle?: (...args: any[]) => void;
	onActive?: (...args: any[]) => void;
	onData?: (...args: any[]) => void;
	onResize?: (...args: any[]) => void;
	onCursorMove?: (...args: any[]) => void;
}

const getTermOptions = (props: IProps) => {
	// Set a background color only if it is opaque
	// const needTransparency = Color(props.backgroundColor).alpha() < 1;
	const needTransparency = false;
	const colors = props.colors || {};
	const backgroundColor = props.backgroundColor || defaultConfig.config.backgroundColor;

	let useWebGL = false;
	if (props.webGLRenderer) {
		if (needTransparency) {
			// tslint:disable-next-line
			console.warn(
				'WebGL Renderer has been disabled since it does not support transparent backgrounds yet. ' +
					'Falling back to canvas-based rendering.'
			);
		} else if (!isWebgl2Supported()) {
			// tslint:disable-next-line
			console.warn('WebGL2 is not supported on your machine. Falling back to canvas-based rendering.');
		} else {
			useWebGL = true;
		}
	}
	Term.reportRenderer(props.uid, useWebGL ? 'WebGL' : 'Canvas');

	return {
		macOptionIsMeta: (props.modifierKeys || {}).altIsMeta || true,
		scrollback: props.scrollback,
		cursorStyle: CURSOR_STYLES[props.cursorShape || 'BEAM'],
		cursorBlink: props.cursorBlink || defaultConfig.config.cursorBlink,
		fontFamily: props.fontFamily || defaultConfig.config.fontFamily,
		fontSize: props.fontSize || defaultConfig.config.fontSize,
		fontWeight: props.fontWeight || defaultConfig.config.fontWeight,
		fontWeightBold: props.fontWeightBold || defaultConfig.config.fontWeightBold,
		lineHeight: props.lineHeight || defaultConfig.config.lineHeight,
		letterSpacing: props.letterSpacing || defaultConfig.config.letterSpacing,
		allowTransparency: needTransparency || false,
		macOptionClickForcesSelection: props.macOptionSelectionMode === 'force',
		// HACK: Terminal.setOption breaks if we don't apply these in this order
		// TODO: The above notice can be removed once this is addressed:
		// https://github.com/xtermjs/xterm.js/pull/1790#issuecomment-450000121
		rendererType: useWebGL ? 'webgl' : 'canvas',
		experimentalCharAtlas: useWebGL ? 'webgl' : 'dynamic',
		theme: {
			foreground: props.foregroundColor || defaultConfig.config.foregroundColor,
			background: backgroundColor,
			cursor: props.cursorColor || defaultConfig.config.cursorColor,
			cursorAccent: props.cursorAccentColor || defaultConfig.config.cursorAccentColor,
			selection: props.selectionColor || defaultConfig.config.selectionColor,
			black: colors.black || defaultConfig.config.colors.black,
			red: colors.red || defaultConfig.config.colors.red,
			green: colors.green || defaultConfig.config.colors.green,
			yellow: colors.yellow || defaultConfig.config.colors.yellow,
			blue: colors.blue || defaultConfig.config.colors.blue,
			magenta: colors.magenta || defaultConfig.config.colors.magenta,
			cyan: colors.cyan || defaultConfig.config.colors.cyan,
			white: colors.white || defaultConfig.config.colors.white,
			brightBlack: colors.lightBlack || defaultConfig.config.colors.lightBlack,
			brightRed: colors.lightRed || defaultConfig.config.colors.lightRed,
			brightGreen: colors.lightGreen || defaultConfig.config.colors.lightGreen,
			brightYellow: colors.lightYellow || defaultConfig.config.colors.lightYellow,
			brightBlue: colors.lightBlue || defaultConfig.config.colors.lightBlue,
			brightMagenta: colors.lightMagenta || defaultConfig.config.colors.lightMagenta,
			brightCyan: colors.lightCyan || defaultConfig.config.colors.lightCyan,
			brightWhite: colors.lightWhite || defaultConfig.config.colors.lightWhite,
		},
	};
};

export class Term extends React.PureComponent<IProps, any> {
	// The main process shows this in the About dialog
	public static reportRenderer(uid: string | number, type: string) {
		const rendererTypes = (Term as any).rendererTypes || {};
		if (rendererTypes[uid] !== type) {
			rendererTypes[uid] = type;
			(Term as any).rendererTypes = rendererTypes;
		}
	}

	private termRef: any;
	private termWrapperRef: any;
	private termRect: any;
	private termOptions: any;
	private disposableListeners: any;
	private term: any;
	private resizeObserver: any;
	private resizeTimeout: any;

	constructor(props: IProps) {
		super(props);
		props.ref_(props.uid, this);
		this.termRef = null;
		this.termWrapperRef = null;
		this.termRect = null;
		this.termOptions = {};
		this.disposableListeners = [];
	}

	public componentDidMount() {
		const { props } = this;

		this.termOptions = getTermOptions(props);
		this.term = props.term || new Terminal(this.termOptions);
		// console.log(this.termOptions);
		// this.term = props.term || new Terminal();

		// The parent element for the terminal is attached and removed manually so
		// that we can preserve it across mounts and unmounts of the component
		this.termRef = document.createElement('div');
		this.termRef.className = 'term_fit term_term';

		this.termWrapperRef.appendChild(this.termRef);

		if (!props.term) {
			this.term.attachCustomKeyEventHandler(this.keyboardHandler);
			this.term.open(this.termRef);
			this.term.webLinksInit();
			this.term.winptyCompatInit();
		}

		if (this.props.isTermActive) {
			this.term.focus();
		}

		if (props.onTitle) {
			this.disposableListeners.push(this.term.addDisposableListener('title', props.onTitle));
		}

		if (props.onActive) {
			this.disposableListeners.push(this.term.addDisposableListener('focus', props.onActive));
		}

		if (props.onData) {
			this.disposableListeners.push(this.term.addDisposableListener('data', props.onData));
		}

		if (props.onResize) {
			this.disposableListeners.push(
				this.term.addDisposableListener('resize', ({ cols, rows }) => {
					if (props.onResize) {
						props.onResize(cols, rows);
					}
				})
			);
		}

		if (props.onCursorMove) {
			this.disposableListeners.push(
				this.term.addDisposableListener('cursormove', () => {
					const cursorFrame = {
						x: this.term._core.buffer.x * this.term._core.renderer.dimensions.actualCellWidth,
						y: this.term._core.buffer.y * this.term._core.renderer.dimensions.actualCellHeight,
						width: this.term._core.renderer.dimensions.actualCellWidth,
						height: this.term._core.renderer.dimensions.actualCellHeight,
						col: this.term._core.buffer.y,
						row: this.term._core.buffer.x,
					};
					if (props.onCursorMove) {
						props.onCursorMove(cursorFrame);
					}
				})
			);
		}

		window.addEventListener('paste', this.onWindowPaste, {
			capture: true,
		});
	}

	public getTermDocument() {
		// tslint:disable-next-line
		console.warn(
			'The underlying terminal engine of Hyper no longer ' +
				'uses iframes with individual `document` objects for each ' +
				'terminal instance. This method call is retained for ' +
				"backwards compatibility reasons. It's ok to attach directly" +
				'to the `document` object of the main `window`.'
		);
		return document;
	}

	// intercepting paste event for any necessary processing of
	// clipboard data, if result is falsy, paste event continues
	public onWindowPaste(e: Event) {
		// tslint:disable-next-line
	}

	public onMouseUp = (e: SyntheticEvent) => {
		// tslint:disable-next-line
	};

	public write(data: string) {
		this.term.write(data);
	}

	public focus() {
		this.term.focus();
	}

	public clear() {
		this.term.clear();
	}

	public reset() {
		this.term.reset();
	}

	public resize(cols?: number, rows?: number) {
		this.term.resize(cols, rows);
	}

	public selectAll() {
		this.term.selectAll();
	}

	public fitResize() {
		if (!this.termWrapperRef) {
			return;
		}
		this.term.fit();
	}

	public keyboardHandler(e: any) {
		// Has Mousetrap flagged this event as a command?
		return !e.catched;
	}

	public componentWillReceiveProps(nextProps: IProps) {
		if (!this.props.cleared && nextProps.cleared) {
			this.clear();
		}
		const nextTermOptions = getTermOptions(nextProps);

		// Update only options that have changed.
		Object.keys(nextTermOptions)
			.filter((option) => option !== 'theme' && nextTermOptions[option] !== this.termOptions[option])
			.forEach((option) => {
				try {
					this.term.setOption(option, nextTermOptions[option]);
				} catch (e) {
					if (/The webgl renderer only works with the webgl char atlas/i.test(e.message)) {
						// Ignore this because the char atlas will also be changed
					} else {
						throw e;
					}
				}
			});

		// Do we need to update theme?
		const shouldUpdateTheme =
			!this.termOptions.theme ||
			nextTermOptions.rendererType !== this.termOptions.rendererType ||
			Object.keys(nextTermOptions.theme).some(
				(option) => nextTermOptions.theme[option] !== this.termOptions.theme[option]
			);
		if (shouldUpdateTheme) {
			this.term.setOption('theme', nextTermOptions.theme);
		}

		this.termOptions = nextTermOptions;

		if (
			this.props.fontSize !== nextProps.fontSize ||
			this.props.fontFamily !== nextProps.fontFamily ||
			this.props.lineHeight !== nextProps.lineHeight ||
			this.props.letterSpacing !== nextProps.letterSpacing
		) {
			// resize to fit the container
			this.fitResize();
		}

		if (nextProps.rows !== this.props.rows || nextProps.cols !== this.props.cols) {
			this.resize(nextProps.cols, nextProps.rows);
		}
	}

	public onTermWrapperRef = (component: any) => {
		this.termWrapperRef = component;

		if (component) {
			this.resizeObserver = new ResizeObserver(() => {
				if (this.resizeTimeout) {
					return;
				}
				this.resizeTimeout = setTimeout(() => {
					delete this.resizeTimeout;
					this.fitResize();
				}, 0);
			});
			this.resizeObserver.observe(component);
		} else {
			this.resizeObserver.disconnect();
		}
	};

	public componentWillUnmount() {
		// terms[this.props.uid] = null;
		this.termWrapperRef.removeChild(this.termRef);
		this.props.ref_(this.props.uid, null);

		// to clean up the terminal, we remove the listeners
		// instead of invoking `destroy`, since it will make the
		// term insta un-attachable in the future (which we need
		// to do in case of splitting, see `componentDidMount`
		this.disposableListeners.forEach((handler) => handler.dispose());
		this.disposableListeners = [];

		window.removeEventListener('paste', this.onWindowPaste, {
			capture: true,
		});
	}

	public render() {
		const className = `term_fit ${this.props.isTermActive ? 'term_active' : ''}`;
		return (
			<div className={className} style={{ padding: this.props.padding }} onMouseUp={this.onMouseUp}>
				{this.props.customChildrenBefore}
				<div ref={this.onTermWrapperRef} className="term_fit term_wrapper" />
				{this.props.customChildren}
			</div>
		);
	}
}

export default Term;

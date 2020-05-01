<div align="center">
<h1>React Xterm</h1>

[Xterm](https://github.com/xtermjs/xterm.js) react component
<br />

[![NPM version](https://badge.fury.io/js/%40dash4%2Freact-xterm.svg)](https://www.npmjs.com/package/@dash4/react-xterm)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)
![TypeScript-ready](https://img.shields.io/npm/types/@dash4/react-xterm.svg)

<br />
</div>

The following documentation is just relevant for dash4 plugin development. For informations on how to use Dash4 please read this: [Dash4 documentation](https://github.com/smollweide/dash4/blob/master/README.md)

## Installation

```shell
npm install @dash4/react-xterm --save
```

## Usage

```tsx
import React, { useState } from 'react';
import { Term } from '@dash4/react-xterm';
import '@dash4/react-xterm/lib/ReactXterm.css';

const MyComponent = ({ id }: { id: string }) => {
	const [term, setTerm] = useState<Term | undefined>(undefined);

	function handleTermRef(uid: string, xterm: Term) {
		setTerm(xterm);
	}

	function handleStart() {
		term.write('npm start');
	}

	return (
		<>
			<Term ref_={handleTermRef} uid={id} />
			<button onClick={handleStart}>start</button>
		</>
	);
};
```

## Props

```tsx
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
```

## License

The @dash4/react-xterm is [MIT licensed](./LICENSE)

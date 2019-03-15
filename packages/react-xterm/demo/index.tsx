import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Term } from '../src/index';

const MyComponent = ({ id }: { id: string }) => {
	const [term, setTerm] = useState<Term | undefined>(undefined);
	let counter = 0;

	function handleTermRef(uid: string, xterm: Term) {
		setTerm(xterm);
	}

	function handleStart() {
		if (!term) {
			return;
		}
		counter += 1;
		term.write(`counter = ${counter}\n`);
	}

	return (
		<>
			<Term ref_={handleTermRef} uid={id} />
			<button onClick={handleStart}>start</button>
		</>
	);
};

ReactDOM.render(<MyComponent id="1" />, document.getElementById('root'));

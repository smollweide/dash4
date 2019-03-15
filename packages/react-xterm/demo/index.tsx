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
		let i = 0;
		for (i = 0; i < 40; i += 1) {
			counter += 1;
			term.write(`counter = ${counter}\n`);
		}
	}

	return (
		<>
			<div style={{ width: '75%', height: '50vh' }}>
				<Term ref_={handleTermRef} uid={id} />
			</div>
			<button onClick={handleStart}>start</button>
		</>
	);
};

ReactDOM.render(<MyComponent id="1" />, document.getElementById('root'));

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Window, WindowBody, WindowHeader } from '../src/index';

function MyComponent() {
	const [fullscreen, setFullscreen] = useState(false);

	function handleToggleFullscreen() {
		setFullscreen(!fullscreen);
	}

	return (
		<Window dark>
			<WindowHeader onDoubleClick={handleToggleFullscreen} title="Title" subTitle="Subtitle">
				Something
			</WindowHeader>
			<WindowBody>
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
				labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et
				ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
			</WindowBody>
		</Window>
	);
}

ReactDOM.render(<MyComponent />, document.getElementById('root'));

import { addDecorator, addParameters, configure } from '@storybook/react';
import { addReadme } from 'storybook-readme';

addDecorator(addReadme);
addParameters({
	readme: {
		codeTheme: 'atom-dark',
	},
});

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.tsx?$/);
function loadStories() {
	req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);

/// <reference types="../../types/markdown" />
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useFullscreen, Window, WindowBody, WindowHeader } from '.';
import Readme from './README.md';

const stories = storiesOf('Window', module);
stories.addDecorator(withKnobs);
stories.add(
	'docs',
	() => (
		<div style={{ maxWidth: 420 }}>
			<Window dark>
				<WindowHeader title={'Window'} subTitle={'Subtitle'}>
					{'something'}
				</WindowHeader>
				<WindowBody>
					{`Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam 
nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
sed diam voluptua.At vero eos et accusam et justo duo dolores et ea rebum.
Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`}
				</WindowBody>
			</Window>
		</div>
	),
	{
		readme: {
			content: Readme,
		},
	}
);
stories.add('bright', () => (
	<Window>
		<WindowHeader title={'Title'} subTitle={'Subtitle'}>
			{'Something'}
		</WindowHeader>
		<WindowBody>
			{`Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam 
nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
sed diam voluptua.At vero eos et accusam et justo duo dolores et ea rebum.
Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`}
		</WindowBody>
	</Window>
));
stories.add('dark', () => (
	<Window dark>
		<WindowHeader title={'Title'} subTitle={'Subtitle'}>
			{'Something'}
		</WindowHeader>
		<WindowBody>
			{`Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam 
nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
sed diam voluptua.At vero eos et accusam et justo duo dolores et ea rebum.
Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`}
		</WindowBody>
	</Window>
));
stories.add('fullscreen', () => (
	<Window fullscreen dark>
		<WindowHeader title={'Title'} subTitle={'Subtitle'}>
			{'Something'}
		</WindowHeader>
		<WindowBody>
			{`Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam 
nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
sed diam voluptua.At vero eos et accusam et justo duo dolores et ea rebum.
Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`}
		</WindowBody>
	</Window>
));
stories.add('progressing', () => (
	<Window dark>
		<WindowHeader progressing title={'Title'} subTitle={'Subtitle'}>
			{'Something'}
		</WindowHeader>
		<WindowBody>
			{`Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam 
nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
sed diam voluptua.At vero eos et accusam et justo duo dolores et ea rebum.
Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`}
		</WindowBody>
	</Window>
));

const WindowWithFullscreenHook = () => {
	const dark = boolean('dark', true);
	const { fullscreen, enableFullscreen, disableFullscreen, toggleFullscreen } = useFullscreen();

	return (
		<Window dark={dark} onWillLeaveFullscreen={disableFullscreen} fullscreen={fullscreen}>
			<WindowHeader onDoubleClick={toggleFullscreen} title={'Title'} subTitle={'Subtitle'} />
			<WindowBody>
				{!fullscreen && (
					<>
						<button onClick={enableFullscreen}>Fullscreen</button>
						<br />
						<br />
					</>
				)}
				{`Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam 
nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
sed diam voluptua.At vero eos et accusam et justo duo dolores et ea rebum.
Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`}
			</WindowBody>
		</Window>
	);
};

stories.add('window fullscreen close via esc', () => <WindowWithFullscreenHook />);

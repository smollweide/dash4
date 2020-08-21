/// <reference types="../../types/markdown" />
import { storiesOf } from '@storybook/react';
import React from 'react';
import { useFullscreen, Window, WindowBody, WindowHeader } from '.';
import Readme from './README.md';

const stories = storiesOf('Window', module);
stories.add(
	'docs',
	() => (
		<div style={{ maxWidth: 420, margin: '0 auto' }}>
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
	const { fullscreen, enableFullscreen, disableFullscreen, toggleFullscreen } = useFullscreen();

	return (
		<Window dark fullscreen={fullscreen} onWillLeaveFullscreen={disableFullscreen}>
			<WindowHeader title={'Title'} subTitle={'Subtitle'} onDoubleClick={toggleFullscreen} />
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

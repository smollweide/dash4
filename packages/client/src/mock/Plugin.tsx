import React from 'react';
import { Button } from 'react-bootstrap';
import { IWidgetConfig } from '..';
import { Icon } from '../components/Icon';
import { Window, WindowBody, WindowHeader } from '../components/Window';
import { registerPlugin } from '../register-plugin';

export const MockPlugin = (config: IWidgetConfig) => {
	return (
		<Window dark={config.dark}>
			<WindowHeader title="PluginTerminal" subTitle="node bin/example-01">
				<Button variant="outline-primary" size="sm">
					<Icon name="play_arrow" size="m" />
				</Button>
			</WindowHeader>
			<WindowBody>
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
				labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et
				ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
			</WindowBody>
		</Window>
	);
};

registerPlugin('PluginTerminal', MockPlugin);

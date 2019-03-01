import React from 'react';
import { Button } from 'react-bootstrap';
import { IWidgetConfig } from '..';
import { Icon } from '../components/Icon';
import { Window, WindowHeader } from '../components/Window';
import { registerPlugin } from '../register-plugin';

export const MockPlugin = (config: IWidgetConfig) => {
	return (
		<Window dark={config.dark}>
			<WindowHeader title="PluginTerminal" subTitle="node bin/example-01">
				<Button variant="outline-primary" size="sm">
					<Icon name="play_arrow" size="m" />
				</Button>
			</WindowHeader>
		</Window>
	);
};

registerPlugin('PluginTerminal', MockPlugin);

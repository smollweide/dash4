// tslint:disable-next-line
// /* global fetch, WebSocket, location */
import { IWidgetConfig } from '@dash4/client/build';
import { Window, WindowBody, WindowHeader } from '@dash4/client/build/components/Window';
import { registerPlugin } from '@dash4/client/build/register-plugin';
import React from 'react';
import withStyles, { WithStyles } from 'react-jss';
import { IClientConfig } from '../shared-types';
import { NpmScript } from './components/Script';

const styles = {
	ul: {
		listStyle: 'none',
		padding: 10,
		margin: 0,
	},
	li: {
		textAlign: 'center',
		'& + &': {
			marginTop: 10,
		},
	},
};

export interface IProps extends WithStyles<typeof styles>, IWidgetConfig<IClientConfig> {
	// tslint:disable-next-line
}

const NpmScripts = ({ dark, classes, clientConfig, id }: IProps) => {
	return (
		<Window dark={dark}>
			<WindowHeader title={'Npm Scripts'} />
			<WindowBody>
				<ul className={classes.ul}>
					{clientConfig.scripts.map((script) => (
						<li key={script.id} className={classes.li}>
							<NpmScript id={id} script={script} />
						</li>
					))}
				</ul>
			</WindowBody>
		</Window>
	);
};

// tslint:disable-next-line
registerPlugin('PluginNpmScripts', withStyles(styles)(NpmScripts));

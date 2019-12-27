/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { IWidgetConfig } from '@dash4/client/build';
import { registerPlugin } from '@dash4/client/build/register-plugin';
import { Window, WindowBody, WindowHeader } from '@dash4/ui';
import { IClientConfig } from '../shared-types';
import { NpmScript } from './components/Script';

type INpmScriptsProps = IWidgetConfig<IClientConfig>;

const NpmScripts = ({ dark, clientConfig, id }: INpmScriptsProps) => {
	return (
		<Window dark={dark}>
			<WindowHeader title={'Npm Scripts'} />
			<WindowBody>
				<ul
					css={css`
						list-style: none;
						padding: 10px;
						margin: 0;
					`}
				>
					{clientConfig.scripts.map((script) => (
						<li
							key={script.id}
							css={css`
								text-align: center;
								& + & {
									margin-top: 10px;
								}
							`}
						>
							<NpmScript id={id} script={script} />
						</li>
					))}
				</ul>
			</WindowBody>
		</Window>
	);
};

// eslint-disable-next-line
registerPlugin('PluginNpmScripts', NpmScripts);

/** @jsx jsx */
import { IWidgetConfig } from '@dash4/client/build';
import { registerPlugin } from '@dash4/client/build/register-plugin';
import { Window, WindowBody, WindowHeader } from '@dash4/ui';
import { css, jsx } from '@emotion/core';
import { IClientConfig } from '../shared-types';
import { Link } from './components/Link';
import { Teaser } from './components/Teaser';

type IPluginActionsProps = IWidgetConfig<IClientConfig>;

export const PluginActions = ({ dark, clientConfig }: IPluginActionsProps) => {
	return (
		<Window dark={dark}>
			{clientConfig.title && (
				<WindowHeader
					css={css`
						position: relative;
						padding: 15px 15px 0;
					`}
					title={clientConfig.title}
				/>
			)}
			<WindowBody
				css={css`
					position: relative;
					padding: 15px;
				`}
			>
				<ul
					css={css`
						list-style: none;
						padding: 0;
						margin: 0;
					`}
				>
					{clientConfig.actions &&
						clientConfig.actions.map((action) => {
							if (action.type === 'link') {
								return (
									<li key={action.id}>
										<Link
											dark={dark}
											href={action.href}
											icon={action.icon}
											image={action.image}
											imageAlt={action.title}
										>
											{action.title}
										</Link>
									</li>
								);
							}
							return (
								<li key={action.id}>
									<Teaser
										dark={dark}
										id={action.id}
										title={action.title}
										subtitle={action.subtitle}
										link={action.link}
										image={action.image}
										imageAlt={action.title}
										icon={action.icon}
									/>
								</li>
							);
						})}
				</ul>
			</WindowBody>
		</Window>
	);
};

registerPlugin('PluginActions', PluginActions);

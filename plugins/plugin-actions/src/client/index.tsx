import { IWidgetConfig } from '@dash4/client/build';
import { registerPlugin } from '@dash4/client/build/register-plugin';
import { Window, WindowBody, WindowHeader } from '@dash4/ui';
import React from 'react';
import withStyles, { WithStyles } from 'react-jss';
import { IClientConfig } from '../shared-types';
import { Link } from './components/Link';
import { Teaser } from './components/Teaser';
import { styles } from './styles';

type IProps = WithStyles<typeof styles> & IWidgetConfig<IClientConfig>;

export const PluginActions = withStyles(styles)(({ dark, clientConfig, classes }: IProps) => {
	return (
		<Window dark={dark}>
			{clientConfig.title && <WindowHeader className={`${classes.windowHeader}`} title={clientConfig.title} />}
			<WindowBody className={`${classes.windowBody}`}>
				<ul className={classes.ul}>
					{clientConfig.actions &&
						clientConfig.actions.map((action) => {
							if (action.type === 'link') {
								return (
									<li className={classes.li} key={action.id}>
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
								<li className={classes.li} key={action.id}>
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
});

registerPlugin('PluginActions', PluginActions);

import { IWidgetConfig } from '@dash4/client/build';
import { Icon } from '@dash4/client/build/components/Icon';
import { Window, WindowBody } from '@dash4/client/build/components/Window';
import { useEffectAsync } from '@dash4/client/build/react-hooks';
import Markdown from 'markdown-to-jsx';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { WithStyles } from 'react-jss';
import { IReadmeClientConfig } from '../shared-types';
import { styles } from './readme-styles';
import { subscribeToReadme, unsubscribeToReadme } from './services';

export type IProps = WithStyles<typeof styles> & IWidgetConfig<IReadmeClientConfig>;

export function useMarkdownData(id: string) {
	const [data, setData] = useState('');
	const handleRecieveData = (_data: string) => setData(_data);

	useEffectAsync(async () => {
		await subscribeToReadme(id, handleRecieveData);
		return () => unsubscribeToReadme(id);
	}, []);

	return data;
}

export function useFullscreen() {
	const [fullscreen, setFullscreen] = useState(false);
	const enableFullscreen = () => setFullscreen(true);
	const disableFullscreen = () => setFullscreen(false);

	return { fullscreen, enableFullscreen, disableFullscreen };
}

export function Readme({ classes, id }: IProps) {
	const data = useMarkdownData(id);
	const { fullscreen, enableFullscreen, disableFullscreen } = useFullscreen();

	return (
		<Window fullscreen={fullscreen} dark={false}>
			<WindowBody className={fullscreen ? classes.windowBodyFullscreen : classes.windowBody}>
				<div className={fullscreen ? classes.markdownWrapperFullscreen : classes.markdownWrapper}>
					<Markdown>{data}</Markdown>
				</div>
				{fullscreen ? (
					<Button
						className={classes.closeFullscreenButton}
						size="sm"
						variant="light"
						onClick={disableFullscreen}
					>
						<Icon name="close" />
						close
					</Button>
				) : (
					<div className={classes.buttonWrapper}>
						<Button
							className={classes.showMoreButton}
							size="sm"
							variant="outline-primary"
							onClick={enableFullscreen}
						>
							show more
						</Button>
					</div>
				)}
			</WindowBody>
		</Window>
	);
}

import { IWidgetConfig } from '@dash4/client/build';
import { Icon, useFullscreen, Window, WindowBody } from '@dash4/ui';
import React from 'react';
import { Button } from 'react-bootstrap';
import withStyles, { WithStyles } from 'react-jss';
import { IReadmeClientConfig } from '../../../shared-types';
import { useMarkdownData } from '../../hooks';
import { Markdown } from '../Markdown';
import { styles } from './styles';
import { styles as readmeStyles } from './styles';

export type IProps = WithStyles<typeof styles> & IWidgetConfig<IReadmeClientConfig>;

function ReadmeRaw({ classes, id }: IProps) {
	const data = useMarkdownData(id);
	const { fullscreen, enableFullscreen, disableFullscreen } = useFullscreen();

	return (
		<Window onWillLeaveFullscreen={disableFullscreen} fullscreen={fullscreen} dark={false}>
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

export const Readme = withStyles(readmeStyles)(ReadmeRaw);

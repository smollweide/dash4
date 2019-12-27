/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { IWidgetConfig } from '@dash4/client/build';
import { Icon, useFullscreen, Window, WindowBody } from '@dash4/ui';
import { Button } from 'react-bootstrap';
import { IReadmeClientConfig } from '../../../shared-types';
import { useMarkdownData } from '../../hooks';
import { Markdown } from '../Markdown';

export type IProps = IWidgetConfig<IReadmeClientConfig>;

export function Readme({ id, clientConfig }: IProps) {
	const data = useMarkdownData(id);
	const { fullscreen, enableFullscreen, disableFullscreen } = useFullscreen();

	return (
		<Window fullscreen={fullscreen} dark={false} onWillLeaveFullscreen={disableFullscreen}>
			<WindowBody
				className="window-body"
				css={[
					css`
						padding: 15px;
					`,
					fullscreen &&
						css`
							position: relative;
							overflow: scroll;
						`,
				]}
			>
				<div
					css={[
						!fullscreen &&
							css`
								position: relative;
								height: ${clientConfig.height || 250}px;
								overflow: hidden;
								&:after {
									content: ' ';
									position: absolute;
									left: 0;
									bottom: 0;
									right: 0;
									height: 1px;
									background: linear-gradient(
										to left,
										rgba(0, 0, 0, 0) 0%,
										rgba(0, 0, 0, 0.1) 10%,
										rgba(0, 0, 0, 0.1) 90%,
										rgba(0, 0, 0, 0) 100%
									);
								}
								&:before {
									content: ' ';
									position: absolute;
									left: 0;
									bottom: 1px;
									right: 0;
									height: 1px;
									background: linear-gradient(
										to left,
										rgba(0, 0, 0, 0) 0%,
										rgba(0, 0, 0, 0.05) 10%,
										rgba(0, 0, 0, 0.05) 90%,
										rgba(0, 0, 0, 0) 100%
									);
								}
							`,
						fullscreen &&
							css`
								position: relative;
							`,
					]}
				>
					<Markdown>{data}</Markdown>
				</div>
				{fullscreen ? (
					<Button
						css={css`
							position: absolute;
							top: 15px;
							right: 15px;
						`}
						size="sm"
						variant="light"
						onClick={disableFullscreen}
					>
						<Icon name="close" />
						close
					</Button>
				) : (
					<div
						css={css`
							text-align: center;
						`}
					>
						<Button
							css={css`
								margin-top: 15px;
							`}
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

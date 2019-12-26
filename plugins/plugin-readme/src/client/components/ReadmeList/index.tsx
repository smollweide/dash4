/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { IWidgetConfig } from '@dash4/client/build';
import { useFullscreen, Window, WindowBody, WindowHeader } from '@dash4/ui';
import { Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import { ContainerQuery } from 'react-container-query';
import { IReadmeListClientConfig, IReadmeListItemClientConfig } from '../../../shared-types';
import { useMarkdownData } from '../../hooks';
import { Markdown } from '../Markdown';

type IProps = IWidgetConfig<IReadmeListClientConfig>;
type IReadmeProps = IReadmeListItemClientConfig;

const query = {
	1: {
		maxWidth: 349,
	},
	2: {
		minWidth: 350,
		maxWidth: 499,
	},
	3: {
		minWidth: 500,
		maxWidth: 619,
	},
	4: {
		minWidth: 620,
		maxWidth: 999,
	},
	5: {
		minWidth: 1000,
		maxWidth: 1199,
	},
	6: {
		minWidth: 1200,
	},
};

export function getMatchingQuery(params: { [key: number]: boolean }) {
	return Object.keys(params).filter((param) => params[param])[0];
}

export const Readme = ({ id, title }: IReadmeProps) => {
	const data = useMarkdownData(id);
	const { fullscreen, enableFullscreen, disableFullscreen } = useFullscreen();

	return (
		<Fragment>
			<Modal
				css={css`
					& .modal-dialog {
						max-width: calc(100vw - 30px);
					}
					& .modal-content {
						border: 0;
					}
				`}
				size="lg"
				show={fullscreen}
				onHide={disableFullscreen}
			>
				<Modal.Header
					css={css`
						background: #fff;
						color: #000;
						border-bottom: 0;
						& .close {
							color: #000;
							text-shadow: none;
							opacity: 1;
							font-size: 18px;
						}
					`}
					closeButton
				/>
				<Modal.Body
					css={css`
						background: #fff;
						padding-top: 0;
						padding-bottom: 0;
						padding-right: 0;
					`}
				>
					{fullscreen && <Markdown>{data}</Markdown>}
				</Modal.Body>
				<Modal.Footer
					css={css`
						border-top: 0;
					`}
				/>
			</Modal>
			<button
				css={css`
					padding: 10px;
					background: none;
					border: none;
					display: inline;
					width: 100%;
				`}
				onClick={enableFullscreen}
			>
				<div
					aria-hidden="true"
					css={css`
						margin: 10px;
						box-shadow: rgba(0, 0, 0, 0.16) 0px 0px 1px;
					`}
				>
					<div
						css={css`
							height: 175px;
							padding: 15px;
							overflow: hidden;
							position: relative;
							&:after {
								content: ' ';
								position: absolute;
								top: 0;
								left: 0;
								right: 0;
								bottom: 0;
							}
						`}
					>
						<div
							css={css`
								width: 100%;
								zoom: 0.25;
							`}
						>
							<Markdown>{data}</Markdown>
						</div>
					</div>
				</div>
				<h6
					css={css`
						text-align: center;
						font-size: 12px;
						padding: 10px 0;
						overflow: hidden;
						word-break: break-word;
						hyphens: auto;
						margin: 0;
					`}
				>
					{title}
				</h6>
			</button>
		</Fragment>
	);
};

export function ReadmeList({ clientConfig }: IProps) {
	return (
		<ContainerQuery query={query}>
			{(params) => (
				<Window dark={false}>
					{clientConfig.title && <WindowHeader title={clientConfig.title} />}
					<WindowBody
						css={[
							css`
								padding: 15px;
							`,
						]}
					>
						<ul
							css={css`
								display: flex;
								list-style: none;
								flex-direction: row;
								flex-wrap: wrap;
								justify-content: space-around;
								margin: 0;
								padding: 0;
							`}
						>
							{clientConfig.files.map((fileItem) => {
								const count = parseInt(getMatchingQuery(params), 10);
								const percent = count > 1 ? 100 / count : 100;
								return (
									<li
										css={css`
											cursor: pointer;
											flex-basis: ${percent}%;
											width: ${percent}%;
											max-width: ${percent}%;
											min-width: ${percent}%;
										`}
										key={fileItem.file}
									>
										<Readme {...fileItem} />
									</li>
								);
							})}
						</ul>
					</WindowBody>
				</Window>
			)}
		</ContainerQuery>
	);
}

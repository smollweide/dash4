import { IWidgetConfig } from '@dash4/client/build';
import { Window, WindowBody, WindowHeader } from '@dash4/client/build/components/Window';
import Markdown from 'markdown-to-jsx';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { ContainerQuery } from 'react-container-query';
import withStyles, { WithStyles } from 'react-jss';
import { IReadmeListClientConfig, IReadmeListItemClientConfig } from '../shared-types';
import { useFullscreen, useMarkdownData } from './readme';
import { styles, stylesReadme } from './readme-list-styles';

type IProps = WithStyles<typeof styles> & IWidgetConfig<IReadmeListClientConfig>;
type IReadmeProps = WithStyles<typeof stylesReadme> & IReadmeListItemClientConfig;

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

function getMatchingQuery(params: { [key: number]: boolean }) {
	return Object.keys(params).filter((param) => params[param])[0];
}

const Readme = withStyles(stylesReadme)(({ classes, id, title }: IReadmeProps) => {
	const data = useMarkdownData(id);
	const { fullscreen, enableFullscreen, disableFullscreen } = useFullscreen();

	return (
		<>
			<Modal className={classes.modal} size="lg" show={fullscreen} onHide={disableFullscreen}>
				<Modal.Header className={classes.modalHeader} closeButton />
				<Modal.Body className={classes.modalBody}>{fullscreen && <Markdown>{data}</Markdown>}</Modal.Body>
				<Modal.Footer className={classes.modalFooter} />
			</Modal>
			<button className={classes.box} onClick={enableFullscreen}>
				<div aria-hidden="true" className={classes.markdownWindow}>
					<div className={classes.markdownSpacing}>
						<div className={classes.markdown}>
							<Markdown>{data}</Markdown>
						</div>
					</div>
				</div>
				<h6 className={`${classes.title}`}>{title}</h6>
			</button>
		</>
	);
});

export function ReadmeList({ classes, clientConfig }: IProps) {
	return (
		<ContainerQuery query={query}>
			{(params) => (
				<Window dark={false}>
					{clientConfig.title && <WindowHeader title={clientConfig.title} />}
					<WindowBody className={classes.windowBody}>
						<ul className={classes.ul}>
							{clientConfig.files.map((fileItem) => (
								<li
									className={`${classes.li} ${classes[`li-${getMatchingQuery(params)}`]}`}
									key={fileItem.file}
								>
									<Readme {...fileItem} />
								</li>
							))}
						</ul>
					</WindowBody>
				</Window>
			)}
		</ContainerQuery>
	);
}

import { IWidgetConfig } from '@dash4/client/build';
import { registerPlugin } from '@dash4/client/build/register-plugin';
import { NpmScript } from '@dash4/plugin-npm-scripts/build/client/components/Script';
import { Icon, Window, WindowBody, WindowHeader } from '@dash4/ui';
import React, { useEffect, useState } from 'react';
import { Button, Form, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import withStyles, { WithStyles } from 'react-jss';
import { IClientConfig, ISendToServer } from '../shared-types';
import { Dependency } from './Dependency';
import { filter } from './filter';
import { useData } from './hooks';
import { styles } from './styles';
import { isDataError, isDataLoading } from './utils';

type IProps = WithStyles<typeof styles> & IWidgetConfig<IClientConfig>;

const sendMap: { [key: string]: ISendToServer } = {};

export const PluginDependencies = withStyles(styles)(({ id, dark, clientConfig, classes }: IProps) => {
	const data = useData(id, (_send) => {
		sendMap[id] = _send;
	});
	const [updatedCounter, setUpdatedCounter] = useState(0);
	const [filterQuery, setFilterQuery] = useState('');
	const [filterUpdateAvailable, setFilterUpdateAvailable] = useState(false);
	const [filteredData, setFilteredData] = useState(data);
	const [isProcessing, setIsProcessing] = useState(false);

	function handleUpdateDependency(event: React.SyntheticEvent<HTMLButtonElement>, dependencyName: string) {
		event.preventDefault();
		setIsProcessing(true);
		setUpdatedCounter(updatedCounter + 1);
		sendMap[id]('update', dependencyName);
	}

	useEffect(() => {
		setIsProcessing(false);
	}, [data]);

	useEffect(() => {
		filterData();
	}, [data, filterQuery, filterUpdateAvailable]);

	function filterData() {
		setFilteredData(filter(data, filterUpdateAvailable, filterQuery));
	}

	function handleChangeFilterQuery(event: React.FormEvent<any>) {
		setFilterQuery(event.currentTarget.value);
	}

	function handleChangeFilterUpdateAvailable() {
		setFilterUpdateAvailable(!filterUpdateAvailable);
	}

	return (
		<Window dark={dark}>
			<WindowHeader title={clientConfig.title || 'Dependencies'}>
				<OverlayTrigger
					trigger="click"
					key={`${id}-filter-overlay-trigger`}
					placement={'bottom'}
					overlay={
						<Popover id={`${id}-filter-popover`} title={'Filter'}>
							<Form className={classes.filterForm}>
								<Form.Group as={Row} controlId={`${id}_filter-form-search`}>
									<Form.Control
										value={filterQuery}
										onChange={handleChangeFilterQuery}
										type="search"
										placeholder="search"
									/>
								</Form.Group>
								<Form.Group as={Row} controlId={`${id}_filter-form-no-up-to-date`}>
									<Form.Check
										checked={filterUpdateAvailable}
										onChange={handleChangeFilterUpdateAvailable}
										label="Update available"
									/>
								</Form.Group>
							</Form>
						</Popover>
					}
				>
					<Button variant="outline-primary" data-testid={`${id}_filter-button`} size="sm">
						<Icon name="filter_list" size="m" />
					</Button>
				</OverlayTrigger>
			</WindowHeader>
			<WindowBody className={`${classes.windowBody} ${isProcessing ? classes.windowBodyProcessing : ''}`}>
				{isProcessing && (
					<div className={classes.spinnerInContent}>
						<Spinner animation="grow" />
					</div>
				)}
				{isDataLoading(data) ? (
					<div className={classes.spinner}>
						<Spinner animation="grow" />
					</div>
				) : isDataError(data) ? (
					<p>Error: {data.message}</p>
				) : (
					<>
						{filteredData && Object.keys(filteredData).length > 0 ? (
							<ul className={`${classes.ul} ${isProcessing ? classes.ulProcessing : ''}`}>
								{Object.keys(filteredData).map((dependencyName) => {
									const { version, latestVersion, isUpToDate, packages } = data[dependencyName];
									return (
										<Dependency
											key={dependencyName}
											name={dependencyName}
											version={version}
											latestVersion={latestVersion}
											packages={packages}
											isUpToDate={isUpToDate}
											onClick={handleUpdateDependency}
										/>
									);
								})}
							</ul>
						) : (
							<div>No Dependencies found</div>
						)}

						{updatedCounter >= 1 && (
							<div className={classes.installButtonWrapper}>
								<NpmScript id={clientConfig.installProcess.id} script={clientConfig.installProcess} />
							</div>
						)}
					</>
				)}
			</WindowBody>
		</Window>
	);
});

registerPlugin('PluginDependencies', PluginDependencies);

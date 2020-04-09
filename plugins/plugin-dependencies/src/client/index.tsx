/* eslint-disable no-nested-ternary */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { IWidgetConfig } from '@dash4/client/build';
import { registerPlugin } from '@dash4/client/build/register-plugin';
import { NpmScript } from '@dash4/plugin-npm-scripts/build/client/components/Script';
import { Icon, Window, WindowBody, WindowHeader } from '@dash4/ui';
import React, { Fragment, useEffect, useState } from 'react';
import { Button, Form, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { IClientConfig, ISendToServer } from '../shared-types';
import { Dependency } from './Dependency';
import { filter } from './filter';
import { useData } from './hooks';
import { isDataError, isDataLoading } from './utils';

type IPluginDependenciesProps = IWidgetConfig<IClientConfig>;

const sendMap: { [key: string]: ISendToServer } = {};

export const PluginDependencies = ({ id, dark, clientConfig }: IPluginDependenciesProps) => {
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

	function filterData() {
		setFilteredData(filter(data, filterUpdateAvailable, filterQuery));
	}

	useEffect(() => {
		setIsProcessing(false);
	}, [data]);

	useEffect(() => {
		filterData();
	}, [data, filterQuery, filterUpdateAvailable]);

	function handleChangeFilterQuery(event: React.FormEvent<any>) {
		setFilterQuery(event.currentTarget.value);
	}

	function handleChangeFilterUpdateAvailable() {
		setFilterUpdateAvailable(!filterUpdateAvailable);
	}

	return (
		<Window dark={dark}>
			<WindowHeader title={clientConfig?.title || 'Dependencies'}>
				<OverlayTrigger
					key={`${id}-filter-overlay-trigger`}
					trigger="click"
					placement={'bottom'}
					overlay={
						<Popover id={`${id}-filter-popover`} title={'Filter'}>
							<Form
								css={css`
									position: relative;
									width: 100%;
									padding: 20px 15px 0;
								`}
							>
								<Form.Group as={Row} controlId={`${id}_filter-form-search`}>
									<Form.Control
										value={filterQuery}
										type="search"
										placeholder="search"
										onChange={handleChangeFilterQuery}
									/>
								</Form.Group>
								<Form.Group as={Row} controlId={`${id}_filter-form-no-up-to-date`}>
									<Form.Check
										checked={filterUpdateAvailable}
										label="Update available"
										onChange={handleChangeFilterUpdateAvailable}
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
			<WindowBody
				css={[
					css`
						position: relative;
						padding: 0 15px 30px;
					`,
					isProcessing &&
						css`
							&:after {
								content: ' ';
								position: absolute;
								top: 0;
								left: 0;
								right: 0;
								bottom: 0;
							}
						`,
				]}
			>
				{isProcessing && (
					<div
						css={css`
							position: absolute;
							display: flex;
							justify-content: center;
							align-items: center;
							width: 100%;
							height: 100%;
						`}
					>
						<Spinner animation="grow" />
					</div>
				)}
				{isDataLoading(data) ? (
					<div
						css={css`
							position: relative;
							display: flex;
							justify-content: center;
							padding: 30px 0 10px;
						`}
					>
						<Spinner animation="grow" />
					</div>
				) : isDataError(data) ? (
					<p>Error: {data.message}</p>
				) : (
					<Fragment>
						{filteredData && Object.keys(filteredData).length > 0 ? (
							<ul
								css={[
									css`
										position: relative;
										display: flex;
										justify-content: center;
										padding: 30px 0 10px;
										flex-wrap: wrap;
										max-height: 450px;
										overflow: scroll;
									`,
									isProcessing &&
										css`
											opacity: 0.5;
										`,
								]}
							>
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

						{updatedCounter >= 1 && clientConfig && (
							<div
								css={css`
									text-align: center;
								`}
							>
								<NpmScript id={clientConfig.installProcess.id} script={clientConfig.installProcess} />
							</div>
						)}
					</Fragment>
				)}
			</WindowBody>
		</Window>
	);
};

registerPlugin('PluginDependencies', PluginDependencies);

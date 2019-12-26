/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { IWidgetConfig } from '@dash4/client/build';
import { registerPlugin } from '@dash4/client/build/register-plugin';
import { Window, WindowBody, WindowHeader } from '@dash4/ui';
import { Fragment, lazy, Suspense } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { IClientConfig, ICoverageSection } from '../shared-types';
import { ISend, useCoverageData } from './hooks';

type IProps = IWidgetConfig<IClientConfig>;

const CoverageChart = lazy(() => import(/* webpackChunkName: "coverage-chart" */ './components/CoverageChart'));

function getCoverageSectionValue(coverageSection: ICoverageSection | undefined, value: string) {
	if (
		!coverageSection ||
		!(typeof coverageSection[value] === 'string' || typeof coverageSection[value] === 'number')
	) {
		return 0;
	}
	return coverageSection[value];
}

// let send: ISend | undefined;
const sendMap: { [key: string]: ISend } = {};

export const PluginCodeCoverage = ({ id, dark, clientConfig }: IProps) => {
	const data = useCoverageData(id, (_send) => {
		sendMap[id] = _send;
	});
	const { threshold } = clientConfig;

	function handleClick() {
		if (sendMap[id]) {
			sendMap[id]('open-report');
		}
	}

	const chartRow = css`
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
	`;

	return (
		<Fragment>
			<Window dark={dark}>
				<WindowHeader title="Code coverage" />
				<WindowBody
					css={css`
						padding: 0 15px 30px;
					`}
				>
					{data && data.error ? (
						<p>Error: {data.message}</p>
					) : data ? (
						<Suspense fallback={<div>Loading ...</div>}>
							<div
								onClick={handleClick}
								css={css`
									display: flex;
									flex-flow: row wrap;
									justify-content: center;
									align-items: center;
									cursor: pointer;
								`}
							>
								<div css={chartRow}>
									<div>
										<CoverageChart
											dark={dark}
											title="Statements"
											threshold={threshold.statements}
											coverage={getCoverageSectionValue(data.statements, 'coverage')}
										/>
									</div>
									<div>
										<CoverageChart
											dark={dark}
											title="Branches"
											threshold={threshold.branches}
											coverage={getCoverageSectionValue(data.branches, 'coverage')}
										/>
									</div>
								</div>
								<div css={chartRow}>
									<div>
										<CoverageChart
											dark={dark}
											title="Functions"
											threshold={threshold.functions}
											coverage={getCoverageSectionValue(data.functions, 'coverage')}
										/>
									</div>
									<div>
										<CoverageChart
											dark={dark}
											title="Lines"
											threshold={threshold.lines}
											coverage={getCoverageSectionValue(data.lines, 'coverage')}
										/>
									</div>
								</div>
							</div>
						</Suspense>
					) : (
						<div
							css={css`
								position: relative;
								display: flex;
								justify-content: center;
								padding: 60px 0;
							`}
						>
							<Spinner animation="grow" />
						</div>
					)}
				</WindowBody>
			</Window>
		</Fragment>
	);
};

registerPlugin('PluginCodeCoverage', PluginCodeCoverage);

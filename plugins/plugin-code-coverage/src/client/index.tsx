import { IWidgetConfig } from '@dash4/client/build';
import { Window, WindowBody, WindowHeader } from '@dash4/client/build/components/Window';
import { registerPlugin } from '@dash4/client/build/register-plugin';
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import withStyles, { WithStyles } from 'react-jss';
import { IClientConfig, ICoverageSection } from '../shared-types';
import { CoverageChart } from './components/CoverageChart';
import { ISend, useCoverageData } from './hooks';
import { styles } from './styles';

type IProps = WithStyles<typeof styles> & IWidgetConfig<IClientConfig>;

function getCoverageSectionValue(coverageSection: ICoverageSection | undefined, value: string) {
	if (
		!coverageSection ||
		!(typeof coverageSection[value] === 'string' || typeof coverageSection[value] === 'number')
	) {
		return 0;
	}
	return coverageSection[value];
}

let send: ISend | undefined;

export const PluginCodeCoverage = ({ id, dark, clientConfig, classes }: IProps) => {
	const data = useCoverageData(id, (_send) => {
		send = _send;
	});
	const { threshold } = clientConfig;

	function handleClick() {
		if (send) {
			send('open-report');
		}
	}

	return (
		<Window dark={dark}>
			<WindowHeader title="Code coverage" />
			<WindowBody className={classes.windowBody}>
				{data && data.error ? (
					<p>Error: {data.message}</p>
				) : data ? (
					<div onClick={handleClick} className={classes.box}>
						<div className={classes.chartRow}>
							<div className={classes.chart}>
								<CoverageChart
									dark={dark}
									title="Statements"
									threshold={threshold.statements}
									coverage={getCoverageSectionValue(data.statements, 'coverage')}
								/>
							</div>
							<div className={classes.chart}>
								<CoverageChart
									dark={dark}
									title="Branches"
									threshold={threshold.branches}
									coverage={getCoverageSectionValue(data.branches, 'coverage')}
								/>
							</div>
						</div>
						<div className={classes.chartRow}>
							<div className={classes.chart}>
								<CoverageChart
									dark={dark}
									title="Functions"
									threshold={threshold.functions}
									coverage={getCoverageSectionValue(data.functions, 'coverage')}
								/>
							</div>
							<div className={classes.chart}>
								<CoverageChart
									dark={dark}
									title="Lines"
									threshold={threshold.lines}
									coverage={getCoverageSectionValue(data.lines, 'coverage')}
								/>
							</div>
						</div>
					</div>
				) : (
					<div className={classes.spinner}>
						<Spinner animation="grow" />
					</div>
				)}
			</WindowBody>
		</Window>
	);
};

registerPlugin('PluginCodeCoverage', withStyles(styles)(PluginCodeCoverage));

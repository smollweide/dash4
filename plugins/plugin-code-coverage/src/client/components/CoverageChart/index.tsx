/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { Pie, PieChart } from 'recharts';

const colors = {
	success: '#28a745',
	warning: '#ffc107',
	danger: '#dc3545',
};

interface ICoverageChartProps {
	title: string;
	coverage: number;
	threshold: [number, number];
	className?: string;
	dark?: boolean;
}

function getColorFromPercentage(percentage: number, threshold: [number, number]) {
	if (percentage < threshold[0]) {
		return colors.danger;
	}

	if (percentage < threshold[1]) {
		return colors.warning;
	}

	return colors.success;
}

export const CoverageChart = ({ title, coverage, threshold, className = '', dark = false }: ICoverageChartProps) => {
	return (
		<div
			className={className}
			css={css`
				position: relative;
				width: 120px;
				height: 120px;
			`}
		>
			<div
				css={css`
					position: absolute;
					top: 10px;
					left: 20px;
					width: 80px;
				`}
			>
				<PieChart width={80} height={80}>
					<Pie
						data={[{ value: coverage }, { value: 100 - coverage, fill: dark ? '#000' : '#ccc' }]}
						dataKey="value"
						cx="50%"
						cy="50%"
						innerRadius={25}
						outerRadius={35}
						fill={getColorFromPercentage(coverage, threshold)}
					/>
				</PieChart>
			</div>
			<div
				className={`h3`}
				css={css`
					position: absolute;
					top: 10px;
					left: 20px;
					height: 80px;
					width: 80px;
					line-height: 80px;
					text-align: center;
					font-size: 14px;
					font-weight: ${dark ? 400 : undefined};
				`}
			>
				{coverage}%
			</div>
			<div
				className={`h6`}
				css={css`
					position: absolute;
					bottom: 0;
					width: 100%;
					text-align: center;
					padding: 5px 15px;
					margin: 0;
					font-weight: ${dark ? 100 : undefined};
				`}
			>
				{title}
			</div>
		</div>
	);
};

export default CoverageChart;

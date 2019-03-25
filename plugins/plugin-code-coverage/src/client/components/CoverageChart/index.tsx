import React from 'react';
import withStyles, { WithStyles } from 'react-jss';
import { Pie, PieChart } from 'recharts';
import { styles } from './styles';

const colors = {
	success: '#28a745',
	warning: '#ffc107',
	danger: '#dc3545',
};

interface IProps extends WithStyles<typeof styles> {
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

export const CoverageChart = withStyles(styles)(
	({ title, coverage, threshold, className, dark = false, classes }: IProps) => {
		return (
			<div className={`${className} ${classes.root}`}>
				<div className={classes.chart}>
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
				<div className={`h3 ${classes.number}`}>{coverage}%</div>
				<div className={`h6 ${classes.title}`}>{title}</div>
			</div>
		);
	}
);

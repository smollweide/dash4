import { Icon } from '@dash4/ui';
import React, { CSSProperties } from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import withStyles, { WithStyles } from 'react-jss';

const styles = {
	li: {
		listStyle: 'none',
		width: 220,
		margin: 10,
		position: 'relative',
		textAlign: 'center',
	} as CSSProperties,
	link: {
		color: '#000',
		'&:hover, &:active, &:focus': {
			color: '#000',
		},
	} as CSSProperties,
	name: {
		width: '100%',
		overflow: 'hidden',
		wordBreak: 'break-word',
		hyphens: 'auto',
		fontSize: 14,
	} as CSSProperties,
	version: {
		width: '100%',
		overflow: 'hidden',
		wordBreak: 'break-word',
		hyphens: 'auto',
		fontSize: 24,
	} as CSSProperties,
	button: {
		fontSize: 12,
		padding: 0,
		marginLeft: 10,
		marginTop: -4,
	} as CSSProperties,
	versionInCaseUpToDate: {
		// color: 'var(--green)',
	} as CSSProperties,
	versionInCaseOutOfDate: {
		color: 'var(--red)',
	} as CSSProperties,
};

interface IProps extends WithStyles<typeof styles> {
	name: string;
	version: string;
	latestVersion?: string;
	isUpToDate: boolean | null;
	onClick: (event: React.SyntheticEvent<HTMLButtonElement>, name: string) => void;
	packages?: string[];
}

function DependencyRaw({ name, version, latestVersion, isUpToDate, onClick, classes, packages }: IProps) {
	function handleClick(event: React.SyntheticEvent<HTMLButtonElement>) {
		onClick(event, name);
	}

	return (
		<li className={classes.li}>
			<a className={classes.link} target="_blank" href={`https://www.npmjs.com/package/${name}`}>
				<div className={`${classes.name}`}>{name}</div>
				<div className={`${classes.version}`}>
					<span className={isUpToDate ? classes.versionInCaseUpToDate : classes.versionInCaseOutOfDate}>
						{version}
					</span>
					{isUpToDate === false && (
						<OverlayTrigger
							trigger="hover"
							key={`latest-version-popover-${name}`}
							placement="auto"
							overlay={
								<Popover id={`latest-version-popover-${name}`}>
									Update to <strong>{latestVersion}</strong>
									{packages && packages.length > 0 && packages[0] !== 'root' && (
										<>
											&nbsp;in the following packages:&nbsp;
											{packages.join(', ')}
										</>
									)}
								</Popover>
							}
						>
							<Button onClick={handleClick} className={`${classes.button}`} variant="danger" size="sm">
								<Icon name="arrow_upward" size="m" />
							</Button>
						</OverlayTrigger>
					)}
				</div>
			</a>
		</li>
	);
}

export const Dependency = withStyles(styles)(DependencyRaw);

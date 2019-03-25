import { CSSProperties } from 'react';

export const styles = {
	windowBody: {
		padding: '0 15px 30px',
	} as CSSProperties,
	box: {
		display: 'flex',
		flexFlow: 'row wrap',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
	} as CSSProperties,
	chartRow: {
		display: 'flex',
		flexFlow: 'row nowrap',
		justifyContent: 'center',
		alignItems: 'center',
	} as CSSProperties,
	chart: {} as CSSProperties,
	spinner: {
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		padding: '60px 0',
	} as CSSProperties,
};

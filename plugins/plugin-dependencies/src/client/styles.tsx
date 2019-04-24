import { CSSProperties } from 'react';

export const styles = {
	windowBody: {
		position: 'relative',
		padding: '0 15px 30px',
	} as CSSProperties,
	windowBodyProcessing: {
		'&:after': {
			content: '" "',
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
		},
	} as CSSProperties,
	spinner: {
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		padding: '30px 0 10px',
	} as CSSProperties,
	spinnerInContent: {
		position: 'absolute',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
	} as CSSProperties,
	installButtonWrapper: {
		textAlign: 'center',
	} as CSSProperties,
	ul: {
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		padding: '30px 0 10px',
		flexWrap: 'wrap',
		maxHeight: 450,
		overflow: 'scroll',
	} as CSSProperties,
	ulProcessing: {
		opacity: 0.5,
	} as CSSProperties,
	filterWrapper: {
		position: 'relative',
		width: '100%',
		borderBottom: '1ps solid val(--light)',
	} as CSSProperties,
	filterButtonWrapper: {
		position: 'relative',
		width: '100%',
		textAlign: 'center',
	} as CSSProperties,
	filterForm: {
		position: 'relative',
		width: '100%',
		padding: '20px 15px 0',
	} as CSSProperties,
};

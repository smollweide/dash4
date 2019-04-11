import { CSSProperties } from 'react';

export const styles = {
	header: {
		position: 'relative',
		padding: '15px',
		textAlign: 'center',
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
	} as CSSProperties,
	button: {
		marginLeft: 15,
	} as CSSProperties,
	title: {
		width: '100%',
		whiteSpace: 'normal',
		fontSize: 14,
		fontWeight: 400,
		lineHeight: 1.2,
		marginBottom: 0,
		overflow: 'hidden',
		wordBreak: 'break-word',
		hyphens: 'auto',
	} as CSSProperties,
	'@keyframes progress': {
		'0%': {
			left: `0%`,
			width: '0%',
		},
		'50%': {
			left: `40%`,
			width: '50%',
		},
		'90%': {
			left: `90%`,
			width: '10%',
		},
		'91%': {
			left: `auto`,
			right: '0%',
			width: '10%',
		},
		'100%': {
			left: `auto`,
			right: '0%',
			width: '0%',
		},
	},
	progressBar: {
		position: 'absolute',
		width: '100%',
		bottom: 0,
		left: 0,
		borderRadius: 0,
		height: 1,
		border: 0,
		'&:after': {
			content: '" "',
			position: 'absolute',
			top: 0,
			height: 1,
			backgroundColor: 'var(--primary)',
			animation: '$progress 1.5s infinite ease-in-out',
		} as CSSProperties,
	} as CSSProperties,
};

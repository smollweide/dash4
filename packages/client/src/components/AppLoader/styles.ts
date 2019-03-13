import { DURATION_HIDE_ANIMATION } from './constants';

export const styles = {
	wrapper: {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100vw',
		height: '100vh',
		zIndex: 9999,
		background: '#fff',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		transition: `opacity ${DURATION_HIDE_ANIMATION / 1000}s`,
	},
	hidding: {
		opacity: 0,
	},
	hidden: {
		opacity: 0,
		display: 'none',
	},
	box: {
		textAlign: 'center',
	},
	'@keyframes blur': {
		'0%': {
			opacity: '0.8',
		},
		'50%': {
			opacity: '0.3',
		},
		'100%': {
			opacity: '0.8',
		},
	},
	logo: {
		animation: '$blur 2s infinite ease-in',
		width: 128,
		margin: '13px 15px',
	},
};

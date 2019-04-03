const fullScreenOffset = 5;

export const styles = {
	'@global': {
		'body.prevent-body-scroll': {
			overflow: 'hidden',
		},
	},
	window: {
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
	},
	windowAutoStretch: {
		height: '100%',
	},
	windowBright: {
		color: '#000',
		whiteSpace: 'pre',
		background: '#fff',
		boxShadow: 'rgba(0, 0, 0, 0.16) 0px 2px 4px',
		borderRadius: 6,
	},
	windowDark: {
		color: '#fff',
		whiteSpace: 'pre',
		background: '#000',
		border: '1px solid rgb(51, 51, 51)',
		boxShadow: 'rgba(0, 0, 0, 0.2) 0px 20px 50px 0px',
		borderRadius: 5,
	},
	windowFullscreen: {
		position: 'fixed',
		width: `calc(100vw - ${fullScreenOffset * 2}px)`,
		height: `calc(100vh - ${fullScreenOffset * 2}px)`,
		left: fullScreenOffset,
		top: fullScreenOffset,
		zIndex: 99,
	},
};

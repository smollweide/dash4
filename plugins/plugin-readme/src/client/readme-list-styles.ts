function flexBasis(percent: number) {
	return {
		flexBasis: `${percent}%`,
		width: `${percent}%`,
		maxWidth: `${percent}%`,
		minWidth: `${percent}%`,
	};
}

export const styles = {
	windowBody: {
		padding: 15,
	},
	windowBodyFullscreen: {
		position: 'relative',
		padding: 15,
		overflow: 'scroll',
	},
	ul: {
		display: 'flex',
		listStyle: 'none',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		margin: 0,
		padding: 0,
	},
	li: {
		cursor: 'pointer',
	},
	'li-1': {
		...flexBasis(100),
	},
	'li-2': {
		...flexBasis(100 / 2),
	},
	'li-3': {
		...flexBasis(100 / 3),
	},
	'li-4': {
		...flexBasis(100 / 4),
	},
	'li-5': {
		...flexBasis(100 / 5),
	},
	'li-6': {
		...flexBasis(100 / 6),
	},
};

export const stylesReadme = {
	box: {
		padding: 10,
		background: 'none',
		border: 'none',
		display: 'inline',
		width: '100%',
	},
	title: {
		textAlign: 'center',
		fontSize: 12,
		padding: '10px 0',
		overflow: 'hidden',
		wordBreak: 'break-word',
		hyphens: 'auto',
		margin: 0,
	},
	markdownWindow: {
		margin: 10,
		boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0px 1px',
	},
	markdownSpacing: {
		height: 175,
		padding: 15,
		overflow: 'hidden',
		position: 'relative',
		'&:after': {
			content: '" "',
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
		},
	},
	markdown: {
		width: '100%',
		zoom: 0.25,
	},
	modal: {
		'& .modal-dialog': {
			maxWidth: 'calc(100vw - 30px)',
		},
		'& .modal-content': {
			border: 0,
		},
	},
	modalBody: {
		background: '#fff',
		paddingTop: 0,
		paddingBottom: 0,
		paddingRight: 0,
	},
	modalHeader: {
		background: '#fff',
		color: '#000',
		borderBottom: 0,
		'& .close': {
			color: '#000',
			textShadow: 'none',
			opacity: 1,
			fontSize: 18,
		},
	},
	modalFooter: {
		borderTop: 0,
	},
};

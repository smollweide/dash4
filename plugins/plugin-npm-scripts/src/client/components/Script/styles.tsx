export const styles = {
	button: {
		position: 'relative',
		width: '100%',
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
		background: '#000',
		paddingTop: 0,
		paddingBottom: 0,
		paddingRight: 0,
	},
	modalHeader: {
		background: '#000',
		color: '#fff',
		borderBottom: 0,
		'& .close': {
			color: '#fff',
			textShadow: 'none',
			opacity: 1,
			fontSize: 18,
		},
	},
	modalFooter: {
		background: '#000',
		border: 0,
	},
	modalWindowHeader: {
		padding: 0,
		width: '100%',
	},
};

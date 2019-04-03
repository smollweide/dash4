interface IProps {
	clientConfig: {
		height?: number | string;
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
	markdownWrapper: (props: IProps) => ({
		position: 'relative',
		height: props.clientConfig.height || 250,
		overflow: 'hidden',
		'&:after': {
			content: '" "',
			position: 'absolute',
			left: 0,
			bottom: 0,
			right: 0,
			height: 1,
			background:
				'linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 10%, rgba(0,0,0,0.1) 90%, rgba(0,0,0,0) 100%)',
		},
		'&:before': {
			content: '" "',
			position: 'absolute',
			left: 0,
			bottom: 1,
			right: 0,
			height: 1,
			background:
				'linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,0.05) 10%, rgba(0,0,0,0.05) 90%, rgba(0,0,0,0) 100%)',
		},
	}),
	markdownWrapperFullscreen: {
		position: 'relative',
	},
	buttonWrapper: {
		textAlign: 'center',
	},
	showMoreButton: {
		marginTop: 15,
	},
	closeFullscreenButton: {
		position: 'absolute',
		top: 15,
		right: 15,
	},
};

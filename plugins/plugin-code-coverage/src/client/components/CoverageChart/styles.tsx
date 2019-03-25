interface IProps {
	dark?: boolean;
}

export const styles = {
	root: {
		position: 'relative',
		width: 120,
		height: 120,
	},
	title: ({ dark = false }: IProps) => ({
		position: 'absolute',
		bottom: 0,
		width: '100%',
		textAlign: 'center',
		padding: '5px 15px',
		margin: 0,
		fontWeight: dark ? 100 : undefined,
	}),
	chart: {
		position: 'absolute',
		top: 10,
		left: 20,
		width: 80,
	},
	number: ({ dark = false }: IProps) => ({
		position: 'absolute',
		top: 10,
		left: 20,
		height: 80,
		width: 80,
		lineHeight: '80px',
		textAlign: 'center',
		fontSize: 14,
		fontWeight: dark ? 400 : undefined,
	}),
};

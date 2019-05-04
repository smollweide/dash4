import { CSSProperties } from 'react';

const linkStyles = {
	'& a': {
		color: 'var(--gray)',
		textDecoration: 'none',
		borderBottom: '1px solid var(--gray)',
		'&:hover': {
			color: 'var(--gray-dark)',
			borderColor: 'var(--gray-dark)',
		} as CSSProperties,
	},
};

export const styles = {
	header: {
		position: 'relative',
		background: '#fff',
		borderBottom: '1px solid #eaeaea',
	} as CSSProperties,
	logo: {
		position: 'absolute',
		width: 45,
		margin: '13px 15px',
	} as CSSProperties,
	menuWrap: {
		position: 'relative',
		marginLeft: 75,
		marginRight: 15,
		padding: '18px 0 18px 0',
		textAlign: 'left',
		'& .menu-item-wrapper': {
			padding: '5px 0',
		} as CSSProperties,
	} as CSSProperties,
	menu: {
		position: 'relative',
		padding: 0,
	} as CSSProperties,
	menuItem: {
		listStyle: 'none',
	} as CSSProperties,
	menuLink: {
		transition: 'color 0.5s, text-decoration 0.5s',
		border: 0,
		fontSize: 12,
		padding: '4px 0',
		margin: '6px 10px',
		color: '#999',
		textTransform: 'uppercase',
		'&:hover': {
			color: '#000',
			textDecoration: 'none',
		} as CSSProperties,
	} as CSSProperties,
	menuLinkActive: {
		color: '#000',
		textDecoration: 'none',
		borderBottom: '1px solid #000',
	} as CSSProperties,
	arrow: {
		marginTop: 3,
		'&,&:hover,&:active,&:focus': {
			color: 'var(--gray-dark)',
		} as CSSProperties,
	} as CSSProperties,
	infoModalHeader: {
		border: 0,
		padding: '10px 12px 0 0',
		'& .close span': {
			fontWeight: 200,
		} as CSSProperties,
	} as CSSProperties,
	infoModalBody: {
		paddingTop: 0,
		textAlign: 'center',
		'& img': {
			marginLeft: 14,
			marginBottom: '1.5rem',
		} as CSSProperties,
		'& ul': {
			listStyle: 'none',
			padding: 0,
			marginBottom: 0,
		} as CSSProperties,
		'& ul + ul': {
			marginTop: '.5rem',
		} as CSSProperties,
		'& .btn': {
			padding: '.1rem 1.5rem',
			minWidth: 200,
			marginTop: 10,
		} as CSSProperties,
	} as CSSProperties,
	infoModalList1: {
		'& li': {
			fontSize: 14,
			color: 'var(--gray)',
			...linkStyles,
		} as CSSProperties,
		'& strong': {
			fontWeight: 500,
		} as CSSProperties,
	} as CSSProperties,
	infoModalFooter: {
		border: 0,
		textAlign: 'center',
		fontSize: 12,
		display: 'inline',
		color: 'var(--gray)',
		...linkStyles,
	} as CSSProperties,
};

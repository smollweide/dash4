import { CSSProperties } from 'react';
import { IProps } from './index';

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
		width: 35,
		margin: '5px 15px',
	} as CSSProperties,
	menu: (props: IProps) => {
		return {
			position: 'relative',
			display: 'none',
			flexWrap: 'nowrap',
			justifyContent: 'center',
			alignContent: 'center',
			padding: '15px 0 0 0',
			margin: '0 15px 0 65px',
			[`@media screen and (min-width: ${props.tabs.length * 70}px)`]: {
				display: 'flex',
			} as CSSProperties,
		} as CSSProperties;
	},
	menuMobile: (props: IProps) => {
		return {
			display: 'flex',
			justifyContent: 'center',
			[`@media screen and (min-width: ${props.tabs.length * 70}px)`]: {
				display: 'none',
			} as CSSProperties,
		} as CSSProperties;
	},
	menuMobileTitle: {
		textAlign: 'center',
		padding: '11px 0',
	} as CSSProperties,
	menuSelect: {
		cursor: 'pointer',
		background: 'transparent',
		border: 0,
		outline: 0,
		fontSize: 0,
		color: '#fff',
		textAlign: 'center',
		appearance: 'none',
		height: 40,
		position: 'absolute',
		right: 15,
		width: 'calc(100% - 65px - 15px)',
		top: 3,
	} as CSSProperties,
	menuBurger: {
		position: 'absolute',
		width: 24,
		height: 17,
		right: 20,
		top: 14,
		borderTop: '2px solid #000',
		borderBottom: '2px solid #000',
		'&:before': {
			content: '" "',
			position: 'absolute',
			top: 6,
			left: 0,
			width: '100%',
			borderTop: '2px solid #000',
		} as CSSProperties,
	} as CSSProperties,
	menuLiLeft: {
		width: 8,
		height: 8,
		display: 'block',
		overflow: 'hidden',
		position: 'absolute',
		bottom: -1,
		left: -7,
		'&:before': {
			content: '" "',
			display: 'block',
			width: 16,
			height: 16,
			background:
				'radial-gradient(circle 8px at top left, transparent 0, transparent 7px, #eaeaea 8px, #fafafa 8px)',
		} as CSSProperties,
	} as CSSProperties,
	menuLiCenter: {
		position: 'absolute',
		background: '#fafafa',
		height: 3,
		bottom: -1,
		left: 0,
		right: 0,
	} as CSSProperties,
	menuLiRight: {
		width: 8,
		right: -7,
		height: 8,
		bottom: -1,
		display: 'block',
		overflow: 'hidden',
		position: 'absolute',
		'&:before': {
			content: '" "',
			position: 'absolute',
			right: 0,
			top: 0,
			display: 'block',
			width: 16,
			height: 16,
			background:
				'radial-gradient(circle 8px at top right, transparent 0, transparent 7px, #eaeaea 8px, #fafafa 8px)',
		} as CSSProperties,
	} as CSSProperties,
	menuLi: {
		position: 'relative',
		listStyle: 'none',
		marginRight: -1,
		maxWidth: 100,
		'& + &:before': {
			content: '" "',
			position: 'absolute',
			left: 0,
			width: 1,
			top: 8,
			bottom: 8,
			background: '#eaeaea',
		} as CSSProperties,
	} as CSSProperties,
	menuLink: {
		display: 'block',
		textAlign: 'left',
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		width: '100%',
		transition: 'color 0.5s, text-decoration 0.5s',
		border: `1px solid transparent`,
		borderBottom: 0,
		fontSize: 12,
		padding: '6px 12px',
		margin: 0,
		color: '#999',
		// textTransform: 'uppercase',
		'&:hover': {
			color: '#000',
			textDecoration: 'none',
		} as CSSProperties,
	} as CSSProperties,
	menuLinkActive: {
		background: '#fafafa',
		borderColor: '#eaeaea',
		borderBottom: 0,
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		color: '#000',
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

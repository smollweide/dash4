import React from 'react';
import withStyles, { WithStyles } from 'react-jss';

const styles = {
	root: {
		position: 'relative',
		display: 'inline',
		padding: '2px 5px',
		backgroundImage: 'linear-gradient(rgb(223,224,231), rgb(248,249,255))',
		borderRadius: 4,
		boxShadow: '0px 0px 1px 1px rgba(112,113,117,0.8)',
		fontSize: 12,
		lineHeight: '12px',
		color: 'rgb(152,153,157)',
		'& + &': {
			marginLeft: 18,
			'&:before': {
				content: '"+"',
				position: 'absolute',
				left: -18,
				top: 0,
				padding: '2px 4px',
				color: 'rgb(112,113,117)',
				fontSize: 16,
			} as React.CSSProperties,
		} as React.CSSProperties,
	} as React.CSSProperties,
	icon: {
		display: 'inline',
		'& i': {
			fontSize: 14,
		},
	} as React.CSSProperties,
};

interface IProps extends WithStyles<typeof styles> {
	children: string | JSX.Element;
	className?: string;
	tagName?: 'span' | 'li' | 'div' | 'p';
}

export const Key = withStyles(styles)(({ className = '', classes, children, tagName = 'span' }: IProps) => {
	let childOut: string | JSX.Element = '';

	if (typeof children === 'string') {
		childOut = children;
	} else {
		childOut = (React.Children.map(children, (child) =>
			React.cloneElement(child, { className: classes.icon })
		) as any) as JSX.Element;
	}

	const CustomTag = `${tagName}` as any;
	return <CustomTag className={`${className} ${classes.root}`}>{childOut}</CustomTag>;
});

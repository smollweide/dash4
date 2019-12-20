import { Button as BButton } from 'react-bootstrap';
import { TSize, TType, TVariant } from './const';

interface IButtonProps {
	active?: boolean;
	variant?: TVariant;
	size?: TSize;
	type?: TType;
	href?: string;
	disabled?: boolean;
}

export const Button = BButton;

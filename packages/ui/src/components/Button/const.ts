const VARIANT = {
	primary: 'primary',
	secondary: 'secondary',
	'outline-primary': 'outline-primary',
	'outline-secondary': 'outline-secondary',
} as const;

export type TVariant = keyof typeof VARIANT;

const SIZE = {
	s: 's',
	l: 'l',
} as const;

export type TSize = keyof typeof SIZE;

const TYPE = {
	button: 'button',
	reset: 'reset',
	submit: 'submit',
} as const;

export type TType = keyof typeof TYPE;

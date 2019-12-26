export const sizeMap = {
	s: 's',
	m: 'm',
	l: 'l',
} as const;

export type TSize = keyof typeof sizeMap;

export const displayMap = {
	inline: 'inline',
	block: 'block',
} as const;

export type TDisplay = keyof typeof displayMap;

export const colorMap = {
	dark: 'dark',
	bright: 'bright',
} as const;

export type TColor = keyof typeof colorMap;

export const alignMap = {
	'center-in-content': 'center-in-content',
} as const;

export type TAlign = keyof typeof alignMap;

export const animationMap = {
	'rotation-clockwise': 'rotation-clockwise',
	'rotation-counter-clockwise': 'rotation-counter-clockwise',
} as const;

export type TAnimation = keyof typeof animationMap;

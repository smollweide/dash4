export const typeMap = {
	log: 'log',
	info: 'info',
	success: 'success',
	error: 'error',
	warn: 'warn',
} as const;

export type TType = keyof typeof typeMap;

export const typeColorMap = {
	log: '#fff',
	info: '#17a2b8',
	success: '#28a745',
	error: '#dc3545',
	warn: '#dda600',
};

export function typeToColor(type: TType) {
	return typeColorMap[type] ? typeColorMap[type] : typeColorMap.log;
}

export function toParamCase(value: string) {
	return value
		.replace(/^[a-z]/, (str) => str.toUpperCase())
		.replace(/([A-Z])/g, (str) => `-${str.toLowerCase()}`)
		.substring(1);
}

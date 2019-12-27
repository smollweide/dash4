export function chunk<TParams = any>(array: TParams[], size: number): TParams[][] {
	return array.reduce((accum, next, i) => {
		const intI = Math.floor(i / size);
		return Object.assign([], accum, {
			[intI]: [...accum[intI], next],
		});
	}, Array(Math.ceil(array.length / size)).fill([]));
}

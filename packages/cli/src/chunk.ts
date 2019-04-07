export function chunk<P = any>(array: P[], size: number): P[][] {
	return array.reduce((accum, next, i) => {
		const intI = Math.floor(i / size);
		return Object.assign([], accum, {
			[intI]: [...accum[intI], next],
		});
	}, Array(Math.ceil(array.length / size)).fill([]));
}

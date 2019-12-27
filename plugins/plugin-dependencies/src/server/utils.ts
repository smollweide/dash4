export async function asyncForEach<TArrItem = any>(array: TArrItem[], onEach: (item: TArrItem, index: number) => void) {
	for (let index = 0; index < array.length; index++) {
		// eslint-disable-next-line
		await onEach(array[index], index);
	}
}

export async function wait(delay: number = 500) {
	return new Promise((resolve) => setTimeout(resolve, delay));
}

export async function wait(delay = 500) {
	return new Promise((resolve) => setTimeout(resolve, delay));
}

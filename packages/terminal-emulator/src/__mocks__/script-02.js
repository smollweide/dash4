setTimeout(() => {
	process.exit(1);
}, 1000);
throw new Error('error');

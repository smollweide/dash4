const logger = require('./build');
const wait = (duration = 100) => new Promise((resolve) => setTimeout(resolve, duration));

(async () => {
	logger.log('cli', 'add some message here!');
	logger.info('cli', 'add some message here!');
	logger.success('cli', 'add some message here!');
	logger.error('cli', 'add some message here!');
	logger.warn('cli', 'add some message here!');

	const spin = logger.spinner('cli', 'add some message here!');
	spin.start();
	await wait(500);
	spin.type('warn');
	spin.text('needs longer than usual');
	await wait(1000);
	spin.succeed('everything fine');
})();

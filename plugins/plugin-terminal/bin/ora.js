#!/usr/bin/env node

const ora = require('ora');

const spinner = ora('Loading unicorns').start();

setTimeout(() => {
	spinner.color = 'yellow';
	spinner.text = 'Loading rainbows';

	setTimeout(() => {
		spinner.succeed('Success');
	}, 1000);
}, 1000);

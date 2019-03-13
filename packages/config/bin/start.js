#!/usr/bin/env node

const { getBinPath, execute } = require('../lib/process');

execute(
	`${getBinPath('cross-env')} NODE_ENV=development ${getBinPath(
		'nodemon'
	)} --watch ./build --watch ./dash4.config.js ./node_modules/@dash4/server/bin`
);

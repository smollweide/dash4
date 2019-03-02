#!/usr/bin/env node

const { getBinPath, execute } = require('../lib/process');

execute(
	`${getBinPath('cross-env')} NODE_ENV=development ${getBinPath(
		'nodemon'
	)} --watch ./node_modules/@dash4/server/build ./node_modules/@dash4/server/build`
);

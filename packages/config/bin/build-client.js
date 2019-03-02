#!/usr/bin/env node

const { getBinPath, execute } = require('../lib/process');

execute(`${getBinPath('cross-env')} NODE_ENV=production ${getBinPath('webpack')} --mode production`);

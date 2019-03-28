#!/usr/bin/env node

const { getBinPath, execute } = require('../lib/process');

execute(`${getBinPath('jest')} --coverage --watch --config=jest.config.js`);

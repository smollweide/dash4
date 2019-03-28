#!/usr/bin/env node

const { getBinPath, execute } = require('../lib/process');

execute(`jest --coverage --config=jest.config.js`);

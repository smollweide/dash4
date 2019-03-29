#!/usr/bin/env node

const { getBinPath, execute } = require('../lib/process');

execute(`jest --coverage --watch --config=jest.server.config.js`);

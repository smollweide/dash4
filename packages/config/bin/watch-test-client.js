#!/usr/bin/env node

const { getBinPath, execute } = require('../lib/process');

execute(`jest --coverage --watchAll --config=jest.config.js`);

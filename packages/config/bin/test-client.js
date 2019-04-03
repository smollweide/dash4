#!/usr/bin/env node

const { execute } = require('../lib/process');

execute(`jest --coverage --config=jest.config.js`);

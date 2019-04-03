#!/usr/bin/env node

const { execute } = require('../lib/process');

execute(`jest --coverage --update-snapshot --config=jest.config.js`);

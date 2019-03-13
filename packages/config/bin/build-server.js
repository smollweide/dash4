#!/usr/bin/env node

const { getBinPath, execute } = require('../lib/process');

execute(`${getBinPath('tsc')} --outDir build --project tsconfig.server.json`);

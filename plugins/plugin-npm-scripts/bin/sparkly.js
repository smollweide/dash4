#!/usr/bin/env node

const sparkly = require('sparkly');

// eslint-disable-next-line
process.stdout.write(sparkly([0, 3, 5, 8, 4, 3, 4, 10]) + '\n\n');
// => '▁▃▄▇▄▃▄█'

// Specifying anything other than finite numbers will cause holes
process.stdout.write(sparkly([0, 3, 5, '', 4, 3, 4, 10]) + '\n\n');
// => '▁▃▄ ▄▃▄█'

// Specifying a min max object will change the sparkline range
process.stdout.write(sparkly([1, 2, 3, 4, 5], { min: 0, max: 10 }) + '\n\n');
// => '▁▂▃▄▄'

// Specifying a style option will change the sparkline color
process.stdout.write(sparkly([1, 2, 3, 4, 5, 6, 7, 8], { style: 'fire' }) + '\n\n');

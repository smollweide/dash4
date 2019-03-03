const fs = require('fs');
const { promisify } = require('util');

module.exports = {
	readdir: promisify(fs.readdir),
	readFile: promisify(fs.readFile),
	writeFile: promisify(fs.writeFile),
	realpathSync: fs.realpathSync,
};

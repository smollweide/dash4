const path = require('path');
const os = require('os');
const pty = require('node-pty');

function getBinPath(name) {
	return path.relative(process.cwd(), path.join(__dirname, '../node_modules/.bin', name));
}

function execute(cmd, cwd) {
	process.env.FORCE_COLOR = true;
	const isWin = os.platform() === 'win32';
	const reg = isWin ? /PS \w:\\[^>]*> ?$/ : /bash-3\.2\$ ?$/;
	const shell = isWin ? 'powershell.exe' : 'bash';

	const ptyProcess = pty.spawn(shell, [], {
		name: 'xterm-color',
		cols: process.stdout.columns,
		rows: process.stdout.rows,
		cwd: cwd || process.cwd(),
		env: process.env,
	});
	let lineCounter = 0;

	ptyProcess.on('data', function(data) {
		lineCounter += 1;
		if (lineCounter === 1) {
			return;
		}
		if (reg.test(data)) {
			ptyProcess.kill();
			process.exit();
			return;
		}
		process.stdout.write(data.replace(/^bash-3\.2\$ /, ''));
	});

	process.stdin.on('data', (data) => {
		ptyProcess.write(`${data.toString()}`);
	});

	ptyProcess.write(`${cmd}\r`);
}

module.exports.getBinPath = getBinPath;
module.exports.execute = execute;

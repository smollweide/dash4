import program from 'commander';
import fs from 'fs';
import path from 'path';
import readPkg from 'read-pkg';

export async function getProgram() {
	program
		.version((await readPkg()).version)
		.option('-p, --port [number]', 'number of port which should be used (default = 8080)')
		.option('-c, --config [string]', 'path where config file should be created (default = ./dash4.config.js)')
		.option('-f, --force', 'override existing configurations')
		.parse((process as any).argv);

	return {
		port: (program.port as number | undefined) || 8080,
		config: path.join(fs.realpathSync(process.cwd()), program.config || 'dash4.config.js'),
		force: program.force as boolean | undefined,
	};
}

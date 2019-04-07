import fs from 'fs-extra';
import { init } from '.';
import { getProgram } from './get-program';

(async () => {
	await init(fs.realpathSync(process.cwd()), await getProgram());
})();

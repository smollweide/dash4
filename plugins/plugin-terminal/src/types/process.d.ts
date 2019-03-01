import { Process } from 'node';

// tslint:disable-next-line
interface CustomProcess extends Process {
	env: {
		NODE_ENV?: 'production' | 'development';
		MOCK_ENV?: 'true' | 'false';
		FORCE_COLOR?: boolean;
	};
}

declare var process: CustomProcess;

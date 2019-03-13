declare var process: {
	cwd: () => string;
	env: {
		NODE_ENV?: 'production' | 'development';
		MOCK_ENV?: 'true' | 'false';
	};
};

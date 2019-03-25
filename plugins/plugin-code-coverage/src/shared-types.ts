export interface IThreshold {
	branches?: [number, number];
	functions?: [number, number];
	lines?: [number, number];
	statements?: [number, number];
}

export interface IThresholdGuaranteed {
	branches: [number, number];
	functions: [number, number];
	lines: [number, number];
	statements: [number, number];
}

export interface ICoverageSection {
	coverage: number;
	name: string;
	counter: number;
	covered: number;
}

export interface ICoverage {
	error?: boolean;
	message?: string;
	statements?: ICoverageSection;
	branches?: ICoverageSection;
	functions?: ICoverageSection;
	lines?: ICoverageSection;
}

export interface IClientConfig {
	cwd: string;
	dark?: boolean;
	threshold: IThresholdGuaranteed;
}

export interface IReadmeClientConfig {
	file: string;
	height?: number | string;
}

export interface IReadmeListItemClientConfig {
	title: string;
	file: string;
	id: string;
}

export interface IReadmeListClientConfig {
	title?: string;
	files: IReadmeListItemClientConfig[];
}

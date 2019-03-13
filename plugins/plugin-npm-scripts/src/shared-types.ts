export type TButtonVariant =
	| 'primary'
	| 'secondary'
	| 'success'
	| 'danger'
	| 'warning'
	| 'info'
	| 'dark'
	| 'light'
	| 'link'
	| 'outline-primary'
	| 'outline-secondary'
	| 'outline-success'
	| 'outline-danger'
	| 'outline-warning'
	| 'outline-info'
	| 'outline-dark'
	| 'outline-light';

export interface IScript {
	title?: string;
	cmd: string;
	cwd?: string;
	buttonVariant?: TButtonVariant;
}

export interface IScriptWithId extends IScript {
	id: string;
	cwd: string;
}

export interface IClientConfig {
	scripts: IScriptWithId[];
}

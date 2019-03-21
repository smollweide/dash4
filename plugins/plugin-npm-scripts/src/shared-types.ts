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
	// title which should be displayed above the scripts
	title?: string;
	// command which should be executed
	cmd: string;
	// current working directory of the child process
	cwd?: string;
	// bootstrap button variant https://react-bootstrap.github.io/components/buttons/
	buttonVariant?: TButtonVariant;
}

export interface IScriptWithId extends IScript {
	id: string;
	cwd: string;
}

export interface IClientConfig {
	scripts: IScriptWithId[];
}

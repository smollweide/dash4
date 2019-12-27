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

export interface IActionLink {
	type: 'link';
	title: string;
	href: string;
	image?: string;
	icon?: string;
}
export interface IActionLinkWithId extends IActionLink {
	id: string;
}

export interface IActionTeaserLink {
	title: string;
	href: string;
	buttonVariant?: TButtonVariant;
}
export interface IActionTeaser {
	type: 'teaser';
	title: string;
	subtitle?: string;
	link?: IActionLink | IActionLink[];
	image?: string;
	icon?: string;
}
export interface IActionTeaserWithId extends IActionTeaser {
	id: string;
}

export interface IClientConfig {
	title?: string;
	actions?: (IActionLinkWithId | IActionTeaserWithId)[];
}

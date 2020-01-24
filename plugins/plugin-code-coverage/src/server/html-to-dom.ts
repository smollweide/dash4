// TODO: bugs in @types/htmlparser2
import { DomHandler, Parser } from 'htmlparser2';

export interface IDomElement {
	attribs?: { [s: string]: string };
	children: IDomElement[];
	data?: any;
	name?: string;
	next?: IDomElement;
	parent?: IDomElement;
	prev?: IDomElement;
	type?: string;
}

export async function htmlToDom(html: string): Promise<IDomElement[]> {
	// remove blnk lines
	html = html.replace(/^(?:[\t ]*(?:\r?\n|\r))+/g, '');
	return new Promise((resolve, reject) => {
		const handler = new DomHandler((error: Error, dom: IDomElement[]) => {
			/* istanbul ignore next */
			if (error) {
				reject(error);
				return;
			}
			resolve(dom);
		});
		const parser = new Parser(handler);
		parser.write(html);
		parser.end();
	});
}

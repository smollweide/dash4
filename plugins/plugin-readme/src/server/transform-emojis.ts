import emoji from 'node-emoji';

const EMOJI_REGEXP = /:\+1:|:-1:|:[\w-]+:/g;

export function transformEmojis(doc: string) {
	const resultMap: {
		[key: string]: boolean;
	} = {};
	let result: RegExpExecArray | null;

	// tslint:disable-next-line
	while ((result = EMOJI_REGEXP.exec(doc)) !== null) {
		resultMap[(result as any) as string] = true;
	}

	Object.keys(resultMap).forEach((resultItem) => {
		doc = doc.replace(new RegExp(resultItem, 'g'), emoji.get(resultItem.replace(/:/g, '')));
	});

	return doc;
}

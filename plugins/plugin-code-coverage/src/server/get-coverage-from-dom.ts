import { ICoverage, ICoverageSection } from '../shared-types';
import { IDomElement } from './html-to-dom';

const removeUndefined = (item: undefined | any) => item;
const passDiv = (item: any) => {
	if (item.type !== 'tag' || item.name !== 'div') {
		return;
	}
	return item;
};

export function getCoverageFromDom(dom: IDomElement[]) {
	const coverageAsArray: ICoverageSection[] = dom[2].children[3].children[1].children[1].children[3].children
		.map(passDiv)
		.filter(removeUndefined)
		.map(
			(item): ICoverageSection => {
				const coveredCounter = item.children[5].children[0].data.split('/');
				return {
					coverage: parseFloat(item.children[1].children[0].data),
					name: item.children[3].children[0].data,
					counter: parseInt(coveredCounter[1], 10),
					covered: parseInt(coveredCounter[0], 10),
				};
			}
		)
		.filter(removeUndefined);

	const coverage = {};

	coverageAsArray.forEach((item) => (coverage[item.name.toLowerCase()] = item));

	return coverage as ICoverage;
}

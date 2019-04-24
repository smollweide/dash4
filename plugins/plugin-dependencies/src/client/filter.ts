import { IDependencyObj, IError } from '../shared-types';
import { isDataError, isDataLoading } from './utils';

export function filter(data: IDependencyObj | IError | undefined, filterNotUpToDate: boolean, filterQuery: string) {
	const out = {};

	if (isDataLoading(data) || isDataError(data)) {
		return out;
	}

	Object.keys(data).forEach((dependencyName) => {
		if (
			(!filterNotUpToDate || (filterNotUpToDate && !data[dependencyName].isUpToDate)) &&
			(filterQuery === '' || dependencyName.includes(filterQuery))
		) {
			out[dependencyName] = data[dependencyName];
		}
	});

	return out;
}

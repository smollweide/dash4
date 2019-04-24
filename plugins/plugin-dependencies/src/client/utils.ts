import { IDependencyObj, IError } from '../shared-types';

export function isDataLoading(value: IDependencyObj | IError | undefined): value is undefined {
	return typeof value === 'undefined';
}

export function isDataError(value: IDependencyObj | IError): value is IError {
	return typeof value === 'object' && Object.keys(value).includes('error');
}

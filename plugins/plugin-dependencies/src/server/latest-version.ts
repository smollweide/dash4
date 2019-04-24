import { warn } from '@dash4/log';
import latestVersion from 'latest-version';

export const latestVersionCache: {
	[key: string]: {
		version: string;
		timestamp: number;
	};
} = {};
export const timestamp = () => Math.floor(Date.now());

async function getLatestVersionFromCache(dependency: string, version: 'latest' | 'next') {
	const ref = latestVersionCache[`${dependency}@${version}`];
	if (!ref || !ref.version) {
		return false;
	}
	// invalid after 1h
	if (timestamp() - ref.timestamp > 3600000) {
		return false;
	}
	return ref.version;
}

async function storeLatestVersionInCache(dependency: string, version: 'latest' | 'next'): Promise<undefined | string> {
	let latest: undefined | string;
	try {
		latest = await latestVersion(dependency, {
			version,
		});
	} catch (err) {
		warn('plugin-dependencies', err);
	}
	if (latest) {
		latestVersionCache[`${dependency}@${version}`] = {
			version: latest,
			timestamp: timestamp(),
		};
	}
	return latest;
}

export async function flushCache() {
	Object.keys(latestVersionCache).forEach((key) => {
		delete latestVersionCache[key];
	});
}

export async function getLatestVersion(dependency: string, currentVersion?: string) {
	const version = currentVersion
		? currentVersion.includes('alpha') || currentVersion.includes('beta')
			? 'next'
			: 'latest'
		: 'latest';
	const cachedLatestVersion = await getLatestVersionFromCache(dependency, version);
	if (cachedLatestVersion) {
		return cachedLatestVersion;
	}
	return await storeLatestVersionInCache(dependency, version);
}

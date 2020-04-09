export function isVersionUpToDate(version: string, latestVersion?: string) {
	const regCaret = /^\^/g;
	const regTilde = /^~/g;
	const versionSpl = version.replace(regCaret, '').replace(regTilde, '').split('.');
	const latestVersionSpl = (latestVersion || '').split('.');

	if (!latestVersion) {
		return false;
	}

	if (version.includes('alpha') && !latestVersion.includes('alpha')) {
		return true;
	}

	if (version.includes('beta') && !latestVersion.includes('beta')) {
		return true;
	}

	if (versionSpl.length < 3 || latestVersionSpl.length < 3) {
		return null;
	}

	if (version.match(regCaret) !== null) {
		return versionSpl[0] === latestVersionSpl[0];
	}

	if (version.match(regTilde) !== null) {
		return versionSpl[0] === latestVersionSpl[0] && versionSpl[1] === latestVersionSpl[1];
	}

	if (version === latestVersion) {
		return true;
	}
	return false;
}

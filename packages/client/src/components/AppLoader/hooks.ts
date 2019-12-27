import { useState } from 'react';
import { useEffectAsync } from '../../react-hooks';
import { DURATION_HIDE_ANIMATION } from './constants';

const wait = async (duration = 100) => new Promise((resolve) => setTimeout(resolve, duration));

export function useMinimalWait({ visible, minWait }: { visible: boolean; minWait: number }) {
	const [isMinimalWaitReached, setIsMinimalWaitReached] = useState(false);
	useEffectAsync(async () => {
		await wait(minWait);
		setIsMinimalWaitReached(true);
	}, [visible]);

	return isMinimalWaitReached;
}

export function useHidden({ visible, isMinimalWaitReached }: { visible: boolean; isMinimalWaitReached: boolean }) {
	const [isHidden, setIsHidden] = useState(false);
	useEffectAsync(async () => {
		if (visible || !isMinimalWaitReached) {
			return;
		}
		await wait(DURATION_HIDE_ANIMATION);
		setIsHidden(true);
	}, [visible, isMinimalWaitReached]);

	return isHidden;
}

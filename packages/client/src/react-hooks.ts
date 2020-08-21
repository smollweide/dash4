import { useEffect } from 'react';

export function useEffectAsync(effect: () => Promise<any>, inputs: any[]) {
	useEffect(() => {
		effect();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, inputs);
}

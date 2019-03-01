import { useEffect } from 'react';

export function useEffectAsync(effect: () => Promise<any>, inputs: any[]) {
	useEffect(() => {
		effect();
	}, inputs);
}

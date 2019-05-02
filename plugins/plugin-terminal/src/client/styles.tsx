import { IWidgetConfig } from '@dash4/client/build';
import { CSSProperties } from 'react';
import { IClientConfig } from '../shared-types';

export const styles = {
	windowBody: (props: IWidgetConfig<IClientConfig>) =>
		({
			height: props.clientConfig.height || 250,
		} as CSSProperties),
	keyboard: {
		position: 'absolute',
		right: 0,
		top: 11,
	} as CSSProperties,
	contextMenuItem: {
		minWidth: 200,
		paddingLeft: 0,
		paddingRight: 40,
	} as CSSProperties,
};

<div align="center">
<h1>Dash4 Icon</h1>

Render a [material ui](https://material.io/tools/icons/?style=baseline) icon
<br />

</div>

<!-- STORY -->

```tsx
import React from 'react';
import { Icon } from '@dash4/ui';

export const YourComponent = () => {
	return <Icon name="play_arrow" size="m" />;
};
```

_props:_

```ts
// icon name defined by material ui icons
name: string;
className?: string;
// type TSize = "s" | "m" | "l"
size?: TSize;
// type TColor = "dark" | "light"
color?: TColor;
// type TAnimation = "rotation-clockwise" | "rotation-counter-clockwise"
animation?: TAnimation;
// type TAlign = "center-in-content"
align?: TAlign;
// type TDisplay = "inline" | "block" (default=block)
display?: TDisplay;
```

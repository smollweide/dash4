<div align="center">
<h1>Dash4 Keyboard</h1>

Render keycodes
<br />
</div>


<!-- STORY -->

```tsx
import React from 'react';
import { Key, Keyboard, Icon } from '@dash4/ui';

export const YourComponent = () => {
  return (
    <Keyboard>
      <Key>Ctrl</Key>
      <Key>
        <Icon name="arrow_upward" />
      </Key>
      <Key>A</Key>
    </Keyboard>
  );
};
```

Instead of icon [utf8 symbol](https://www.key-shortcut.com/en/writing-systems/35-symbols/arrows/) can be used also.

*props:*

```ts
children: JSX.Element | JSX.Element[];
className?: string;
```

*Key props:*

```ts
children: string | JSX.Element;
className?: string;
tagName?: 'span' | 'li' | 'div' | 'p';
```
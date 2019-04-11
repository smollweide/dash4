
<div align="center">
<h1>Dash4 Window</h1>

Window component for Dash4
<br />
</div>

<!-- STORY -->

```tsx
import React from 'react';
import { Button } from 'react-bootstrap';
import { Icon, Window, WindowBody, WindowHeader } from '@dash4/ui';

export const YourComponent = () => {
  return (
    <Window dark>
      <WindowHeader title="Title" subTitle="Subtitle">
        <Button variant="outline-primary" size="sm">
          <Icon name="play_arrow" size="m" />
        </Button>
      </WindowHeader>
      <WindowBody>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
        labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et
        ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      </WindowBody>
    </Window>
  );
};
```

## Props

*props (Window):*

```ts
children: React.ReactNode;
className?: string;
// enable / disable dark mode (default=false)
dark?: boolean;
// automatically stretches to height of neighbour window (default=true)
autoStretch?: boolean;
// enable / disable fullscreen mode (default=false)
fullscreen?: boolean;
```

*props (WindowHeader):*

```ts
title: string;
subTitle?: string;
className?: string;
children?: React.ReactNode;
onDoubleClick?: (event: React.SyntheticEvent<HTMLDivElement>) => void;
// enable / disable processing mode (default=false)
progressing?: boolean;
```

*props (WindowBody):*

```ts
children: React.ReactNode;
className?: string;
```

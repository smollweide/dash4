<div align="center">
<h1>Dash4 ErrorBoundary</h1>

Catch problems in app
<br />
</div>

<!-- STORY -->

```tsx
import React from 'react';
import { ErrorBoundary } from '@dash4/ui';

export const YourComponent = () => {
  return (
    <ErrorBoundary>
      {`render something`}
    </ErrorBoundary>
  );
};
```

*props:*

```ts
title?: string;
message?: string;
children: React.ReactNode;
```
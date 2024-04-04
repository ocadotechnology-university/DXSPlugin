import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const dxsPlugin = createPlugin({
  id: 'dxs',
  routes: {
    root: rootRouteRef,
  },
});

export const DxsPage = dxsPlugin.provide(
  createRoutableExtension({
    name: 'DxsPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);

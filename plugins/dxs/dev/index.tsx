import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { dxsPlugin, DxsPage } from '../src/plugin';

createDevApp()
  .registerPlugin(dxsPlugin)
  .addPage({
    element: <DxsPage />,
    title: 'Root Page',
    path: '/dxs'
  })
  .render();

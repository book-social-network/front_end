import React, { lazy } from 'react';
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const Mybooks = lazy(() => import('../pages/MyBooks/MyBooks'));
const Group = lazy(() => import('../pages/Group/Group'));

export const routes = [
  { path: '/', page: <HomePage />, isShowHeader: true },
  { path: '/Mybooks', page: <Mybooks />, isShowHeader: true },
  { path: '/Groups', page: <Group />, isShowHeader: true },
];

import React, { lazy } from 'react'
const HomePage = lazy(() => import('../pages/HomePage/HomePage'))
const Mybooks = lazy(() => import('../pages/MyBooks/MyBooks'))
const Group = lazy(() => import('../pages/Group/Group'))
const Login = lazy(() => import('../pages/Login/Login'))
const Register = lazy(() => import('../pages/Register/Register'))

export const routes = [
  { path: '/', page: <HomePage />, isShowHeader: true },
  { path: '/Mybooks', page: <Mybooks />, isShowHeader: true },
  { path: '/Groups', page: <Group />, isShowHeader: true },
  { path: '/Login', page: <Login />, isShowHeader: false },
  { path: '/Register', page: <Register />, isShowHeader: false },
]

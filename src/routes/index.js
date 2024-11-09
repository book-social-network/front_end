import React, { lazy } from 'react'
const HomePage = lazy(() => import('../pages/HomePage/HomePage'))
const Mybooks = lazy(() => import('../pages/MyBooks/MyBooks'))
const Group = lazy(() => import('../pages/Group/Group'))
const Login = lazy(() => import('../pages/Login/Login'))
const Register = lazy(() => import('../pages/Register/Register'))
const Profile = lazy(() => import('../pages/Profile/Profile'))
const DetailBook = lazy(() => import('../pages/DetailBook/DetailBook'))
const DetailGroup = lazy(()=>import('../pages/DetailGroup/DetailGroup'))

export const routes = [
  { path: '/', page: <Login />, isShowHeader: false },
  { path: '/Home', page: <HomePage />, isShowHeader: true },
  { path: '/Mybooks', page: <Mybooks />, isShowHeader: true },
  { path: '/Groups', page: <Group />, isShowHeader: true },
  { path: '/Register', page: <Register />, isShowHeader: false },
  { path: '/Profile', page: <Profile />, isShowHeader: true },
  { path: '/DetailBook', page: <DetailBook />, isShowHeader: true },
  {path: '/DetailGroup', page: <DetailGroup/>, isShowHeader: true}
]

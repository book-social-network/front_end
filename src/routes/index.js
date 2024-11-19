import React, { lazy } from 'react'
const HomePage = lazy(() => import('../pages/HomePage/HomePage'))
const Mybooks = lazy(() => import('../pages/MyBooks/MyBooks'))
const Group = lazy(() => import('../pages/Group/Group'))
const Login = lazy(() => import('../pages/Login/Login'))
const Register = lazy(() => import('../pages/Register/Register'))
const Profile = lazy(() => import('../pages/Profile/Profile'))
const DetailBook = lazy(() => import('../pages/DetailBook/DetailBook'))
const DetailGroup = lazy(() => import('../pages/DetailGroup/DetailGroup'))
const DetailUser = lazy(() => import('../pages/DetailUser/DetailUser'))
const HomePageAdmin = lazy(()=> import('../layout/Admin/Pages/HomePageAdmin/HomePageAdmin'))

export const routes = [
  { path: '/', page: <Login />, isShowHeader: false },
  { path: '/home', page: <HomePage />, isShowHeader: true },
  { path: '/mybooks', page: <Mybooks />, isShowHeader: true },
  { path: '/groups', page: <Group />, isShowHeader: true },
  { path: '/register', page: <Register />, isShowHeader: false },
  { path: '/my-profile', page: <Profile />, isShowHeader: true },
  { path: '/detail-book/:id', page: <DetailBook />, isShowHeader: true },
  { path: '/detail-group/:id', page: <DetailGroup />, isShowHeader: true },
  { path: '/detail-user/:id', page: <DetailUser />, isShowHeader: true },
  { path: '/admin/home', page: <HomePageAdmin />, isShowHeader: false },
]

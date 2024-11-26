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
const HomePageAdmin = lazy(
  () => import('../layout/Admin/Pages/HomePageAdmin/HomePageAdmin'),
)
const DetailPost = lazy(() => import('../pages/DetailPost/DetailPost'))
const TestPage = lazy(() => import('../pages/testpage'))
const UploadAuthor = lazy(() => import('../pages/UploadAuthor/UploadAuthor'))
const UploadType = lazy(() => import('../pages/UploadType/UploadType'))
const UploadBook = lazy(() => import('../pages/UploadBook/UploadBook'))
const EditProfile = lazy(() => import('../pages/Profile/EditProfile'))

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
  { path: '/detail-post/:id', page: <DetailPost />, isShowHeader: true },
  { path: '/upload-author', page: <UploadAuthor />, isShowHeader: true },
  { path: '/upload-type', page: <UploadType />, isShowHeader: true },
  { path: '/upload-book', page: <UploadBook />, isShowHeader: true },
  { path: '/my-profile/edit', page: <EditProfile />, isShowHeader: true },
  {
    path: '/admin',
    page: (
        <HomePageAdmin />
    ),
    isShowHeader: false,
  },
  { path: '/test', page: <TestPage />, isShowHeader: false },
]

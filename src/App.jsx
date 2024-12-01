import React, { Fragment, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes'
import {
  DefaultPage,
  DefaultPageNoHeader,
} from './layout/User/Components/DefaultPage/DefaultPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {
  return (
    <Fragment>
    <ToastContainer />

      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  route.isShowHeader === true ? (
                    <DefaultPage>{route.page}</DefaultPage>
                  ) : (
                    <DefaultPageNoHeader>{route.page}</DefaultPageNoHeader>
                  )
                }
              />
            ))}
          </Routes>
        </Suspense>
      </Router>
    </Fragment>
  )
}

export default App

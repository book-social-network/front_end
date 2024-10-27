import React, { Fragment, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import { DefaultPage } from './layout/User/Components/DefaultPage/DefaultPage';

function App() {
  return (
    <Fragment>
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
                    <div>Not found</div>
                  )
                }
              />
            ))}
          </Routes>
        </Suspense>
      </Router>
    </Fragment>
  );
}

export default App;

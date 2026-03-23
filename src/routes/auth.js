import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route } from 'react-router-dom';
import AuthSideImage from '../components/authSideImage';

const Login = lazy(() => import('../views/login'));


function FrontendRoutes() {
  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route exact path="/" component={Login} />
      </Suspense>
    </Switch>
  );
}

export default AuthSideImage(FrontendRoutes);

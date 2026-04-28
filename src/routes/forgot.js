import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route } from 'react-router-dom';
import AuthSideImage from '../components/authSideImage';

const ForgotPassword = lazy(() => import('../views/forgotPassword'));

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
        <Route exact path="/forgotPassword" component={ForgotPassword} />
      </Suspense>
    </Switch>
  );
}

export default AuthSideImage(FrontendRoutes);

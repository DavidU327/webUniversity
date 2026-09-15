import React, { Suspense, lazy } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import adminLayout from '../../components/adminLayout';

const Dashboard = lazy(() => import('../../views/dashboard'));
const OrderAssignment = lazy(() => import('../../views/orderAssignment'));
const Collectors = lazy(() => import('../../views/collector'));
const Users = lazy(() => import('../../views/user'));
const Levels = lazy(() => import('../../views/level'));
const Orders = lazy(() => import('../../views/order'));
const Wastes = lazy(() => import('../../views/waste'));
const Blogs = lazy(() => import('../../views/blog'));
const Tips = lazy(() => import('../../views/tip'));

function Admin() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route path={`${path}/dashboard`} component={Dashboard} />
        <Route path={`${path}/order-assignment`} component={OrderAssignment} />
        <Route path={`${path}/collectors`} component={Collectors} />
        <Route path={`${path}/users`} component={Users} />
        <Route path={`${path}/levels`} component={Levels} />
        <Route path={`${path}/orders`} component={Orders} />
        <Route path={`${path}/wastes`} component={Wastes} />
        <Route path={`${path}/blogs`} component={Blogs} />
        <Route path={`${path}/tips`} component={Tips} />
      </Suspense>
    </Switch>
  );
}

export default adminLayout(Admin);

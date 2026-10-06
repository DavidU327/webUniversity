import React, { useMemo } from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import store from './redux/store';
import Admin from './routes/admin';
import Auth from './routes/auth';
import Forgot from './routes/forgot';

import './static/css/style.css';
import 'antd/dist/antd.less';

import { theme } from './config/theme/themeVariables';
import { TOKEN_WEB } from './config/variable/variable';
import { getItem } from './utility/localStorageControl';

const useAuth = () => {
  const token = getItem(TOKEN_WEB);

  const isValid = token && token !== "undefined" && token !== "null";

  return useMemo(() => ({
    token,
    isAuth: !!isValid,
  }), [token, isValid]);
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuth } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

const PublicRoute = ({ component: Component, ...rest }) => {
  const { isAuth } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          <Redirect to="/admin/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const ProviderConfig = () => {
  const { isAuth } = useAuth();

  const NotFound = () => <Redirect to={isAuth ? "/admin/dashboard" : "/"} />;

  return (
    <ConfigProvider
      direction="ltr"
    >
      <ThemeProvider theme={theme}>
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            {/* Auth */}
            <PublicRoute exact path="/" component={Auth} />

            {/* Forgot password */}
            <Route path="/forgot" component={Forgot} />

            {/* Admin */}
            <PrivateRoute path="/admin" component={Admin} />

            {/* fallback */}
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </ThemeProvider>
    </ConfigProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ProviderConfig />
    </Provider>
  );
}

PublicRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default hot(App);

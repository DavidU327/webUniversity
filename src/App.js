  import React from 'react';
  import { hot } from 'react-hot-loader/root';
  import { Provider } from 'react-redux';
  import { ThemeProvider } from 'styled-components';
  import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
  import { ConfigProvider } from 'antd';
  import store from './redux/store';
  import Admin from './routes/admin';
  import Auth from './routes/auth';
  import Forgot from './routes/forgot';
  import './static/css/style.css';
  import 'antd/dist/antd.less';
  import { theme } from './config/theme/themeVariables';

  const ProviderConfig = () => {

    function NotFound() {
      return <Redirect to="/" />;
    }



    return (
      <ConfigProvider direction="ltr">
        <ThemeProvider theme={{ ...theme}}>
          <Router basename={process.env.PUBLIC_URL}>
            <Route exact path="/" component={Auth} />
            <Route path="/admin" component={Admin} />
            <Route path="/" component={Forgot} />
            <Route exact path="*" component={NotFound} />
          </Router>
        </ThemeProvider>
      </ConfigProvider>
    );
  }

  function App() {
    return (
      <Provider store={store}>
        <ProviderConfig />
      </Provider>
    );
  }

  export default hot(App);

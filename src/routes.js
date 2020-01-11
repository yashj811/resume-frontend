import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setCurrentUser } from './actions/authActions';
import App from './App';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import AccountActivation from './components/auth/AccountActivation';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import store from './store';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import Education from './components/Private/Education';
import Work from './components/Private/Work';
import Sider from './components/Private/CreateProfile2';
import Templates from './components/Templates/Templates';
import { getCookie, setAuthHeader } from './utils/Helpers';
import { GetProfile } from './actions/profileActions';

const Routes = () => {
  useEffect(() => {
    const cookieChecked = getCookie('token');
    if (localStorage.user) {
      const data = {};
      data.user = JSON.parse(localStorage.user);
      store.dispatch(setCurrentUser(data));
      // store.dispatch(GetProfile());
    }
    if (cookieChecked) {
      setAuthHeader(cookieChecked);
    }
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={App} />
          <PublicRoute exact path='/login' restricted={true} component={Login} />
          <PrivateRoute exact path='/templates' restricted={true} component={Templates} />
          <PublicRoute exact path='/signup' restricted={true} component={Signup} />
          <PublicRoute
            exact
            path='/auth/activate/:token'
            restricted={true}
            component={AccountActivation}
          />
          <PublicRoute
            exact
            path='/forgot-password'
            restricted={true}
            component={ForgotPassword}
          />
          <Route exact path='/auth/reset-password/:token' component={ResetPassword} />
          <PrivateRoute path='/profile/create' component={Sider} />
          {/* <PrivateRoute exact path='/profile/create1' component={UserProfile} /> */}
          <PrivateRoute exact path='/profile/create2' component={Education} />
          <PrivateRoute exact path='/profile/create3' component={Work} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default Routes;

import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { isAuth } from "./Helpers";


export default function PublicRoute({ component: Component, restricted, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuth() && restricted ? (
            <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
          ) : (
            <Component {...props} />
       
          )
        }
      />
    );
  }
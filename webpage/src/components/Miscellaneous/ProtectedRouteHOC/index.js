import React from 'react';
import { Route,Redirect } from "react-router-dom";
import { USER_ROLES } from "../../../constants";

const ProtectedRoute = ({ component: Component, ...rest }) => (
   <Route {...rest} render={(props) => (
      sessionStorage.getItem('rol') === USER_ROLES.ADMIN ? 
         <Component {...props} /> : <Redirect to={{ pathname: '/', state: { from: props.location }}} />   
   )} />
);

export default ProtectedRoute;
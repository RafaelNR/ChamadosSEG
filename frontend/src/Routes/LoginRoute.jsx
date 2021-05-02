import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { MythemeProvider } from '../Context/ThemeContext';
import { LoginProvider } from '../Context/LoginContext';
import Login from "../Views/Login/";
import Recuperar from "../Views/Recuperar";

export default () => {
  return (
    <MythemeProvider>
      <LoginProvider>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/recuperar-senha" exact component={Recuperar} />
          <Route path="*">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </LoginProvider>
    </MythemeProvider>
  );
};

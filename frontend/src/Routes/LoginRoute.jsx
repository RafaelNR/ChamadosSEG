import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { MythemeProvider } from '../Context/ThemeContext';

//Pages
import Login from "../Pages/Login";

export default () => {
  return (
    <MythemeProvider>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </MythemeProvider>
  );
};

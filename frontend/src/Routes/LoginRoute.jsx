import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

//Pages
import Login from "../Pages/Login";

export default () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route path="*">
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
};

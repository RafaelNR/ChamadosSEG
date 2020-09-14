import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

//Pages
import Home from "../Pages/Home";

export default () => {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/home" component={Home} />
			<Route path="*">
				<Redirect to="/" />
			</Route>
		</Switch>
	);
};

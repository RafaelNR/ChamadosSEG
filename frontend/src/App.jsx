import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./Context/Auth";

import Routes from "./Routes/";

function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes />
			</Router>
		</AuthProvider>
	);
}

export default App;

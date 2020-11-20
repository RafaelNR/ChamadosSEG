import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";

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

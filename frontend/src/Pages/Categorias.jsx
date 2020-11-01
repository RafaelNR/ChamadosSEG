import React from "react";
import CategoriasTab from '../Components/Tabs/CategoriasTab'

import { LoadingProvider } from "../Context/LoadingContext";

export default () => {
	return (
		<LoadingProvider>
			<CategoriasTab  />
		</LoadingProvider>
	);
};


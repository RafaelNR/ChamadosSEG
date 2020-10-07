import React from "react";
import Paper from "../Components/Paper/Paper";
import { CategoriasProvider } from "../Context/CategoriasContext";
import { LoadingProvider } from "../Context/LoadingContext";
import Tab from '../Components/Tabs/CategoriasTab'

export default () => {
	return (
		<LoadingProvider>
			<CategoriasProvider>
					<Paper Render={Tab} />
			</CategoriasProvider>
		</LoadingProvider>
	);
};


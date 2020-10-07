import React from "react";
import Paper from "../Components/Paper/Paper";
import { ClientesProvider } from "../Context/ClientesContext";
import { LoadingProvider } from "../Context/LoadingContext";
import ClientesTable from "../Components/Tables/ClientesTable";
import ClientesDialog from "../Components/Dialog/ClientesDialog";

export default () => {
	return (
		<LoadingProvider>
			<ClientesProvider>
				<Paper Render={ClientesTable} RenderDialog={ClientesDialog} />
			</ClientesProvider>
		</LoadingProvider>
	);
};

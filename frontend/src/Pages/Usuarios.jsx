import React from "react";
import Paper from "../Components/Paper/Paper";
import { UsuariosProvider } from "../Context/UsuariosContext";
import { LoadingProvider } from "../Context/LoadingContext";
import UsersTable from "../Components/Tables/UsersTable";
import UsersDialog from "../Components/Dialog/UsersDialog";

export default () => {
	return (
		<LoadingProvider>
			<UsuariosProvider>
				<Paper Render={UsersTable} RenderDialog={UsersDialog} />
			</UsuariosProvider>
		</LoadingProvider>
	);
};

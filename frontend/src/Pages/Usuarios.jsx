import React from "react";
import UsersPaper from "../Components/Paper/UsersPaper";
import { UsuariosProvider } from "../Context/UsuariosContext";

export default () => {
	return (
		<UsuariosProvider>
			<UsersPaper />
		</UsuariosProvider>
	);
};

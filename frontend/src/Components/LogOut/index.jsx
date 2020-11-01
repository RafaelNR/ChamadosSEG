import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

// Context
import useAuth from "../../Context/AuthContext";

export default () => {
	const { handleLogout } = useAuth();

	return (
		<IconButton color="inherit" title="Sair" onClick={handleLogout}>
			<ExitToAppIcon />
		</IconButton>
	);
};

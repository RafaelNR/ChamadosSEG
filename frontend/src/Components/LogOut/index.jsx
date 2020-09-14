import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

// Context
import { AuthContext } from "../../Context/Auth";

export default () => {
	const { handleLogout } = useContext(AuthContext);

	return (
		<IconButton color="inherit" title="Sair" onClick={handleLogout}>
			<ExitToAppIcon />
		</IconButton>
	);
};

import React, { useContext } from "react";
import Button from "@material-ui/core/Button";

// Context
import { AuthContext } from "../../Context/Auth";

export default () => {
	const { handleLogout } = useContext(AuthContext);

	return (
		<Button
			type="submit"
			fullWidth
			variant="contained"
			color="primary"
			onClick={handleLogout}
		>
			Sair
		</Button>
	);
};

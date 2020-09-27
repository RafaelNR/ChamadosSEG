import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

const SnackBarContext = createContext({});

const SnackBarProvider = ({ children }) => {
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const [severity, setSeverity] = useState("success");
	const [message, setMessage] = useState("");

	const clickSnackBar = () => {
		setOpenSnackBar(!openSnackBar);
	};

	// const closeSnackBar = (event, reason) => {
	// 	if (reason === "clickaway") {
	// 		return;
	// 	}
	// 	setOpenSnackBar(false);
	// };

	const handleSnackBar = ({ type, message }) => {
		setSeverity(type);
		setMessage(message);
		setOpenSnackBar(true);
	};

	return (
		<SnackBarContext.Provider
			value={{
				openSnackBar,
				setOpenSnackBar,
				severity,
				setSeverity,
				message,
				setMessage,
				clickSnackBar,
				handleSnackBar,
			}}
		>
			{children}
		</SnackBarContext.Provider>
	);
};

SnackBarProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export { SnackBarContext, SnackBarProvider };

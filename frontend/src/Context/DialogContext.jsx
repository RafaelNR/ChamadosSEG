import React, { createContext, useState, useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { TrainOutlined } from "@material-ui/icons";

const DialogContext = createContext({});

const DialogProvider = ({ children }) => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(TrainOutlined);
	const [type, setType] = useState("");

	const openDialog = useCallback((currtype = null) => {
		setOpen(true);
		setLoading(true);
		if (typeof type === "string") setType(currtype);
	}, [type]);
	
	const closeDialog = useCallback(() => {
		setOpen(false);
		setLoading(false);
	}, []);

	return (
		<DialogContext.Provider
			value={{
				open,
				setOpen,
				loading,
				setLoading,
				type,
				setType,
				openDialog,
				closeDialog,
			}}
		>
			{children}
		</DialogContext.Provider>
	);
};

export default function useDialog() {
	return useContext(DialogContext);
}

export { DialogContext, DialogProvider };

DialogProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

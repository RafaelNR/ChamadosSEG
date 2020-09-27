import React, { createContext, useState } from "react";

const DialogContext = createContext({});

const DialogProvider = ({ children }) => {
	const [openDialog, setOpenDialog] = useState(false);
	const [dialogLoading, setDialogLoading] = useState(false);
	const [dialogType, setDialogType] = useState("");

	/**
	 * Fecha ou Abre o dialog;
	 */
	const ToggleDialogClick = (type = null) => {
		setOpenDialog(!openDialog);
		setDialogLoading(false);
		if (typeof type === "string") setDialogType(type);
	};

	/**
	 * Provider
	 */
	return (
		<DialogContext.Provider
			value={{
				openDialog,
				setOpenDialog,
				dialogLoading,
				setDialogLoading,
				dialogType,
				setDialogType,
				ToggleDialogClick,
			}}
		>
			{children}
		</DialogContext.Provider>
	);
};

export { DialogContext, DialogProvider };

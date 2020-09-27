import React, { createContext, useState } from "react";
const MenuContext = createContext({});

const MenuProvider = ({ children }) => {
	const [open, setOpen] = useState(false);

	function handleDrawerOpen() {
		setOpen(true);
	}

	function handleDrawerClose() {
		setOpen(false);
	}

	return (
		<MenuContext.Provider value={{ open, handleDrawerOpen, handleDrawerClose }}>
			{children}
		</MenuContext.Provider>
	);
};

export { MenuContext, MenuProvider };

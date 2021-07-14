import React, { createContext, useState, useContext, useCallback } from "react";
const MenuContext = createContext({});

const MenuProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleDrawer = useCallback(() => {
    setOpen(op => !op);
  }, []);

  return (
    <MenuContext.Provider
      value={{ open, setOpen, handleDrawer, handleDrawerOpen, handleDrawerClose }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export default function useMenu() {
  return useContext(MenuContext);
}

export { MenuContext, MenuProvider };

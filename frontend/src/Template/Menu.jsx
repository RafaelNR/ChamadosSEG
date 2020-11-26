import React from "react";

import AppBar from "./AppBar";
import Drawer from "./Drawer";
import { MenuProvider } from "../Context/MenuContext";

const Menu = () => {
  return (
    <MenuProvider>
      <AppBar />
      <Drawer />
    </MenuProvider>
  );
};

export default React.memo(Menu);

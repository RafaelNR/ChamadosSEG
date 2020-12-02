import React from "react";

import AppBar from "./AppBar";
import Drawer from "./Drawer";

const Menu = () => {
  return (
    <>
      <AppBar />
      <Drawer />
    </>
  );
};

export default React.memo(Menu);

import React from "react";

import AppBar from "./AppBar";
import Drawer from "./Drawer";
import { MenuProvider } from "../Context/MenuContext";

export default function Menu() {
	return (
		<MenuProvider>
			<AppBar />
			<Drawer />
		</MenuProvider>
	);
}

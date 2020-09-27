import React, { memo, useContext } from "react";
import { Link } from "react-router-dom";

import { MenuContext } from "../../Context/MenuContext";

import {
	ListItem,
	ListItemIcon,
	ListItemText,
	Tooltip,
} from "@material-ui/core/";

const MyListItem = memo(({ menu }) => {
	const { open, handleDrawerClose } = useContext(MenuContext);
	return (
		<ListItem
			button
			component={Link}
			to={menu.path}
			onClick={() => (open ? handleDrawerClose() : "")}
		>
			<ListItemIcon aria-label={menu.nome}>{menu.icon}</ListItemIcon>
			<ListItemText primary={menu.nome} />
		</ListItem>
	);
});

const ListItemTooltip = memo(({ menu }) => {
	return (
		<Tooltip title={menu.nome}>
			<ListItem button component={Link} to={menu.path}>
				<ListItemIcon aria-label={menu.nome}>{menu.icon}</ListItemIcon>
				<ListItemText primary={menu.nome} />
			</ListItem>
		</Tooltip>
	);
});

export { MyListItem, ListItemTooltip };

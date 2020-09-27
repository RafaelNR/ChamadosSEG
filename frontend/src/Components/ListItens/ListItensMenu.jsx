import React, { Fragment } from "react";

import { List, Divider } from "@material-ui/core/";

import { MyListItem as ListItem, ListItemTooltip } from "./ListItemMenu";

import { adminMenu, defaultMenu } from "../../Store/Pages";

const listItemMenu = ({ open }) => {
	return (
		<>
			<List>
				{defaultMenu.map((menu, index) =>
					!open ? (
						<Fragment key={index}>
							<ListItemTooltip menu={menu} />
						</Fragment>
					) : (
						<Fragment key={index}>
							<ListItem menu={menu} />
						</Fragment>
					)
				)}
			</List>
			<Divider />
			<List>
				{adminMenu.map((menu, index) =>
					!open ? (
						<Fragment key={index}>
							<ListItemTooltip menu={menu} />
						</Fragment>
					) : (
						<Fragment key={index}>
							<ListItem menu={menu} />
						</Fragment>
					)
				)}
			</List>
		</>
	);
};

export default listItemMenu;

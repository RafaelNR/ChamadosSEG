import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { List, Divider } from "@material-ui/core/";
import { MyListItem as ListItem, ListItemTooltip } from "./ItemMenu";
import { adminMenu, analistaMenu, defaultMenu } from "../../Store/Pages";

import useUser from '../../Hooks/useUser';

const ListItemMenu = ({ open }) => {
	const { roleID } = useUser();

	return (
    <>
      <List>
        {defaultMenu.map((menu, index) =>
          !open ? (
            <Fragment key={index}>
              {menu.icon && <ListItemTooltip menu={menu} />}
            </Fragment>
          ) : (
            <Fragment key={index}>
              {menu.icon && <ListItem menu={menu} />}
            </Fragment>
          )
        )}
      </List>
      {/* <List>
        {roleID === 3 &&
          tecnicoMenu.map((menu, index) =>
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
      </List> */}
      {roleID <= 2 && <Divider />}
      <List>
        {roleID <= 2 &&
          analistaMenu.map((menu, index) =>
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
      {roleID === 1 && <Divider />}
      <List>
        {roleID === 1 &&
          adminMenu.map((menu, index) =>
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

ListItemMenu.propTypes = {
	open: PropTypes.bool.isRequired,
};

export default ListItemMenu;

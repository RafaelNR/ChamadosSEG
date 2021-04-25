import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import {
  EditButton,
  DeleteButton,
  DisabledButton,
  ActivedButton,
} from "../Buttons/Icons";

const Actions = (props) => {
  const { buttons } = props;

  const renderButtons = (props) => {

    return buttons.map((button, index) => {
      switch (button) {
        case "edit":
          return (
            <Grid item key={index}>
              <EditButton {...props} border={false} />
            </Grid>
          );

        case "delete":
          return (
            <Grid item key={index}>
              <DeleteButton {...props} border={false} />
            </Grid>
          );

        case "disable":
          return (
            <Grid item key={index}>
              {props.disabled === 0 ? (
                <ActivedButton {...props} border={false} />
              ) : (
                <DisabledButton {...props} border={false} />
              )}
            </Grid>
          );

        default:
          break;
      }
    });
  };

  return (
    <Grid container justify="center" spacing={0}>
      {renderButtons(props)}
    </Grid>
  );
};

Actions.propTypes = {
  props: PropTypes.object.isRequired,
};

Actions.defaultProps = {
  props: <p>Sem valor, pois carrega o ADD.</p>,
};

export default React.memo(Actions);

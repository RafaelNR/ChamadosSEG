import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core/";

//* Utils
import { handleDateTime } from "../../Utils/dates";

const useStyles = makeStyles((theme) => ({
  info: {
    fontSize: 13,
    color: theme.palette.text.info,
    fontWeight: "bold",
    "& > span": {
      fontWeight: "normal",
      paddingLeft: '5px'
    },
  },
}));

export default ({ info }) => {
  const classes = useStyles();
  return (
    <Grid container direction="row" justify="flex-start" alignItems="center">
      <Grid item md className={classes.grid}>
        <Typography display="block" className={classes.info}>
          Técnico:<span>{info["técnico"]}</span>
        </Typography>
      </Grid>
      <Grid item md className={classes.grid}>
        <Typography display="block" className={classes.info}>
          Ticket da Atividade:<span>{info.ticket}</span>
        </Typography>
      </Grid>
      <Grid item md className={classes.grid}>
        <Typography display="block" className={classes.info}>
          Ticket da Descrição:<span>{info.info_ticket}</span>
        </Typography>
      </Grid>
      <Grid item md className={classes.grid}>
        <Typography display="block" className={classes.info}>
          Última Alteração: 
          <span>
            {info.created_at === info.updated_at
              ? handleDateTime(info.created_at)
              : handleDateTime(info.updated_at)}
          </span>
        </Typography>
      </Grid>
    </Grid>
  );
};


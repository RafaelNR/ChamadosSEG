import React from "react";
import {
  makeStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import BoxInfo from "../Box/Info";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(1),
    "& .MuiAccordion-root": {
      borderLeft: `3px solid ${theme.palette.primary.light}`,
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  summary: {
    "& .MuiAccordionSummary-content": {
      width: "100%",
      margin: 0,
    },
  },
  details: {
    borderTop: `1px solid ${theme.palette.primary.light}`,
    padding: "15px",
  },
  button: {
    color: theme.palette.button.accordion,
    marginTop: "5px",
  },
}));

export default function AtividadesInfo({ info, children }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded && info ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={info && info.created_at && <ExpandMoreIcon className={classes.button} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.summary}
        >
          {children}
        </AccordionSummary>

        {info && info.created_at && (
            <AccordionDetails className={classes.details}>
              { expanded && <BoxInfo info={info} />}
            </AccordionDetails>
          )}
      </Accordion>
    </div>
  );
}

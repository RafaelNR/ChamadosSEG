import React from 'react';
import {
  makeStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(1),
    background: theme.darkMode ? '#777' : '#ddd',
    transition: '0.3s',
    borderRadius: 5,
    '&:hover': {
      background: theme.darkMode ? '#666' : '#ccc',
      transition: '0.3s'
    },
    '& .MuiPaper-root': {
      backgroundColor: 'transparent'
    },
    '& .MuiAccordionSummary-content': {
      display: 'block'
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  details: {
    marginTop: -6,
    background: theme.darkMode ? '#777' : '#ddd',
    padding: 10,
    transition: '0.3s'
  },
  button: {
    color: theme.palette.button.accordion,
    marginTop: '5px'
  }
}));


export default ({ chamado, children, className, Details }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded && chamado.id ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
        elevation={0}
      >
        <AccordionSummary
          expandIcon={chamado.id  && <ExpandMoreIcon className={classes.button} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={className}
        >
          {children}
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          {expanded && <Details chamado={chamado} /> }
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

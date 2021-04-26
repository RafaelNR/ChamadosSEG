import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: 10,
    '& .MuiAccordionSummary-root.Mui-expanded': {
      minHeight: 48,
      '& .MuiAccordionSummary-content.Mui-expanded': {
        margin: 0,
      }
    }
  },
  details:{
    display: 'block',
    borderTop: '1px solid #ddd'
  }
}));

export default ({ Clientes }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      {
        Clientes && Clientes.map(Cliente => {
          return (
            <Accordion key={Cliente.id} expanded={expanded === `${Cliente.nome_fantasia}`} onChange={handleChange(`${Cliente.nome_fantasia}`)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography>{Cliente.nome_fantasia}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <Typography><strong>Razão Social:</strong> {Cliente.razao_social}</Typography>
              <Typography><strong>CNPJ/CPF:</strong> {Cliente.cnpj_cpf}</Typography>
              <Typography><strong>Representante: </strong>{Cliente.representante}</Typography>
              <Typography><strong>Email:</strong> {Cliente.email}</Typography>
              <Typography><strong>Telefone: </strong> Telefone: {Cliente.telefone}</Typography>
              <Typography><strong></strong></Typography>
            </AccordionDetails>
          </Accordion>
          )
        })
      }
    </div>
  );
}

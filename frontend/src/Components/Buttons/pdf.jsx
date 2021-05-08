import React from 'react';
import PropTypes from "prop-types";
import { IconButton, Tooltip, CircularProgress, makeStyles } from "@material-ui/core";
import {
  PictureAsPdfSharp
} from "@material-ui/icons";

//* CONTEXT
import useSnackBar from "../../Context/SnackBarContext";

//* SERVICE
import { AtividadePDF } from "../../Service/atividade.service";

const useStyles = makeStyles((theme) => ({
  pdf: {
    fontSize: '18px',
    marginRight: 20,
    width: 50,
    height: 50
  }
}));

const PDFIconAtividade = ({ ticket, propsClass }) => {
  const classes = useStyles();
  const { handleSnackBar } = useSnackBar();
  const [link, setLink] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const handleClick = () => {
    setLoading(true);

    if (link) {
      return OpenLink();
    }

    AtividadePDF(ticket)
      .then((resp) => {
        if (resp.success) {
          setLink(resp.data.link);
          OpenLink(resp.data.link);
          return handleSnackBar({
            type: 'success',
            message: 'PDF gerado.'
          });
        }

        throw new Error('Error em gerar PDF.');
      })
      .catch((error) => {
        console.log(error);
        handleSnackBar({
          type: 'error',
          message:
          error && error.message ? error.message : `Erro em gerar o PDF.`
        });
      }).finally(() => {  
        setLoading(false);
      })
  }

  const OpenLink = (Link) => {
    return window.open(Link, '_blank');
  }

  return (
    <>
      {link ? (
        <IconButton
          className={propsClass ? propsClass : classes.pdf}
          onClick={OpenLink}
        >
          <Tooltip title="Gerar PDF">
            <PictureAsPdfSharp />
          </Tooltip>
        </IconButton>
      ) : (
        <IconButton
          className={propsClass ? propsClass : classes.pdf}
          onClick={handleClick}
        >
          <Tooltip title="Gerar PDF">
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <PictureAsPdfSharp/>
            )}
          </Tooltip>
        </IconButton>
      )}
    </>
  );
};

PDFIconAtividade.propTypes = {
  ticket: PropTypes.string.isRequired,
  propsClass: PropTypes.string,
};

export { 
  PDFIconAtividade
}
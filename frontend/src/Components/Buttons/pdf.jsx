import React from 'react';
import PropTypes from "prop-types";
import { IconButton, Tooltip, makeStyles } from "@material-ui/core";
import {
  PictureAsPdfSharp
} from "@material-ui/icons";

//* CONTEXT
import useSnackBar from "../../Context/SnackBarContext";

//* SERVICE
import { CreatedPDF } from "../../Service/atividade.service";

const useStyles = makeStyles((theme) => ({
  pdf: {
    fontSize: "18px",
    color: "blue",
    marginRight: 20,
    width: 50,
    height: 50
  }
}));



const PDFIconAtividade = ({ ticket }) => {
  const classes = useStyles();
  const { handleSnackBar } = useSnackBar();
  const [link, setLink] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const handleClick = async (e) => {
    setLoading(true);
    await CreatedPDF(ticket).then(resp => {
      window.open(resp.link, '_blank');
      setLink(resp.link);
      setLoading(false);
      handleSnackBar({
        type: "success",
        message: 'PDF gerado.'
      });
    }).catch((error) => {
      console.log(error)
      setLoading(false);
      handleSnackBar({
        type: "error",
        message: error ? error.message : `Erro em gerar o PDF`,
      });
    })
  }

  const OpenLink = () => {
    return window.open(link, '_blank');
  }

  return (
    <>
      { link ?
        (
          <IconButton className={classes.pdf} onClick={OpenLink}>
            <Tooltip title="PDF">
              <PictureAsPdfSharp className={classes.actived} />
            </Tooltip>
          </IconButton>
        )
        :
        (
          <IconButton className={classes.pdf} onClick={handleClick}>
            <Tooltip title="PDF">
              {
                loading ? <cr></cr> : <PictureAsPdfSharp className={classes.actived} />
              }
            </Tooltip>
          </IconButton>
        )
      }
    </>
  )
};



PDFIconAtividade.propTypes = {
  ticket: PropTypes.string.isRequired,
};

export { 
  PDFIconAtividade
}
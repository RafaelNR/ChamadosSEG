import React from 'react'
import { makeStyles, Chip, Avatar, Grid, Button } from '@material-ui/core/';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import InfoIcon from '@material-ui/icons/Info';
import FlagIcon from '@material-ui/icons/Flag';
import { ArrowIconTooltips } from '../../Components/ToolTip/index'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.boxhome
  },
  cell: {
    position: 'relative',
    border: '1px solid #c4d3da',
    background: theme.palette.background.boxhome,
    marginTop: 10
  },
  body: {
    padding: 16,
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1
  },
  header: {
    width: '100%',
    justifyContent: 'space-between',
    display: 'flex',
    alignitems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1
  },
  title: {
    width: 'calc(100% - 250px)',
    fontSize: 17,
    fontWeight: 600,
    color: '#273444',
    cursor: 'pointer',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    '& .rapper': {
      display: 'flex',
      width: '100%',
      '& span': {
        fontSize: 13,
        color: '#54677b',
        fontWeight: 600,
        lineHeight: 3
      }
    }
  },
  flags: {
    display: 'flex',
    flexDirection: 'column',
    '& .icons': {
      height: 30,
      display: 'flex',
      justifyContent: 'flex-end',
      '& .icon': {
        float: 'left',
        width: 24,
        height: 28,
        marginLeft: 8,
        textAlign: 'center',
        color: '#d5e0ed',
        fontSize: 16
      }
    },
    '& .atribuido': {
      fontSize: 12,
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: 10
    }
  }
}));

export default ({ Chamados }) => {
  const classes = useStyles();
  return (
    Chamados.map(chamado => {
      return (
        <div key={chamado.id} className={classes.cell}>
          <div className={classes.body}>
            <Grid container className={classes.header}>
              <Grid item xs={9} className={classes.title}>
                <span>
                  # {chamado.ticket} - {chamado.title}
                </span>
                <div className="rapper">
                  <span>
                    {chamado.cliente} / {chamado.categoria} / {chamado.subCategoria}
                  </span>
                </div>
              </Grid>
              <Grid item xs={3} className={classes.flags}>
                <div className="icons">
                  <ArrowIconTooltips title={chamado.prioridade ? 'Retirar urgência' : 'Adicionar urgência' }>
                    <Button
                      endIcon={
                        <FlagIcon
                          className="icon"
                          style={{
                            color: chamado.prioridade ? 'red' : '#d5e0ed'
                          }}
                        />
                      }
                    />
                  </ArrowIconTooltips>
                  <ArrowIconTooltips title="Não possui anexos">
                    <AttachFileIcon className="icon" />
                  </ArrowIconTooltips>
                  <ArrowIconTooltips title="Não possui interação">
                    <InfoIcon className="icon" />
                  </ArrowIconTooltips>
                  <ArrowIconTooltips title="Não possui pedido de aprovação">
                    <CheckCircleIcon className="icon" />
                  </ArrowIconTooltips>
                </div>
                <div className="atribuido">
                  <Chip
                    label={chamado.atribuido}
                    variant="outlined"
                    color="primary"
                    avatar={<Avatar src="/static/images/avatar/1.jpg" />}
                  />
                </div>
              </Grid>
            </Grid>
            <div className="chamados-content"></div>
          </div>
        </div>
      );
    })
  );
}
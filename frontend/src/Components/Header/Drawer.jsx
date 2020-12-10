import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  gridImg: {
    'display': 'flex',
    'justifyContent': 'flex-end',
    'alignItems': 'center',
      '& img': {
        width: 40,
        height: 40
      }
  },
  gridVersion: {
    display: 'flex',
    flexDirection: 'column',
    '& span': {
      color: theme.palette.grey[500],
      fontSize: 10
    }
  }

}));

const Header = () => {
  const classes = useStyles();
  
  return (
    <Grid container> 
      <Grid item md={9} className={classes.gridVersion}>
        <span>VF: 1.0 </span>
        <span>VB: 1.0 </span>
        <span>VDB: 1.0 </span>
      </Grid>
      <Grid item md={3} className={classes.gridImg}>
        <img
          alt="Logo"
          src="/static/logo.png"
        />
      </Grid>
    </Grid>
  )
}


export default Header
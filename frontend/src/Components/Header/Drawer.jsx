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
}));

const Header = () => {
  const classes = useStyles();
  
  return (
    <Grid container> 
      <Grid item md={3} className={classes.gridImg}>
      </Grid>
    </Grid>
  )
}


export default Header
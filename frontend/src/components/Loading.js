import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    margin: '0 auto',
    display: 'flex',
    justifContent: 'center',
    width: "10%"

  },
  child: {
    width: "50px",
    height: "50px",
    /* Center vertically */
    position: "absolute",
    top: "50%"
  
  }
}));

export  default function Loading(){
  const classes = useStyles();
  return (
    <div className={classes.root}>
        <div className={classes.child}>
            <CircularProgress color="secondary" />
        </div>
    </div>
  );
}

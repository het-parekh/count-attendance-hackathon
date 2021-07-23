
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({

    bgImage:{
      backgroundImage:`url("/images/desert_background.jpg")`,
      backgroundSize:"cover", 
      backgroundRepeat:"no-repeat",
      backgroundPosition:"center",
      height: '100vh'
    },

    heading:{
      fontSize:350,
      fontWeight:"bold",
      color:"#222",
      marginBottom:-80
    },
    subHeading:{
      fontSize:25,
      color:"#fff",
      fontStyle:"italic",
      fontWeight:500

    }
  }));


const PageNotFound = () =>{
    const classes = useStyles();
    return(
      <div className = {classes.bgImage}>
        <div className={classes.child}>
          <center>
            <div className = {classes.heading}>404</div>
            <span className={classes.subHeading}>Oops ! PAGE NOT FOUND.....<br /> 
            <Link to='/dashboard' style={{color:"#e0e0e0"}}>
              <Button style= {{width:200,fontWeight:"bold"}} variant="contained">RETURN HOME  </Button>
            </Link>  </span>
            </center>
        </div>
    </div>
    )
}
export default PageNotFound

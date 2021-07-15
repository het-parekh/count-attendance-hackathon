import React,{useEffect,useState} from 'react';
import { TextField,Button,MenuItem,IconButton ,Typography} from '@material-ui/core';
import { AppBar,Toolbar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {SystemUpdateAlt} from '@material-ui/icons';
import Collapse from '@material-ui/core/Collapse';
import  Paper  from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
    appBar_root: {
        width:"70%",
        marginTop:"30px",
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      }
}))

export default function Bill(){
    const classes = useStyles()
    
    const [bill,setBill] = useState({})
    const [showBillHistory, setShowBillHistory] = useState(false)

    useEffect(() => {
        //call to vendor for current month
        let data = [{vendor:"Sai Sai Services",invoice:[{names:["Ramesh","Suresh"],designation:"gunman",attednance:"20",base_cost:"200000",service_month:"may'21",extra_charges:"16000"}]}]
        setBill(data)
    },[])

    function toggleShowBillHistory(){
        setShowBillHistory(!showBillHistory);
      }

    return(
        <div align="center">
            <AppBar  className = {classes.appBar_root} position="static">
                <Toolbar>
                <Typography align="center" variant="h6" className={classes.title}>
                    View and Download Previous Bill Details <IconButton onClick={toggleShowBillHistory}>< SystemUpdateAlt style={{color:"white"}} /></IconButton>
                </Typography>
                </Toolbar>
            </AppBar> 
            <div>
                <Collapse  in={showBillHistory}>
                    <Paper>
                        <Typography align="center" variant="h6" className={classes.title}>
                            View and Download Previous Bill Details 
                        </Typography>
                    </Paper> 
                </Collapse>             
            </div>
        </div>
    );
}
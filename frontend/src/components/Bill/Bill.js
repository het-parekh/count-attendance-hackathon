import React, { useEffect, useState } from 'react';
import { TextField, Button, MenuItem, IconButton, Typography } from '@material-ui/core';
import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SystemUpdateAlt } from '@material-ui/icons';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
    appBar_root: {
        width: "70%",
        marginTop: "30px",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    }
}))

export default function Bill() {
    const classes = useStyles()

    const [bill, setBill] = useState({})
    const [showPreviousBillHistory, setShowPreviousBillHistory] = useState(false)
    const [showCurrentBillHistory, setShowCurrentBillHistory] = useState(false)

    useEffect(() => {
        //call to vendor for current month
        let data = [{ vendor: "Sai Sai Services", invoice: [{ names: ["Ramesh", "Suresh"], designation: "gunman", attednance: "20", base_cost: "200000", service_month: "may'21", extra_charges: "16000" }] }]
        setBill(data)
    }, [])

    function toggleShowCurrentBillHistory() {
        setShowCurrentBillHistory(!showCurrentBillHistory);
    }

    function toggleShowPreviousBillHistory() {
        setShowPreviousBillHistory(!showPreviousBillHistory);
    }

    return (
        <>
            <div align="center">
                <AppBar className={classes.appBar_root} position="static">
                    <Toolbar>
                        <Typography align="center" variant="h6" className={classes.title}>
                            View Current Month Bill Details <IconButton onClick={toggleShowCurrentBillHistory}>< SystemUpdateAlt style={{ color: "white" }} /></IconButton>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div>
                    <Collapse in={showCurrentBillHistory}>
                        <Paper>
                            <Typography align="center" variant="h6" className={classes.title}>
                                Current Month Detail is as follows
                            </Typography>
                        </Paper>
                    </Collapse>
                </div>
            </div>
            <div align="center">
                <AppBar className={classes.appBar_root} position="static">
                    <Toolbar>
                        <Typography align="center" variant="h6" className={classes.title}>
                            View Previous Months Bill Details <IconButton onClick={toggleShowPreviousBillHistory}>< SystemUpdateAlt style={{ color: "white" }} /></IconButton>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div>
                    <Collapse in={showPreviousBillHistory}>
                        <Paper>
                            <Typography align="center" variant="h6" className={classes.title}>
                                View and Download Previous Bill Details
                            </Typography>
                        </Paper>
                    </Collapse>
                </div>
            </div>
        </>
    );
}
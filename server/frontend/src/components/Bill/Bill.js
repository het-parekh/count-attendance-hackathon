import React, { useEffect, useState } from 'react';
import { TextField, Button, MenuItem, IconButton, Typography } from '@material-ui/core';
import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SystemUpdateAlt } from '@material-ui/icons';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@material-ui/data-grid'
import { v4 } from 'uuid'

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
    const [showCurrentBillHistory, setShowCurrentBillHistory] = useState(true)
    const [cols, setCols] = useState([{}])
    const [rows, setRows] = useState([{ id: -999 }])
    const [prevRows, setPrevRows] = useState([{ id: -9999 }])
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const TT1 = {
        T30s: ['April', 'June', 'September', 'November'],
        T31s: ['January', 'March', 'May', 'July', 'August', 'October', 'December'],
        T28s: ['February']
    }

    useEffect(() => {
        //call to vendor for current month
        // let data = [{ vendor: "Sai Sai Services", invoice: [{ names: ["Ramesh", "Suresh"], designation: "gunman", attednance: "20", base_cost: "200000", service_month: "may'21", extra_charges: "16000" }] }]
        const tcol = [
            {
                field: 'branch',
                headerName: 'Branch',
                width: 150
            },
            {
                field: 'hub',
                headerName: 'Hub',
                width: 150
            },
            {
                field: 'vendor',
                headerName: 'Vendor',
                width: 200
            },
            {
                field: 'invoice_no',
                headerName: 'Invoice No',
                width: 250
            },
            {
                field: 'service_month',
                headerName: 'Service Month',
                width: 170
            },
            {
                field: 'no_of_employees',
                headerName: 'No. of Employee',
                width: 200
            },
            {
                field: 'base_cost',
                headerName: 'Base Cost (\u20B9)',
                width: 200
            },
            {
                field: 'extra_charges',
                headerName: 'Extra Charges (\u20B9)',
                width: 200
            },
            {
                field: 'total_cost',
                headerName: 'Total Cost (\u20B9)',
                width: 200
            }
        ]
        setCols([...tcol])


        // Get Current Months Bill
        const today = new Date()
        let curMonth = today.getMonth() + 1
        let endDay
        if (TT1.T31s.includes(months[curMonth])) {
            endDay = 31
        } else if (TT1.T30s.includes(months[curMonth])) {
            endDay = 30
        } else {
            endDay = 28
        }
        if (curMonth < 10) {
            curMonth = "0" + curMonth
        }
        const start = today.getFullYear() + "-" + curMonth + "-01"
        const end = today.getFullYear() + "-" + curMonth + "-" + endDay
        console.log(start, end)

        axios.get('/bill/' + start + '/' + end)
            .then(res => {
                const trow = []
                console.log(res)
                res.data.forEach((r, i) => {
                    const obj = {
                        id: i,
                        branch: r.invoice.Branch,
                        hub: r.invoice.Hub,
                        vendor: r.Vendor_ref.vendor_name,
                        invoice_no: r.invoice._id,
                        service_month: months[r.service_month-1],
                        no_of_employees: r.number_of_employees.length,
                        base_cost: Math.round((r.base_cost + Number.EPSILON) * 100) / 100,
                        extra_charges: r.extra_charges,
                        total_cost: r.total_cost.toFixed(2),
                    }
                    trow.push(obj)
                })
                console.log(trow)
                // setBill(res.data)
                setRows([...trow])
            })

        // Get Previous Months Bill
        axios.get('/bill/previous')
            .then(res => {
                const trow = []
                console.log(res)
                if (res.data.length === 0) {
                    setPrevRows([...trow])
                } else {
                    res.data.forEach((r, i) => {
                        const obj = {
                            id: i,
                            branch: r.invoice.Branch,
                            hub: r.invoice.Hub,
                            vendor: r.Vendor_ref.vendor_name,
                            invoice_no: r.invoice._id,
                            service_month: months[r.service_month],
                            no_of_employees: r.number_of_employees.length,
                            base_cost: Math.round((r.base_cost + Number.EPSILON) * 100) / 100,
                            extra_charges: r.extra_charges,
                            total_cost: r.total_cost.toFixed(2),
                        }
                        trow.push(obj)
                    })
                    setPrevRows([...trow])
                }
            })
    }, [])

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }


    function toggleShowCurrentBillHistory() {
        setShowCurrentBillHistory(!showCurrentBillHistory);
        console.log(cols)
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
                    <Collapse in={showCurrentBillHistory} style={{ width: '100%', marginTop: '30px', boxSizing: 'border-box', padding: '10px' }}>
                        <DataGrid
                            rows={rows.length > 0 ? rows : null}
                            columns={cols}
                            components={{
                                Toolbar: CustomToolbar,
                            }}
                            autoHeight={true}
                            disableSelectionOnClick={true}
                            pageSize={5}
                            rowsPerPageOptions={[5, 10, 15]}
                        />
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
                    <Collapse in={showPreviousBillHistory} style={{ width: '100%', marginTop: '30px', boxSizing: 'border-box', padding: '10px' }}>
                        <DataGrid
                            rows={(prevRows && prevRows.length) > 0 ? prevRows : []}
                            columns={cols}
                            components={{
                                Toolbar: CustomToolbar,
                            }}
                            autoHeight={true}
                            disableSelectionOnClick={true}
                            pageSize={5}
                            rowsPerPageOptions={[5, 10, 15]}
                        />
                    </Collapse>
                </div>
            </div>
        </>
    );
}
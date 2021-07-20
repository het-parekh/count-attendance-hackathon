import React, { useEffect, useState } from 'react';
import { TextField, Button, MenuItem, IconButton, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { DataGrid,GridToolbarContainer,GridToolbarExport} from '@material-ui/data-grid';
import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Publish,GetApp,ViewList,ViewStream,StopOutlined } from '@material-ui/icons';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'
import Loading from '../Loading'
import {Chip,Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    appBar_root: {
        marginTop: "30px",
        marginLeft:10,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    paper:{
        // height:400,
        marginTop:0,
        overflow: 'auto',
        marginLeft:10,
    },
    viewButton:{
        
        border:"0.5px solid #222",
        borderRadius:0,
        margin:1,
        marginTop:10,
        marginBottom:20
    },
    selected:{
        backgroundColor:"#d9d9d9!important",
        fontWeight:"bold"
    },
    not_selected:{
        border:"0px solid #222",
        backgroundColor:"white!important",
    }

}))

export default function CheckAttedance() {
    const classes = useStyles()

    const [attendanceByInvoice,setAttendanceByInvoice] = useState({})
    const [rows,setRows] = useState({})
    const [cols,setCols] = useState([])
    const [rowsFull,setRowsFull] = useState([])
    const [colsFull,setColsFull] = useState([])
    const [view,setView] = useState('invoice')
    const [openInvoiceID,setOpenInvoiceID] = useState()

    useEffect(() => {
        let currentDate = new Date()
        let [month , year] = [currentDate.getMonth()+1,currentDate.getFullYear()]
        let numberOfDays = new Date(year, month, 0).getDate()
        let temp = []
        temp.push({"field":"name",headerName:"Name",width:150})
        temp.push({"field":"designation",headerName:"Designation",width:160})
        let month_long = currentDate.toLocaleString('default', { month: 'long' })
        for(let i = 1 ; i<=numberOfDays ; i++){
            let date = i.toString().length < 2?'0'+i:i
            let month_no = month.toString().length < 2?'0'+month:month

            temp.push({"field":`${year}-${month_no}-${date}`, 
                       "headerName":`${i} ${month_long}'${year.toString().slice(2,)} `,
                       width:130,
                       disableColumnMenu:true
                    })
        }
        setCols(temp)
        setColsFull([
            {field:"invoice_activity",headerName:"Invoice",width:150},
            {field:"region",headerName:"Region",width:150},
            {field:"branch",headerName:"Branch",width:150},
            {field:"hub",headerName:"Hub",width:150},
            ...temp
        ])
        //call to vendor for current month
         axios.get('/attendance/all')
         .then(res => {
            let  temp = {}
            res.data.forEach((Allattendance) => {
                Allattendance.attendances.forEach((attendance) => {
                    temp[attendance.invoice._id] = {...temp[attendance.invoice._id],"invoice_details":attendance.invoice,"open":false,[Allattendance.date]:{"present_employees":attendance.present_employee,"ot_hours":attendance.OT_hours}}
                })
            })
            setAttendanceByInvoice(temp)
         })
    }, [])

    useEffect(() => {
        let temp = []
        let manpowerNames = []
        let hide_cols = [...cols]
        let present_employees_arr = []
        if(Object.keys(attendanceByInvoice).length > 1 && attendanceByInvoice[openInvoiceID]){
            attendanceByInvoice[openInvoiceID].invoice_details.Manpower_Names.forEach((manpower,index) => {
                temp.push({id:"id"+openInvoiceID+index,name:manpower.name,designation:manpower.type})
                manpowerNames.push(manpower.name)
            })

            cols.forEach((col,index) => {
                let date_exists = attendanceByInvoice[openInvoiceID][col.field]?attendanceByInvoice[openInvoiceID][col.field]:false
                if(date_exists){
                    date_exists.present_employees.forEach(employee => {
                        present_employees_arr.push(employee.name)
                    })
                    manpowerNames.forEach((name,index) => {
                        temp[index] = present_employees_arr.includes(name)?{...temp[index],[col.field]:"P"}:{...temp[index],[col.field]:"A"}
                    })
                }
                else{
                    if(!['id','name','region','branch','hub','invoice_activity','designation'].includes(col.field))
                    manpowerNames.forEach((name,index) => {
                        temp[index] = {...temp[index],[col.field]:"N/A"}
                    })

                    if(!['name','designation'].includes(col.field)){
                        hide_cols[index] = {...hide_cols[index],hide:true}
                    }
                }
                console.log(temp,'mainnn')
            })
            setCols(hide_cols)
            setRows({...rows,[openInvoiceID]:temp})
            console.log(rows)
        }
    },[openInvoiceID])


    
    function toggleView(value){
        
        if (value==='invoice'){
            setView('invoice')
        }else{
            let allRows = []
            for (const invoice in attendanceByInvoice){
                let temp = []
                let manpowerNames = []
                let present_employees_arr = []
                attendanceByInvoice[invoice].invoice_details.Manpower_Names.forEach((manpower,index) => {
                    temp.push({
                            id:"id"+invoice+index,
                            invoice_activity:attendanceByInvoice[invoice].invoice_details.Activity,
                            region:attendanceByInvoice[invoice].invoice_details.Region ,
                            branch:attendanceByInvoice[invoice].invoice_details.Branch ,
                            hub:attendanceByInvoice[invoice].invoice_details.Hub ,
                            name:manpower.name,
                            designation:manpower.type,
                        })
                    manpowerNames.push(manpower.name)
                })
                colsFull.forEach((col) => { 
                    let date_exists = attendanceByInvoice[invoice][col.field]?attendanceByInvoice[invoice][col.field]:false
                    if(date_exists){
                        date_exists.present_employees.forEach(employee => {
                            present_employees_arr.push(employee.name)
                        })
                        manpowerNames.forEach((name,index) => {
                            temp[index] = present_employees_arr.includes(name)?{...temp[index],[col.field]:"P"}:{...temp[index],[col.field]:"A"}
                        })
                    }
                    else
                    {
                        if(!['id','name','region','branch','hub','invoice_activity','designation'].includes(col.field))
                        manpowerNames.forEach((name,index) => {
                            temp[index] = {...temp[index],[col.field]:"N/A"}
                        })
                    }
                })
                console.log(temp,'temppp')
                allRows.push(...temp)
        }
        setRowsFull(allRows)
        console.log("fullll",allRows)
            setView('full')

        }
    }

    function CustomToolbar() {
        return (
          <GridToolbarContainer>
            <GridToolbarExport />
          </GridToolbarContainer>
        );
      }      

    function toggleInvoice(e) {
        let index = e.currentTarget.name
        let copy = {...attendanceByInvoice}
        copy[index].open = !copy[index].open
        setAttendanceByInvoice(copy)
        setOpenInvoiceID(index)

    }
    var invoices_section = []

    if(view === 'invoice'){
        for(const invoice in attendanceByInvoice){
            invoices_section.push(
                <>
                <AppBar key={"appbar" + invoice} className={classes.appBar_root} position="static">
                    <Toolbar key={"toolbar" + invoice}>
                        <Typography key={"typo" + invoice} align="left" variant="h6" className={classes.title}>
                            {attendanceByInvoice[invoice].invoice_details.Activity} <IconButton name={invoice} onClick={toggleInvoice}>{attendanceByInvoice[invoice].open?<Publish style={{ color: "white" }} />:<GetApp style={{ color: "white" }} />}</IconButton>
                        </Typography>
                        <Chip
                            avatar={<Avatar>R</Avatar>}
                            label={attendanceByInvoice[invoice].invoice_details.Region}
                            style={{color:"black"}}
                        />
                        &nbsp;
                        <Chip
                            avatar={<Avatar>B</Avatar>}
                            label={attendanceByInvoice[invoice].invoice_details.Branch}
                            style={{color:"black"}}
                        />&nbsp;
                        <Chip
                            avatar={<Avatar>H</Avatar>}
                            label={attendanceByInvoice[invoice].invoice_details.Hub}
                            style={{color:"black"}}
                        />&nbsp;&nbsp;&nbsp;
                        
                        <Button name={invoice} edge="end" variant="contained"><StopOutlined style={{color:"red"}}/>&nbsp;Stop Tracking</Button>
                    </Toolbar>
                </AppBar>
                <div key={"temp" + invoice} >
                    <Collapse in={attendanceByInvoice[invoice].open} key={"collapse" + invoice}>
                        <Paper className={classes.paper} key={"ppr" + invoice}>
                            <DataGrid
                                key={"table"+invoice}
                                rows={rows[invoice]?rows[invoice]:[]}
                                columns={cols}
                                components={{
                                    Toolbar: CustomToolbar,
                                  }}
                                autoHeight = {true}
                                disableSelectionOnClick = {true}
                                pageSize={5}
                                rowsPerPageOptions={[5,10,15]}
                            />
                        </Paper>
                    </Collapse>
                    </div>
                </>
                )
            }
    }
    else{
        invoices_section.push(
            <>
                    <Paper className={classes.paper}>
                        <DataGrid
                            rows={rowsFull?rowsFull:[]}
                            columns={colsFull}
                            autoHeight = {true}
                            disableSelectionOnClick = {true}
                            components={{
                                Toolbar: CustomToolbar,
                              }}
                            pageSize = {25}
                            rowHeight = {40}
                            rowsPerPageOptions={[25,50,75,100,150,200,500]}
                        />
                    </Paper>
                </>
        )
    }
    
    return (
        <>
            <div style={{width:'100%'}}>
                <Button className={clsx(view=='invoice'?classes.selected:classes.not_selected,classes.viewButton)} onClick={() => toggleView('invoice')}>Invoice View<ViewStream /></Button>
                <Button className={clsx(view=='full'?classes.selected:classes.not_selected,classes.viewButton)} onClick={() => toggleView('full')}>Full View< ViewList/></Button>
            </div>
            <div align="left">
                {invoices_section}
            </div>
        </>
    );
}
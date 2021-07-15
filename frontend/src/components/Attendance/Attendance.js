import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import { FormControl, MenuItem } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Select } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import './Attendance.css'
import { v4 } from 'uuid'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "cornflowerblue",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: "90%",
    flexGrow: 1,
    backgroundColor: "#fafafa",
    boxShadow: "4px 2px 16px 2px rgba(0,0,0,.1)",
    border: "1px solid rgba(0,0,0,.1)",
    margin: "40px auto"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  checkColor: {
    color: "#1E6AE1 !important"
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



function Attendance() {



  const [allVendors, setAllVendors] = useState([{}])

  const [vendor, setVendor] = useState('')

  const [invoice, setInvoice] = useState([{}])
  const [filtered, setFiltered] = useState([{}])
  const [todayAttendance, setTodayAttendance] = useState([])
  const [selectVendor, setSelectVendor] = useState('')
  const [workingTime, setWorkingTime] = useState([{ inTime: '', outTime: '', otHours: 0, invoice: '' }])
  // const [outTime, setOutTime] = useState([])
  const [shouldFetchTodayAttendance, setShouldFetchTodayAttendance] = useState(false)
  const [otArr, setOtArr] = useState([])
  const [keepZero, setKeepZero] = useState(true)
  const [selectedManpower, setSelectedManpower] = useState([])
  const [invoiceIdArr, setInvoiceIdArr] = useState([])
  const [selectedInvoice, setSelectedInvoice] = useState([])
  const [updateAttendanceState, setUpdateAttendanceState] = useState(false)


  const classes = useStyles();

  useEffect(() => {
    axios.get('/invoice')
      .then(res => {
        console.log(res)
        let t = []
        let temp = []
        let selectMan = []
        res.data.forEach(d => {
          t.push({ ...d, isSelected: false })
          console.log(d._id, 'id se aaa')
          temp.push({ inTime: (d.inTime ? d.inTime : ''), outTime: (d.outTime ? d.outTime : ''), otHours: d.otHours ? d.otHours : 0, invoice: d._id })
          selectMan.push([])
        })
        setSelectedManpower([...selectMan])
        setWorkingTime([...temp])
        setInvoice([...t])
        setFiltered([...t])

        // const arr = Array(res.data.length).fill()
        // setOtArr(arr)
        // setInTime([...arr])
        // setOutTime([...arr])
      })
      .catch(err => {
        console.log(err)
      })
  }, [updateAttendanceState])

  useEffect(() => {
    axios.get('/attendance/' + (new Date().toISOString()).slice(0, 10))
      .then(res => {
        console.log(res)
        let tt = []
        let copy = [...workingTime]
        let copySelectedMan = [...selectedManpower]
        const todays = res.data[0].attendances.map((one) => {
          // console.log(workingTime, 'chekc kar raha hu')
          tt.push(one.invoice._id)
          for (let it in copy) {
            if (copy[it].invoice === one.invoice._id) {
              console.log(one.In_time, one.Out_Time, one.OT_hours)
              copy[it] = {
                ...copy[it], inTime: one.In_time, outTime: one.Out_time, otHours: one.OT_hours
              }
              copySelectedMan[it] = [...one.present_employee]

            }
          }
        })
        setSelectedManpower([...copySelectedMan])
        setWorkingTime([...copy])
        setTodayAttendance([...tt])

      })
      .catch(err => {
        console.log(err)
      })

  }, [filtered, updateAttendanceState])



  const searchHandler = (e) => {
    const keyString = e.target.value.toLowerCase().trim()
    const copy = [...invoice]
    const res = []
    console.log(copy)
    copy.forEach(c => {
      if ((c.vendorName).includes(keyString)) {
        res.push(c)
      }
    })
    setFiltered(res)
  }


  const timeHandler = (e, hours_per_day) => {

    const index = e.target.name.split('#')[1]
    const field = e.target.name.split('#')[0]
    const copy = [...workingTime]
    if (field === 'outTime') {
      let min = (+e.target.value.split(':')[1]) - (+copy[index].inTime.split(':')[1])
      let hrs = (+e.target.value.split(':')[0] === 0 ? 24 : +e.target.value.split(':')[0]) - (+copy[index].inTime.split(':')[0])
      if (hrs < 0) {
        copy[index] = { ...workingTime[index], outTime: '' }
        setWorkingTime([...copy])
        return
      }
      if (min < 0) {
        min = min + 60
        hrs--
      }
      console.log(min, hrs)
      if (hrs > hours_per_day || min > 0) {
        const minOt = +(min / 60).toFixed(2)
        const ot = +hrs + minOt
        const othours = (ot - hours_per_day).toFixed(2)
        copy[index] = { ...workingTime[index], [field]: e.target.value, outTime: e.target.value, otHours: othours }
      }
    }
    if (field === 'inTime') {

      copy[index] = { ...workingTime[index], [field]: e.target.value, inTime: e.target.value, outTime: '', otHours: 0 }
    }
    setWorkingTime([...copy])
  }


  const submitHandler = (e, id, working, manpowerOneArr) => {
    const data = {
      invoice: id,
      present_employee: [...manpowerOneArr],
      OT_hours: working.otHours,
      In_time: working.inTime,
      Out_time: working.outTime
    }
    console.log(data, 'submitted')
    axios.post('/attendance', { attendances: [data] })
      .then(res => {
        console.log(res.data, 'submitted')
        setUpdateAttendanceState(prevState => { return !prevState })
        alert('attendance updated')

      })
      .catch(err => {
        console.log(err)
      })
  }


  const manPowerSelectHanlder = (e, outerI) => {
    const namearr = e.target.name.split('#')
    let copy = [...selectedManpower]
    const ii = copy[outerI].indexOf(namearr[0])
    if (namearr[1] === "false") {
      copy[outerI].push(namearr[0])
      console.log(copy)
    } else {
      copy[outerI].splice(ii, 1)
      console.log(copy)
    }
    console.log(e.target.checked)
    setSelectedManpower([...copy])
    // console.log(selectedManpower, 'kya baat hai')
  }

  if (filtered.length > 0 && selectedManpower[0] != []) {
    return (

      <div>
        <Paper className={classes.root}>

          <InputBase
            className={classes.input}
            placeholder="Search By name or Id"
            inputProps={{ 'aria-label': 'Search By name or Id' }}
            onChange={searchHandler}
          />
          <IconButton className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>

        <TableContainer style={{ width: '90%', margin: 'auto', boxShadow: "4px 2px 16px 2px rgba(0,0,0,.1)", border: "1px solid rgba(0,0,0,.1)" }} component={Paper}>
          <Table >
            <TableHead>
              <TableRow>
                <StyledTableCell>Vendor Name</StyledTableCell>
                <StyledTableCell>designation</StyledTableCell>
                <StyledTableCell>Activity</StyledTableCell>
                <StyledTableCell>Employee Names</StyledTableCell>
                <StyledTableCell>Assigned Hours</StyledTableCell>
                <StyledTableCell>In Time</StyledTableCell>
                <StyledTableCell>Out Time</StyledTableCell>
                <StyledTableCell>OT hours</StyledTableCell>
                <StyledTableCell>Mark Attendance</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`
                return (

                  <StyledTableRow key={"row" + index}>
                    <StyledTableCell key={"someId" + index}>
                      {row._id}
                    </StyledTableCell>

                    <StyledTableCell key={"designation" + index}>
                      {row.Designation}
                    </StyledTableCell>
                    <StyledTableCell key={"activity" + index}>
                      {row.Activity}
                    </StyledTableCell>
                    <StyledTableCell key={"names" + index} style={{ display: 'flex', flexDirection: 'column' }} className="manpowerNames">
                      {row.Manpower_Names ? row.Manpower_Names.map((man, i) => (
                        <div style={{ display: 'flex', alignItems: 'center', height: '24px' }} key={"containManpower" + i}>
                          <Checkbox
                            key={"checkbox" + i}
                            checked={selectedManpower[index] ? selectedManpower[index].includes(man) : false}
                            classes={{ checked: classes.checkColor }}
                            inputProps={{ 'aria-labelledby': labelId }}
                            name={`${man}#${selectedManpower[index] ? selectedManpower[index].includes(man) : null}`}
                            disabled={todayAttendance.includes(row._id)}
                            onChange={(e) => manPowerSelectHanlder(e, index)}
                          />
                          <span key={"displayNames + i"} style={{ whiteSpace: 'nowrap' }}>{man}</span>
                        </div>
                      )) : ''}

                    </StyledTableCell>
                    <StyledTableCell key={"hoursperDay" + index}>
                      {row.Hours_per_day}
                    </StyledTableCell>

                    <StyledTableCell key={"Intimecell" + index}>
                      <input key={"Intime" + index} name={"inTime#" + index} className="timeHandle" type="time" onChange={(e) => { timeHandler(e, row.Hours_per_day) }} min="0" value={workingTime[index] ? workingTime[index].inTime : null} />
                    </StyledTableCell>
                    <StyledTableCell key={"outTimecell" + index}>
                      <input key={"OutTime" + index} name={"outTime#" + index} className="timeHandle" type="time" onChange={(e) => { timeHandler(e, row.Hours_per_day) }} min="0" value={workingTime[index] ? workingTime[index].outTime : null} disabled={workingTime[index] ? workingTime[index].inTime === '' : null} />
                    </StyledTableCell>
                    <StyledTableCell key={"othoursCell" + index}>
                      <input key={"othours" + index} className="otHours" type="number" min="0" value={workingTime[index] ? workingTime[index].otHours : null} readOnly />
                    </StyledTableCell>

                    <StyledTableCell key={"buttoncell" + index}>
                      <Button key={"button" + index} onClick={(e) => { submitHandler(e, row._id, workingTime[index], selectedManpower[index]) }} variant="contained" color="primary" disabled={(workingTime[index] && selectedManpower[index]) ? workingTime[index].inTime === '' || selectedManpower[index].length === 0 : false}>
                        {(todayAttendance.includes(row._id)) ? "Update Attendance" : "Mark Attendance"}
                      </Button>
                    </StyledTableCell>

                  </StyledTableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div >
    )
  }
  else {
    return <h1>Loading...</h1>
  }
}

export default Attendance

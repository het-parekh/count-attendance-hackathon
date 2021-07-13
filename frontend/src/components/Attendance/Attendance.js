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




function Attendance() {

  let vendors = [
    {
      id: "aku",
      name: "Akash Yadav",
    },
    {
      id: "daksss",
      name: "Dakshit Vaviya",
    },
    {
      id: "hetzzz",
      name: "Het Parekh",
    },
    {
      id: "somesssss",
      name: "Some Random",
    },
    {
      id: "otherssss",
      name: "Other Random",
    }
  ]

  let manPower = [
    {
      id: 'aku',
      designation: 'some designation',
      workingHours: 'some hours',
      inTime: '',
      outTime: '',
      otHours: ''
    },
    {
      id: 'aku',
      designation: 'some designation',
      workingHours: 'some hours',
      inTime: '',
      outTime: '',
      otHours: ''
    },
    {
      id: 'daksss',
      designation: 'some designation',
      workingHours: 'some hours',
      inTime: '',
      outTime: '',
      otHours: ''
    },
    {
      id: 'daksss',
      designation: 'some designation',
      workingHours: 'some hours',
      inTime: '',
      outTime: '',
      otHours: ''
    },
    {
      id: 'hetzzz',
      designation: 'some designation',
      workingHours: 'some hours',
      inTime: '',
      outTime: '',
      otHours: ''
    },
    {
      id: 'hetzzz',
      designation: 'some designation',
      workingHours: 'some hours',
      inTime: '',
      outTime: '',
      otHours: ''
    },
    {
      id: 'somesssss',
      designation: 'some designation',
      workingHours: 'some hours',
      inTime: '',
      outTime: '',
      otHours: ''
    },
    {
      id: 'somesssss',
      designation: 'some designation',
      workingHours: 'some hours',
      inTime: '',
      outTime: '',
      otHours: ''
    },
    {
      id: 'otherssss',
      designation: 'some designation',
      workingHours: 'some hours',
      inTime: '',
      outTime: '',
      otHours: ''
    }
  ]

  const [allVendors, setAllVendors] = useState([...vendors])

  const [vendor, setVendor] = useState('')

  const [manpower, setManpower] = useState([{}])
  const [filtered, setFiltered] = useState([{}])
  const [todayAttendance, setTodayAttendance] = useState([])
  const [selectVendor, setSelectVendor] = useState('')
  const [inTime, setInTime] = useState([])
  const [outTime, setOutTime] = useState([])
  const [shouldFetchTodayAttendance, setShouldFetchTodayAttendance] = useState(false)
  const [otArr, setOtArr] = useState([])
  const [keepZero, setKeepZero] = useState(true)

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

  const classes = useStyles();

  useEffect(() => {
    axios.get('/manpower')
      .then(res => {
        console.log(res)
        const t = []
        res.data.forEach(d => {
          t.push({ ...d, isSelected: false, otHours: 0 })
        })
        setManpower([...t])
        setFiltered([...t])
        const arr = Array(res.data.length).fill()
        setOtArr(arr)
        setInTime([...arr])
        setOutTime([...arr])
      })
      .catch(err => {
        console.log(err)
      })

  }, [])

  useEffect(() => {
    axios.get('/attendance/' + (new Date().toISOString()).slice(0, 10))
      .then(res => {
        console.log('all attend', res.data[0])
        if (res.data[0]) {
          const temp = res.data[0].attendances.map((one) => {
            return one.manpower._id
          })
          console.log(temp)
          setTodayAttendance([...temp])
        }
      })
      .catch(err => {
        console.log(err)
      })
  }, [shouldFetchTodayAttendance])



  // console.log(manpowerObj, 'and i am so busy ')
  console.log(manpower)

  const searchHandler = (e) => {
    const keyString = e.target.value.toLowerCase().trim()
    const copy = [...manpower]
    const res = []
    copy.forEach(c => {
      if ((c.first_name.toLowerCase() + " " + c.last_name.toLowerCase()).includes(keyString)) {
        res.push(c)
        console.log('its working')
      }
    })
    console.log(res, 'heckdfjkf')
    setFiltered(res)
  }

  const checkboxHandler = (e, row) => {
    const i = filtered.indexOf(row)
    const copy = [...filtered]
    copy[i].isSelected = !copy[i].isSelected
    setFiltered([...copy])
  }


  const inTimeHandler = (e, i) => {
    console.log(inTime, outTime)
    // e.preventDefault()
    const copy = [...inTime]
    copy[i] = e.target.value
    console.log(copy)
    setInTime(copy)

  }
  const outTimeHandler = (e, i) => {
    const copy = [...outTime]
    copy[i] = e.target.value
    setOutTime([...copy])
  }


  const submitHandler = (e, row, i, ot) => {
    if (todayAttendance && todayAttendance.includes(row._id)) {
      axios.post('/attendance/' + row._id, { manpower: row._id, OT_hours: ot, date: new Date().toISOString().slice(0, 10) })
        .then(res => {
          console.log(res)
          setFiltered(prevState => {
            return prevState.map((s, index) => {
              if (i === index) {
                return { ...s, isSelected: false }
              } else {
                return s
              }
            })
          })
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      axios.post('/attendance/', { attendances: [{ manpower: row._id, OT_hours: ot }] })
        .then(res => {
          console.log(res)
          setFiltered(prevState => {
            return prevState.map((s, index) => {
              if (i === index) {
                return { ...s, isSelected: false }
              } else {
                return s
              }
            })
          })
          setShouldFetchTodayAttendance(prev => !prev)
        })
        .catch(err => {
          console.log(err)
        })
    }
    // console.log(obj)
  }

  const selectChangeHandler = (e) => {
    setVendor(e.target.value)
  }

  const otHoursHandler = (e, i) => {
    const t = [...otArr]
    t[i] = e.target.value
    if (t[i] > 16) {
      t[i] = 0
    }
    setOtArr([...t])
    setKeepZero(false)
    console.log(t, 'dfadfadf')
  }

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
      {/* <FormControl style={{ marginLeft: '5%', marginBottom: '10px', width: '200px' }}>
        <InputLabel id="vendor-label">Vendor</InputLabel>
        <Select
          labelId="vendor-label"
          value={vendor}
          onChange={selectChangeHandler}
          MenuProps={MenuProps}
        >
          <MenuItem key="all" value="all">
            All
          </MenuItem>
          {allVendors.map(vendor => (
            <MenuItem key={vendor} value={vendor}>
              {vendor}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
      <TableContainer style={{ width: '90%', margin: 'auto', boxShadow: "4px 2px 16px 2px rgba(0,0,0,.1)", border: "1px solid rgba(0,0,0,.1)" }} component={Paper}>
        <Table >
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>

              <StyledTableCell>Invoice Id</StyledTableCell>
              <StyledTableCell>designation</StyledTableCell>
              <StyledTableCell>working hours</StyledTableCell>
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
                  <StyledTableCell key={'checkboxCell' + index}>
                    <Checkbox
                      key={"checkbox" + index}
                      checked={row.isSelected || todayAttendance.includes(row._id)}
                      classes={{ checked: classes.checkColor }}
                      inputProps={{ 'aria-labelledby': labelId }}
                      onChange={(e) => checkboxHandler(e, row)}
                    />
                  </StyledTableCell>
                  <StyledTableCell key={"someId" + index}>
                    {/* {row.first_name + " " + row.last_name} */}
                    Some Id
                  </StyledTableCell>

                  <StyledTableCell key={"designation" + index}>
                    {/* {row.catagory} */}
                    Some Designation
                  </StyledTableCell>
                  <StyledTableCell key={"hoursperDay" + index}>
                    Some Hours
                  </StyledTableCell>

                  <StyledTableCell key={"Intimecell" + index}>
                    <input key={"Intime" + index} className="otHours" type="text" onChange={(e) => { inTimeHandler(e, index) }} min="0" value={inTime[index]} />
                  </StyledTableCell>
                  <StyledTableCell key={"outTimecell" + index}>
                    <input key={"OutTime" + index} className="otHours" type="text" onChange={(e) => { outTimeHandler(e, index) }} min="0" value={outTime[index]} />
                  </StyledTableCell>
                  <StyledTableCell key={"othoursCell" + index}>
                    <input key={"othours" + index} className="otHours" type="number" min="0" value={keepZero ? 0 : otArr[index]} readOnly />
                  </StyledTableCell>

                  <StyledTableCell key={"buttoncell" + index}>
                    <Button key={"button" + index} onClick={(e) => { submitHandler(e, row, index, row.otHours) }} variant="contained" color="primary" disabled={!row.isSelected}>
                      {todayAttendance.includes(row._id) ? "Update Attendance" : "Mark Attendance"}
                    </Button>
                  </StyledTableCell>

                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Attendance

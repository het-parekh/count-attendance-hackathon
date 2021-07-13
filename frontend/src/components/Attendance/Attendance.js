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
  const [workingTime, setWorkingTime] = useState([{ inTime: '', outTime: '', otHours: '' }])
  // const [outTime, setOutTime] = useState([])
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
        let temp = []
        res.data.forEach(d => {
          t.push({ ...d, isSelected: false })
          temp.push({ inTime: (d.inTime ? d.inTime : ''), outTime: (d.outTime ? d.outTime : '') })
        })
        setWorkingTime([...temp])
        setManpower([...t])
        setFiltered([...t])

        // const arr = Array(res.data.length).fill()
        // setOtArr(arr)
        // setInTime([...arr])
        // setOutTime([...arr])
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


  const timeHandler = (e) => {
    const index = e.target.name.split('#')[1]
    const field = e.target.name.split('#')[0]
    const copy = [...workingTime]
    copy[index] = { ...workingTime[index], [field]: e.target.value }
    setWorkingTime([...copy])
    console.log(copy, 'fadkfjadskfjadsfjk')
  }
  // const outTimeHandler = (e, i) => {

  // }


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
                
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Attendance

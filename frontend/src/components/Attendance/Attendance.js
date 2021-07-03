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
import Icon from '@material-ui/core/Icon';




function Attendance() {

  const [manpower, setManpower] = useState([{}])
  const [filtered, setFiltered] = useState([{}])
  const [todayAttendance, setTodayAttendance] = useState([])

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
      width: "",
      flexGrow: 1,
      backgroundColor: "#fafafa",
      boxShadow: "4px 2px 16px 2px rgba(0,0,0,.1)",
      marginTop: "16px",
      border: "1px solid rgba(0,0,0,.1)"
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
  }, [filtered])



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
    console.log(todayAttendance)
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
        })
        .catch(err => {
          console.log(err)
        })
    }
    // console.log(obj)
  }

  const otHoursHandler = (e, i) => {
    e.preventDefault()
    console.log(e.target.value, i)
    const copy = [...filtered]
    copy[i].otHours = e.target.value
    console.log(copy, 'akdfjakdfj', copy[i].otHours)
    setFiltered([...copy])
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
      <TableContainer component={Paper}>
        <Table >
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>

              <StyledTableCell>Full Name</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>OT Hours</StyledTableCell>
              <StyledTableCell>Mark Attendance</StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`
              console.log(row.isSelected)
              return (
                <StyledTableRow key={row._id}>
                  <StyledTableCell>
                    <Checkbox
                      checked={row.isSelected}
                      classes={{ checked: classes.checkColor }}
                      inputProps={{ 'aria-labelledby': labelId }}
                      onChange={(e) => checkboxHandler(e, row)}
                    />
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.first_name + " " + row.last_name}
                  </StyledTableCell>

                  <StyledTableCell>{row.catagory}</StyledTableCell>

                  <StyledTableCell>
                    <input className="otHours" type="number" onChange={(e) => { otHoursHandler(e, index) }} min="0" value={row.otHours} />
                  </StyledTableCell>

                  <StyledTableCell>
                    <Button onClick={(e) => { submitHandler(e, row, index, row.otHours) }} variant="contained" color="primary" disabled={!row.isSelected}>
                      Mark Attendance
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

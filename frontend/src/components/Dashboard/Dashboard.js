import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Grid from '@material-ui/core/Grid';
import DescriptionIcon from '@material-ui/icons/Description';
import { Pie, Bar } from "react-chartjs-2";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios'
import Loading from '../Loading';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: "linear-gradient(to right,#00ccff,#1a75ff)",
    // marginTop: "-60px!important"
  },
  grid: {
    padding: 80
  },
  card: {
    maxWidth: 310,
    padding: theme.spacing(2),
  },
  pieCard: {
    maxWidth: 500,
    height: 400,
    marginTop: -125,
    color: "white",
    backgroundImage: 'linear-gradient(to left,#000066,#000033)'
  },
  barCard: {
    marginTop: -125,
    height: 400,
    maxWidth:750
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
    borderColor: "white",
    paddingRight: "50px"
  },
  Select: {
    backgroundImage: "linear-gradient(to left,#000066,#000033)",
    '&:before': {
      borderColor: 'white',
    },
    '&:after': {
      borderColor: 'white',
    },
  },
  icon: {
    fill: 'white',
  },
  selectInput: {
    color: "white"
  },
  options: {
    color: "black!important"
  },
  selectEmpty: {
    marginTop: theme.spacing(-1),
  },
  wrapIcon: {
    display: 'flex',
    justifyContent: 'space-between',

  },
  storeIcon: {
    backgroundColor: "#ff3333",
    borderRadius: '50%',
    height: 45,
    width: 45,
    '&:hover': {
      backgroundColor: '#ff3333'
    },

    border: "none",

  },
  content: {
    height: 200,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1
  },
  navbar: {
    backgroundColor: "transparent",
    boxShadow: "none"
  },
  selected: {
    borderRadius: 0,
    color: "black",
    backgroundColor: "white",
    padding: 1.5,
    fontWeight: "bold",
    borderRight: "1px solid black",
    "&:hover": {
      backgroundColor: "white",
      color: "black",

    }
  },
  notSelected: {
    borderRight: "1px solid black",
    borderRadius: 0,
    color: "white",
    backgroundColor: "transparent",
    padding: 1.5,
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    }
  }
}))


  const Dashboard = () => {
      const classes = useStyles();
      const [toggleTime,setToggleTime] = useState('today')
      const [toggleSelectWorkforce,setToggleSelectWorkforce] = useState("Gunman")
      const [toggleSelectYear,setToggleSelectYear] = useState((new Date()).getFullYear())
      const [dailyAttendance,setDailyAttendance] = useState({Gunman:0,Driver:0,Vehicle:0,initial : false})
      const [monthlyAttendance,setMonthlyAttendance] = useState({Gunman:0,Driver:0,Vehicle:0  })
      const [totalDailyAttendance,setTotalDailyAttendance] = useState({Gunman:0,Driver:0,Vehicle:0,initial : false})
      const [totalMonthlyAttendance,setTotalMonthlyAttendance] = useState({Gunman:0,Driver:0,Vehicle:0})
      const [pie,setPie] = useState()
      const [budgets,setBudgets] = useState({
        labels:['Jan','Feb','March','April','May','June','July',"Aug","Sept","Oct","Nov","Dec"],
        datasets:[{label:"Annual Budget Summary",data:[160,200,100,100,130,110,200,200,100,130,200,150],backgroundColor:Array(12).fill("#4d0000")}]
    })

  useEffect(() => {
    axios.get('invoice')
      .then(res => {
        let daily_count = { ...totalDailyAttendance }
        let monthly_count = { ...totalMonthlyAttendance }
        res.data.forEach(invoice => {
          let temp = 0
          temp = new Date().getDate() - Number(invoice.createdAt.split(/[T ||-]/)[2])

          invoice.Manpower_Names.forEach((manpower) => {
            daily_count[manpower.type] += 1
            monthly_count[manpower.type] += temp

          })
          daily_count.initial = true
          setTotalMonthlyAttendance(monthly_count)
          setTotalDailyAttendance(daily_count)
        })
        setTotalMonthlyAttendance(monthly_count)
        setTotalDailyAttendance(daily_count)
      })

    axios.get('attendance/' + new Date().toISOString().slice(0, 10))
      .then(res => {

        let copy = { ...dailyAttendance }
        res.data.forEach((day) => {
          day.attendances.forEach((manpower) => {
            manpower.present_employee.forEach((present) => {
              copy[present.type] += 1
            })
          })
          
          
        })
        copy.initial = true
        setDailyAttendance(copy)
      })
      let date = new Date()
      let start_date = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().slice(0, 10)
      let end_date =  date.toISOString().slice(0, 10)
      axios.get(`attendance/${start_date}/${end_date}`)
        .then(res => {
          let copy = { ...monthlyAttendance }
          res.data.forEach((day) => {
            day.attendances.forEach(manpower => {
              manpower.present_employee.forEach((present) => {
                copy[present.type] += 1
              })
            })
            setMonthlyAttendance(copy)
          })
          setMonthlyAttendance(copy)
        })

    },[])
    
      useEffect(() => {
        axios.get('/bill/all')
        .then((res) => {
          let copy = {...budgets}
          res.data.forEach((bill) =>{
            let [year,month] = [bill.createdAt.split("-")[0],bill.createdAt.split("-")[1]]
            if(Number(year) === Number(toggleSelectYear)){
              copy.datasets[0].data[Number(month)-1] = bill.total_cost
            }
          })
          setBudgets(copy)
        })
  }, [toggleSelectYear])

      useEffect(() => {
        setPie({labels:['Attended','Not Attended'],datasets:[{data:[dailyAttendance.Gunman,totalDailyAttendance.Gunman - dailyAttendance.Gunman],backgroundColor:["#8cff1a","#ff4d4d"],borderColor:["#8cff1a","#ff4d4d"]}],})
      },[totalDailyAttendance,dailyAttendance])

      function OnToggleTime(val){
        val == 'today'?setToggleTime("today"):setToggleTime("month")
        if (val === 'today'){
          let copy = {...pie}
          copy.datasets[0].data = [dailyAttendance[toggleSelectWorkforce] , totalDailyAttendance[toggleSelectWorkforce] - dailyAttendance[toggleSelectWorkforce]] 
          setPie(copy)
          setToggleTime("today")
        }else{
          let copy = {...pie}
          copy.datasets[0].data = [monthlyAttendance[toggleSelectWorkforce] , totalMonthlyAttendance[toggleSelectWorkforce]] 
          setPie(copy)
          setToggleTime("month")
        }
      }

      const handleChangeWorkforce = (event) => {
        setToggleSelectWorkforce(event.target.value);
        let copy = {...pie}
        if(toggleTime === 'today'){
          copy.datasets[0].data = [dailyAttendance[event.target.value] , totalDailyAttendance[event.target.value] - dailyAttendance[event.target.value]] 
          setPie(copy)
        }else{
          copy.datasets[0].data = [monthlyAttendance[event.target.value] , totalMonthlyAttendance[event.target.value]] 
          setPie(copy)
        }

  };

      const handleChangeYear = (event) => {
        setToggleSelectYear(event.target.value);
      };
      if(!dailyAttendance.initial || !monthlyAttendance || !pie || !totalDailyAttendance.initial || !monthlyAttendance ||!budgets || !toggleSelectYear){
        return <Loading />
      }
      return(
        <div >
         <div className={classes.root}>
        {/* Grid */}

        <Grid className={classes.grid} container spacing={3}>

          <Grid item xs={4}>
            <Card className={classes.card}>
              <CardContent >
                <Typography className={classes.wrapIcon} variant="h6" component="h3">
                  Mark Attendance <button className={classes.storeIcon}><EventOutlinedIcon style={{ color: "white" }} /></button>
                </Typography>

                <Typography style={{ width: "200px" }} variant="body2" component="p">
                  Here you can mark every indivisual Gunman,driver or vehicle's attendance or update it.
                </Typography>
              </CardContent>
              <CardActionArea>
                <Link to='/attendance' style={{ color: "#e0e0e0" }}>
                  <Button style={{ width: 100, fontWeight: "bold", float: "right" }} color="primary" variant="outlined">GO  </Button>
                </Link>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Card className={classes.card}>
              <CardContent >
                <Typography className={classes.wrapIcon} variant="h6" component="h3">
                  Create New Vendor <button style={{ backgroundColor: "#ff751a" }} className={classes.storeIcon}><AssignmentIndIcon style={{ color: "white" }} /></button>
                </Typography>

                <Typography style={{ width: "200px" }} variant="body2" component="p">
                  Here you can create new vendor and add their respective SLA's
                  <br />
                  <br />
                </Typography>
              </CardContent>
              <CardActionArea>
                <Link to='/createvendor' style={{ color: "#e0e0e0" }}>
                  <Button style={{ width: 100, fontWeight: "bold", float: "right" }} color="primary" variant="outlined">GO  </Button>
                </Link>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Card className={classes.card}>
              <CardContent >
                <Typography className={classes.wrapIcon} variant="h6" component="h3">
                  Bill History <button style={{ backgroundColor: "#660066" }} className={classes.storeIcon}><DescriptionIcon style={{ color: "white" }} /></button>
                </Typography>

                <Typography style={{ width: "230px" }} variant="body2" component="p">
                  Here you can get all the previous bills and also get the latest month's bill.
                  The bill is generated on the 2nd of every month.
                </Typography>
              </CardContent>
              <CardActionArea>
                <Link to='/billdetails' style={{ color: "#e0e0e0" }}>
                  <Button style={{ width: 100, fontWeight: "bold", float: "right" }} color="primary" variant="outlined">GO  </Button>
                </Link>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </div>
      <Grid className={classes.grid} container spacing={1}>
        <Grid item xs={4}>
          <Card className={classes.pieCard}>
            <CardContent>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel style={{ "color": "#9999ff" }} htmlFor="filled-age-native-simple">Workforce</InputLabel>
                <Select
                  native
                  className={classes.Select}
                  value={toggleSelectWorkforce}
                  onChange={handleChangeWorkforce}
                  inputProps={{
                    classes: {
                      icon: classes.icon,
                      select: classes.selectInput,
                    },
                    name: 'Workforce',
                    id: 'filled-age-native-simple',
                  }}
                >
                  <option className={classes.options} value={'Gunman'}>Gunmen</option>
                  <option className={classes.options} value={'Driver'}>Drivers</option>
                  <option className={classes.options} value={'Vehicle'}>Vehicles</option>
                </Select>
              </FormControl>
              <Button onClick={() => OnToggleTime("today")} className={toggleTime === 'today' ? classes.selected : classes.notSelected} variant="outlined">Today</Button>
              <Button onClick={() => OnToggleTime("month")} className={toggleTime === 'month' ? classes.selected : classes.notSelected} variant="outlined">Month</Button>
              <div style={{ paddingTop: "20px" }}>
                <Link to='/checkattendance'><Pie style={{ cursor: "pointer" }} width={"250px"} height={"250px"} data={pie} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: "white" } } } }} /></Link>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card className={classes.barCard}>
            <CardContent>
              <FormControl className={classes.formControl}>
                <Select
                  value={toggleSelectYear}
                  onChange={handleChangeYear}
                  displayEmpty
                  className={classes.selectEmpty}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value={2021}>2021</MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2019}>2019</MenuItem>
                </Select>
              </FormControl>
              <Bar height={"315px"} width={"700px"} data={budgets} options={{ responsive: true, maintainAspectRatio: true }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard
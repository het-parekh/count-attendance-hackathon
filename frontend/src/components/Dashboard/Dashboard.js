import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Grid from '@material-ui/core/Grid';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DescriptionIcon from '@material-ui/icons/Description';
import { Pie,Bar } from "react-chartjs-2";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
    root:{
      backgroundImage:"linear-gradient(to right,#00ccff,#1a75ff)"
    },
    grid:{
      padding:80
    },
    card: {
      maxWidth: 310,
      padding: theme.spacing(2),
    },
    pieCard:{
      maxWidth: 500,
      height:400,
      marginTop:-125,
      color:"white",
      backgroundImage:'linear-gradient(to left,#000066,#000033)'
    },
    barCard:{
      marginTop:-125,
      height:400,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 160,
      borderColor:"white",
      paddingRight:"50px"
    },
    Select:{
      backgroundImage:"linear-gradient(to left,#000066,#000033)",
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
    selectInput:{
      color:"white"
    },
    options:{
      color:"black!important"
    },
    selectEmpty: {
      marginTop: theme.spacing(-1),
    },
    wrapIcon: {
      display: 'flex',
      justifyContent: 'space-between',

    },
    storeIcon:{
      backgroundColor:"#ff3333",
      borderRadius:'50%',
      height:45,
      width:45,
      '&:hover':{
        backgroundColor:'#ff3333'
      },
 
      border:"none",

    },
    content:{
      height:200,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title:{
        flexGrow:1      
    },
    navbar:{
      backgroundColor:"transparent",
      boxShadow:"none"
    },
    selected:{
      borderRadius:0,
      color:"black",
      backgroundColor:"white",
      padding:1.5,
      fontWeight:"bold",
      borderRight:"1px solid black",
      "&:hover":{
        backgroundColor:"white",
        color:"black",
        
      }
    },
    notSelected:{
      borderRight:"1px solid black",
      borderRadius:0,
      color:"white",
      backgroundColor:"transparent",
      padding:1.5,
      fontWeight:"bold",
      "&:hover":{
        backgroundColor:"white",
        color:"black",
      }
    }

    
  }))

  const Dashboard = () => {
      const classes = useStyles();
      const [toggleTime,setToggleTime] = useState(true)
      const [toggleSelectWorkforce,setToggleSelectWorkforce] = useState("Gunmen")
      const [toggleSelectYear,setToggleSelectYear] = useState("2021")

      const pie_gunmen = {
        labels:['Attended','Not Attended'],
        datasets:[{data:[150,30],backgroundColor:["#8cff1a","#ff4d4d"],borderColor:["#8cff1a","#ff4d4d"]}],
      }
      const budgets = {
          labels:['Jan','Feb','March','April','May','June','July',"Aug","Sept","Oct","Nov","Dec"],
          datasets:[{label:"Annual Budget Summary",data:[50000,70000,67343,90909,40000,77000,100000,60000,89999,10002,50000,90000],backgroundColor:Array(12).fill("#4d0000")}]
      }
      const bar_opts = {}
      const pie_drivers = useState()
      const pie_vehicles = useState()

      function OnToggleTime(val){
        val == 'today'?setToggleTime(true):setToggleTime(false)
      }

      const handleChangeWorkforce = (event) => {
        setToggleSelectWorkforce(event.target.value);
      };

      const handleChangeYear = (event) => {
        setToggleSelectYear(event.target.value);
      };
    
      return(
        <div >
         <div className={classes.root}>
          {/* Navbar */}
            <AppBar className={classes.navbar} position="static" >
              <Toolbar >
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="open drawer"
                >
                  <MenuIcon />
                </IconButton>
                <Typography className={classes.title} variant="h6" noWrap>
                  Dashboard
                </Typography>
                <Typography   variant="h6" noWrap>
                  Logout
                </Typography>
                <IconButton  variant="h6" color="inherit">
                < ExitToAppIcon/>
                </IconButton>
              </Toolbar>
          </AppBar>
        {/* Grid */}
        
        <Grid className={classes.grid} container spacing={3}>
        
          <Grid item xs={4}>
            <Card className = {classes.card}>
                  <CardContent >
                  <Typography  className = {classes.wrapIcon} variant="h6" component="h3">
                  Mark Attendance <button className={classes.storeIcon}><EventOutlinedIcon style={{color:"white"}} /></button>
                  </Typography>

                  <Typography style={{width:"200px"}} variant="body2" component="p">
                    Here you can mark every indivisual gunmen,driver or vehicle's attendance or update it.
                  </Typography>
                  </CardContent>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Card className = {classes.card}>
                  <CardContent >
                  <Typography  className = {classes.wrapIcon} variant="h6" component="h3">
                  View Profile <button style={{backgroundColor:"#ff751a"}} className={classes.storeIcon}><AssignmentIndIcon style={{color:"white"}} /></button>
                  </Typography>

                  <Typography style={{width:"200px"}} variant="body2" component="p">
                    Check out your profile
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                  </Typography>
                  </CardContent>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Card className = {classes.card}>
                  <CardContent >
                  <Typography  className = {classes.wrapIcon} variant="h6" component="h3">
                  Bill History <button style={{backgroundColor:"#660066"}} className={classes.storeIcon}><DescriptionIcon style={{color:"white"}} /></button>
                  </Typography>

                  <Typography style={{width:"230px"}} variant="body2" component="p">
                    Here you can get all the previous bills and also get the latest month's bill.
                    The bill is generated on the 2nd of every month.
                  </Typography>
                  </CardContent>
            </Card>
          </Grid>
        </Grid>
        </div>
        <Grid className={classes.grid} container spacing={1}>
          <Grid item xs={4}>
            <Card className = {classes.pieCard}>
                <CardContent>
                  <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel style={{"color":"#9999ff"}} htmlFor="filled-age-native-simple">Workforce</InputLabel>
                    <Select
                      native
                      className = {classes.Select}
                      value={toggleSelectWorkforce}
                      onChange={handleChangeWorkforce}
                      inputProps={{
                        classes:{
                          icon:classes.icon,
                          select:classes.selectInput,
                        },
                        name: 'Workforce',
                        id: 'filled-age-native-simple',
                      }}
                    >
                      <option className={classes.options} value={'Gunmen'}>Gunmen</option>
                      <option className={classes.options} value={'Drivers'}>Drivers</option>
                      <option className={classes.options} value={'Vehicles'}>Vehicles</option>
                    </Select>
                  </FormControl>
                  <Button onClick = {() => OnToggleTime("today")} className={toggleTime?classes.selected:classes.notSelected} variant="outlined">Today</Button>
                  <Button onClick = {() => OnToggleTime("month")} className={!toggleTime?classes.selected:classes.notSelected} variant="outlined">Month</Button>
                  <div style={{paddingTop:"20px"}}>
                  <Pie width={"250px"} height={"250px"} data={pie_gunmen} options={{ responsive: true,maintainAspectRatio: false,plugins:{legend:{labels:{color:"white"}}} }} />
                  </div>
                </CardContent>  
            </Card>
            </Grid>
            <Grid item xs={8}>
              <Card className = {classes.barCard}>
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
                  <Bar height={"315px"} width={"700px"} data = {budgets} options = {{responsive: true,maintainAspectRatio: true}}/>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      );
  }

  export default Dashboard
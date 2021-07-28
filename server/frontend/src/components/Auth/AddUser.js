import React,{useState,useEffect} from 'react'
import { TextField,Button,MenuItem} from '@material-ui/core'
import { makeStyles ,lighten} from '@material-ui/core/styles';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '30ch',
          paddingBottom:20,
        },
        width:"600px",
        margin:"0px auto",
        padding:10,
        paddingTop:10,
        paddingBottom:40,
        boxShadow:"inset 0 -3em 3em rgba(0,0,0,0.1),0 0  0 2px rgb(255,255,255),0.3em 0.3em 1em rgba(0,0,0,0.3)",
        backgroundColor:"#fff"
    },

    header:{
        marginBottom:50,
        color:"white",
        border:"1px solid #1abc9c",
        backgroundImage: "linear-gradient(to right,#00ccff,#1a75ff)",

    },
    box:{
        backgroundImage: "linear-gradient(to right,#00ccff,#1a75ff)",
        paddingTop:30,
        height:"50vh"
    },
    flashMessage:{
        color: theme.palette.success.dark,
        backgroundColor: lighten(theme.palette.success.light, 0.85),
        fontSize:'22px',
        width:'100%',
        textAlign:'center'
      },
}))

export default function AddUser(){
    const classes = useStyles()

    const [flash,setFlash] = useState()
    const [regions,setRegions] = useState([])
    const [info,setInfo] = useState({fn:"",ln:"",password:"",confirm_password:"",email:""})
    const [err,setErr] = useState({})
    const [dropdowns,setDropdowns] = useState({region:"",branch:"",hub:"",role:"User"})
    const [dropdownData,setDropdownData] = useState({optionHubs:[],optionBranches:[]})
    
    useEffect(() => {
        axios.get('infotable')
        .then(res => {
            console.log(res,'yoyoo')
            setRegions(res.data)
        })
    },[])
    
    function handleInput(e){
        setInfo({...info,[e.target.name] : e.target.value})
    }

    useEffect(() => {
        if(info.password != info.confirm_password){
            setErr({...err,confirm_password:"Passwords don't match"})
        }
        else{
            setErr({...err,confirm_password:""})
        }
    },[info.confirm_password])

    function handleDropdowns(e){
        if(e.target.name == "role"){
            setDropdowns({...dropdowns,role:e.target.value})
        }
        if (e.target.name == "region"){
            let optionBranches = []
            regions.forEach((region) =>{
                if (region.name == e.target.value){
                    region.branches.forEach(branch => {
                        optionBranches.push(branch.name)
                    })
                }
            })
            setDropdowns({...dropdowns,region:e.target.value,branch:"",hub:""})
            setDropdownData({...dropdownData,optionHubs:[],optionBranches:optionBranches})
        }
        if(e.target.name == "branch"){
            let optionHubs = []
            regions.forEach((region) =>{
                if (region.name == dropdowns.region){
                    region.branches.forEach(branch => {
                        if(branch.name == e.target.value){
                            branch.hubs.forEach(hub => {
                                optionHubs.push(hub.name)
                            })
                        }
                    })
                }
            })
            setDropdowns({...dropdowns,branch:e.target.value,hub:""})
            setDropdownData({...dropdownData,optionHubs:optionHubs})
        }

        if(e.target.name == "hub"){
            setDropdowns({...dropdowns,hub:e.target.value})
        }
    }

    function handleSubmit(){
        if(info.password !== info.confirm_password){
            setErr({...err,confirm_password:"Passwords don't match"})
            return
        }
        let data = {
            first_name:info.fn,
            last_name:info.ln,
            email:info.email,
            role:dropdowns.role,
            password:info.password,
            hub:dropdowns.hub,
            branch:dropdowns.branch,
            region:dropdowns.region,
        }
        console.log(data)
        axios.post('/user',data,{withCredentials:true})
        .then(res => {
            console.log(res,'signedup')
            setInfo({fn:"",ln:"",password:"",confirm_password:"",email:""})
            setErr({})
            setDropdowns({region:"",branch:"",hub:"",role:"User"})
            setDropdownData({optionHubs:[],optionBranches:[]})
            setRegions([])

            window.scrollTo(0, 0)
            setFlash("Added User Successfully")
            setTimeout(() => {
                setFlash("")
            },5000)


        })
        .catch(err => console.log(err.response))
    }
    return(
        <div className = {classes.box}>
        <form className={classes.root}>
            <div className = {classes.header}>
                <h2  align="center">ADD USER</h2>
            </div>
            <div className={classes.flashMessage}>{flash}</div>
            <div>
                <TextField name = "fn"
                    error = {err.fn}
                    type="text"
                    label = "Enter your First Name"
                    style={{width:"30ch"}}
                    value={info.fn}
                    onChange={handleInput}
                    helperText={err.fn}
                >
                </TextField>
                <TextField name = "ln"
                    error={err.ln}
                    type="text"
                    label = "Enter your last Name"
                    style={{width:"30ch"}}
                    value={info.ln}
                    onChange={handleInput}
                    helperText={err.ln}
                >
                </TextField>
            </div>
            <div>
                <TextField name = "email"
                    error = {err.email}
                    type="email"
                    label = "Enter an appropriate Email"
                    style={{width:"62ch"}}
                    value={info.email}
                    onChange={handleInput}
                    helperText={err.email}
                >
                </TextField>
            </div>
            <div>
                <TextField name = "password"
                    error={err.password}
                    type="Password"
                    label = "Enter your password"
                    style={{width:"30ch"}}
                    value={info.password}
                    onChange={handleInput}
                    helperText={err.password}
                >
                </TextField>
                <TextField name = "confirm_password"
                    error={err.confirm_password}
                    type="Password"
                    label = "Confirm your password"
                    style={{width:"30ch"}}
                    value={info.confirm_password}
                    onChange={handleInput}
                    helperText={err.confirm_password}
                >
                </TextField>
            </div>
            <center>
            <div>
            <TextField name = "role"
                    select
                    label = "Role"
                    style={{width:"40ch"}}
                    value={dropdowns.role}
                    onChange={handleDropdowns}
            >
                <MenuItem key={"admin"} value="Admin">Admin</MenuItem>
                <MenuItem key={"user"} value="User">User</MenuItem>
            </TextField>
            </div>

            <div>
            <TextField name = "region"
                    select
                    label = "Select Region"
                    style={{width:"40ch"}}
                    value={dropdowns.region}
                    onChange={handleDropdowns}       
                >
                {   
                    regions.map((region) => (
                        <MenuItem key={region.name} value={region.name}>{region.name}</MenuItem>
                    )     
                )
                }
                </TextField>
                
            </div>

            <div>
            <TextField name = "branch"
                    select
                    label = "Select Branch"
                    style={{width:"40ch"}}
                    value={dropdowns.branch}
                    onChange={handleDropdowns}
                >
                {   
                    dropdownData.optionBranches.map((branch) => (
                        <MenuItem key={branch} value={branch}>{branch}</MenuItem>
                    )
                )
                }
            </TextField>
                
            </div>
            <div>
            <TextField name = "hub"
                    select
                    label = "Select Hub"
                    style={{width:"40ch"}}
                    value={dropdowns.hub}
                    onChange={handleDropdowns}
            >
                {   
                    dropdownData.optionHubs.map((hub) => (
                        <MenuItem key={hub} value={hub}>{hub}</MenuItem>
                    )
                )
                }
            </TextField>


                
            </div>
            </center>
            <div align="center">
                <Button onClick={handleSubmit} variant = "contained" style={{backgroundColor:"#1a75ff",color:"#fff",marginTop:"30px"}}> Add User</Button>
            </div>
        </form>
        </div>
    )
}
import React,{useState} from 'react'
import { TextField,Button,MenuItem} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

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
        backgroundColor:"#1abc9c"

    },
    box:{
        backgroundImage: "linear-gradient(to bottom right, lightblue 50%, white 50%)"
    }
}))

export default function AddUser(){
    const classes = useStyles()

    const regions = 
    [
        {
            name:"Gujarat",
            branches:
            [
                {
                    name:"Mumbai",
                
                    hubs:
                    [
                        {name:"Andheri"},
                        {name:"kandivali"}
                    ]
                }
            ]
        }
    ]

    console.log(regions)
    const [info,setInfo] = useState({fn:"",ln:"",password:"",confirm_password:"",email:""})
    const [err,setErr] = useState({email:"",password:""})
    const [dropdowns,setDropdowns] = useState({region:"",branch:"",hub:""})
    const [dropdownData,setDropdownData] = useState({optionHubs:[],optionBranches:[]})
    
    function handleInput(e){
        setInfo({...info,[e.target.name] : e.target.value})
    }

    function handleDropdowns(e){
        console.log('dd',e.target.name)
        if (e.target.name == "region"){
            let optionBranches = []
            regions.forEach((region) =>{
                if (region.name == e.target.value){
                    region.branches.forEach(branch => {
                        optionBranches.push(branch.name)
                    })
                }
            })
            setDropdowns({region:e.target.value,branch:"",hub:""})
            setDropdownData({...dropdownData,optionHubs:[],optionBranches:optionBranches})
        }
        if(e.target.name == "branch"){
            let optionHubs = []
            console.log("here")
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
        console.log(info)
    }
    return(
        <div className = {classes.box}>
        <form className={classes.root}>
            <div className = {classes.header}>
                <h2  align="center">ADD USER</h2>
            </div>
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
                <TextField name = "Email"
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
                <TextField name = "password"
                    error={err.confirm_password}
                    type="Password"
                    label = "Confirm your password"
                    style={{width:"30ch"}}
                    value={info.password}
                    onChange={handleInput}
                    helperText={err.confirm_password}
                >
                </TextField>
            </div>
            <div>
            <TextField name = "region"
                    select
                    label = "Select Region"
                    style={{width:"50ch"}}
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
                    style={{width:"50ch"}}
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
                    style={{width:"50ch"}}
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
            
            <div align="center">
                <Button onClick={handleSubmit} variant = "contained" style={{backgroundColor:"#00b300",color:"#fff",marginTop:"30px"}}> Add Invoice</Button>
            </div>
        </form>
        </div>
    )
}
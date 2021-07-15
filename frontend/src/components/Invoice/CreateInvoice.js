import React,{useEffect,useState} from 'react'
import { TextField,Button,MenuItem,IconButton} from '@material-ui/core'
import { makeStyles,lighten } from '@material-ui/core/styles';
import {AddCircle,HighlightOff} from '@material-ui/icons'
import axios from 'axios'
import Loading from '../Loading'

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
        marginBottom:10,
        color:"white",
        border:"1px solid #1abc9c",
        backgroundColor:"#1abc9c"

    },
    box:{
        backgroundImage: "linear-gradient(to bottom right, lightblue 50%, white 50%)"
    },
    flashMessage:{
        color: theme.palette.success.dark,
        backgroundColor: lighten(theme.palette.success.light, 0.85),
        fontSize:'22px',
        width:'100%',
        textAlign:'center'
      },
}))

export default function CreateInvoice(){
    const classes = useStyles()

    const [flash,setFlash]  = useState("")
    const [vendorArr,setVendorArr]  = useState()
    const [vendor,setVendor]  = useState({id:'',name:''})
    const [manpowerArr,setManpowerArr] = useState({designation : "Gunman",names:[""]})
    const [info,setInfo] = useState({activity:"",hours:"",vendor_id:""})
    const [err,setErr] = useState({activity:"",hours:""})
    const [userInfo,setUserInfo] = useState({region:"",branch:"",hub:""})

    useEffect(() => {
        axios.get('/user/checkstatus')
        .then((res) => {
            console.log(res.data,'checking status ... ')
            setUserInfo({region:res.data.user.region,branch:res.data.user.branch,hub:res.data.user.hub})
        })

        axios.get('/vendor')
        .then((res) => {
            console.log(res.data)
            setVendorArr(res.data)
            setVendor({id:res.data[0]._id,name:res.data[0].vendor_name})
        })
    },[])

    function changeVendor(e){
        setVendor({id:e.target.name,name:e.target.value})
    }

    function handleInput(e){
        setInfo({...info,[e.target.name] : e.target.value})
    }

    function changeManpower(e){
        if(e.target.name == "designation"){
            setManpowerArr({...manpowerArr,designation:e.target.value}) 
        }
        else{
            let index = e.target.name.split("#")[0]
            let temp = manpowerArr.names
            temp[index] = e.target.value
            setManpowerArr({...manpowerArr,names:temp})
        }
    }
    function deleteManpower(e){
        let val = e.currentTarget.value
        setManpowerArr({...manpowerArr,names:manpowerArr.names.filter((names,index) => index != Number(val)) })
    }

    function addManpower(){
        setManpowerArr({...manpowerArr,names:[...manpowerArr.names,""] })
    }

    function handleSubmit(){
        if (info.activity === ""){
            setErr({...err,activity:"This field cannot be left empty"})
        }
        if (info.hours === ""){
            setErr({...err,hours:"This field cannot be left empty"})
        }
        if(info.activity !== "" && info.hours !== ""){
            console.log("success")
            console.log(manpowerArr)
            let data = {
                Manpower_Names:manpowerArr.names,
                Designation:manpowerArr.designation,
                Hours_per_day:info.hours,
                Activity:info.activity,
                Hub:userInfo.hub,
                Branch:userInfo.branch,
                Region:userInfo.region,
                Vendor:vendor.id,
            }
            console.log("data cre nivoice",data)
            axios.post('/invoice',data,{withCredentials:true})
            .then(res => {
                console.log("create success",res)
                setVendor({id:'',name:''})
                setManpowerArr({designation : "Gunman",names:[""]})
                setInfo({activity:"",hours:"",vendor_id:""})
                setErr({activity:"",hours:""})

                window.scrollTo(0, 0)
                setFlash("Added User Successfully")
                setTimeout(() => {
                    setFlash("")
                },5000)
            })
            .catch(err => console.log(err.response))
        }
    }
    if(!vendorArr){
        return (<Loading />)
    }
    
    return(
        <div className = {classes.box}>
        <form className={classes.root}>
            <div className = {classes.header}>
                <h2  align="center">CREATE INVOICE</h2>
            </div>
            <div className={classes.flashMessage}>{flash}</div>
            <div>
                <TextField key = "Region" 
                                name = "region"
                                label = "Region"
                                InputProps={{
                                    inputProps:{
                                        style:{textAlign:"center",color:"#404040",fontWeight:600}
                                    },
                                    readOnly:true,
                                }}
                                variant="filled"
                                defaultValue={userInfo.region}
                                value = {userInfo.region}
                                style={{width:"30ch",color:"#fff",float:"right"}}
                                
                            >
                </TextField>
            </div>
            <div>
                <TextField name = "invoice"
                    type={"text"}
                    label = "Invoice ID (auto-generated)"
                    InputProps={{
                        readOnly: true,
                      }}
                    style={{width:"62ch"}}
                    disabled
                >
                </TextField>
            </div>
            
            <div>
            <div>
                <TextField name = "activity"
                    type={"text"}
                    error = {err.activity}
                    helperText = {err.activity}
                    label = "Given Activity"
                    value = {info.activity}
                    onChange={handleInput}
                >
                </TextField>
                <TextField name = "hours"
                    type="Number"
                    InputProps = {{
                        inputProps : {max:24}
                    }}
                    error = {err.hours}
                    helperText = {err.hours}
                    label = "Hours Assigned per day"
                    value = {info.hours}
                    onChange={handleInput}
                >
                </TextField>
            </div>
            <center>
            <div>
                <TextField
                    select
                    label = "Select Vendor Name"
                    name={vendor.id}
                    value={vendor.name}
                    onChange={changeVendor}
                >
                    {vendorArr.map((vendor,index) => (
                        <MenuItem key={index}  value={vendor.vendor_name}>{vendor.vendor_name}</MenuItem>
                    ))}
                </TextField>
            </div>

            <div>
                <TextField key = {"manpowerDesignation"} 
                                select
                                name = {"designation"}
                                label = "Provide designation"
                                value={manpowerArr.designation}
                                defaultValue={manpowerArr.designation}
                                onChange={changeManpower}
                            >
                    <MenuItem key={"Gunman"} value="Gunman">Gunman</MenuItem>
                    <MenuItem key={"Driver"} value="Driver">Driver</MenuItem>
                    <MenuItem key={"Vehicle"} value="Vehicle">Vehicle</MenuItem>
                </TextField>
            </div>
            </center>
            </div>

            <div>
            <h3 style={{marginBottom:"-15px"}}>Add Manpower <IconButton component="label" onClick={addManpower}><AddCircle style={{color:"limegreen"}}/></IconButton></h3>
            {manpowerArr.names.map((name,index) => (
                    <div key = {"manpower" + index}>
                        <TextField key = {"manpowerName" + index} 
                            name = {index+"#name"}
                            type="text"
                            label = "Enter Name"
                            value = {name}
                            defaultValue = {name}
                            onChange={changeManpower}
                        >
                        </TextField>
                        {manpowerArr.names.length > 1?
                        <IconButton style = {{color:"red",marginTop:"10px"}} value = {index} onClick={deleteManpower}><HighlightOff /></IconButton>
                        :<div></div>}
                    </div>
            ))}
            <div align="center">
                <Button onClick={handleSubmit} variant = "contained" style={{backgroundColor:"#00b300",color:"#fff",marginTop:"30px"}}> Add Invoice</Button>
            </div>
            </div>
        </form>
        </div>
    )
}
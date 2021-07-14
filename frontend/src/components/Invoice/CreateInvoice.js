import React,{useEffect,useState} from 'react'
import { TextField,Button,MenuItem,IconButton} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {AddCircle,HighlightOff} from '@material-ui/icons'

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
        color:"#1abc9c",

    },
    box:{
        backgroundImage: "linear-gradient(to bottom right, lightblue 50%, white 50%)"
    }
}))

export default function CreateInvoice(){
    const classes = useStyles()

    const vendors = ['Jorse','Bolo','jaiMatadi']

    const [vendor,setVendor]  = useState(vendors[0])
    const [manpowerArr,setManpowerArr] = useState([{"designation" : "Gunman","name":""}])
    const [info,setInfo] = useState({activity:"",hours:""})
    const [err,setErr] = useState({activity:"",hours:""})

    function handleInput(e){
        setInfo({...info,[e.target.name] : e.target.value})
    }

    function changeManpower(e){
        let type = e.target.name.split("#")[1]
        let count = e.target.name.split("#")[0]
        let value = e.target.value
        let temp = [...manpowerArr]
        temp[count] = {...manpowerArr[count],[type] : value}
        setManpowerArr(temp)
    }
    console.log(manpowerArr)
    function deleteManpower(e){
        let val = e.currentTarget.value
        setManpowerArr(manpowerArr.filter((manpower,index) => index != Number(val)) )
    }

    function addManpower(){
        setManpowerArr([...manpowerArr,{"designation" : "Gunman","name":""} ])
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
        }
    }
    return(
        <div className = {classes.box}>
        <form className={classes.root}>
            <div className = {classes.header}>
                <h2  align="center">CREATE INVOICE</h2>
            </div>
            <div>
                <TextField name = "invoice"
                    type={"text"}
                    label = "Invoice ID (auto-generated)"
                    defaultValue="IT WILL GET AUTO GENERATED"
                    InputProps={{
                        readOnly: true,
                      }}
                    style={{width:"62ch"}}
                >
                </TextField>
            </div>
            <div>
                <TextField
                    select
                    label = "Enter Vendor Name"
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value)}
                >
                    {vendors.map((vendor) => (
                        <MenuItem key={vendor}  value={vendor}>{vendor}</MenuItem>
                    ))}
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
            </div>
            <div>
            <h3 style={{marginBottom:"-15px"}}>Add Manpower <IconButton component="label" onClick={addManpower}><AddCircle style={{color:"limegreen"}}/></IconButton></h3>
            {manpowerArr.map((manpower,index) => (
                    <div key = {"manpower" + index}>
                        <TextField key = {"manpowerName" + index} 
                            name = {index+"#name"}
                            type="text"
                            label = "Enter Name"
                            value = {manpower.name}
                            defaultValue = {manpower.name}
                            onChange={changeManpower}
                        >
                        </TextField>
                        <TextField key = {"manpowerDesignation" + index} 
                            select
                            name = {index+"#designation"}
                            label = "Provide designation"
                            value={manpower.designation}
                            defaultValue={manpower.designation}
                            onChange={changeManpower}
                        >
                            <MenuItem key={"Gunman"} value="Gunman">Gunman</MenuItem>
                            <MenuItem key={"Driver"} value="Driver">Driver</MenuItem>
                            <MenuItem key={"Vehicle"} value="Vehicle">Vehicle</MenuItem>
                        </TextField>
                        {manpowerArr.length > 1?
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
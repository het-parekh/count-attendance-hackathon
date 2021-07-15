import React,{useState} from 'react'
import { TextField,Button} from '@material-ui/core'
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

export default function Login(){
    const classes = useStyles()

    const regions = ['Jorse','Bolo','jaiMatadi']

    const [info,setInfo] = useState({email:"",password:""})
    const [err,setErr] = useState({email:"",password:""})

    function handleInput(e){
        setInfo({...info,[e.target.name] : e.target.value})
    }

    function handleSubmit(){
        if (info.email === ""){
            setErr({...err,email:"This field cannot be left empty"})
            return
        }
        if (info.password === ""){
            setErr({...err,password:"This field cannot be left empty"})
            return
        }
        setErr({email:"",password:""})
    }
    return(
        <div className = {classes.box}>
        <form className={classes.root}>
            <div className = {classes.header}>
                <h2  align="center">LOGIN</h2>
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
                    style={{width:"62ch"}}
                    value={info.password}
                    onChange={handleInput}
                    helperText={err.password}
                >
                </TextField>
            </div>
            
            <div align="center">
                <Button onClick={handleSubmit} variant = "contained" style={{backgroundColor:"#00b300",color:"#fff",marginTop:"30px"}}> Add Invoice</Button>
            </div>
        </form>
        </div>
    )
}
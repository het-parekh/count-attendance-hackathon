import React,{useState} from 'react'
import { TextField,Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
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
        marginBottom:50,
        color:"white",
        border:"1px solid #1abc9c",
        backgroundColor:"#1abc9c"

    },
    box:{
        padding:80,
        backgroundImage: "linear-gradient(to bottom right, lightblue 50%, white 50%)"
    }
}))

export default function Login(props){
    const classes = useStyles()

    const [info,setInfo] = useState({email:"",password:""})
    const [err,setErr] = useState({email:"",password:""})

    function handleInput(e){
        setInfo({...info,[e.target.name] : e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()
        if (info.email === ""){
            setErr({...err,email:"This field cannot be left empty"})
            return
        }
        if (info.password === ""){
            setErr({...err,password:"This field cannot be left empty"})
            return
        }
        const creds = { email: info.email, pass: info.password }
        props.LoginUser(creds)
        setErr({email:"",password:""})

    }


    if (props.Auth.isLoading) {
        return (
          <Loading />
        );
      }
      
    return(
        <div className = {classes.box}>
        <form className={classes.root}>
            <div className = {classes.header}>
                <h2  align="center">LOGIN</h2>
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
                    style={{width:"62ch"}}
                    value={info.password}
                    onChange={handleInput}
                    helperText={err.password}
                >
                </TextField>
            </div>
            
            <div align="center">
                <Button onSubmit={handleSubmit} type='submit' onClick={handleSubmit} variant = "contained" style={{backgroundColor:"#1abc9c",color:"#fff",marginTop:"30px"}}> lOG IN</Button>
            </div>
        </form>
        </div>
    )
}
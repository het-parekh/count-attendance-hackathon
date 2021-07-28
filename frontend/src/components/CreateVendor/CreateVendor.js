import React, { useState } from 'react'
import { TextField, Button,makeStyles } from '@material-ui/core'
import './CreateVendor.css'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  box:{
    backgroundImage: "linear-gradient(to right,#00ccff,#1a75ff)",
    height:"50vh"
},
  boxForm:{
    width:"600px",
        margin:"0px auto",
        padding:10,
        paddingTop:10,
        paddingBottom:40,
        boxShadow:"inset 0 -3em 3em rgba(0,0,0,0.1),0 0  0 2px rgb(255,255,255),0.3em 0.3em 1em rgba(0,0,0,0.3)",
        backgroundColor:"#fff"
  },
  header:{
    marginBottom:20,
    color:"white",
    border:"1px solid #1abc9c",
    backgroundImage: "linear-gradient(to right,#00ccff,#1a75ff)",
    textAlign:'center',
    fontSize:30,
    fontWeight:'bold',
    paddingTop:-10

},
}))

function CreateVendor() {
  const classes = useStyles()
  const [vendorName, setVendorName] = useState('')
  const [regionName, setRegionName] = useState('')
  const [gunmenPrice, setGunmenPrice] = useState('')
  const [driverPrice, setDriverPrice] = useState('')
  const [vehiclePrice, setVehiclePrice] = useState('')
  const [gunmenOtPrice, setGunmenOtPrice] = useState('')
  const [driverOtPrice, setDriverOtPrice] = useState('')
  const [vehicleOtPrice, setVehicleOtPrice] = useState('')

  const vendorNameChangeHandler = (e) => {
    setVendorName(e.target.value)
  }

  const regionNameChangeHandler = (e) => {
    setRegionName(e.target.value)
  }

  const gunmenPriceChangeHandler = (e) => {
    setGunmenPrice(e.target.value)
  }
  const vehiclePriceChangeHandler = (e) => {
    setVehiclePrice(e.target.value)
  }

  const driverPriceChangeHandler = (e) => {
    setDriverPrice(e.target.value)
  }

  const gunmenOtPriceHandler = (e) => {
    setGunmenOtPrice(e.target.value)
  }

  const driverOtPriceChangeHandler = (e) => {
    setDriverOtPrice(e.target.value)
  }
  const vehicleOtPriceChangeHandler = (e) => {
    setVehicleOtPrice(e.target.value)
  }


  const submitHandler = (e) => {
    e.preventDefault()
    const data = {
      vendor_name: vendorName,
      region: regionName,
      sla:{gunman:gunmenPrice,driver:driverPrice,vehicle:vehiclePrice},
      sla_ot:{gunman:gunmenOtPrice,driver:driverOtPrice,vehicle:vehicleOtPrice}
    }
    axios.post('/vendor', data)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err.response)
      })
    console.log('submitted')
  }
  return (
    <div className = {classes.box}>
    <div style={{paddingTop:20}} className="container">
      
      <form onSubmit={submitHandler} >
      <div className = {classes.header} >CREATE VENDOR</div>
        <TextField required id="standard-required" label="Vendor Name" name="vendor" onChange={vendorNameChangeHandler} value={vendorName} />
        <TextField required id="standard-required" label="Region Name" type="text" name="region" onChange={regionNameChangeHandler} value={regionName} />
        <TextField required id="standard-required" label="Gunmen Price per hour" type="text" name="gunmen" onChange={gunmenPriceChangeHandler} value={gunmenPrice} />
        <TextField required id="standard-required" label="Driver Price per hour" type="text" name="gunmen" onChange={driverPriceChangeHandler} value={driverPrice} />
        <TextField required id="standard-required" label="Vehicle Price per hour" type="text" name="gunmen" onChange={vehiclePriceChangeHandler} value={vehiclePrice} />
        <TextField required id="standard-required" label="Gunman OT price per hour" type="text" name="gunmen" onChange={gunmenOtPriceHandler} value={gunmenOtPrice} />
        <TextField required id="standard-required" label="Driver OT price per hour" type="text" name="gunmen" onChange={driverOtPriceChangeHandler} value={driverOtPrice} />
        <TextField required id="standard-required" label="Vehicle OT price per hour" type="text" name="gunmen" onChange={vehicleOtPriceChangeHandler} value={vehicleOtPrice} />




        <Button variant="contained" style={{backgroundColor:"#1a75ff",color:"white"}} type="submit">Create Vendor</Button>
      </form>
    </div>
    </div>
  )
}

export default CreateVendor

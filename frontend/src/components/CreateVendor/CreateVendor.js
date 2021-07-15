import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import './CreateVendor.css'
import axios from 'axios'

function CreateVendor() {

  const [vendorName, setVendorName] = useState('')
  const [regionName, setRegionName] = useState('')
  const [gunmenPrice, setGunmenPrice] = useState('')
  const [driverPrice, setDriverPrice] = useState('')
  const [gunmenOtPrice, setGunmenOtPrice] = useState('')
  const [driverOtPrice, setDriverOtPrice] = useState('')

  const vendorNameChangeHandler = (e) => {
    setVendorName(e.target.value)
  }

  const regionNameChangeHandler = (e) => {
    setRegionName(e.target.value)
  }

  const gunmenPriceChangeHandler = (e) => {
    setGunmenPrice(e.target.value)
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


  const submitHandler = (e) => {
    e.preventDefault()
    const data = {
      vendor_name: vendorName,
      region: regionName,
      invoice: []
    }
    axios.post('/vendor', data)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(Error)
      })
    console.log('submitted')
  }
  return (
    <div className="container">
      <h1 style={{ textAlign: 'center' }}>Create Vendor</h1>
      <form onSubmit={submitHandler} >
        <TextField required id="standard-required" label="Vendor Name" name="vendor" onChange={vendorNameChangeHandler} value={vendorName} />
        <TextField required id="standard-required" label="Region Name" type="text" name="region" onChange={regionNameChangeHandler} value={regionName} />
        <TextField required id="standard-required" label="Gunmen Price per hour" type="text" name="gunmen" onChange={gunmenPriceChangeHandler} value={gunmenPrice} />
        <TextField required id="standard-required" label="Driver Price per hour" type="text" name="gunmen" onChange={driverPriceChangeHandler} value={driverPrice} />
        <TextField required id="standard-required" label="Driver OT price per hour" type="text" name="gunmen" onChange={gunmenOtPriceHandler} value={gunmenOtPrice} />
        <TextField required id="standard-required" label="Gunman OT per hour" type="text" name="gunmen" onChange={driverOtPriceChangeHandler} value={driverOtPrice} />




        <Button variant="contained" color="primary" type="submit">Create Vendor</Button>
      </form>
    </div>
  )
}

export default CreateVendor

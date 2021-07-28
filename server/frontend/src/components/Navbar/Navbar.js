import React from 'react'
import { Link } from 'react-router-dom'
import AddCommentRoundedIcon from '@material-ui/icons/AddCommentRounded';
import HistoryRoundedIcon from '@material-ui/icons/HistoryRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import './Navbar.css'

function Navbar(props) {

  const [Open, setOpen] = React.useState(false)

  const toggleClick = () => {
    if (!Open) {
      document.body.style.position = 'fixed'
    } else {
      document.body.style.position = 'static'
    }
    setOpen(prev => { return !prev })
  }

  let ulLis = null
  if (props.isAuthenticated) {
    ulLis = (
      <ul>
        <li><Link to="/attendance">Mark Attendance </Link></li>
        <li><Link to="/checkattendance">Check Attendance </Link></li>
        <li><Link to="/billdetails">Bill Details </Link></li>
        <li><Link to="/createinvoice">Create Invoice</Link></li>
        {props.role == "Admin"?<li><Link to="/adduser">Add User</Link></li>:<li></li>}
        <li style={{ color: '#1a75ff', background: 'white', padding: '10px' }}>{props.role}, {props.region}</li>
        <li style={{marginLeft:80}} className="logout" ><div className="logout" onClick={props.LogoutUser}>Logout &nbsp;<ExitToAppRoundedIcon /></div></li>
      </ul>
    )
  }

  return (
    <nav className={Open ? "nav-active" : ''}>
      <div className="logo"><Link to="/dashboard">CMS</Link></div>
      {ulLis}
      <div className="burger" onClick={toggleClick}>
        <div className="line line1"></div>
        <div className="line line2"></div>
        <div className="line line3"></div>
      </div>
    </nav>
  )
}

export default Navbar

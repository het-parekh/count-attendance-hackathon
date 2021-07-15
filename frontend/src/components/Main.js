import React, { Component } from 'react';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import PageNotFound from './PageNotFound';
import Dashboard from './Dashboard/Dashboard'
import Attendance from './Attendance/Attendance';
import CreateInvoice from './Invoice/CreateInvoice';
import Bill from './Bill/Bill';
import Login from './Auth/Login';
import AddUser from './Auth/AddUser';

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => ({

})

class Main extends Component {

    componentDidMount() {
    }

    render() {
        const PrivateRoute = ({ ...props }) => {
            const isAllowed = this.props.Auth.isAuthenticated
            return isAllowed
                ? (<Route {...props} />)
                : (<Redirect to="/login" />)
        };


        const PublicRoute = ({ ...props }) => {
            const isAllowed = this.props.Auth.isAuthenticated
            return isAllowed
                ? (<Redirect to='/dashboard' />)
                : (<Route {...props} />)
        };

        return (
            <div>               
                <Switch>  

                    <Route exact path="/" >
                        <Redirect to="/" />
                    </Route>
                    <Route exact path = '/login' component = {Login}></Route>
                    <Route exact path = '/adduser' component = {AddUser}></Route>
                    <Route exact path = '/dashboard' component = {Dashboard}></Route>
                    <Route exact path = '/attendance' component = {Attendance}></Route>
                    <Route exact path = '/createinvoice' component = {CreateInvoice}></Route>
                    <Route exact path = '/billdetails' component = {Bill}></Route>
                    <Route component = {PageNotFound}></Route>
                    
                </Switch>
            </div>
        )
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

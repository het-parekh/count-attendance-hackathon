import React, { Component } from 'react';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { LoginUser, LogoutUser, checkStatus } from './../redux/actionCreators/Auth'

import PageNotFound from './PageNotFound';
import Dashboard from './Dashboard/Dashboard'
import Attendance from './Attendance/Attendance';
import CreateInvoice from './Invoice/CreateInvoice';
import Bill from './Bill/Bill';
import Login from './Auth/Login';
import AddUser from './Auth/AddUser';
import Loading from './Loading'
import CreateVendor from './CreateVendor/CreateVendor';
import CheckAttedance from './Attendance/checkAttendance';
import Navbar from './Navbar/Navbar'

const mapStateToProps = state => {
    return {
        Auth: state.Auth,
    }
}

const mapDispatchToProps = (dispatch) => ({
    LoginUser: (creds) => dispatch(LoginUser(creds)),
    LogoutUser: () => dispatch(LogoutUser()),
    checkStatus: () => dispatch(checkStatus()),
})

class Main extends Component {

    componentDidMount() {
        this.props.checkStatus()
    }

    render() {
        if (this.props.Auth.checkingStatus === true) {
            return (
                <Loading />
            )
        }
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
                <Navbar LogoutUser={this.props.LogoutUser} isAuthenticated={this.props.Auth.isAuthenticated} />
                <Switch>

                    <PublicRoute exact path='/login' component={() => <Login Auth={this.props.Auth} LoginUser={this.props.LoginUser} />}></PublicRoute>

                    <PrivateRoute exact path='/adduser' component={AddUser}></PrivateRoute>
                    <PrivateRoute exact path='/dashboard' component={Dashboard}></PrivateRoute>
                    <PrivateRoute exact path='/attendance' component={Attendance}></PrivateRoute>
                    <PrivateRoute exact path='/checkattendance' component={CheckAttedance}></PrivateRoute>
                    <PrivateRoute exact path='/createinvoice' component={CreateInvoice}></PrivateRoute>
                    <PrivateRoute exact path='/billdetails' component={Bill}></PrivateRoute>
                    <PrivateRoute exact path='/createvendor' component={CreateVendor} />

                    <Route exact path="/" >
                        <Redirect to="/login" />
                    </Route>
                    <Route component={PageNotFound}></Route>

                </Switch>
            </div>
        )
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

import React, { Component } from 'react';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import PageNotFound from './PageNotFound';

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
        const PrivateRoute =  ({ ...props }) => {
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
                    
                    <Redirect to="/pagenotfound"  component = {PageNotFound} />
                    
                </Switch>
            </div>
        )
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

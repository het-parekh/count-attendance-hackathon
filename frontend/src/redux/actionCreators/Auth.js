import * as ActionTypes from '../ActionTypes'
import axios from 'axios'

export const checkStatus = () => dispatch => {
    dispatch(checkStatusRequest())
     
    const options = {
        url: '/user/checkstatus',
        method: 'GET',
        withCredentials: true,
    }
    axios(options).then((response) => {
         
        let role = response.data.user.role
        let region = response.data.user.region
        dispatch(checkStatusSuccess(role,region))
    })
        .catch(error => {
             
            dispatch(checkStatusFailure())
        })
}

export const checkStatusSuccess = (role,region) => {
    return {
        type: ActionTypes.CHECK_STATUS_SUCCESS,
        payload:[role,region]
    }
}

export const checkStatusRequest = () => {
    return {
        type: ActionTypes.CHECK_STATUS_REQUEST,
    }
}
export const checkStatusFailure = () => {
    return {
        type: ActionTypes.CHECK_STATUS_FAILURE,
    }
}

export const loginError = (err) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        payload: err
    }
}
export const requestLogin = () => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
    }
}

export const loginSuccess = (role,region) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        payload:[role,region]
    }
}

export const LoginUser = (creds) => (dispatch) => {

    dispatch(requestLogin())

    const options = {
        url: '/user/login',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'

        },
        withCredentials: true,
        data: {
            email: creds.email,
            password: creds.pass,
        }

    }

    axios(options)
        .then(response => {
            if (response.status === 200) {
                let role = response.data.user.role
                let region = response.data.user.region
                 
                dispatch(loginSuccess(role,region))
            }
        })
        .catch(error => {
            if (error.response) {
                dispatch(loginError(error.response.data))

            }
        })
}


export const requestLogout = () => {
    return {
        type: ActionTypes.LOGOUT_REQUEST,
    }
}

export const logoutSuccess = (role) => {
    return {
        type: ActionTypes.LOGOUT_SUCCESS,
    }
}

export const LogoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    const options = {
        url: '/user/logout',
        method: 'GET',
        withCredentials: true,
        headers: {
        }
    }
    axios(options).then((response) => {



        dispatch(logoutSuccess())
    }
    )
    // localStorage.removeItem('token');
}
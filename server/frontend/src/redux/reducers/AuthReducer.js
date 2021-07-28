import * as ActionTypes from '../ActionTypes'

const Auth = (state = {
    err: { email: '', password: '' },
    isLoading: false,
    isAuthenticated: false,
    role:"",
    region:"",
    checkingStatus: true
    // user:localStorage.getItem('creds') ? JSON.parse(localStorage.getItem('creds')) : null
},
    action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_SUCCESS:
            return { ...state, err: null, isLoading: false, isAuthenticated: true,role:action.payload[0],region:action.payload[1] }
        case ActionTypes.LOGIN_REQUEST:
            return { ...state, err: null, isLoading: true, isAuthenticated: false }
        case ActionTypes.LOGIN_FAILURE:
            return { ...state, err: action.payload, isLoading: false, isAuthenticated: false }

        case ActionTypes.LOGOUT_SUCCESS:
            return { ...state, isLoading: false, isAuthenticated: false, checkingStatus: false ,role:"",region:""}
        case ActionTypes.LOGOUT_REQUEST:
            return { ...state, isLoading: true, isAuthenticated: true, checkingStatus: false }

        case ActionTypes.CHECK_STATUS_REQUEST:
            return { ...state, isLoading: true, isAuthenticated: false, checkingStatus: true }

        case ActionTypes.CHECK_STATUS_FAILURE:
            return { ...state, isLoading: false, isAuthenticated: false, checkingStatus: false,role:"" }

        case ActionTypes.CHECK_STATUS_SUCCESS:
            return { ...state, isLoading: false, isAuthenticated: true, checkingStatus: false ,role:action.payload[0],region:action.payload[1]}

        default:
            return state
    }
}

export default Auth
// This file handles all the authentications
import axios from 'axios';
import { returnErrors } from './errorActions';
import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOFIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from './types';

// loadUser
// 1. Set type as USER_LOADING
// 2. Make a request using Axios ot the API endpoint '/api/user' along with the token
//    from the tokenconfig. 
// 3. Then set type as USER_LOADED if successful
// 4. If unsuccessful, set type to AUTH_ERROR
export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    axios.get('/api/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
}

// register
// 1. Takes name, email and password from the frontend and make it a JSON object
// 2. Hit the API endpoint for register and pass in the data
// 3. Set date received as payload and the type is set to REGISTER_SUCCESS
// 4. Handle errors same as loadUser and set error type to REGISTER_FAIL
export const register = ({name, email, password}) => dispatch => {
    // headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //request body
    const body = JSON.stringify({name, email, password});

    axios.post('/api/register', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            });
        });
}

// login
// 1. Gets email and password only and then uses the API endpoint meant for login
// 2. Get a response and set the payload as the data received from the response
// 3. Set type as LOGIN_SUCCESS, if fail then set type as LOGIN_FAIL
export const login = ({email, password}) => dispatch => {
    // headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // request body
    const body = JSON.stringify({email, password});

    axios.post('/api/login', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            });
        });
}

// logout
// 1. Set type as LOGOUT_SUCCESS
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

// tokenconfig
// This helper function helps get token from local storage and
// set up the config to send a request using loadUser for getting the logged in
// user's details
export const tokenConfig = getState => {
    // Get token from local storage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}
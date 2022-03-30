// For authentication purposes
// Set up an initial state where we retrieve the token from the local storage
// Set isAuthenticated to null and isLoading to false
// Set the user field as false
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

export default function(state=initialState, action) {
    switch(action.type) {

        // USER_LOADING
        // Set isLoading to true
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };

        // USER_LOADED
        // Set isLoading to false and isAuthenticated to true
        // Set user as the payload from actions file
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoaded: false,
                user: action.payload
            }

        // LOGIN_SUCCESS, REGISTER_SUCCESS
        // Set isAuthenticated to true and set the token received in the local storage
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            };
        
        // AUTH_ERROR, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL
        // Remove the token from the local storage
        // Set the token and user to null
        // Set isAuthenticated and isLoading to false
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };
        default:
            return state;
    }
}
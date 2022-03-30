// Manages errors in the application
import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
    msg: {},
    status: null,
    id: null
}

// GET_ERRORS
// Set the msg, status and id from the action's payload
export default function(state = initialState, action) {
    switch(action.type) {
        
        // GET_ERRORS
        // Set the msg, status and id from the action's payload
        case GET_ERRORS:
            return {
                msg: action.payload.msg,
                status: action.payload.status,
                id: action.payload.id
            };

        // CLEAR_ERRORS
        // Reset everything, set msg to empty object and set the status and id to null
        case CLEAR_ERRORS:
            return {
                msg: {},
                status: null,
                id: null
            };

        default: 
            return state;
    }
}


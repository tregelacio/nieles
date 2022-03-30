// Reducers related to the orders
import { GET_ORDERS, CHECKOUT, ORDERR_LOADING } from '../actions/types';

const initialState = {
    orders: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(actions.type) {

        // GET_ORDERS
        // Set the orders array to the payload received from the actions file
        // Set the loading to false
        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload,
                loading: false
            }
        
        // CHECKOUT
        // Receive the new order from the payload and add it to the orders array
        case CHECKOUT:
            return {
                ...state,
                orders: [action.payload, ...state.orders]
            }

        // ORDERS_LOADING
        // Set the loading to true
        case ORDERR_LOADING:
            return {
                ...state,
                loading: true
            }

        default:
            return state;
    }
}
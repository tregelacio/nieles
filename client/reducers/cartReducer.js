// Reducers related to the cart of the user
import { GET_CART, ADD_TO_CART, DELETE_FROM_CART, CART_LOADING } from '../actions/types';

const initialState = {
    cart: null,
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        // GET_CART
        // Receive the cart through the payload from the actions file
        // Set it to the cart defined in our initial state
        // Set loading to false
        case GET_CART:
            return {
                ...state,
                cart: action.payload,
                loading: false
            }

        // ADD_TO_CART, DELETE_FROM_CART
        // Get the updated cart
        // Set the cart to the payload received from the actions
        case ADD_TO_CART:
            return {
                ...state,
                cart: action.payload
            }

        case DELETE_FROM_CART:
            return {
                ...state,
                cart: action.payload
            }

        // CART_LOADING
        // Set the loading to true
        case CART_LOADING:
            return {
                ...state,
                loading: true
            }

        default:
            return state;
    }
}
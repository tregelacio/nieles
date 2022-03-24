// Handles all the actions related to the cart of any user
import axios from 'axios';
import { returnErrors } from './errorActions';
import { GET_CART, ADD_TO_CART, DELETE_FROM_CART, CART_LOADING } from './types';

// getCart - Fetches the cart for any user
// 1. Set cart as LOADING
// 2. Pass on the id as a param with the API endpoint and receive response of the cart of the user
// 3. Set type as GET_CART
export const getCart = (id) => dispatch => {
    dispatch(setCartLoading());
    axios.get(`/api/cart/$(id)`)
        .then(res => dispatch({
            type: GET_CART,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// addToCart - Adds an item to cart
// 1. Uses id of user as param and passes on the productId and quantity as the request body
// 2. Then receive a response which is assigned to the payload
// 3. Set type to ADD_TO_CART
export const addToCart = (id, productId, quantity) => dispatch => {
    axios.post(`/api/cart/$(id)`, {productId, quantity})
        .then(res => dispatch({
            type: ADD_TO_CART,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// deleteFromCart - Deletes item from cart
// 1. Uses userId and itemId as param and passes to the API endpoint
// 2. Set type to DELETE_FROM_CART and set payload as the response's data
export const deleteFromCart = (userId, itemId) => dispatch => {
    axios.delete(`/api/cart/${userId}/${itemId}`)
        .then(res => dispatch({
            type: DELETE_FROM_CART,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// setCartLoading - Sets type as CART_LOADING
// 1. Set the type as CART_LOADING
export const setCartLoading =() => {
    return {
        type: CART_LOADING
    }
}
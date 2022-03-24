// Handles all actions related to orders
import axios from 'axios';
import { returnErrors } from './errorActions';
import { GET_ORDERS, CHECKOUT, ORDERS_LOADING } from './types';

// getOrders - Retrieves order
// 1. Set orders as loading
// 2. Uses userId as a param in making a GET request
// 3. Set the type as GET_ORDERS and set paylaod as data received as the response
export const getOrder = (id) => dispatch => {
    dispatch(setOrdersLoading());
    axios.get(`/api/order/${id}`, {source})
        .then(res => dispatch({
            type: GET_ORDERS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// checkout - Places order
// 1. Receives two parameters from the components, id of user and source
// 2. Source is genereated from stripe checkout functions
// 3. Use the id as a param and source as request body and make a POST request
// 4. Set the type as CHECKOUT and set the payload as the response's data
export const checkout = (id, source) => dispatch => {
    axios.post(`/api/order/${id}`, {source})
        .then(res => dispatch({
            type: CHECKOUT,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// setOrderLoading
// 1. Set the order type as ORDERS_LOADING
export const setOrdersLoading = () => {
    return {
        type: ORDERS_LOADING
    }
}
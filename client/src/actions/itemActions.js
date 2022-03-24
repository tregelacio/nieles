// Handles all the actions related to items such as products displayed on website
import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, ITEMS_LOADING } from './types';
import { returnErrors } from './errorActions';

// getItems - For fetching all the items from the bakcend using an API endpoint
// 1. Set items as loading
// 2. Reach the API endpoint to get all items
// 3. Set type as GET_ITEMS
// 4. Set payload as the data received as a response
export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios.get('/api/items')
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// addItem - For adding a new item to the database
// 1. Take in the item object through frontend forms and send data to the API endpoint that adds the item
// 2. Set the type as ADD_ITEM and set payload as the data received from the response
export const addItem = (item) => (dispatch) => {
    axios.post('/api/items', item)
        .then(res => dispatch({
            type: ADD_ITEM,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

// deleteItem - For deleting an existing item from the database
// 1. Take the id of the item
// 2. Send the id using a DELETE request to the API endpoint
// 3. Set the type as DELETE_ITEM and the payload as the id of the item
export const deleteItem = (id) => (dispatch) => {
    axios.delete(`/api/items/${id}`)
        .then(res => dispatch({
            type: DELETE_ITEM,
            payload: id
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

// updateItem - For updating an existing item in the inventory
// 1. Make a PUT request to the API endpoint using the id and also sends in the new item object
// 2. Set type as UPDATE_ITEM and set payload as the id and the data as a response from server
export const updateItem = (id, item) => (dispatch) => {
    axios.put(`/api/items/${id}`, item)
        .then(res => dispatch({
            type: UPDATE_ITEM,
            payload: Promise.all([id, res.data])
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

// setItemsLoading - Sets the type as ITEMS_LOADING
export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}
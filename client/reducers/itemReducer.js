// Handles all the types related to items
import { GET_ITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types';

const initialState = {
    items: [],
    loading: false
}

export default function(state=initialState, action) {
    switch(action.type) {

        // GET_ITEMS - This is the reducer for getting the items
        // Set the items array to be payload received from actions
        // Set loading to false to signify that items have been loaded
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            }

        // ADD_ITEMS
        // Call the state using the spread operator and then add the new item received from the payload to the items array
        case ADD_ITEM: 
            return {
                ...state,
                items: [action.payload, ...state.items]
            }

        // DELETE_ITEMS
        // Get the id of the deleted item via the payload
        // Take the items array and remove the item matching the id by filtering
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            };

        // UPDATE_ITEM
        // Get the id and the updated item from the payload
        // Find the item from the items array by its id and update
        case UPDATE_ITEM:
            const { id, data } = action.payload;
            return {
                ...state,
                items: state.items.map(item => {
                    if (item._id == id) {
                        item = data;
                    }
                })
            }

        // ITEMS_LOADING
        // Set the loading to true to signify that items are loading
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            }

        default:
            return state;
    }
}
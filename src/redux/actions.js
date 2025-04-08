export const SET_ITEMS = 'SET_ITEMS';
export const ADD_ITEM = 'ADD_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

export const setItems = (items) => ({ type: SET_ITEMS, payload: items });
export const addItem = (item) => ({ type: ADD_ITEM, payload: item });
export const updateItem = (item) => ({ type: UPDATE_ITEM, payload: item });
export const deleteItem = (id) => ({ type: DELETE_ITEM, payload: id });

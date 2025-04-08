import { createStore, combineReducers } from 'redux';
import itemsReducer from './reducers';

const rootReducer = combineReducers({
  itemsState: itemsReducer,
});

const store = createStore(rootReducer);

export default store;

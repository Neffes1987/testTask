import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import Comments from './Comments';


const rootReducer = combineReducers({
  routing: routerReducer,
  Comments
});

export default rootReducer;

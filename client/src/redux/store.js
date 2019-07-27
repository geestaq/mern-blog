import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// import reducers
import posts from './postsRedux';

// combine reducers
const rootReducer = combineReducers({
  posts,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

import { createStore,combineReducers,applyMiddleware,compose} from "redux";
import thunk from "redux-thunk";
// import PostsReducer from './reducers/PostsReducer';
import { AuthReducer } from './reducers/AuthReducer';
// import todoReducers from './reducers/Reducers';

const middleware = applyMiddleware(thunk);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducers = combineReducers({
    // posts:PostsReducer,
    auth:AuthReducer,
});
export const store = createStore(reducers,composeEnhancers(middleware));
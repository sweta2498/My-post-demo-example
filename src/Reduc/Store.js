import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import LoginReducer, { GoogleLoginDetailReducer, PostReducer, ScrollPost } from "./Reducer";

export const reducers = combineReducers({
    Login: LoginReducer,
    Post: PostReducer,
    Scroll: ScrollPost,
    Google:GoogleLoginDetailReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
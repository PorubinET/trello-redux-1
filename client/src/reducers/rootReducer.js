import { combineReducers } from "redux";

import { listsReducer } from "../store/listsReducer";



export const rootReducer = combineReducers({
    listsReducer,
})


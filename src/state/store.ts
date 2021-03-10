import {blockReducer} from "./block-reducer";
import {tasksReducer} from "./tasks-reducer";
import {combineReducers, createStore} from "redux";


const rootReducer = combineReducers({
    blocks: blockReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store
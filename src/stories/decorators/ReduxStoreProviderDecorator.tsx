import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {tasksReducer} from '../../state/tasks-reducer'
import {blockReducer} from '../../state/block-reducer'
import {v1} from 'uuid'
import {AppRootState, store} from '../../state/store'
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    blocks: blockReducer
})

const initialGlobalState: AppRootState = {
    blocks: [
        {id: "todolistId1", title: "What to learn", filter: "all", order: 0, addedDate: ""},
        {id: "todolistId2", title: "What to buy", filter: "all", order: 0, addedDate: ""}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Complited, todoListId : 'todolistId1', description : "",
                priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""},
            {id: v1(), title: "JS", status: TaskStatuses.Complited,  todoListId : "todolistId1", description : "",
                priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Complited,  todoListId : "todolistId2", description : "",
                priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""},
            {id: v1(), title: "React Book", status: TaskStatuses.Complited,  todoListId : "todolistId2", description : "",
                priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={store}>{storyFn()}
    </Provider>)
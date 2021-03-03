import {BlockType, FilterValuesType, TaskStateType, TaskType} from "../App";
import {v1} from "uuid";
import React, {useState} from 'react';
import {AddBlockActiontype, RemoveBlockActiontype} from "./todolist-reducer";

type addTaskActionType = { type: "ADD-TASK",blockID: string, title: string }
type removeTaskActionType = { type: "REMOVE-TASK", blockID: string, taskId: string }
type changeTaskStatusActionType = { type: "CHANGE-TASK-STATUS", blockID: string, taskId: string, isDone: boolean }
type changeTaskTitleActionType = { type: "CHANGE-TASK-TITLE", blockID: string, taskId: string, title: string }

type ActionsType = addTaskActionType | removeTaskActionType | changeTaskStatusActionType | changeTaskTitleActionType | AddBlockActiontype | RemoveBlockActiontype

export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType  => {

    switch (action.type) {
        case "ADD-TASK": {
            const stateCopy = {...state}
            const blockCopy = stateCopy[action.blockID]
            const tasks = blockCopy
            const newTask: TaskType = {id: v1(), title: action.title, isDone: false}

            stateCopy[action.blockID] = [newTask, ...blockCopy]
            return stateCopy
        }

        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const blockCopy = stateCopy[action.blockID]

            stateCopy[action.blockID] = blockCopy.filter(t => t.id !== action.taskId)
            return stateCopy
        }

        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state}
            const blockCopy = stateCopy[action.blockID]

            const oneTask = blockCopy.find(t => t.id === action.taskId)
            if (oneTask){
                oneTask.isDone = action.isDone
            }
            return stateCopy
        }

        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            const blockCopy = stateCopy[action.blockID]

            const oneTask = blockCopy.find(t => t.id === action.taskId)
            if (oneTask){
                oneTask.title = action.title
            }
            return stateCopy
        }

        case "ADD-BLOCK": return {
                ...state,
                [action.id]: []
        }

        case "REMOVE-BLOCK":
            let stateCopy = {...state}
            delete stateCopy[action.blockID]
            return stateCopy

        default: throw  new Error("wrong action")
    }
}

export const addTaskAC = (blockID: string, title: string): addTaskActionType => ({
    type: "ADD-TASK", blockID, title
});
export const removeTaskAC = (blockID: string, taskId: string): removeTaskActionType => ({
    type: "REMOVE-TASK", blockID, taskId
});
export const changeTaskStatusAC = (blockID: string, taskId: string, isDone: boolean): changeTaskStatusActionType => ({
    type: "CHANGE-TASK-STATUS", blockID, taskId, isDone
});
export const changeTaskTitleAC = (blockID: string, taskId: string, title: string): changeTaskTitleActionType => ({
    type: "CHANGE-TASK-TITLE", blockID, taskId, title
});
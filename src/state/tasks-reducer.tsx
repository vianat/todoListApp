import {TaskStateType} from "../App";
import {v1} from "uuid";
import {
    AddBlockActiontype,
    block1,
    block2,
    block3,
    RemoveBlockActiontype,
    SetBlockActionType,
    setBlocksAC
} from "./block-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI} from "../api/todolist-api";

type addTaskActionType = { type: "ADD-TASK",blockID: string, title: string }
type removeTaskActionType = { type: "REMOVE-TASK", blockID: string, taskId: string }
type changeTaskStatusActionType = { type: "CHANGE-TASK-STATUS", blockID: string, taskId: string, status: TaskStatuses }
type changeTaskTitleActionType = { type: "CHANGE-TASK-TITLE", blockID: string, taskId: string, title: string }
type setTasksActionType = { type: "SET-TASKS", tasks: Array<TaskType>, blockId: string
}

type ActionsType = addTaskActionType
    | removeTaskActionType | changeTaskStatusActionType | changeTaskTitleActionType
    | AddBlockActiontype | RemoveBlockActiontype | SetBlockActionType | setTasksActionType

const initialState: TaskStateType = {
    [block1]: [
        {id: v1(), title: "HTML&CSS", status: TaskStatuses.Complited, todoListId : block1, description : "",
    priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""},
        {id: v1(), title: "JS", status: TaskStatuses.Complited, todoListId : block1, description : "",
            priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""},
        {id: v1(), title: "ReactJS", status: TaskStatuses.New, todoListId : block1, description : "",
            priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""},
        {id: v1(), title: "Rest API", status: TaskStatuses.New, todoListId : block1, description : "",
            priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""},
        {id: v1(), title: "GraphQL", status: TaskStatuses.New, todoListId : block1, description : "",
            priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""}
    ],
    [block2]: [
        {id: v1(), title: "HTML&CSS", status: TaskStatuses.Complited, todoListId : block2, description : "",
            priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""},
        {id: v1(), title: "JS", status: TaskStatuses.Complited, todoListId : block2, description : "",
            priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""},
        {id: v1(), title: "ReactJS", status: TaskStatuses.New, todoListId : block2, description : "",
            priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""},
        {id: v1(), title: "Rest API", status: TaskStatuses.New, todoListId : block2, description : "",
            priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""},
        {id: v1(), title: "GraphQL", status: TaskStatuses.New, todoListId : block2, description : "",
            priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""}
    ],
    [block3]: [
        {id: v1(), title: "HTML&CSS", status: TaskStatuses.Complited, todoListId : block3, description : "",
            priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""},
        {id: v1(), title: "JS", status: TaskStatuses.Complited, todoListId : block3, description : "",
            priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""},
        {id: v1(), title: "ReactJS", status: TaskStatuses.New, todoListId : block3, description : "",
            priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""},
        {id: v1(), title: "Rest API", status: TaskStatuses.New, todoListId : block3, description : "",
            priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""},
        {id: v1(), title: "GraphQL", status: TaskStatuses.New, todoListId : block3, description : "",
            priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""}
    ]
}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType  => {

    switch (action.type) {
        case "ADD-TASK": {
            const stateCopy = {...state}
            const blockCopy = stateCopy[action.blockID]
            const newTask: TaskType = {id: v1(), title: action.title, status: TaskStatuses.New,
                todoListId : action.blockID, description : "",
                priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""}

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

            stateCopy[action.blockID] = blockCopy.map(
                t => t.id === action.taskId
                    ? {...t, isDone: action.status}
                    : t
            )

            return stateCopy
        }

        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            const blockCopy = stateCopy[action.blockID]

            stateCopy[action.blockID] = blockCopy.map(
                t => t.id === action.taskId
                    ? {...t, title: action.title}
                    : t
            )

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

        case "SET-BLOCKS":
            let stateCopy2 = {...state}

            action.blocks.forEach(tl => {
                stateCopy2[tl.id] = []
            })
            console.log(stateCopy2)
            console.log(typeof stateCopy2[0])
            return stateCopy2

        case "SET-TASKS":
            let stateCopy3 = {...state}
            stateCopy3[action.blockId] = action.tasks

            return stateCopy3

        default: return state
    }
}

export const addTaskAC = (blockID: string, title: string): addTaskActionType => ({
    type: "ADD-TASK", blockID, title
});
export const removeTaskAC = (blockID: string, taskId: string): removeTaskActionType => ({
    type: "REMOVE-TASK", blockID, taskId
});
export const changeTaskStatusAC = (blockID: string, taskId: string, status: TaskStatuses): changeTaskStatusActionType => ({
    type: "CHANGE-TASK-STATUS", blockID, taskId, status
});
export const changeTaskTitleAC = (blockID: string, taskId: string, title: string): changeTaskTitleActionType => ({
    type: "CHANGE-TASK-TITLE", blockID, taskId, title
});
export const setTasksAC = (tasks: Array<TaskType>, blockId: string): setTasksActionType => ({
    type: "SET-TASKS", tasks, blockId
});
export const fetchTasksTHUNKCREATOR = (blockId: string) => {
    return (dispatch: any) => {
        todolistAPI.getTasks(blockId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, blockId))
            })
    }
}
import axios from 'axios';

type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}
type CreateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {
        item: TodolistType
    }
}
type UpdateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}
type DeleteTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
type GetTasksResponse = {
    items: TaskType[],
    totalCount: number,
    error: string | null
}
export type TaskType = {
    description: string
    title: string
    isDone: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type updateTaskModel = {
    title: string
    description: string
    isDone: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

const instanse = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    headers: {"API-KEY": "9023ef56-e618-4743-b1d7-425c6976d211"}
})

export const todolistAPI = {

    getTodolists() {
        const promise = instanse.get<Array<TodolistType>>(`todo-lists/`)
        return promise
    },
    createTodolist(newTitle: string) {
        const promise = instanse.post<ResponseType<{item: TodolistType}>>(`todo-lists/`, {title: newTitle})
        return promise
    },
    updateTodolist(todolistId: string, title: string) {
        const promise = instanse.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instanse.delete<ResponseType>(`todo-lists/${todolistId}`)
        return promise
    },

    getTasks(todolistId: string) {
        return instanse.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instanse.post(`todo-lists/${todolistId}/tasks`, {title: title})
    },
    updateTask(todolistId: string, taskId: string, patchModel: updateTaskModel) {
        return instanse.put<ResponseType<{item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, patchModel)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instanse.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}
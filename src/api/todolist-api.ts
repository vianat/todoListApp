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
type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
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
        const promise = instanse.post<CreateTodolistResponseType>(`todo-lists/`, {title: newTitle})
        return promise
    },

    updateTodolist(todolistId: string, title: string) {
        const promise = instanse.put<UpdateTodolistResponseType>(`todo-lists/${todolistId}`, {title: title})
        return promise
    },

    deleteTodolist(todolistId: string) {
        const promise = instanse.delete<DeleteTodolistResponseType>(`todo-lists/${todolistId}`)
        return promise
    }
}

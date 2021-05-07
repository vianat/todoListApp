import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>("")

    const onClick = () => {
        todolistAPI.createTodolist(title)
            .then((res) => {
                setState(res.data);
            })
    }

    return <div> {JSON.stringify(state)}
        <input placeholder={"enter title"}
               onChange={e => setTitle(e.currentTarget.value)}
               value={title}/>
        <button onClick={onClick}>create TDL</button>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    const onClick = () => {
        const todolistId = '1b1db6e8-bf8d-43f6-9d98-33474ca4f007'
        todolistAPI.updateTodolist(todolistId, 'UPDATED')
            .then((res) => {

                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <input placeholder={"todolistId"}
               onChange={e => setTodolistId(e.currentTarget.value)}
               value={todolistId}/>
        <input placeholder={"title"}
               onChange={e => setTitle(e.currentTarget.value)}
               value={title}/>
        <button onClick={onClick}>delete TDL</button>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const onClick = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }

    return <div> {JSON.stringify(state)}
        <input placeholder={"todolistId"}
               onChange={e => setTodolistId(e.currentTarget.value)}
               value={todolistId}/>
        <button onClick={onClick}>delete TDL</button>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")

    const onClick = () => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data.items);
            })
    }

    return <div> {JSON.stringify(state)}
        <input placeholder={"todolistId"}
               onChange={e => setTodolistId(e.currentTarget.value)}
               value={todolistId}/>
        <button onClick={onClick}>get tasks</button>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    const onClick = () => {
        todolistAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data);
            })
    }

    return <div> {JSON.stringify(state)}
        <input placeholder={"todolistId"}
               onChange={e => setTodolistId(e.currentTarget.value)}
               value={todolistId}/>
        <input placeholder={"title"}
               onChange={e => setTitle(e.currentTarget.value)}
               value={title}/>
        <button onClick={onClick}>create task</button>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [taskId, setTaskId] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    const onClick = () => {
        const patchModel = {
            title: title,
            description: "string",
            isDone: false,
            status: 55,
            priority: 55,
            startDate: "2021-03-07T16:47:48.847",
            deadline: "2021-07-07T16:47:48.847"
        }
        todolistAPI.updateTask(todolistId, taskId, patchModel)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <input placeholder={"todolistId"}
               onChange={e => setTodolistId(e.currentTarget.value)}
               value={todolistId}/>
        <input placeholder={"taskId"}
               onChange={e => setTaskId(e.currentTarget.value)}
               value={taskId}/>
        <input placeholder={"title"}
               onChange={e => setTitle(e.currentTarget.value)}
               value={title}/>
        <button onClick={onClick}>update task</button>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [taskId, setTaskId] = useState<string>("")

    const onClick = () => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data);
            })
    }

    return <div> {JSON.stringify(state)}
        <input placeholder={"todolistId"}
               onChange={e => setTodolistId(e.currentTarget.value)}
               value={todolistId}/>
        <input placeholder={"taskId"}
               onChange={e => setTaskId(e.currentTarget.value)}
               value={taskId}/>
        <button onClick={onClick}>delete task</button>
    </div>
}
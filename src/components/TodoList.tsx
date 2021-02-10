import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './../App';
import AddItem from "../AddItem";
import EditableSpan from "../EditableSpan";

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (blockID: string, title: string) => void
    removeTask: (blockID: string, taskId: string) => void
    changeFilter: (blockID: string, value: FilterValuesType) => void
    changeStatus: (blockID: string, taskId: string, isDone: boolean) => void
    removeBlock:(blockID: string) => void
    changeTaskTitle:(blockID: string, taskId: string, title: string) => void
    changeBlockTitle: (blockID: string, title: string) => void
}

export function Todolist(props: TodolistPropsType) {

    const addTask = (title: string) => props.addTask(props.id, title)

    const onAllClickHandler = () => props.changeFilter(props.id, "all");
    const onActiveClickHandler = () => props.changeFilter(props.id, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed");
    const changeBlockTitle = (title: string) => props.changeBlockTitle(props.id, title)

    return <div>
        <h3>
            <EditableSpan title={props.title} changeItem={changeBlockTitle}/>
            <button onClick={ () => props.removeBlock(props.id) }>X</button>
        </h3>

        <AddItem addItem={addTask}/>

        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.id, t.id)
                    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(props.id, t.id, e.currentTarget.checked )
                    const changeTitle = (title:string) => props.changeTaskTitle(props.id, t.id,  title)

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input type="checkbox"
                                       onChange={onChangeStatus}
                                       checked={t.isDone}/>
                                <EditableSpan
                                    title={t.title}
                                    changeItem={changeTitle}/>
                                <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>

        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './../App';
import AddItem from "../AddItem";
import EditableSpan from "../EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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

            <IconButton onClick={ () => props.removeBlock(props.id) } >
                <Delete />
            </IconButton>

        </h3>

        <AddItem addItem={addTask}/>

        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.id, t.id)
                    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(props.id, t.id, e.currentTarget.checked )
                    const changeTitle = (title:string) => props.changeTaskTitle(props.id, t.id,  title)

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <Checkbox
                                    color="primary"
                                    onChange={onChangeStatus}
                                    checked={t.isDone}/>
                                <EditableSpan
                                    title={t.title}
                                    changeItem={changeTitle}/>
                                <IconButton  onClick={onClickHandler}>
                                    <Delete />
                                </IconButton>

                    </li>
                })
            }
        </ul>

        <div>
            <Button color={"primary"}
                    variant={props.filter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler}>All</Button>
            <Button color={"secondary"}
                    variant={props.filter === 'active' ? "contained" : "text"}
                    onClick={onActiveClickHandler}>Active</Button>
            <Button color={"inherit"}
                    variant={props.filter === 'completed' ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
}
import React, {ChangeEvent, useCallback, useEffect} from 'react';
import {AddItem} from "../AddItem";
import {EditableSpan} from "../EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {fetchTodolistsTHUNKCREATOR, FilterValuesType} from "../state/block-reducer";
import {TaskStatuses, TaskType} from "../api/todolist-api";
import {useDispatch} from "react-redux";
import {fetchTasksTHUNKCREATOR, setTasksAC} from "../state/tasks-reducer";

type TodolistPropsType = {
    blockId: string
    blockTitle: string
    blockFilter: FilterValuesType
    tasks: Array<TaskType>

    addTask: (blockID: string, title: string) => void
    removeTask: (blockID: string, taskId: string) => void
    changeFilter: (blockID: string, value: FilterValuesType) => void
    changeStatus: (blockID: string, taskId: string, status: TaskStatuses) => void
    removeBlock:(blockID: string) => void
    changeTaskTitle: (blockID: string, taskId: string, title: string) => void
    changeBlockTitle: (blockID: string, title: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTHUNKCREATOR(props.blockId))
    }, [])

    const addTask = (title: string) => props.addTask(props.blockId, title)

    const onAllClickHandler =       useCallback(() => props.changeFilter(props.blockId, "all"), [props.changeFilter, props.blockId]);
    const onActiveClickHandler =    useCallback(() => props.changeFilter(props.blockId, "active"), [props.changeFilter, props.blockId]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.blockId, "completed"), [props.changeFilter, props.blockId]);
    const changeBlockTitle = useCallback((title: string) => props.changeBlockTitle(props.blockId, title),[props.blockId, props.changeBlockTitle])

    let tasksForBlock = props.tasks
    if(props.blockFilter === "active")   {tasksForBlock = tasksForBlock.filter(t => t.status === TaskStatuses.New)}
    if(props.blockFilter === "completed"){tasksForBlock = tasksForBlock.filter(t => t.status === TaskStatuses.Complited)}

    return <div>
        <h3>
            <EditableSpan title={props.blockTitle} changeItem={changeBlockTitle}/>

            <IconButton onClick={ () => props.removeBlock(props.blockId) } >
                <Delete />
            </IconButton>

        </h3>

        <AddItem addItem={addTask}/>

        <ul>
            {tasksForBlock.map(t => <Task task={t}
                                           blockId={props.blockId}
                                           removeTask={props.removeTask}
                                           changeStatus={props.changeStatus}
                                           changeTaskTitle={props.changeTaskTitle}
                                           key={t.id}/>
                )
            }
        </ul>

        <div>
            <Button color={"primary"}
                    variant={props.blockFilter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler}>All</Button>
            <Button color={"secondary"}
                    variant={props.blockFilter === 'active' ? "contained" : "text"}
                    onClick={onActiveClickHandler}>Active</Button>
            <Button color={"inherit"}
                    variant={props.blockFilter === 'completed' ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
})
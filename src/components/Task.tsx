import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../api/todolist-api";

export type TaskPropsType ={
    task: TaskType
    blockId: string
    removeTask: (blockID: string, taskId: string) => void
    changeStatus: (blockID: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (blockID: string, taskId: string, title: string) => void
}

export const Task = React.memo( (props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.blockId, props.task.id)
    // const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(props.blockId, props.task.id, e.currentTarget.checked )
    const changeTitle = useCallback( (title:string) => props.changeTaskTitle(props.blockId, props.task.id,  title),[props.blockId,props.task.id, props.changeTaskTitle])

    return <li key={props.task.id} className={props.task.status === TaskStatuses.Complited  ? "is-done" : ""}>
        <Checkbox
            color="primary"
            // onChange={onChangeStatus}
            // checked={props.task.status}
        />
        <EditableSpan
            title={props.task.title}
            changeItem={changeTitle}/>
        <IconButton onClick={onClickHandler}>
            <Delete />
        </IconButton>

    </li>
})
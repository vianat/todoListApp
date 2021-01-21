import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType, TaskType} from "../App";

type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>,
    addTask: (title: string) => void,
    removeTask: (taskId: string) => void,
    changeFilter: (newFilterValue: FilterType) => void,
}

function TodoList(props: TodoListPropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState("");

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(newTaskTitle)
            setNewTaskTitle("")
        }
    }
    const addtask = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle("")
    }
    const onAllClickHandler = () => props.changeFilter("All");
    const onActiveClickHandler = () => props.changeFilter("Active");
    const onCompletedClickHandler = () => props.changeFilter("Completed");

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyPress={onKeyPressHandler}/>
                <button onClick={addtask}>+</button>
            </div>

            <ul>
                {
                    props.tasks.map(t =>
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                            <button onClick={() => {
                                props.removeTask(t.id)
                            }}>x
                            </button>
                        </li>)
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;
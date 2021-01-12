import React from "react";
import {FilterType, TaskType} from "../App";

type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: number) => void,
    changeFilter: (newFilterValue: FilterType) => void,
}

function TodoList(props: TodoListPropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>send</button>
            </div>

            <ul>
                {
                    props.tasks.map(t => <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                        <button onClick={ () => {props.removeTask(t.id)} }>x</button>
                    </li>)

                }
            </ul>
            <div>
                <button onClick={ () => {props.changeFilter("All")} }>All</button>
                <button onClick={ () => {props.changeFilter("Active")} }>Active</button>
                <button onClick={ () => {props.changeFilter("Completed")} }>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;
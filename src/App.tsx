import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}
export type FilterType = "All" | "Active" | "Completed";

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "js", isDone: true},
        {id: v1(), title: "css", isDone: false},
        {id: v1(), title: "react", isDone: true},
        {id: v1(), title: "redux", isDone: false}
    ]);
    let [filter, setFilter] = useState<FilterType>("All");
    let tasksForTodoList = tasks;
    console.log(filter);

    function addTask(title: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }
    function removeTask(id: string) {
        let removedTasks = tasks.filter(t => t.id !== id);
        setTasks(removedTasks);
    }

    function changeFilter(value: FilterType){
        setFilter(value);
    }
    if (filter === "Active")   {tasksForTodoList = tasks.filter(t => t.isDone === false)}
    if (filter === "Completed"){tasksForTodoList = tasks.filter(t => t.isDone === true)}


    return (
        <div className="App">
            <TodoList title={"section one"}
                      tasks={tasksForTodoList}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
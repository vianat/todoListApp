import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}
export type FilterType = "All" | "Active" | "Completed";

function App() {
    let [tasks, setTasks] = useState([
        {id: 1, title: "js", isDone: true},
        {id: 2, title: "css", isDone: false},
        {id: 3, title: "react", isDone: true},
        {id: 4, title: "redux", isDone: false}
    ]);
    let [filter, setFilter] = useState<FilterType>("All");
    let tasksForTodoList = tasks;

    function removeTask(id: number) {
        let removedTasks = tasks.filter(t => t.id !== id);
        setTasks(removedTasks);
    }

    function changeFilter(FilterValue: FilterType){
        setFilter(FilterValue);
    }
    if (filter === "Active")   {tasksForTodoList = tasks.filter(t => t.isDone === false)}
    if (filter === "Completed"){tasksForTodoList = tasks.filter(t => t.isDone === true)}



    return (
        <div className="App">
            <TodoList title={"section one"} tasks={tasksForTodoList} removeTask={removeTask} changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
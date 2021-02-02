import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/TodoList';
import {v1} from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todoLists, setTodoList] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: 'all'},
        {id: todoListID2, title: "What to buy", filter: 'all'}
    ])  // локальный стейт для хранения наших todoLists
    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todoListID2]: [
            {id: v1(), title: "milk", isDone: true},
            {id: v1(), title: "bread", isDone: true},
            {id: v1(), title: "beer", isDone: false},
            {id: v1(), title: "meat", isDone: false}
        ]
    })

    function removeTask(taskID: string, todoListID: string) {//удаляем таску в опред туду
        const todoListTasks = tasks[todoListID]
        tasks[todoListID] = todoListTasks.filter(t => t.id !== taskID);
        setTasks({...tasks});
    }
    function addTask(title: string, todoListID: string) {//добавляем таску в опред туду
        let newTask: TaskType = {
                id: v1(),
                title: title,
                isDone: false
            };
        const todoListTasks = tasks[todoListID]
        tasks[todoListID] = [newTask, ...todoListTasks];
        setTasks({...tasks});
    }
    function changeFilter(newFilterValue:FilterValuesType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = newFilterValue
            setTodoList([...todoLists])
        }
    }
    function changeStatus(taskId: string, isDone: boolean, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task: TaskType| undefined = todoListTasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }
    function removeTodoList(todoListID: string){
        setTodoList(todoLists.filter(tdl => tdl.id !== todoListID))
        delete tasks[todoListID] // удаление данных их реального стейта а не из виртуального
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {
                todoLists.map(tdl => { // фильтруем по корневым листам
                    let taskForTodoList = tasks[tdl.id] // берем тудулист и фильтруем по фильтрам
                    if(tdl.filter === "active"){
                        taskForTodoList = tasks[tdl.id].filter(t => t.isDone === false)
                    }
                    if(tdl.filter === "completed"){
                        taskForTodoList = tasks[tdl.id].filter(t => t.isDone === true)
                    }
                    return (
                        <Todolist key={tdl.id}
                                  id={tdl.id}
                                  title={tdl.title}
                                  tasks={taskForTodoList} // прокидываем тудулист данные
                                  filter={tdl.filter}
                                  removeTask={removeTask}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  changeStatus={changeStatus}
                                  removeTodoList={removeTodoList}/>
                    )
                })
            }
        </div>
    );
}

export default App;
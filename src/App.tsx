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

    const block1 = v1(), block2 = v1(), block3 = v1()  // создаём блоки с id , что бы связать блок с тасками #32

    const [blocks, setBlocks] = useState<Array<TodoListType>>([ // лок стейт для блоков
        {id: block1, title: "first block ", filter: 'all'},
        {id: block2, title: "second block ", filter: 'active'},
        {id: block3, title: "third block ", filter: 'completed'}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({ // лок стейт для блок-тасков
        [block1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [block2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [block3]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ]
    })

    function removeTask  (blockID: string, taskID: string) {        // удаляем таску в блоке
        const blockCopy = tasks[blockID]                            // создаём копию блока по id
        tasks[blockID] = blockCopy.filter(t => t.id !== taskID);    // меняем ориг.блок на блок c удалённой таской
        setTasks({...tasks});                                 // сетаем копию ориг.блок
    }
    function addTask     (blockID: string, title: string) {//добавляем таску в опред туду
        let newTask: TaskType = {
                id: v1(),
                title: title,
                isDone: false
            };
        const todoListTasks = tasks[blockID]
        tasks[blockID] = [newTask, ...todoListTasks];
        setTasks({...tasks});
    }
    function changeFilter(blockID: string, newFilterValue:FilterValuesType) {

        const block = blocks.find(tl => tl.id === blockID) // достаём блок по id и меняем фильтр
        if (block) {
            block.filter = newFilterValue
            setBlocks([...blocks])
        }
    }
    function changeStatus(blockID: string, taskId: string, isDone: boolean) {
        const todoListTasks = tasks[blockID]
        const task: TaskType| undefined = todoListTasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }
    function removeBlock (blockID: string){
        setBlocks(blocks.filter(tdl => tdl.id !== blockID)) // удаляем бок и сэтаем стэйт
        delete tasks[blockID]                               // удаление данных их реального стейта а не из виртуального
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {
                blocks.map(tdl => {                     // фильтруем по корневым блокам
                    let taskForTodoList = tasks[tdl.id] // фильтруем блоки и устанавливам фильтры
                    if(tdl.filter === "active")   {taskForTodoList = tasks[tdl.id].filter(t => t.isDone === false)}
                    if(tdl.filter === "completed"){taskForTodoList = tasks[tdl.id].filter(t => t.isDone === true)}
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
                                  removeBlock={removeBlock}/>
                    )
                })
            }
        </div>
    );
}

export default App;
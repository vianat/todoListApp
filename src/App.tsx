import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/TodoList';
import {v1} from 'uuid';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {AddItem} from "./AddItem";
import {FilterValuesType, TodolistTypeDomainType} from "./state/block-reducer";
import {TaskPriorities, TaskStatuses, TaskType, TodolistType} from "./api/todolist-api";

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const block1 = v1(), block2 = v1(), block3 = v1()  // создаём блоки с id , что бы связать блок с тасками #32

    const [blocks, setBlocks] = useState<Array<TodolistTypeDomainType>>([ // лок стейт для блоков
        {id: block1, title: "first block ", filter: 'all', order: 0, addedDate: ""},
        {id: block2, title: "second block ", filter: 'active', order: 0, addedDate: ""},
        {id: block3, title: "third block ", filter: 'completed', order: 0, addedDate: ""}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({ // лок стейт для блок-тасков
        [block1]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Complited, todoListId : block1, description : "",
                priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""},
            {id: v1(), title: "ReactJS", status: TaskStatuses.New,todoListId : block1, description : "",
                priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""}
        ],
        [block2]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Complited, todoListId : block2, description : "",
                priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""},
            {id: v1(), title: "ReactJS", status: TaskStatuses.New,todoListId : block2, description : "",
                priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""}
        ],
        [block3]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Complited, todoListId : block3, description : "",
                priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""},
            {id: v1(), title: "ReactJS", status: TaskStatuses.New,todoListId : block3, description : "",
                priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""}
        ]
    })

    function addTask (blockID: string, title: string) {//добавляем block или task
        let newTask: TaskType = {
            id: v1(), title: title, status: TaskStatuses.New, todoListId: blockID, description: "",
            priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: ""
        };
        const block = tasks[blockID]
        tasks[blockID] = [newTask, ...block];
        setTasks({...tasks});
    }
    function removeTask  (blockID: string, taskID: string) {        // удаляем таску в блоке
        const blockCopy = tasks[blockID]                            // создаём копию блока по id
        tasks[blockID] = blockCopy.filter(t => t.id !== taskID);    // меняем ориг.блок на блок c удалённой таской
        setTasks({...tasks});                                 // сетаем копию ориг.блок
    }
    function changeStatus(blockID: string, taskId: string, status: TaskStatuses) {
        const todoListTasks = tasks[blockID]
        const task: TaskType| undefined = todoListTasks.find(t => t.id === taskId)
        if (task) {
            task.status = status
            setTasks({...tasks})
        }
    }
    function changeTaskTitle(blockID: string, taskId: string, title: string) {
        const todoListTasks = tasks[blockID]
        const task: TaskType | undefined = todoListTasks.find(t => t.id === taskId)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }

    function addBlock(title: string){
        const newBlockID = v1();
        const newBlock:TodolistTypeDomainType = {
            id : newBlockID,
            title: title,
            filter: 'all', order: 0, addedDate: ""
        }
        setBlocks([newBlock, ...blocks])
        setTasks({...tasks, [newBlockID]: []})
    }
    function removeBlock (blockID: string){
        setBlocks(blocks.filter(tdl => tdl.id !== blockID)) // удаляем бок и сэтаем стэйт
        delete tasks[blockID]                               // удаление данных их реального стейта а не из виртуального
        setTasks({...tasks})
    }
    function changeBlockFilter(blockID: string, newFilterValue: FilterValuesType) {

        const block = blocks.find(tl => tl.id === blockID) // достаём блок по id и меняем фильтр
        if (block) {
            block.filter = newFilterValue
            setBlocks([...blocks])
        }
    }
    function changeBlockTitle(blockID: string, title: string){
        const block =  blocks.find(b=>b.id===blockID)
        if(block){
            block.title = title
            setTasks({...tasks})
        }
    }

    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" >
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed style={{padding: "20px"}}>
                <Grid container>
                    <AddItem addItem={addBlock}/> {/*  создаём новый блок*/}
                </Grid>

                <Grid container spacing={4}>
                    {
                        blocks.map(tdl => {                     // фильтруем по корневым блокам
                            let taskForTodoList = tasks[tdl.id] // фильтруем блоки и устанавливам фильтры
                            if(tdl.filter === "active")   {taskForTodoList = tasks[tdl.id].filter(t => t.status === TaskStatuses.New)}
                            if(tdl.filter === "completed"){taskForTodoList = tasks[tdl.id].filter(t => t.status === TaskStatuses.Complited)}

                            return (
                                <Grid item key={tdl.id}>
                                    <Paper elevation={2} style={{padding:"15px"}}>
                                        <Todolist
                                            blockId={tdl.id}
                                            blockTitle={tdl.title}
                                            tasks={taskForTodoList} // прокидываем тудулист данные
                                            blockFilter={tdl.filter}
                                            removeTask={removeTask}
                                            changeFilter={changeBlockFilter}
                                            addTask={addTask}
                                            changeStatus={changeStatus}
                                            removeBlock={removeBlock}
                                            changeTaskTitle={changeTaskTitle}
                                            changeBlockTitle={changeBlockTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
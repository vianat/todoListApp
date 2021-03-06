import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './components/TodoList';
import {v1} from 'uuid';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addBlockAC, changeBlockFilterAC, changeBlockTitleAC, removeBlockAC, blockReducer} from "./state/block-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {AddItem} from "./AddItem";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolist-api";

export type TaskStateType = {
    [key: string]: Array<TaskType>
}
export type FilterValuesType = "all" | "active" | "completed";

function AppWithReducers() {

    const block1 = v1(), block2 = v1(), block3 = v1()  // создаём блоки с id , что бы связать блок с тасками #32

    const [blocks, dispatchToBlock] = useReducer(blockReducer, [ // лок стейт для блоков
        {id: block1, title: "first block ", filter: 'all', addedDate: "", order: 0},
        {id: block2, title: "second block ", filter: 'active', addedDate: "", order: 0},
        {id: block3, title: "third block ", filter: 'completed', addedDate: "", order: 0}
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer,{ // лок стейт для блок-тасков
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

    function addBlock(title: string){
        const action = addBlockAC(title)
        dispatchToBlock(action)
        dispatchToTasks(action)
    }
    function removeBlock (blockID: string){
        const action = removeBlockAC(blockID)
        dispatchToBlock(action)
        dispatchToTasks(action)
    }
    function changeBlockFilter(blockID: string, newFilterValue:FilterValuesType) {
        const action = changeBlockFilterAC(blockID, newFilterValue )
        dispatchToBlock(action)
    }
    function changeBlockTitle(blockID: string, title: string){
        const action = changeBlockTitleAC(blockID, title )
        dispatchToBlock(action)
    }

    function addTask     (blockID: string, title: string) {//добавляем block или task
        const action = addTaskAC(blockID, title)
        dispatchToTasks(action)
    }
    function removeTask  (blockID: string, taskID: string) {
        const action = removeTaskAC(blockID, taskID)
        dispatchToTasks(action)
    }
    function changeStatus(blockID: string, taskId: string, status: TaskStatuses) {
        const action = changeTaskStatusAC(blockID, taskId, status)
        dispatchToTasks(action)
    }
    function changeTaskTitle(blockID: string, taskId: string, title: string) {
        const action = changeTaskTitleAC(blockID, taskId, title)
        dispatchToTasks(action)
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

export default AppWithReducers;
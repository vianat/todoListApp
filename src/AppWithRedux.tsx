import React from 'react';
import './App.css';
import {Todolist} from './components/TodoList';
import AddItem from "./AddItem";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addBlockAC, changeBlockFilterAC, changeBlockTitleAC, removeBlockAC} from "./state/block-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type BlockType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}
export type FilterValuesType = "all" | "active" | "completed";

function AppWithRedux() {

    const dispatch = useDispatch()
    const blocks = useSelector<AppRootState, Array<BlockType>>(state=>state.blocks)
    const tasks = useSelector<AppRootState, TaskStateType>(state=>state.tasks)

    function addTask     (blockID: string, title: string) {//добавляем block или task
        const action = addTaskAC(blockID, title)
        dispatch(action)
    }
    function removeTask  (blockID: string, taskID: string) {
        const action = removeTaskAC(blockID, taskID)
        dispatch(action)
    }
    function changeStatus(blockID: string, taskId: string, isDone: boolean) {
        const action = changeTaskStatusAC(blockID, taskId, isDone)
        dispatch(action)
    }
    function changeTaskTitle(blockID: string, taskId: string, title: string) {
        const action = changeTaskTitleAC(blockID, taskId, title)
        dispatch(action)
    }

    function addBlock(title: string){
        const action = addBlockAC(title)
        dispatch(action)
    }
    function removeBlock (blockID: string){
        const action = removeBlockAC(blockID)
        dispatch(action)
    }
    function changeBlockFilter(blockID: string, newFilterValue:FilterValuesType) {
        const action = changeBlockFilterAC(blockID, newFilterValue )
        dispatch(action)
    }
    function changeBlockTitle(blockID: string, title: string){
        const action = changeBlockTitleAC(blockID, title )
        dispatch(action)
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
                            if(tdl.filter === "active")   {taskForTodoList = tasks[tdl.id].filter(t => t.isDone === false)}
                            if(tdl.filter === "completed"){taskForTodoList = tasks[tdl.id].filter(t => t.isDone === true)}

                            return (
                                <Grid item key={tdl.id}>
                                    <Paper elevation={2} style={{padding:"15px"}}>
                                        <Todolist
                                            id={tdl.id}
                                            title={tdl.title}
                                            tasks={taskForTodoList} // прокидываем тудулист данные
                                            filter={tdl.filter}
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

export default AppWithRedux;
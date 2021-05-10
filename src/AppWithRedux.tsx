import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './components/TodoList';
import {AddItem} from "./AddItem";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addBlockAC,
    changeBlockFilterAC,
    changeBlockTitleAC,
    removeBlockAC,
    TodolistTypeDomainType
} from "./state/block-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todolist-api";

export type TaskStateType = {
    [key: string]: Array<TaskType>
}
export type FilterValuesType = "all" | "active" | "completed";

export function AppWithRedux() {

    const dispatch = useDispatch()
    const blocks = useSelector<AppRootState, Array<TodolistTypeDomainType>>(state=>state.blocks)
    const tasks  = useSelector<AppRootState, TaskStateType>(state=>state.tasks)

    const addBlock = useCallback((title: string) => {
        const action = addBlockAC(title)
        dispatch(action)
    }, [dispatch])
    const removeBlock  = useCallback( (blockID: string) => {
        dispatch(removeBlockAC(blockID))
    }, [dispatch])
    const changeBlockFilter = useCallback((blockID: string, newFilterValue:FilterValuesType) => {
        const action = changeBlockFilterAC(blockID, newFilterValue )
        dispatch(action)
    }, [dispatch])
    const changeBlockTitle = useCallback((blockID: string, title: string) => {
        const action = changeBlockTitleAC(blockID, title )
        dispatch(action)
    }, [dispatch])

    const addTask = useCallback((blockID: string, title: string) => {
        const action = addTaskAC(blockID, title)
        dispatch(action)
    }, [dispatch])
    const removeTask = useCallback((blockID: string, taskID: string) => {
        const action = removeTaskAC(blockID, taskID)
        dispatch(action)
    }, [dispatch])
    const changeStatus = useCallback((blockID: string, taskId: string, status: TaskStatuses) => {
        const action = changeTaskStatusAC(blockID, taskId, status)
        dispatch(action)
    }, [dispatch])
    const changeTaskTitle = useCallback((blockID: string, taskId: string, title: string) => {
        const action = changeTaskTitleAC(blockID, taskId, title)
        dispatch(action)
    }, [dispatch])

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
                        blocks.map(blk => {                     // фильтруем по корневым блокам
                            let taskForBlock = tasks[blk.id] // фильтруем блоки и устанавливам фильтры

                            return (
                                <Grid item key={blk.id}>
                                    <Paper elevation={2} style={{padding:"15px"}}>
                                        <Todolist
                                            blockId={blk.id}
                                            blockTitle={blk.title}
                                            tasks={taskForBlock} // прокидываем тудулист данные
                                            blockFilter={blk.filter}
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
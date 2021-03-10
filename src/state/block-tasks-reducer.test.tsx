import {addBlockAC, blockReducer} from "./block-reducer";
import {BlockType, TaskStateType} from "../App";
import {tasksReducer} from "./tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<BlockType> = [];

    const action = addBlockAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = blockReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.id);
    expect(idFromTodolists).toBe(action.id);
});

import {v1} from "uuid";
import {TaskStateType} from "../App";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer
} from "./tasks-reducer";
import {addBlockAC, removeBlockAC, setBlocksAC} from "./block-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

let initialState: TaskStateType;
let block1: string, block2: string, block3: string

beforeEach(() => {
    block1 = v1(), block2 = v1(), block3 = v1()

    initialState = {
        [block1]: [
            {id: "1", title: "HTML&CSS", status: TaskStatuses.Complited, todoListId : block1, description : "",
                priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""},
            {id: "2", title: "ReactJS", status: TaskStatuses.Complited, todoListId : block1, description : "",
                priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""},
            {id: "3", title: "SQL", status: TaskStatuses.New, todoListId : block1, description : "",
                priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""},
            {id: "4", title: "Rest API", status: TaskStatuses.New, todoListId : block1, description : "",
                priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""},
            {id: "5", title: "GraphQL", status: TaskStatuses.New, todoListId : block1, description : "",
                priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""}
        ],
        [block2]: [
            {id: "1", title: "HTML&CSS", status: TaskStatuses.Complited, todoListId : block2, description : "",
                priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""},
            {id: "2", title: "JS", status: TaskStatuses.Complited, todoListId : block2, description : "",
                priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""},
            {id: "3", title: "ReactJS", status: TaskStatuses.New, todoListId : block2, description : "",
                priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""},
            {id: "4", title: "Rest API", status: TaskStatuses.New, todoListId : block2, description : "",
                priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""},
            {id: "5", title: "GraphQL", status: TaskStatuses.New, todoListId : block2, description : "",
                priority: TaskPriorities.Low, startDate : "", deadline : "", order : 0, addedDate : ""}
        ]
    }
})

test("add task", () => {
    const newState = tasksReducer(initialState, addTaskAC(block2, "new"))

    expect(newState[block2].length).toBe(6)
    expect(newState[block2][0].title).toBe("new")

})

test("remove task", () => {
    const newState = tasksReducer(initialState, removeTaskAC(block2, "2"))

    expect(newState[block1][1].title).toBe("ReactJS")
    expect(newState[block2].length).toBe(4)
})

test("change task status", () => {
    const newState = tasksReducer(initialState, changeTaskStatusAC(block2, "2", TaskStatuses.Complited))

    expect(newState[block1][1].status).toBe(TaskStatuses.Complited)
    expect(newState[block2][1].status).toBe(TaskStatuses.Complited)
})

test("change task title", () => {
    const newState = tasksReducer(initialState, changeTaskTitleAC(block2, "2", "newTitle"))

    expect(newState[block1][1].title).toBe("ReactJS")
    expect(newState[block2][1].title).toBe("newTitle")
})

test('new array should be added when new todolist is added', () => {

    const action = addBlockAC("new block");

    const endState = tasksReducer(initialState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != block1 && k != block2);
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = removeBlockAC(block2);

    const endState = tasksReducer(initialState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState[block2]).not.toBeDefined();
});

test('empty tasks should be added when we set todolists', () => {

    const action = setBlocksAC([
        {id: block1, title: "first block", order: 0, addedDate: ""},
        {id: block2, title: "second block", order: 0, addedDate: ""}
    ])

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState);

    expect(endState[keys[0]]).toStrictEqual([]);
    expect(endState[keys[1]]).toStrictEqual([]);
});

test('tasks should be added for todolist', () => {

    const action = setTasksAC(initialState[block1], block1)

    const endState = tasksReducer({
        [block2]: [],
        [block1]: []
    }, action)

    expect(endState[block1].length).toBe(5);
    expect(endState[block2].length).toBe(0);
});



import {v1} from "uuid";
import {TaskStateType} from "../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addBlock, removeBlock} from "./todolist-reducer";

let initialState: TaskStateType;
let block1: string, block2: string, block3: string

beforeEach(() => {
    block1 = v1(), block2 = v1(), block3 = v1()

    initialState = {
        [block1]: [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "ReactJS", isDone: true},
            {id: "3", title: "SQL", isDone: false},
            {id: "4", title: "Rest API", isDone: false},
            {id: "5", title: "GraphQL", isDone: false}
        ],
        [block2]: [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
            {id: "4", title: "Rest API", isDone: false},
            {id: "5", title: "GraphQL", isDone: false}
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
    const newState = tasksReducer(initialState, changeTaskStatusAC(block2, "2", false))

    expect(newState[block1][1].isDone).toBe(true)
    expect(newState[block2][1].isDone).toBe(false)
})

test("change task title", () => {
    const newState = tasksReducer(initialState, changeTaskTitleAC(block2, "2", "newTitle"))

    expect(newState[block1][1].title).toBe("ReactJS")
    expect(newState[block2][1].title).toBe("newTitle")
})

test('new array should be added when new todolist is added', () => {

    const action = addBlock("new block");

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

    const action = removeBlock(block2);

    const endState = tasksReducer(initialState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState[block2]).not.toBeDefined();
});



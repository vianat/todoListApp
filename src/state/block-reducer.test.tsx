import {
    addBlockAC,
    changeBlockFilterAC,
    changeBlockTitleAC,
    removeBlockAC,
    blockReducer,
    setBlocksAC
} from "./block-reducer";
import {v1} from "uuid";

let initialState: any;
let block1: string, block2: string, block3: string

beforeEach(() => {
    block1 = v1(), block2 = v1(), block3 = v1()

    initialState = [
        {id: block1, title: "first block", filter: 'all'},
        {id: block2, title: "second block", filter: 'active'},
        {id: block3, title: "third block", filter: 'completed'}
    ]
})

test("add block", () => {
    const newTitle = "new Block"
    const newState = blockReducer(initialState, addBlockAC(newTitle))

    expect(newState.length).toBe(4)
    expect(newState[0].title).toBe(newTitle)
})

test("remove block", () => {
    const newState = blockReducer(initialState, removeBlockAC(block3))

    expect(newState[1].title).toBe("second block")
    expect(newState.length).toBe(2)
})

test("change block filter", () => {
    const newFilter = "completed"
    const newState = blockReducer(initialState, changeBlockFilterAC(block3, newFilter))

    expect(newState[1].filter).toBe("active")
    expect(newState[2].filter).toBe(newFilter)
})

test("change block title", () => {
    const newTitle = "new title"
    const newState = blockReducer(initialState, changeBlockTitleAC(block3, newTitle))

    expect(newState[1].title).toBe("second block")
    expect(newState[2].title).toBe(newTitle)
})

test("blocks should are set", () => {
    const action = setBlocksAC(initialState)
    const endState = blockReducer([], action)

    expect(endState.length).toBe(3)
})
import {addBlock, changeBlockFilter, changeBlockTitle, removeBlock, todolistReducer} from "./todolist-reducer";
import {v1} from "uuid";
import {useState} from 'react';
import {BlockType} from "../App";

let initialState: any;
let block1: string, block2: string, block3: string

beforeEach(() => {
    block1 = v1(), block2 = v1(), block3 = v1()

    initialState = [
        {id: block1, title: "first block ", filter: 'all'},
        {id: block2, title: "second block ", filter: 'active'},
        {id: block3, title: "third block ", filter: 'completed'}
    ]
})

test("todolist reduser add block", () => {
    const newTitle = "new Block"
    const newState = todolistReducer(initialState, addBlock(newTitle))
    expect(newState[2].title).toBe(newTitle)
})

test("todolist reducer remove block", () => {
    const newState = todolistReducer(initialState, removeBlock(block3))
    expect(newState.length).toBe(2)
})

test("todolist reducer change block filter", () => {
    const newFilter = "completed"

    const newState = todolistReducer(initialState, changeBlockFilter(block3,newFilter))
    expect(newState[2].filter).toBe(newFilter)
})
test("todolist reducer change block title", () => {
    const newTitle = "new title"
    const newState = todolistReducer(initialState, changeBlockTitle(block3,newTitle))
    expect(newState[2].title).toBe(newTitle)
})



import {BlockType, FilterValuesType, TaskStateType} from "../App";
import {v1} from "uuid";
import React, {useState} from 'react';

type AddBlockActiontype = { type: "ADD_BLOCK", title: string }
type RemoveBlockActiontype = { type: "REMOVE_BLOCK", blockID: string }
type ChangeBlockFilterActiontype = { type: "CHANGE_BLOCK_FILTER", blockID: string, newFilter: FilterValuesType }
type AllActionsType = AddBlockActiontype | RemoveBlockActiontype | ChangeBlockFilterActiontype

export const todolistReducer = (state: Array<BlockType>, action: AllActionsType): Array<BlockType> => {

    const block1 = v1(), block2 = v1(), block3 = v1();
    const [blocks, setBlocks] = useState<Array<BlockType>>([ // лок стейт для блоков
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

    switch (action.type) {

        case "ADD_BLOCK": return [...state, {id : v1(), title: action.title, filter: 'all'}]

        case "REMOVE_BLOCK": return state.filter(tdl => tdl.id !== action.blockID);

        case "CHANGE_BLOCK_FILTER":
            const block =  state.find(b=>b.id === action.blockID)
            if(block){ block.filter = action.newFilter}
            return [...state]

        default: throw  new Error("wrong action")
    }
}

export const AddBlockAC = (title: string): AddBlockActiontype => {return {type: "ADD_BLOCK", title: title}}
export const RemoveBlockAC = (blockID: string): RemoveBlockActiontype => {return {type: "REMOVE_BLOCK", blockID: blockID}}
export const ChangeBlockFilterAC = (blockID: string, newFilter: FilterValuesType): ChangeBlockFilterActiontype => {
    return {type: "CHANGE_BLOCK_FILTER", blockID: blockID, newFilter: newFilter}
}
import {BlockType, FilterValuesType, TaskStateType} from "../App";
import {v1} from "uuid";
import React, {useState} from 'react';

export type AddBlockActiontype = { type: "ADD-BLOCK", title: string, id: string }
export type RemoveBlockActiontype = { type: "REMOVE-BLOCK", blockID: string }
type ChangeBlockFilterActiontype = { type: "CHANGE-BLOCK-FILTER", blockID: string, newFilter: FilterValuesType }
type ChangeBlockTitleActiontype = { type: "CHANGE-BLOCK-TITLE", blockID: string, newTitle: string }

type AllActionsType = AddBlockActiontype | RemoveBlockActiontype | ChangeBlockFilterActiontype | ChangeBlockTitleActiontype

export const todolistReducer = (state: Array<BlockType>, action: AllActionsType): Array<BlockType> => {

    switch (action.type) {

        case "ADD-BLOCK": return [...state, {id : action.id, title: action.title, filter: 'all'}]

        case "REMOVE-BLOCK": return state.filter(b => b.id !== action.blockID);

        case "CHANGE-BLOCK-FILTER":
            const block =  state.find(b=>b.id === action.blockID)
            if(block){ block.filter = action.newFilter}
            return [...state]

        case "CHANGE-BLOCK-TITLE":
            const oneblock =  state.find(b=>b.id === action.blockID)
            if(oneblock){ oneblock.title = action.newTitle}
            return [...state]

        default: throw  new Error("wrong action")
    }
}

export const addBlock = (title: string): AddBlockActiontype => ({
    type: "ADD-BLOCK", title, id: v1()
})
export const removeBlock = (blockID: string): RemoveBlockActiontype => ({
    type: "REMOVE-BLOCK", blockID
})
export const changeBlockFilter = (blockID: string, newFilter: FilterValuesType): ChangeBlockFilterActiontype => ({
    type: "CHANGE-BLOCK-FILTER", blockID, newFilter
})
export const changeBlockTitle = (blockID: string, newTitle: string): ChangeBlockTitleActiontype => ({
    type: "CHANGE-BLOCK-TITLE", blockID, newTitle
})
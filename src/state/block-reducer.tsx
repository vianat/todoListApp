import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "react";
import {useDispatch} from "react-redux";

export type AddBlockActiontype = { type: "ADD-BLOCK", title: string, id: string }
export type RemoveBlockActiontype = { type: "REMOVE-BLOCK", blockID: string }
type ChangeBlockFilterActiontype = { type: "CHANGE-BLOCK-FILTER", blockID: string, newFilter: FilterValuesType }
type ChangeBlockTitleActiontype = { type: "CHANGE-BLOCK-TITLE", blockID: string, newTitle: string }
export type SetBlockActionType = { type: "SET-BLOCKS", blocks: Array<TodolistType>}

type AllActionsType = AddBlockActiontype | RemoveBlockActiontype | ChangeBlockFilterActiontype | ChangeBlockTitleActiontype | SetBlockActionType
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistTypeDomainType = TodolistType & {
    filter: FilterValuesType
}
export let block1 = v1(), block2 = v1(), block3 = v1()
const initialState:Array<TodolistTypeDomainType> = [
    {id: block1, title: "first block ", filter: 'all', order: 0, addedDate: ""},
    {id: block2, title: "second block ", filter: 'active', order: 0, addedDate: ""},
    {id: block3, title: "third block ", filter: 'completed', order: 0, addedDate: ""}
]
export const blockReducer = (state: Array<TodolistTypeDomainType> = initialState, action: AllActionsType): Array<TodolistTypeDomainType> => {
    switch (action.type) {

        case "ADD-BLOCK": return [{id : action.id, title: action.title, filter: 'all', order: 0, addedDate: ""}, ...state]

        case "REMOVE-BLOCK": return state.filter(b => b.id !== action.blockID);

        case "CHANGE-BLOCK-FILTER":
            const block =  state.find(b=>b.id === action.blockID)
            if(block){ block.filter = action.newFilter}
            return [...state]

        case "CHANGE-BLOCK-TITLE":
            const oneblock =  state.find(b=>b.id === action.blockID)
            if(oneblock){ oneblock.title = action.newTitle}
            return [...state]

        case "SET-BLOCKS": return action.blocks.map(tdl => {
            return {
                ...tdl,
                filter: "all"
            }
        });

        default: return state
    }
}

export const addBlockAC = (title: string): AddBlockActiontype => ({
    type: "ADD-BLOCK", title, id: v1()
})
export const removeBlockAC = (blockID: string): RemoveBlockActiontype => ({
    type: "REMOVE-BLOCK", blockID
})
export const changeBlockFilterAC = (blockID: string, newFilter: FilterValuesType): ChangeBlockFilterActiontype => ({
    type: "CHANGE-BLOCK-FILTER", blockID, newFilter
})
export const changeBlockTitleAC = (blockID: string, newTitle: string): ChangeBlockTitleActiontype => ({
    type: "CHANGE-BLOCK-TITLE", blockID, newTitle
})
export const setBlocksAC = (blocks: Array<TodolistType>): SetBlockActionType => ({
    type: "SET-BLOCKS", blocks
})
export const fetchTodolistsTHUNKCREATOR = () => {
    return (dispatch: any) => {
        todolistAPI.getTodolists()
            .then((res) => {
                dispatch(setBlocksAC(res.data))
            })
    }
}
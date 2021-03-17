import {BlockType, FilterValuesType} from "../App";
import {v1} from "uuid";

export type AddBlockActiontype = { type: "ADD-BLOCK", title: string, id: string }
export type RemoveBlockActiontype = { type: "REMOVE-BLOCK", blockID: string }
type ChangeBlockFilterActiontype = { type: "CHANGE-BLOCK-FILTER", blockID: string, newFilter: FilterValuesType }
type ChangeBlockTitleActiontype = { type: "CHANGE-BLOCK-TITLE", blockID: string, newTitle: string }

type AllActionsType = AddBlockActiontype | RemoveBlockActiontype | ChangeBlockFilterActiontype | ChangeBlockTitleActiontype

export let block1 = v1(), block2 = v1(), block3 = v1()
const initialState:Array<BlockType> = [
    {id: block1, title: "first block ", filter: 'all'},
    {id: block2, title: "second block ", filter: 'active'},
    {id: block3, title: "third block ", filter: 'completed'}
]

export const blockReducer = (state: Array<BlockType> = initialState, action: AllActionsType): Array<BlockType> => {
    switch (action.type) {

        case "ADD-BLOCK": return [{id : action.id, title: action.title, filter: 'all'}, ...state]

        case "REMOVE-BLOCK": return state.filter(b => b.id !== action.blockID);

        case "CHANGE-BLOCK-FILTER":
            const block =  state.find(b=>b.id === action.blockID)
            if(block){ block.filter = action.newFilter}
            return [...state]

        case "CHANGE-BLOCK-TITLE":
            const oneblock =  state.find(b=>b.id === action.blockID)
            if(oneblock){ oneblock.title = action.newTitle}
            return [...state]

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
import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    title: string
    changeItem:(title: string) => void
}
export const EditableSpan = React.memo((props: EditableSpanPropsType) => {

    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)

    function onEditMode (){setEditMode(true)}
    function OffEditMode(){
        setEditMode(false)
        props.changeItem(title)
    }

    function changeTitle (e: ChangeEvent<HTMLInputElement>) {setTitle(e.currentTarget.value)}

    return (
        editMode
            ? <TextField value={title} onBlur={OffEditMode} autoFocus onChange={changeTitle}/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
})
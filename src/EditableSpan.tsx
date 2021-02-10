import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeItem:(title: string) => void
}
function EditableSpan (props: EditableSpanPropsType) {

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
            ? <input value={title} onBlur={OffEditMode} autoFocus onChange={changeTitle}/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};

export default EditableSpan;